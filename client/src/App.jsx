import React, { useState } from 'react';
import { useParkPing } from './context/ParkPingContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { WindshieldDecalCard } from './components/WindshieldDecalCard';
import { OwnerAlertFeed } from './components/OwnerAlertFeed';
import { SplitScreenSimulator } from './components/SplitScreenSimulator';
import { ScannerExperience } from './components/ScannerExperience';
import { RegisterVehicleModal } from './components/RegisterVehicleModal';
import { PitchDeckModal } from './components/PitchDeckModal';
import { StarterAnimation } from './components/StarterAnimation';
import { ScanRegisteredCarModal } from './components/ScanRegisteredCarModal';
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
  ArrowRight,
  BellRing,
  Columns,
  Layers,
  BarChart3,
  HelpCircle
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

  const [showStarter, setShowStarter] = useState(true);
  const [activeTab, setActiveTab] = useState('decal'); // 'decal' | 'alerts' | 'simulator' | 'steps' | 'metrics'

  const unresolvedPings = activePings.filter(p => p.status === 'delivered');

  return (
    <div className="min-h-screen flex flex-col justify-between text-slate-100 bg-[#06070a]">
      
      {/* Cinematic Starter Animation Overlay on initial visit or replay */}
      {showStarter && (
        <StarterAnimation onComplete={() => setShowStarter(false)} />
      )}

      {/* Top Sticky Header */}
      <Navbar onReplayIntro={() => setShowStarter(true)} />

      {/* Main Page Content */}
      <main className="flex-1 pb-16">
        
        {/* Simple & Uncluttered Hero Section: Directly showcases the 2 Main Features */}
        <HeroBanner onSelectTab={setActiveTab} />

        {/* Clean Workspace Tabs (Keeps the Home Page Minimal, Spacious & Uncluttered) */}
        <section className="px-4 lg:px-8 max-w-7xl mx-auto mt-2 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab('decal')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'decal'
                    ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 scale-105'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>My Decal Studio</span>
              </button>

              <button
                onClick={() => setActiveTab('alerts')}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'alerts'
                    ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 scale-105'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <BellRing className="w-4 h-4" />
                <span>Live Move Requests</span>
                {unresolvedPings.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black animate-pulse">
                    {unresolvedPings.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('simulator')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'simulator'
                    ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 scale-105'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <Columns className="w-4 h-4" />
                <span>Dual Simulator</span>
              </button>

              <button
                onClick={() => setActiveTab('steps')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'steps'
                    ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 scale-105'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>How It Works</span>
              </button>

              <button
                onClick={() => setActiveTab('metrics')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'metrics'
                    ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 scale-105'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Live Metrics</span>
              </button>
            </div>

            {/* Quick action button for judges */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => openModal('pitchDeck')}
                className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5 bg-amber-400/10 hover:bg-amber-400/20 px-3 py-1.5 rounded-xl border border-amber-400/30 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hackathon Pitch Deck</span>
              </button>
            </div>

          </div>
        </section>

        {/* Tab 1: Windshield Decal Studio */}
        {activeTab === 'decal' && (
          <section className="px-4 lg:px-8 max-w-7xl mx-auto my-6 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-black font-['Space_Grotesk'] text-white flex items-center gap-2">
                      <QrCode className="w-5 h-5 text-amber-400" />
                      <span>Smart Windshield Decal Studio</span>
                    </h2>
                    <p className="text-xs text-slate-400">
                      Live dynamic QR linked to vehicle {selectedVehicle ? selectedVehicle.plateNumber : ''}. Ready to stick on glass.
                    </p>
                  </div>

                  {selectedVehicle && (
                    <button
                      onClick={() => openScannerForVehicle(selectedVehicle)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/30 text-xs font-semibold transition-all hover:scale-105"
                    >
                      <span>Simulate Scan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <WindshieldDecalCard />
              </div>

              <div className="lg:col-span-4">
                <div className="glass-panel p-6 rounded-3xl border-slate-800">
                  <OwnerAlertFeed />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab 2: Owner Alerts Feed */}
        {activeTab === 'alerts' && (
          <section className="px-4 lg:px-8 max-w-4xl mx-auto my-6 animate-fadeIn">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 shadow-2xl">
              <OwnerAlertFeed />
            </div>
          </section>
        )}

        {/* Tab 3: Split Screen Simulator (Interactive Dual View for Hackathon Judging) */}
        {activeTab === 'simulator' && (
          <section className="animate-fadeIn">
            <SplitScreenSimulator />
          </section>
        )}

        {/* Tab 4: How PingPark Solves Double-Parking: 4 Step Walkthrough */}
        {activeTab === 'steps' && (
          <section className="px-4 lg:px-8 max-w-7xl mx-auto my-6 animate-fadeIn">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-10"></div>
              
              <div className="text-center max-w-2xl mx-auto mb-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>The Frictionless Workflow</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-white">
                  How PingPark Clears Blocked Cars in &lt;90 Seconds
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-2">
                  No phone number scribbles on paper. No app download for the blocked person. Instant real-time communication.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-400/50 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 font-black flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    1
                  </div>
                  <div className="font-bold text-white text-sm">Stick QR on Windshield</div>
                  <p className="text-xs text-slate-400 mt-1">
                    Owner registers plate number, customizes decal style, and prints sticker for windshield glass.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-yellow-400/50 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-yellow-400/20 text-yellow-400 font-black flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    2
                  </div>
                  <div className="font-bold text-white text-sm">Blocked Driver Scans</div>
                  <p className="text-xs text-slate-400 mt-1">
                    Point any phone camera (iPhone or Android) at the decal. Instant mobile interface loads with zero app download.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-400/50 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 font-black flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    3
                  </div>
                  <div className="font-bold text-white text-sm">Instant Siren Buzz / Call</div>
                  <p className="text-xs text-slate-400 mt-1">
                    Tap 1 button to sound urgent horn siren on owner device, or tap direct WhatsApp, phone call or SMS.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-yellow-400/50 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-300 font-black flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
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
        )}

        {/* Tab 5: Live Metrics Telemetry Bar */}
        {activeTab === 'metrics' && (
          <section className="px-4 lg:px-8 max-w-7xl mx-auto my-6 animate-fadeIn">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <div className="glass-card p-6 rounded-2xl text-center border-amber-500/20">
                <div className="text-3xl sm:text-4xl font-black font-['Space_Grotesk'] text-amber-400">
                  {vehicles.length}
                </div>
                <div className="text-xs font-semibold text-slate-300 mt-1">Registered Vehicles</div>
                <div className="text-[10px] text-slate-500">Active Windshield Decals</div>
              </div>

              <div className="glass-card p-6 rounded-2xl text-center border-yellow-500/20">
                <div className="text-3xl sm:text-4xl font-black font-['Space_Grotesk'] text-yellow-400">
                  {analytics ? analytics.totalPings : activePings.length}
                </div>
                <div className="text-xs font-semibold text-slate-300 mt-1">Move Alerts Sent</div>
                <div className="text-[10px] text-slate-500">Real-Time Dispatch</div>
              </div>

              <div className="glass-card p-6 rounded-2xl text-center border-amber-500/20">
                <div className="text-3xl sm:text-4xl font-black font-['Space_Grotesk'] text-amber-300">
                  &lt; 90s
                </div>
                <div className="text-xs font-semibold text-slate-300 mt-1">Avg Resolution Time</div>
                <div className="text-[10px] text-slate-500">vs 1-2 Hours Honking</div>
              </div>

              <div className="glass-card p-6 rounded-2xl text-center border-yellow-500/20">
                <div className="text-3xl sm:text-4xl font-black font-['Space_Grotesk'] text-yellow-300">
                  100%
                </div>
                <div className="text-xs font-semibold text-slate-300 mt-1">Driver Privacy</div>
                <div className="text-[10px] text-slate-500">Phone Masking Shield</div>
              </div>

            </div>
          </section>
        )}

      </main>

      {/* Modals */}
      <RegisterVehicleModal />
      <ScannerExperience />
      <ScanRegisteredCarModal />
      <PitchDeckModal />

      {/* Modern Hackathon Footer */}
      <footer className="border-t border-slate-800/80 glass-panel py-8 px-4 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold">
              <QrCode className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-200 font-['Space_Grotesk']">PingPark</span>
            <span>• Smart Windshield QR & Double-Parking Alert Platform</span>
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
                ? 'border-amber-400/80 bg-amber-950/80 text-amber-100 shadow-amber-500/25' 
                : t.type === 'error'
                ? 'border-rose-500/70 bg-rose-950/80 text-rose-200 shadow-rose-500/20'
                : t.type === 'warning'
                ? 'border-yellow-400/70 bg-yellow-950/80 text-yellow-200 shadow-yellow-500/20'
                : 'border-amber-500/70 bg-slate-900/90 text-amber-200 shadow-amber-500/20'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {t.type === 'success' && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
              {t.type === 'error' && <XCircle className="w-4 h-4 text-rose-400" />}
              {t.type === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-400" />}
              {t.type === 'info' && <Info className="w-4 h-4 text-amber-300" />}
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
