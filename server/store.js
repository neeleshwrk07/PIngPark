import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'parkping_db.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function generateInitialData() {
  const vehicles = [
    {
      id: 'veh-1',
      qrCode: 'PING-DL01AB1234',
      plateNumber: 'DL-01-AB-1234',
      makeModel: 'Hyundai Creta (Polar White)',
      vehicleType: 'SUV',
      ownerName: 'Aarav Sharma',
      phone: '+91 98765 43210',
      whatsapp: '+91 98765 43210',
      email: 'aarav.sharma@example.com',
      altPhone: '+91 98111 22334',
      parkingStatus: 'blocking', // 'blocking' | 'safe' | 'valet' | 'emergency'
      statusNote: 'Double-parked near Tower 3 while picking up a quick parcel. Scan & ping me, I will come down in 2 mins!',
      privacyMode: 'show_all', // 'show_all' | 'whatsapp_only' | 'anonymous_ping_only'
      decalStyle: 'cyber', // 'cyber' | 'neon' | 'minimal' | 'hazard' | 'gold'
      registeredAt: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
    },
    {
      id: 'veh-2',
      qrCode: 'PING-MH02CD5678',
      plateNumber: 'MH-02-CD-5678',
      makeModel: 'Tata Nexon EV (Teal Blue)',
      vehicleType: 'Electric Vehicle',
      ownerName: 'Priya Patel',
      phone: '+91 98222 33445',
      whatsapp: '+91 98222 33445',
      email: 'priya.patel@example.com',
      altPhone: '+91 99333 44556',
      parkingStatus: 'safe',
      statusNote: 'Parked in regular slot B-14. Ping if headlights left on or any emergency!',
      privacyMode: 'show_all',
      decalStyle: 'neon',
      registeredAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
    },
    {
      id: 'veh-3',
      qrCode: 'PING-KA03EF9012',
      plateNumber: 'KA-03-EF-9012',
      makeModel: 'Honda City (Lunar Silver)',
      vehicleType: 'Sedan',
      ownerName: 'Rohan Mehta',
      phone: '+91 97444 55667',
      whatsapp: '+91 97444 55667',
      email: 'rohan.mehta@example.com',
      altPhone: '',
      parkingStatus: 'valet',
      statusNote: 'Car keys are deposited with Society Guard at Main Gate 1. Call guard if blocked.',
      privacyMode: 'whatsapp_only',
      decalStyle: 'minimal',
      registeredAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
    }
  ];

  const pings = [
    {
      id: 'png-1001',
      vehicleId: 'veh-1',
      vehiclePlate: 'DL-01-AB-1234',
      timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
      reason: 'BLOCKING_CAR',
      reasonLabel: 'Blocking My Car / Need to Exit',
      senderNote: 'I need to rush to hospital, please move your Creta parked behind my red Swift.',
      senderContact: '+91 98199 00112',
      status: 'resolved',
      ownerReply: 'On my way! Moving in 2 mins.',
      repliedAt: new Date(Date.now() - 33 * 60 * 1000).toISOString(),
    },
    {
      id: 'png-1002',
      vehicleId: 'veh-2',
      vehiclePlate: 'MH-02-CD-5678',
      timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
      reason: 'LIGHTS_ON',
      reasonLabel: 'Headlights Left ON',
      senderNote: 'Your front fog lamps are on, battery might drain.',
      senderContact: 'Fellow resident',
      status: 'resolved',
      ownerReply: 'Thank you so much! Turned off.',
      repliedAt: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
    }
  ];

  return { vehicles, pings };
}

