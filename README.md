# SCS Config Studio 🚛 ✨

**SCS Config Studio** is a modern, clean, and safe desktop application designed to tweak "hidden" settings for **Euro Truck Simulator 2 (ETS2)** and **American Truck Simulator (ATS)**.

No more digging through `.cfg` files in Notepad. Adjust traffic density, enable the developer console, and optimize performance with simple sliders and toggles.

---

## 🚀 Key Features

- **Safe Editing:** Automatically creates a backup of your `config.cfg` before any changes are applied.
- **Hidden Settings:** Access parameters that are not available in the in-game options menu.
- **Auto-Detection:** Automatically finds your ETS2/ATS document folders.
- **Modern UI:** A clean, dark-themed interface built with Electron for a smooth user experience.
- **Real-time Validation:** Prevents you from entering values that could crash your game.

---

## 🛠 Supported Parameters (Examples)

The app focuses on settings that matter but are hard to reach:

### Traffic & World

| Parameter           | Description                                                          |
| ------------------- | -------------------------------------------------------------------- |
| **Traffic Density** | Go beyond the standard 1.0 limit for massive rush hour traffic.      |
| **LOD Factor**      | Improve visual quality by rendering high-detail models further away. |
| **Tree Distance**   | Extend the rendering distance for vegetation to eliminate pop-ins.   |

### Technical & Performance

| Parameter             | Description                                                        |
| --------------------- | ------------------------------------------------------------------ |
| **Buffer Page Size**  | Increase the engine's memory buffer (critical for heavy map mods). |
| **Sunshadow Texture** | Force higher resolution shadows for a crisper look.                |
| **FPS Limiter**       | Set a custom frame rate cap independent of VSync.                  |

### Developer Tools

| Parameter              | Description                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| **Console & Dev Mode** | Enable the `~` console and the free camera (Key 0) with one click. |
| **Flyspeed**           | Precisely adjust how fast your free camera moves.                  |

---

## 📦 Installation

1. Download the latest `.exe` (for Windows) or `.AppImage` (for Linux) from the [Releases](https://www.google.com/search?q=%23) page.
2. Launch **SCS Config Studio**.
3. Select your game (ETS2 or ATS).
4. Tweak your settings and hit **"Save & Launch"**.

---

## 👨‍💻 For Developers

If you want to contribute or build the project yourself:

```bash
# Clone the repository
git clone https://github.com/your-username/scs-config-studio.git

# Install dependencies
npm install

# Run the app in development mode
npm start

# Build the app
npm run build

```

---

## 🛡 Security & Safety

SCS Config Studio **never** modifies your game files directly without creating a `.bak` file first. It only edits the `config.cfg` and `profile.cfg` text files. It does not interfere with the game's executable and is 100% VAC-safe.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
