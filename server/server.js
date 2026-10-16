import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import QRCode from 'qrcode';
import mongoose from 'mongoose';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { dbStore } from './store.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDist = path.join(__dirname, '..', 'client', 'dist');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/parkping';

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(express.json());

// Optional MongoDB connection attempt (gracefully falls back to dbStore)
let mongoConnected = false;
try {
  mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 2000 })
    .then(() => {
      mongoConnected = true;
      console.log('✅ Connected to MongoDB at', MONGODB_URI);
    })
    .catch(() => {
      console.log('ℹ️ MongoDB daemon not active on localhost. Using resilient high-speed JSON store.');
    });
} catch (e) {
  console.log('ℹ️ Operating in standalone high-speed local store mode.');
}

// Detect local LAN IP for physical mobile phone camera scanning over Wi-Fi
function getLanIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

// ======================== API ROUTES ========================

// Health & System Info
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'ParkPing - Windshield QR Vehicle Contact System',
    version: '3.1.0',
    mongoConnected,
    lanIp: getLanIp(),
    timestamp: new Date().toISOString()
  });
});

// Network Info (for real mobile camera QR scanning)
app.get('/api/network-info', (req, res) => {
  const lanIp = getLanIp();
  const currentPort = PORT;
  res.json({
    lanIp,
    port: currentPort,
    mobileBaseUrl: `http://${lanIp}:${currentPort}`,
    localBaseUrl: `http://localhost:${currentPort}`
  });
});

// SSE Live Stream with automatic 15s keep-alive heartbeat
app.get('/api/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  dbStore.addSubscriber(res);
  res.write(`data: ${JSON.stringify({ type: 'CONNECTED', message: 'ParkPing live telemetry ready' })}\n\n`);

  // Heartbeat to prevent socket timeouts
  const heartbeat = setInterval(() => {
    try {
      res.write(': keep-alive\n\n');
    } catch (e) {
      clearInterval(heartbeat);
    }
  }, 15000);

  req.on('close', () => {
    clearInterval(heartbeat);
    dbStore.removeSubscriber(res);
  });
});

// Generate dynamic QR Code Data URL for Windshield Decal
app.get('/api/qr/generate', async (req, res) => {
  const text = req.query.text || 'PING-SAMPLE';
  const color = req.query.color || '#0f172a';
  try {
    const dataUrl = await QRCode.toDataURL(text, {
      width: 360,
      margin: 1,
      color: {
        dark: color,
        light: '#ffffff'
      }
    });
    res.json({ text, dataUrl });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

// Owner's Garage: List all registered vehicles
app.get('/api/vehicles', (req, res) => {
  res.json(dbStore.getVehicles());
});

// Register a new vehicle & generate windshield decal
app.post('/api/vehicles', async (req, res) => {
  const { plateNumber, makeModel, vehicleType, ownerName, phone, whatsapp, email, altPhone, statusNote, privacyMode, decalStyle } = req.body;
  if (!plateNumber || !phone) {
    return res.status(400).json({ error: 'License plate and contact phone number are required!' });
  }

  const result = dbStore.createVehicle({
    plateNumber,
    makeModel,
    vehicleType,
    ownerName,
    phone,
    whatsapp,
    email,
    altPhone,
    statusNote,
    privacyMode,
    decalStyle
  });

  if (result.error) {
    return res.status(400).json(result);
  }

  // Pre-generate QR data URL
  try {
    const qrDataUrl = await QRCode.toDataURL(result.vehicle.qrCode, {
      width: 320,
      margin: 1,
      color: { dark: '#064e3b', light: '#ffffff' }
    });
    result.vehicle.qrImage = qrDataUrl;
  } catch (e) {}

  res.status(201).json(result);
});

// Public lookup when someone scans the windshield QR code
app.get('/api/vehicles/:qrCode', (req, res) => {
  const vehicle = dbStore.getVehicleByQrOrPlate(req.params.qrCode);
  if (!vehicle) {
    return res.status(404).json({ error: 'No vehicle found matching this QR code / license plate.' });
  }

  // Sanitize contact info based on privacy settings
  let sanitized = { ...vehicle };
  if (vehicle.privacyMode === 'anonymous_ping_only') {
    sanitized.phone = 'PROTECTED (In-App Calling Only)';
    sanitized.email = 'PROTECTED';
    sanitized.altPhone = '';
  } else if (vehicle.privacyMode === 'whatsapp_only') {
    sanitized.phone = 'WHATSAPP ONLY';
  }

  res.json(sanitized);
});

// Update vehicle (parking status, note, contacts)
app.put('/api/vehicles/:id', (req, res) => {
  const result = dbStore.updateVehicle(req.params.id, req.body);
  if (result.error) return res.status(400).json(result);
  res.json(result);
});

// Delete vehicle from garage
app.delete('/api/vehicles/:id', (req, res) => {
  const result = dbStore.deleteVehicle(req.params.id);
  if (result.error) return res.status(400).json(result);
  res.json(result);
});

// Blocked driver scans windshield and sends a move request ping
app.post('/api/ping/:qrCode', (req, res) => {
  const { reason, senderNote, senderContact } = req.body;
  const result = dbStore.createPing({
    qrCode: req.params.qrCode,
    reason,
    senderNote,
    senderContact
  });

  if (result.error) return res.status(400).json(result);
  res.status(201).json(result);
});

// Owner responds to incoming ping (e.g. "Coming in 2 mins!")
app.put('/api/ping/:id/reply', (req, res) => {
  const { replyText } = req.body;
  const result = dbStore.replyToPing(req.params.id, replyText);
  if (result.error) return res.status(400).json(result);
  res.json(result);
});

// Resolve ping (car moved)
app.put('/api/ping/:id/resolve', (req, res) => {
  const result = dbStore.resolvePing(req.params.id);
  if (result.error) return res.status(400).json(result);
  res.json(result);
});

// Get all pings (history)
app.get('/api/pings', (req, res) => {
  const { vehicleId } = req.query;
  res.json(dbStore.getPings(vehicleId));
});

// Analytics
app.get('/api/analytics', (req, res) => {
  res.json(dbStore.getAnalytics());
});

// Serve frontend static files
app.use(express.static(clientDist));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  res.sendFile(path.join(clientDist, 'index.html'), (err) => {
    if (err) {
      res.status(200).send('ParkPing API is online. Client build is compiling...');
    }
  });
});

// Dynamic port listener with auto-fallback
function startServer(portToTry) {
  const lanIp = getLanIp();
  const srv = app.listen(portToTry, '0.0.0.0', () => {
    console.log(`\n======================================================`);
    console.log(`🚀 ParkPing Server is LIVE!`);
    console.log(`💻 Local access:        http://localhost:${portToTry}`);
    console.log(`📱 Mobile camera scan:  http://${lanIp}:${portToTry}`);
    console.log(`📡 Real-Time SSE:       http://localhost:${portToTry}/api/events`);
    console.log(`======================================================\n`);
  });

  srv.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️ Port ${portToTry} is occupied. Trying port ${portToTry + 1}...`);
      startServer(portToTry + 1);
    } else {
      console.error('Fatal Server Error:', err);
    }
  });
}

startServer(Number(PORT));
