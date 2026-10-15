import React from 'react';
import { useParkPing } from './context/ParkPingContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { WindshieldDecalCard } from './components/WindshieldDecalCard';
import { OwnerAlertFeed } from './components/OwnerAlertFeed';
import { SplitScreenSimulator } from './components/SplitScreenSimulator';
import { ScannerExperience } from './components/ScannerExperience';
import { RegisterVehicleModal } from './components/RegisterVehicleModal';
import { PitchDeckModal } from './components/PitchDeckModal';
import { 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  XCircle, 
  QrCode, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Car, 
  PhoneCall, 
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const { 
    vehicles, 
    activePings, 
    analytics, 
    toasts, 
    openModal, 
    selectedVehicle, 
    openScannerForVehicle,
    simulatorMode 
  } = useParkPing();

  return (
    <div className="min-h-screen flex flex-col justify-between text-slate-100">
      
      {/* Top Sticky Header */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1 pb-16">
        
        {/* Hero Section */}
        <HeroBanner />

        {/* Split Screen Simulator (Interactive Dual View for Hackathon Judging) */}
        <SplitScreenSimulator />

        {/* Primary Operational Studio: Windshield Decal Studio + Owner Alert Telemetry */}
        <section className="px-4 lg:px-8 max-w-7xl mx-auto my-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Decal Studio & Sticker Preview */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-black font-['Space_Grotesk'] text-white flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-emerald-400" />
                    <span>Smart Windshield Decal Studio</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Live dynamic QR linked to vehicle {selectedVehicle ? selectedVehicle.plateNumber : ''}. Ready to stick on glass.
                  </p>
                </div>

                {selectedVehicle && (
                  <button
                    onClick={() => openScannerForVehicle(selectedVehicle)}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all hover:scale-105"
                  >
                    <span>Simulate Scan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <WindshieldDecalCard />
            </div>

            {/* Right 5 Columns: Owner Incoming Alerts & SSE Telemetry */}
            <div className="lg:col-span-5">
              <div className="glass-panel p-6 rounded-3xl border-slate-800 sticky top-24">
                <OwnerAlertFeed />
              </div>
            </div>

          </div>
        </section>

        {/* How It Solves Double-Parking: 4 Step Walkthrough */}
        <section className="px-4 lg:px-8 max-w-7xl mx-auto my-12">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>
            
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Frictionless Workflow</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-white">
                How ParkPing Clears Blocked Cars in &lt;3 Minutes
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                No phone number scribbles on paper. No app download for the blocked person. Instant real-time communication.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  1
                </div>
                <div className="font-bold text-white text-sm">Stick QR on Windshield</div>
                <p className="text-xs text-slate-400 mt-1">
                  Owner registers plate number, customizes decal style, and prints sticker for windshield glass.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 font-black flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  2
                </div>
                <div className="font-bold text-white text-sm">Blocked Driver Scans</div>
                <p className="text-xs text-slate-400 mt-1">
                  Point any phone camera (iPhone or Android) at the decal. Instant mobile interface loads with zero app download.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 font-black flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  3
                </div>
                <div className="font-bold text-white text-sm">Instant Siren Buzz / Call</div>
                <p className="text-xs text-slate-400 mt-1">
                  Tap 1 button to sound urgent horn siren on owner device, or tap direct WhatsApp / phone call.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 font-black flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  4
                </div>
                <div className="font-bold text-white text-sm">"On My Way in 2 Mins"</div>
                <p className="text-xs text-slate-400 mt-1">
                  Owner replies with 1 click. Blocked driver sees countdown confirmation. Car is moved. Zero road rage.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Live Metrics Telemetry Bar */}
        <section className="px-4 lg:px-8 max-w-7xl mx-auto my-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="glass-card p-5 rounded-2xl text-center">
              <div className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-emerald-400">
                {vehicles.length}
              </div>
              <div className="text-xs font-semibold text-slate-300 mt-1">Registered Vehicles</div>
              <div className="text-[10px] text-slate-500">Active Windshield Decals</div>
            </div>

            <div className="glass-card p-5 rounded-2xl text-center">
              <div className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-cyan-400">
                {analytics ? analytics.totalPings : activePings.length}
              </div>
              <div className="text-xs font-semibold text-slate-300 mt-1">Move Alerts Sent</div>
              <div className="text-[10px] text-slate-500">Real-Time Dispatch</div>
            </div>

            <div className="glass-card p-5 rounded-2xl text-center">
              <div className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-amber-400">
                &lt; 90s
              </div>
              <div className="text-xs font-semibold text-slate-300 mt-1">Avg Resolution Time</div>
              <div className="text-[10px] text-slate-500">vs 1-2 Hours Honking</div>
            </div>

            <div className="glass-card p-5 rounded-2xl text-center">
              <div className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-purple-400">
                100%
              </div>
              <div className="text-xs font-semibold text-slate-300 mt-1">Driver Privacy</div>
              <div className="text-[10px] text-slate-500">Phone Masking Shield</div>
            </div>

          </div>
        </section>

      </main>

      {/* Modals */}
      <RegisterVehicleModal />
      <ScannerExperience />
      <PitchDeckModal />

      {/* Modern Hackathon Footer */}
      <footer className="border-t border-slate-800/80 glass-panel py-8 px-4 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <QrCode className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-300 font-['Space_Grotesk']">ParkPing</span>
            <span>• Smart Windshield QR & Move-Car Alert Ecosystem</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>MERN Architecture</span>
            <span>•</span>
            <span>Server-Sent Events (SSE)</span>
            <span>•</span>
            <span>Web Audio Horn Siren</span>
            <span>•</span>
            <span>Zero-App Scanner</span>
          </div>

          <div className="text-[11px] text-slate-500 font-mono">
            Hackathon Edition • E:\ParkPing
          </div>
        </div>
      </footer>

      {/* Real-Time Toast Notifications */}
      <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto p-4 rounded-2xl glass-panel-glow text-white shadow-2xl flex items-start gap-3 border animate-fadeIn transition-all ${
              t.type === 'success' 
                ? 'border-emerald-500/60 bg-emerald-950/80 text-emerald-200 shadow-emerald-500/20' 
                : t.type === 'error'
                ? 'border-rose-500/60 bg-rose-950/80 text-rose-200 shadow-rose-500/20'
                : t.type === 'warning'
                ? 'border-amber-500/60 bg-amber-950/80 text-amber-200 shadow-amber-500/20'
                : 'border-cyan-500/60 bg-cyan-950/80 text-cyan-200 shadow-cyan-500/20'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {t.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              {t.type === 'error' && <XCircle className="w-4 h-4 text-rose-400" />}
              {t.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400" />}
              {t.type === 'info' && <Info className="w-4 h-4 text-cyan-400" />}
            </div>
            <div>
              <div className="font-bold text-xs">{t.title}</div>
              <div className="text-[11px] opacity-90 mt-0.5">{t.message}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
