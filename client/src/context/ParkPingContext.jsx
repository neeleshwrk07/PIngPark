import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { sound } from '../utils/soundEffects';

const ParkPingContext = createContext(null);

export const ParkPingProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [activePings, setActivePings] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [scannerVehicle, setScannerVehicle] = useState(null);
  const [scannerSentPing, setScannerSentPing] = useState(null);
  const [simulatorMode, setSimulatorMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [toasts, setToasts] = useState([]);

  const [modals, setModals] = useState({
    registerVehicle: false,
    scannerView: false,
    pitchDeck: false,
  });

  const addToast = useCallback((title, message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev.slice(-4), { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  }, []);

  const openModal = useCallback((name) => {
    sound.playClick();
    setModals(prev => ({ ...prev, [name]: true }));
  }, []);

  const closeModal = useCallback((name) => {
    setModals(prev => ({ ...prev, [name]: false }));
  }, []);

  // Fetch vehicles
  const fetchVehicles = useCallback(async () => {
    try {
      const res = await fetch('/api/vehicles');
      if (res.ok) {
        const data = await res.json();
        setVehicles(data);
        if (data.length > 0 && !selectedVehicleId) {
          setSelectedVehicleId(data[0].id);
        }
      }
    } catch (err) {
      console.error('Error fetching vehicles:', err);
    }
  }, [selectedVehicleId]);

  // Fetch pings
  const fetchPings = useCallback(async () => {
    try {
      const res = await fetch('/api/pings');
      if (res.ok) {
        const data = await res.json();
        setActivePings(data);
      }
    } catch (err) {
      console.error('Error fetching pings:', err);
    }
  }, []);

  // Fetch analytics
  const fetchAnalytics = useCallback(async () => {
    try {
      const res = await fetch('/api/analytics');
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
    }
  }, []);

  // Setup SSE and initial data load
  useEffect(() => {
    fetchVehicles();
    fetchPings();
    fetchAnalytics();

    // Check for ?scan= query parameter on load (when scanned from real camera)
    try {
      const params = new URLSearchParams(window.location.search);
      const scanCode = params.get('scan') || params.get('qr');
      if (scanCode) {
        fetch(`/api/vehicles/${encodeURIComponent(scanCode)}`)
          .then(res => res.json())
          .then(data => {
            if (data && data.id) {
              setScannerVehicle(data);
              setScannerSentPing(null);
              setModals(prev => ({ ...prev, scannerView: true }));
            }
          })
          .catch(() => {});
      }
    } catch (e) {}

    let eventSource;
    try {
      eventSource = new EventSource('/api/events');
      eventSource.onmessage = (e) => {
        try {
          const { type, payload } = JSON.parse(e.data);
          if (type === 'NEW_PING') {
            sound.playSirenAlert();
            setActivePings(prev => [payload.ping, ...prev]);
            addToast('🚨 Car Block Alert!', `Someone is blocked by ${payload.vehicle.plateNumber}: "${payload.ping.senderNote}"`, 'error');
            fetchAnalytics();
          } else if (type === 'PING_REPLIED') {
            sound.playSuccess();
            setActivePings(prev => prev.map(p => p.id === payload.id ? payload : p));
            setScannerSentPing(prev => prev && prev.id === payload.id ? payload : prev);
            addToast('Owner Responded!', `Car owner replied: "${payload.ownerReply}"`, 'success');
            fetchAnalytics();
          } else if (type === 'VEHICLE_CREATED' || type === 'VEHICLE_UPDATED') {
            fetchVehicles();
          }
        } catch (err) {}
      };
    } catch (err) {}

    const interval = setInterval(() => {
      fetchPings();
      fetchAnalytics();
    }, 4000);

    return () => {
      if (eventSource) eventSource.close();
      clearInterval(interval);
    };
  }, [fetchVehicles, fetchPings, fetchAnalytics, addToast]);

  // Selected vehicle object
  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId) || vehicles[0];

  // Actions
  const registerVehicle = async (vehicleData) => {
    sound.playClick();
    try {
      const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicleData)
      });
      const data = await res.json();
      if (!res.ok) {
        addToast('Registration Notice', data.error || 'Failed to register', 'error');
        return { success: false, error: data.error };
      }
      sound.playSuccess();
      addToast('Vehicle Registered!', `Windshield QR created for ${data.vehicle.plateNumber}`, 'success');
      fetchVehicles();
      setSelectedVehicleId(data.vehicle.id);
      return { success: true, vehicle: data.vehicle };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateVehicle = async (id, updates) => {
    sound.playClick();
    try {
      const res = await fetch(`/api/vehicles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error };
      addToast('Vehicle Updated', 'Settings & status saved successfully', 'info');
      fetchVehicles();
      return { success: true, vehicle: data.vehicle };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const sendPing = async ({ qrCode, reason, senderNote, senderContact }) => {
    sound.playClick();
    try {
      const res = await fetch(`/api/ping/${qrCode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason, senderNote, senderContact })
      });
      const data = await res.json();
      if (!res.ok) {
        addToast('Alert Error', data.error || 'Could not ping owner', 'error');
        return { success: false, error: data.error };
      }
      sound.playSuccess();
      setScannerSentPing(data.ping);
      addToast('Ping Sent to Owner!', 'Owner device has buzzed with your move request', 'success');
      return { success: true, ping: data.ping };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const replyToPing = async (pingId, replyText) => {
    sound.playClick();
    try {
      const res = await fetch(`/api/ping/${pingId}/reply`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replyText })
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error };
      sound.playSuccess();
      addToast('Reply Sent', `Sent "${replyText}" to blocked driver`, 'success');
      fetchPings();
      return { success: true, ping: data.ping };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const openScannerForVehicle = (vehicle) => {
    setScannerVehicle(vehicle);
    setScannerSentPing(null);
    openModal('scannerView');
  };

  const toggleSound = () => {
    const s = sound.toggleSound();
    setSoundEnabled(s);
    addToast('Audio Alerts', s ? 'Vehicle horn alerts active' : 'Audio muted', 'info');
  };

  return (
    <ParkPingContext.Provider value={{
      vehicles,
      selectedVehicle,
      selectedVehicleId,
      setSelectedVehicleId,
      activePings,
      analytics,
      scannerVehicle,
      setScannerVehicle,
      scannerSentPing,
      setScannerSentPing,
      simulatorMode,
      setSimulatorMode,
      soundEnabled,
      toggleSound,
      toasts,
      modals,
      openModal,
      closeModal,
      registerVehicle,
      updateVehicle,
      sendPing,
      replyToPing,
      openScannerForVehicle
    }}>
      {children}
    </ParkPingContext.Provider>
  );
};

export const useParkPing = () => {
  const context = useContext(ParkPingContext);
  if (!context) throw new Error('useParkPing must be used within ParkPingProvider');
  return context;
};
