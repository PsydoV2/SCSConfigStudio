# Electron TypeScript React Template

A professional, high-performance boilerplate for building cross-platform desktop applications using **Electron**, **React**, **Vite**, and **TypeScript**.

This template is designed with a **Security-First** and **Scalability** approach, utilizing the modern `electron-vite` stack.

## 🚀 Key Features

- **Vite ⚡**: Instant Hot Module Replacement (HMR) for the renderer process.
- **TypeScript 🛡️**: Full type-safety across Main, Preload, and Renderer processes.
- **Clean Architecture**: Pre-configured IPC (Inter-Process Communication) handler structure to keep the `main` process clean.
- **Security**: Context Isolation and Sandbox enabled by default. No direct Node.js access in the renderer.
- **Aliasing**: Simplified imports using `@renderer`, `@main`, and `@preload` aliases.
- **ESLint & Prettier**: Strict linting rules and code formatting pre-configured for TypeScript.
- **Ready for Distribution**: Includes `electron-builder` configuration for building `.exe`, `.dmg`, and Linux binaries.

## 📂 Project Structure

```text
├── src
│   ├── main          # Main process (Node.js) logic
│   │   ├── ipc/      # Organized IPC route handlers
│   │   └── index.ts  # Entry point (Window & Lifecycle management)
│   ├── preload       # The bridge (ContextBridge) between Main and Renderer
│   │   ├── index.ts  # API definitions
│   │   └── index.d.ts# TypeScript global window definitions
│   └── renderer      # Frontend (React)
│       ├── src/      # Components, Hooks, and Styles
│       └── index.html
├── resources         # Static assets (icons, etc.)
└── electron.vite.config.ts # Unified Vite config for all 3 processes

```

## 🛠️ Getting Started

### Prerequisites

- **Node.js** (Latest LTS recommended)
- **npm** or **pnpm**

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/ElectronTypeScriptReactTemplate.git
cd ElectronTypeScriptReactTemplate

```

2. **Install dependencies:**

```bash
npm install

```

3. **Start Development:**

```bash
npm run dev

```

### Building for Production

To package the application for your current OS:

```bash
npm run build
npm run dist

```

## 🔌 IPC Communication Pattern

This template uses a "Route-based" IPC pattern to ensure the `main/index.ts` remains small and readable.

1. **Define** your logic in `src/main/ipc/`.
2. **Expose** the function in `src/preload/index.ts`.
3. **Invoke** via `window.api.yourFunction()` in React.

## 📜 License

This project is licensed under the MIT License.
