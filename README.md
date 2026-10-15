# 🚗 ParkPing — Smart Windshield QR & Double-Parking Alert Platform
> **Hackathon Edition • Full MERN Stack Solution**  
> *Ending the double-parking deadlock: Stick a smart QR decal on your windshield. If someone is blocked by your car, they scan to buzz, call, or WhatsApp you in seconds.*

[![MERN Stack](https://img.shields.io/badge/Stack-MongoDB%20%7C%20Express%20%7C%20React%2018%20%7C%20Node.js-10b981?style=for-the-badge)](https://nodejs.org)
[![Real-Time Telemetry](https://img.shields.io/badge/Alerts-Server--Sent%20Events%20(SSE)-06b6d4?style=for-the-badge)](http://localhost:5000/api/events)
[![Audio Siren](https://img.shields.io/badge/Web%20Audio-Horn%20Siren%20Synthesizer-f59e0b?style=for-the-badge)](#)
[![Zero-App Scanner](https://img.shields.io/badge/Scanner-Zero%20App%20Required-8b5cf6?style=for-the-badge)](#)

---

## 🎯 The Real-World Problem We Solve
In crowded parking lots, apartment basements, hospitals, markets, and office complexes:
- Drivers frequently **double-park or park right in front of someone's car**, trapping them.
- The trapped driver is forced to **wait for hours**, honking desperately with no way to contact the owner.
- Leaving handwritten phone numbers on slips of paper leads to **privacy leaks, harassment, and spam calls** (especially for female drivers).
- Frustrated trapped drivers often resort to road rage, calling tow trucks, or property damage.

## 💡 The ParkPing Solution
1. **Smart Windshield QR Decal**: Car owners register their license plate number and print a weatherproof QR decal to stick on the inside of their front windshield.
2. **Zero-App Scanner**: When a blocked driver finds their exit blocked, they point their native phone camera at the decal. No app installation needed.
3. **1-Tap Move Siren or Direct Call**: The blocked driver can:
   - Tap **"Buzz Owner to Move Car"** (triggers an instant high-priority car horn siren alert on the owner's device).
   - Tap **"Call Owner"** or **"WhatsApp"** with pre-filled details.
   - Choose alert presets: *"Car Blocked"*, *"Headlights Left ON"*, *"Window Down"*, *"Tow Alert"*.
4. **Privacy Shield**: Owners can mask their raw phone number and receive instant anonymous in-app siren alerts.
5. **Real-Time "On My Way" Replies**: The owner taps 1 button: *"🏃 Coming down right now (2 mins)!"*. The blocked driver's screen immediately flashes with confirmation and confetti, eliminating anxiety.

---

## 🚀 1-Click Launch on Windows

Simply double-click:
```
E:\ParkPing\start.bat
```
This script automatically:
1. Cleans up port 5000.
2. Starts the Node/Express backend.
3. Serves the high-speed production React frontend.
4. Opens your browser automatically to **http://localhost:5000**.

*(For developer mode with Hot Module Reloading: double-click `E:\ParkPing\dev.bat`)*

---

## 🎮 Key Interactive Features to Demo for Hackathon Judges

1. **Split-Screen Dual Device Simulator**:
   - Click **"Split-Screen Simulator"** in the top navigation bar.
   - Watch the dual-phone mockup:
     - **Left Phone**: Blocked driver scanning the windshield and tapping *"🚨 Buzz Owner to Move Car"*.
     - **Right Phone**: Car owner receiving the siren alert in sub-second latency via Server-Sent Events (SSE) and tapping *"🏃 Coming down now (2 mins)"*.
     - Watch the Left Phone instantly celebrate with confirmation!
2. **Interactive Windshield Decal Studio**:
   - Preview realistic windshield glass stickers with dynamic QR codes, license plate badges, and parking status indicators.
   - Switch parking situations: **"Double-Parked (Available on call)"**, **"Safe Bay"**, or **"Keys with Guard"**.
   - Edit live notes for blocked drivers (*"Parked near Tower 3 picking up parcel. Ping me!"*).
   - Switch themes: Cyber Emerald, Neon Cyan, Amber Hazard, or Monochrome Clean.
   - Click **"Print Decal Sticker"** to print or export.
3. **Audio Siren Synthesizer**:
   - Uses native Web Audio API (zero external audio files) to play authentic vehicle horn buzzers and chimes when an alert arrives.
4. **Interactive 6-Slide Pitch Deck**:
   - Click **"Pitch Deck"** in the top navbar to showcase the presentation built specifically for judges.
   - Covers: The Crisis, The Solution, MERN + SSE Architecture, User Journey, and Business Model (D2C decals, housing societies, valet lots).
   - Use keyboard arrows (Left/Right) or navigation buttons to present.

---

## 🛠️ Technology Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti, Web Audio API Synthesizer.
- **Backend**: Node.js, Express.js, Server-Sent Events (SSE) for low-latency live broadcast, Dynamic QR Code generator (`qrcode`).
- **Data Layer**: High-speed resilient JSON store with MongoDB / Mongoose support (operates 100% out of the box with zero external daemon requirements).

---

## 📁 Project Directory Structure
```
E:\ParkPing\
├── client\                  # React 18 + Vite Frontend
│   ├── src\
│   │   ├── components\
│   │   │   ├── Navbar.jsx                # Header with car selector & controls
│   │   │   ├── HeroBanner.jsx            # Value proposition & quick actions
│   │   │   ├── WindshieldDecalCard.jsx   # Sticker studio & status switcher
│   │   │   ├── OwnerAlertFeed.jsx        # Incoming alert feed & quick replies
│   │   │   ├── ScannerExperience.jsx     # Mobile view for blocked driver
│   │   │   ├── SplitScreenSimulator.jsx  # Dual-device live test view
│   │   │   ├── RegisterVehicleModal.jsx  # Register car for QR decal
│   │   │   └── PitchDeckModal.jsx        # 6-slide hackathon pitch deck
│   │   ├── context\
│   │   │   └── ParkPingContext.jsx       # State management & SSE listeners
│   │   ├── utils\
│   │   │   └── soundEffects.js           # Web Audio API car horn synthesizer
│   │   ├── App.jsx
│   │   └── main.jsx
├── server\                  # Express.js Backend
│   ├── store.js             # Vehicle & ping store with SSE pub/sub
│   └── server.js            # Express API, QR generation & static hosting
├── start.bat                # 1-click launch batch script
├── dev.bat                  # 1-click dev launcher
└── README.md                # Documentation & demo guide
```
