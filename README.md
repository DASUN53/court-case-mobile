# ⚖️ Judicia Mobile — Court Case Management Application

<p align="center">
  <img src="./assets/images/icon.png" alt="Judicia Logo" width="110" height="110" style="border-radius: 20px;" />
</p>

<p align="center">
  <strong>LEGAL PRACTICE, CLEARLY MANAGED</strong><br />
  <em>A modern, luxury mobile client engineered for Sri Lanka's legal community — connecting Attorneys-at-Law and their clients.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Expo-SDK_58-black?style=for-the-badge&logo=expo" alt="Expo SDK 58" />
  <img src="https://img.shields.io/badge/React_Native-0.88-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native 0.88" />
  <img src="https://img.shields.io/badge/React-19.3-blue?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Web-success?style=for-the-badge" alt="Platform" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License" />
</p>

---

## 📖 Overview

**Judicia Mobile** is the dedicated cross-platform mobile application for the **Judicia Court Case Management System**. Tailored to meet the needs of the Sri Lankan legal ecosystem, it bridges the communication and workflow gap between **Attorneys-at-Law** registered with the Bar Association of Sri Lanka (BASL) and **clients** following their active legal matters.

The application delivers a refined, executive design language with deep forest greens, imperial golds, warm ivories, and rich dark hues, paired with smooth animations and robust offline-ready state management.

---

## ✨ Key Features

### 👨‍⚖️ For Attorneys-at-Law
- **Case Tracking & Hearing Reminders:** Overview of upcoming court dates, court locations (e.g., District Court of Colombo, Supreme Court), and hearing briefs.
- **Client Portfolio Management:** Quick access to client files, contact channels, and assigned representation matters.
- **Firm & Bar Association Integration:** Dedicated authentication requiring Bar Number registration and firm affiliations.
- **Lawyer Dashboard:** Overview of urgent filings, status updates, and hearing schedules.

### 👤 For Clients
- **Transparent Case Progress:** Step-by-step progress tracking for each legal matter (e.g., *Filing*, *Evidence & Documents*, *Pre-Trial*, *Hearing*, *Judgment*).
- **Direct Counsel Updates:** Instant notification cards from legal counsel regarding confirmations and filings.
- **Document Requests & Sharing:** Secure channel to review requested documentation and verify submissions.

### 🎨 Luxury Brand Design & Dynamic Theming
- **Bespoke Sri Lankan Legal Aesthetic:** Distinctive color palette using **Forest Green** (`#14291F`), **Imperial Gold** (`#C9A15A`), and **Warm Ivory** (`#FAF7F2`).
- **Comprehensive Dark Mode:** Built-in theme switcher with high-contrast luxury dark tokens (`#101110` / `#191B19`) persisted via hardware-backed secure storage.
- **Fluid Micro-Interactions:** Smooth entrance and carousel transitions powered by `react-native-reanimated` and SVG contours.

### ⚡ Intelligent Zero-Config Networking
- **Automatic Local IP Resolution:** When running via Expo Go on physical phones, the app automatically reads the Metro bundler host IP to target `http://<YOUR_PC_IP>:3000/api` without manual configuration.
- **Multi-Environment Fallbacks:** Seamlessly shifts to Android Emulator loopback (`10.0.2.2:3000`), iOS Simulator / Web (`localhost:3000`), or staging tunnels (`ngrok`, `Cloudflare`) via `.env`.

