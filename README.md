# IoT_Water_Quality_Monitoring

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-nhph54wk)

# 💧 AquaSolar IoT: Solar-Powered Water Quality Monitoring & Control System

An integrated, off-grid IoT solution designed for real-time water quality monitoring and automated filtration control powered by solar energy. This project serves as a Final Year Project (FYP) combining web development, IoT microcontrollers, and fluid engineering.

---

## 🚀 Key Features
- **Real-Time Water Quality Monitoring:** Tracks pH, Turbidity, Total Dissolved Solids (TDS), and Temperature.
- **Solar-Powered System:** Off-grid setup utilizing a 200W solar panel, MPPT charge controller, and a Lithium-Ion battery.
- **Automated Filtration & Purification:** 3-stage mechanical filtration (Sediment, Activated Carbon, Final filters) combined with a UV Sterilizer.
- **Inline Sensor Manifold Chamber:** A custom transparent PVC chamber housing sensors for stable and accurate fluid analysis.
- **Web Dashboard:** Built with React (Vite), Tailwind CSS, and TypeScript. Includes user authentication (Login, Sign-Up, Forgot Password) and an admin view for managing registered users.
- **Cloud Integration & Remote Control:** Powered by Firebase (Authentication & Realtime Database) allowing live metrics visualization and remote pump control.

---

## 🛠️ System Architecture & Hardware Components

### 1. Power Subsystem
* **Solar PV Panel:** 200W Monocrystalline panel for primary energy generation.
* **Charge Controller:** 12V/30A MPPT for optimal energy extraction and safe charging.
* **Battery Storage:** 12V, 66Ah Lithium-Ion battery for continuous off-grid operation.

### 2. Water Purification & Flow Path
* **Raw Water Tank:** Intake storage for raw water (left side of the frame).
* **Water Pump:** 12V DC pump to drive raw water through the system.
* **Filtration Unit:** 3-stage mechanical setup (Sediment $\rightarrow$ Activated Carbon $\rightarrow$ Final filter).
* **Sterilization:** Stainless-steel UV Sterilizer to eliminate biological contaminants.
* **Clean Water Tank:** Positioned on an elevated rack (~500 mm) utilizing gravity feed for easy dispensing.

### 3. Inline Sensor Chamber & IoT Array
* **Microcontroller:** ESP32 WROOM-32 for local data processing and Wi-Fi transmission.
* **Sensors:** Analog pH, Turbidity, TDS, and DS18B20 Temperature sensors.
* **Manifold Design:** Built using a 1-inch PVC main pipe connected via reducing tees (1" to 1/2" or 3/4") to securely house probes in a vertical/horizontal orientation with flow control valves.

---

## 💻 Tech Stack & Software
* **Frontend:** React, TypeScript, Tailwind CSS, Vite.
* **Backend & Database:** Firebase Authentication & Firebase Realtime Database.
* **Hosting:** Firebase Hosting ([Live Demo URL](https://aquasolar-iot.web.app)).
* **Version Control:** Git & GitHub.

---

## 📂 Project Structure
```text
IoT_Water_Quality_Monitoring-main/
├── src/
│   ├── components/    # Reusable UI components & charts
│   ├── pages/         # Login, SignUp, Dashboard, Profile, Settings
│   ├── App.tsx        # Main application router
│   ├── firebase.ts    # Firebase configuration
│   └── main.tsx       # Entry point
├── public/            # Static assets
├── firebase.json      # Firebase hosting configuration
└── package.json       # Project dependencies
