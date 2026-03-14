<p align="center">
  <img src="resources/icon.png" width="96" alt="SCS Config Studio" />
</p>

<h1 align="center">SCS Config Studio</h1>

<p align="center">
  A desktop tool for tweaking hidden configuration settings in<br>
  <strong>Euro Truck Simulator 2</strong> and <strong>American Truck Simulator</strong>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/platform-Windows-blue?style=flat-square" alt="Platform: Windows" />
  <img src="https://img.shields.io/badge/Electron-39-47848f?style=flat-square&logo=electron" alt="Electron 39" />
  <img src="https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript" alt="TypeScript 5" />
</p>

---

## What it does

Both ETS2 and ATS store a `config.cfg` file in the user's Documents folder that contains dozens of settings which are not exposed in the game's options menu. Editing this file manually requires knowing the exact key names, understanding the value ranges, and hoping you don't break anything.

SCS Config Studio gives each of those hidden settings a proper UI — sliders, toggles, segmented buttons — with descriptions, recommended values, and automatic backups before every save.

---

## Features

- **15 configurable parameters** across 5 categories: World & Traffic, Performance, Developer Tools, Physics, and VR
- **Automatic config detection** — finds your ETS2/ATS Documents folder without any setup
- **Safe by default** — a timestamped `.bak` backup is created before every write
- **Per-game state** — ETS2 and ATS settings are tracked independently
- **Recommended values** — one click applies a curated set of sensible defaults
- **Runs in the system tray** — closing the window hides it; the app stays available without cluttering the taskbar
- **Single instance** — launching a second time brings the existing window to focus instead of opening a duplicate
- **Custom title bar** with macOS-style window controls

---

## Parameters

### World & Traffic

| Setting | Config key | Description |
|---|---|---|
| Traffic Density | `g_traffic` | Scales AI traffic beyond the in-game slider maximum of 1.0× |
| AI Car Detail Distance | `g_lod_factor_traffic` | How far away moving AI vehicles render in full detail |
| Parked Car Detail Distance | `g_lod_factor_parked` | Same as above for stationary roadside vehicles |
| Tree Render Distance | `g_tree_default_render_distance` | Pushes vegetation render distance beyond the Ultra preset |

### Performance

| Setting | Config key | Description |
|---|---|---|
| Buffer Page Size | `r_buffer_page_size` | Engine memory buffer for asset streaming — raise this if you use heavy map mods |
| Sun Shadow Resolution | `r_sunshadow_texture_size` | Forces shadow map resolution above the in-game Ultra limit (2048) |
| Mirror Group Optimization | `r_mirror_group_size` | Batches mirror draw calls to recover a few FPS on CPU-limited setups |
| Hidden FPS Limiter | `g_fps` | A frame cap independent of VSync and driver-level limiters |

### Developer Tools

| Setting | Config key | Description |
|---|---|---|
| Developer Console | `g_console` | Enables the `~` console for teleport, time-skip, and weather commands |
| Developer Mode | `g_developer` | Enables the free camera (Key 0) and bounding-box overlays |
| Mini Console Overlay | `g_minicon` | Shows a scrolling log of engine warnings at the top of the screen |
| Free Camera Speed | `g_flyspeed` | How fast the free camera moves on the numpad (requires Developer Mode) |

### Physics

| Setting | Config key | Description |
|---|---|---|
| Auto Suspension Reset | `g_suspension_auto_reset` | When off, manual air suspension adjustments persist between sessions |

### VR

| Setting | Config key | Description |
|---|---|---|
| VR Window Lean Fix | `g_hmd_no_outside` | Prevents the camera jumping to the cab roof when leaning out of the window in VR |

---

## Keyboard shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + S` | Save to file |
| `Ctrl + R` | Reload file from disk |
| `Ctrl + F` | Focus the search field |

---

## System tray

Clicking the window's close button hides the app to the system tray rather than quitting it. The tray icon provides:

- **Left-click / double-click** — restore the window
- **Right-click → Show** — restore the window
- **Right-click → Quit** — fully exit the application

If the app is already running in the tray and you launch it again, the existing window is brought to focus instead of opening a second instance.

---

## Safety

Every save operation writes a backup of the original file next to it before making any changes:

```
config.cfg
config.cfg.bak_1720000000000
```

The app only reads and writes `config.cfg`. It does not touch game executables, save files, or any other files.

---

## Development

**Requirements:** Node.js 20+, npm

```bash
# Install dependencies
npm install

# Start in development mode (hot reload)
npm run dev

# Type-check without building
npm run typecheck

# Build for production
npm run build

# Package as a Windows portable executable
npm run build:win
```

**Stack:** Electron 39 · React 19 · TypeScript 5 · Vite 7 · Custom CSS

---

## Author

Built by [Psydo](https://www.sfalter.de).

---

## License

MIT