### 🛡️ Enterprise-Grade Authentication & Security
- **Hardware-Backed Token Storage:** Authentication JWT tokens and sensitive user states are safely preserved using `expo-secure-store`.
- **Axios Interceptor Pipeline:** Automatically attaches Bearer tokens to outgoing API requests and provides informative development warnings on network disconnects.
- **Role-Based Automatic Routing:** Automatically redirects authenticated users to their corresponding portal (`/(lawyer)` or `/(client)`).

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Expo (SDK 58)](https://expo.dev/) | Managed React Native workflow with Continuous Native Generation (CNG) |
| **Core** | [React Native 0.88](https://reactnative.dev/) & [React 19](https://react.dev/) | Latest mobile UI engine and modern hooks |
| **Routing** | [Expo Router](https://docs.expo.dev/router/introduction/) | File-based typed routing with nested navigators and modals |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Strictly typed components, data models, and API interfaces |
| **State & Data** | [TanStack React Query](https://tanstack.com/query) & [Axios](https://axios-http.com/) | Efficient network caching and bearer token interceptors |
| **Storage** | [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/) | Keychain (iOS) & Keystore (Android) encrypted key-value storage |
| **Icons & UI** | [Lucide React Native](https://lucide.dev/) & [React Native SVG](https://github.com/software-mansion/react-native-svg) | Crisp vector icons and custom SVG branding emblems |
| **Animation** | [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) | 60+ FPS native gesture and layout animations |
| **Backend Partner** | [Next.js](https://nextjs.org/) + [PostgreSQL](https://www.postgresql.org/) | RESTful API backend with Jose JWT and bcrypt authentication |

---

## 📂 Project Architecture

```
court-case-mobile/
├── app/                           # Expo Router file-based route hierarchy
│   ├── _layout.tsx                # Root layout (Fonts, Splash, Theme & Auth Providers)
│   ├── index.tsx                  # Luxury splash screen with orbital SVG accents
│   ├── onboarding.tsx             # Interactive 2-slide introduction (Lawyer / Client)
│   ├── +not-found.tsx             # 404 fallback screen
│   ├── (auth)/                    # Authentication flow
│   │   ├── _layout.tsx            # Auth stack navigator
│   │   ├── index.tsx              # Role selection portal (Lawyer vs. Client switch)
│   │   ├── login.tsx              # Secure credentials sign-in
│   │   └── register.tsx           # Law firm & Bar registration
│   ├── (lawyer)/                  # Attorney-at-Law workspace
│   │   ├── _layout.tsx            # Lawyer stack navigator
│   │   ├── (tabs)/                # Tab navigation (Dashboard, Cases, Calendar, Messages)
│   │   │   ├── index.tsx          # Lawyer dashboard (status & DB connection check)
│   │   │   ├── cases.tsx          # Case management & docket list
│   │   │   ├── calendar.tsx       # Court dates & hearings
│   │   │   └── messages.tsx       # Client discussions
│   │   └── case-details/[id].tsx  # Deep dive case view
│   └── (client)/                  # Client portal workspace
│       ├── _layout.tsx            # Client stack navigator
│       ├── (tabs)/                # Client tab navigation
│       │   ├── index.tsx          # Client overview & active matters
│       │   ├── appointments.tsx   # Scheduled consultations
│       │   ├── directory.tsx      # Verified attorney directory
│       │   └── messages.tsx       # Counsel messaging
│       └── case-tracking/[id].tsx # Timeline & stage breakdown
├── src/
│   ├── api/                       # API clients and endpoints
│   │   ├── client.ts              # Axios instance with SecureStore token interceptor
│   │   ├── auth.ts                # Login, register, me, logout endpoints
│   │   ├── lawyer.ts              # Lawyer-specific case & schedule APIs
│   │   └── client-portal.ts       # Client matter tracking APIs
│   ├── constants/
│   │   ├── config.ts              # Dynamic API base URL resolver & storage keys
│   │   └── theme.ts               # Judicia brand color tokens & typography presets
│   ├── context/
│   │   ├── AuthContext.tsx        # Authentication session lifecycle & role-based routing
│   │   └── ThemeContext.tsx       # Dark / Light mode toggle & persistent preference
│   └── types/
│       ├── user.ts                # User, role, and auth payload schemas
│       └── case.ts                # Court case, stage, and hearing contracts
├── assets/                        # App icons, splash screens, and typography
├── .env.example                   # Environment configuration template
├── app.json                       # Expo application manifest
├── package.json                   # Dependencies and scripts
└── tsconfig.json                  # TypeScript compiler configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your development machine:
- **Node.js**: `v18.x` or `v20.x` or higher
- **Package Manager**: `npm`, `yarn`, or `pnpm`
- **Expo Go App**: Installed on your physical Android or iOS device (downloadable from Google Play or Apple App Store)
  *Or* **Android Studio / Xcode**: For running local emulators/simulators.
- **Judicia Backend**: Ensure the Next.js API backend (`Law-MiniProject`) is running on your network.

---

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DASUN53/court-case-mobile.git
   cd court-case-mobile
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the `.env.example` file to create your `.env`:
   ```bash
   cp .env.example .env
   ```

---

## ⚙️ Environment Configuration

Open `.env` and select your target network mode:

```env
# MODE 1 (DEFAULT / RECOMMENDED): Automatic Local Wi-Fi Detection
# Leave EXPO_PUBLIC_API_URL empty. Expo will automatically detect your host
# computer's IP address and point to http://<YOUR_PC_IP>:3000/api
EXPO_PUBLIC_API_URL=

# MODE 2: Cloudflare Tunnel, ngrok, or Staging Server
# If you are testing across distinct networks or isolated enterprise Wi-Fi:
# EXPO_PUBLIC_API_URL=https://your-staging-api.com/api
```

### 📡 Connecting to the Next.js Backend

1. Start your backend API server on your computer:
   ```bash
   # From your backend project directory (e.g. Law-MiniProject):
   npm run dev
   ```
   *Note: Ensure the dev server is bound to `0.0.0.0` (e.g., `next dev -H 0.0.0.0 -p 3000`) so mobile devices on the local network can reach it.*

2. Make sure your mobile device running Expo Go and your PC are connected to the **same Wi-Fi network**.

---

## 📱 Running the Application

Start the Expo development server:

```bash
# Start the Metro bundler
npm start
```

### Test on Physical Device
1. Open the **Expo Go** app on your phone.
2. Scan the QR code displayed in your terminal or Metro web console.

### Test on Emulators
```bash
# Run on Android Emulator
npm run android

# Run on iOS Simulator (macOS only)
npm run ios

# Run in Web Browser
npm run web
```

---

## 🧪 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm start` | Starts the Expo Metro development server with QR code. |
| `npm run android` | Boots the application on a connected Android device or running emulator. |
| `npm run ios` | Boots the application in the macOS iOS Simulator. |
| `npm run web` | Serves the project as a progressive web application. |
| `npx tsc --noEmit` | Runs the TypeScript compiler to check for type errors. |
| `npx expo-doctor` | Validates dependencies, SDK compatibility, and project health. |

---

## 🔒 Security & Privacy

- **BASL Credentials Protection:** Attorney accounts undergo Bar Number verification against legal registry records.
- **Zero Plain-Text Token Storage:** Tokens are encrypted at rest using platform-native hardware security modules (`Keystore` on Android, `Keychain` on iOS).
- **SSL/TLS Protection:** Remote communication with cloud environments enforces HTTPS transport with strict header sanitization.

---

## 🗺️ Roadmap

- [x] Luxury brand identity, splash screen, and SVG contours
- [x] Two-slide onboarding carousel for Attorneys & Clients
- [x] Portal role switcher (Lawyer vs. Client)
- [x] Attorney sign-in and sign-up with Bar Association fields
- [x] Theme system with Light/Dark mode and SecureStore persistence
- [x] Dynamic Wi-Fi API resolution & Bearer token interceptor
- [ ] Court hearing calendar with push notifications
- [ ] Document vault with PDF viewing and camera scanning
- [ ] Real-time in-app chat between Counsel and Clients via Pusher
- [ ] Biometric login (Face ID / Fingerprint authentication)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Built with precision for <strong>Sri Lanka's Legal Community</strong>.
</p>