class ParkPingStore {
  constructor() {
    this.data = null;
    this.subscribers = new Set();
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        this.data = JSON.parse(raw);
      } else {
        this.data = generateInitialData();
        this.save();
      }
    } catch (err) {
      console.warn('Could not read existing ParkPing DB, generating fresh seed:', err.message);
      this.data = generateInitialData();
      this.save();
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (err) {
      console.error('Error saving DB file:', err.message);
    }
  }

  notifySubscribers(eventType, payload) {
    for (const res of this.subscribers) {
      try {
        res.write(`data: ${JSON.stringify({ type: eventType, payload, timestamp: new Date().toISOString() })}\n\n`);
      } catch (err) {
        this.subscribers.delete(res);
      }
    }
  }

  addSubscriber(res) {
    this.subscribers.add(res);
  }

  removeSubscriber(res) {
    this.subscribers.delete(res);
  }

  // Vehicles
  getVehicles() {
    return this.data.vehicles;
  }

  getVehicleById(id) {
    return this.data.vehicles.find(v => v.id === id);
  }

  getVehicleByQrOrPlate(query) {
    if (!query) return null;
    const q = query.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    return this.data.vehicles.find(v => {
      const cleanQr = v.qrCode.toUpperCase().replace(/[^A-Z0-9]/g, '');
      const cleanPlate = v.plateNumber.toUpperCase().replace(/[^A-Z0-9]/g, '');
      return cleanQr === q || cleanPlate === q || v.id.toUpperCase() === q;
    });
  }

  createVehicle({ plateNumber, makeModel, vehicleType, ownerName, phone, whatsapp, email, altPhone, statusNote, privacyMode, decalStyle }) {
    if (!plateNumber || typeof plateNumber !== 'string' || !plateNumber.trim()) {
      return { error: 'Valid license plate number is required!' };
    }
    const cleanPlate = plateNumber.trim().toUpperCase();
    const qrCode = `PING-${cleanPlate.replace(/[^A-Z0-9]/g, '')}`;

    // Check if plate already registered
    const existingIndex = this.data.vehicles.findIndex(v => v.plateNumber.replace(/[^A-Z0-9]/g, '') === cleanPlate.replace(/[^A-Z0-9]/g, ''));
    if (existingIndex !== -1) {
      return { error: `Vehicle plate ${cleanPlate} is already registered in your garage!` };
    }

    const id = `veh-${Date.now().toString().slice(-6)}`;
    const newVehicle = {
      id,
      qrCode,
      plateNumber: cleanPlate,
      makeModel: makeModel || 'Vehicle',
      vehicleType: vehicleType || 'Car',
      ownerName: ownerName || 'Vehicle Owner',
      phone: phone || '',
      whatsapp: whatsapp || phone || '',
      email: email || '',
      altPhone: altPhone || '',
      parkingStatus: 'blocking',
      statusNote: statusNote || 'Double-parked. Please ping me if you need to take your car out!',
      privacyMode: privacyMode || 'show_all',
      decalStyle: decalStyle || 'cyber',
      registeredAt: new Date().toISOString(),
    };

    this.data.vehicles.unshift(newVehicle);
    this.save();
    this.notifySubscribers('VEHICLE_CREATED', newVehicle);
    return { success: true, vehicle: newVehicle };
  }

  updateVehicle(id, updates) {
    const vehicle = this.data.vehicles.find(v => v.id === id);
    if (!vehicle) return { error: 'Vehicle not found' };

    Object.assign(vehicle, updates);
    this.save();
    this.notifySubscribers('VEHICLE_UPDATED', vehicle);
    return { success: true, vehicle };
  }

  deleteVehicle(id) {
    const index = this.data.vehicles.findIndex(v => v.id === id);
    if (index === -1) return { error: 'Vehicle not found' };

    const deleted = this.data.vehicles.splice(index, 1)[0];
    this.save();
    this.notifySubscribers('VEHICLE_DELETED', deleted);
    return { success: true, vehicle: deleted };
  }

  // Pings (Alerts from blocked drivers)
  createPing({ qrCode, reason, senderNote, senderContact }) {
    const vehicle = this.getVehicleByQrOrPlate(qrCode);
    if (!vehicle) {
      return { error: 'Vehicle windshield QR not found!' };
    }

    const labels = {
      BLOCKING_CAR: '🚨 Blocking My Car / Need to Move',
      LIGHTS_ON: '⚡ Headlights Left ON',
      WINDOW_DOWN: '🪟 Window Rolled Down / Door Ajar',
      ALARM_RINGING: '🔊 Car Alarm Ringing',
      TOW_WARNING: '⚠️ Tow Truck in Vicinity',
      EMERGENCY: '🚑 Scratch / Collision / Emergency',
    };

    const pingId = `png-${Date.now().toString().slice(-6)}`;
    const newPing = {
      id: pingId,
      vehicleId: vehicle.id,
      vehiclePlate: vehicle.plateNumber,
      ownerName: vehicle.ownerName,
      timestamp: new Date().toISOString(),
      reason: reason || 'BLOCKING_CAR',
      reasonLabel: labels[reason] || labels.BLOCKING_CAR,
      senderNote: senderNote || 'Please move your vehicle so I can exit.',
      senderContact: senderContact || '',
      status: 'delivered', // 'delivered' | 'acknowledged' | 'owner_on_the_way' | 'resolved'
      ownerReply: null,
      repliedAt: null,
    };

    this.data.pings.unshift(newPing);
    this.save();
    this.notifySubscribers('NEW_PING', { ping: newPing, vehicle });
    return { success: true, ping: newPing, vehicle };
  }

  replyToPing(pingId, replyText) {
    const ping = this.data.pings.find(p => p.id === pingId);
    if (!ping) return { error: 'Ping not found' };

    ping.status = 'owner_on_the_way';
    ping.ownerReply = replyText || 'On my way to move the car!';
    ping.repliedAt = new Date().toISOString();

    this.save();
    this.notifySubscribers('PING_REPLIED', ping);
    return { success: true, ping };
  }

  resolvePing(pingId) {
    const ping = this.data.pings.find(p => p.id === pingId);
    if (!ping) return { error: 'Ping not found' };

    ping.status = 'resolved';
    this.save();
    this.notifySubscribers('PING_RESOLVED', ping);
    return { success: true, ping };
  }

  getPings(vehicleId = null) {
    if (vehicleId) {
      return this.data.pings.filter(p => p.vehicleId === vehicleId);
    }
    return this.data.pings;
  }

  getAnalytics() {
    const totalVehicles = this.data.vehicles.length;
    const totalPings = this.data.pings.length;
    const resolvedPings = this.data.pings.filter(p => p.status === 'resolved' || p.status === 'owner_on_the_way').length;
    const doubleParkedVehicles = this.data.vehicles.filter(v => v.parkingStatus === 'blocking').length;

    return {
      totalVehicles,
      totalPings,
      resolvedPings,
      doubleParkedVehicles,
      resolutionRate: totalPings > 0 ? Math.round((resolvedPings / totalPings) * 100) : 100,
      recentPings: this.data.pings.slice(0, 10),
    };
  }
}

export const dbStore = new ParkPingStore();
