import { app, shell, BrowserWindow, Tray, Menu, nativeImage } from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import icon from "../../resources/icon.png?asset";
import trayIconPath from "../../resources/favicon.ico?asset";
import { registerAllIpcHandlers } from "./ipc";

// ── Single-instance lock ──────────────────────────────────────────────────────
// Must be called before app.whenReady(). If the lock is not available, another
// instance is already running — quit this one immediately.
const gotLock = app.requestSingleInstanceLock();

if (!gotLock) {
  app.quit();
} else {
  // ── Module-level references (set during startup) ──────────────────────────
  let mainWindow: BrowserWindow | null = null;
  let tray: Tray | null = null;

  // Flip this flag before calling app.quit() so the close-event handler
  // knows to allow the window to actually close instead of hiding it.
  let isQuitting = false;

  // ── Helpers ───────────────────────────────────────────────────────────────

  function showWindow(): void {
    if (!mainWindow) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  }

  // ── Second-instance handler ───────────────────────────────────────────────
  // Fires on the *first* instance when a second one tries to start.
  app.on("second-instance", () => {
    showWindow();
  });

  // ── Window creation ───────────────────────────────────────────────────────

  function createWindow(): void {
    mainWindow = new BrowserWindow({
      width: 1000,
      height: 680,
      minWidth: 800,
      minHeight: 560,
      show: false,
      frame: false,
      autoHideMenuBar: true,
      icon,
      webPreferences: {
        preload: join(__dirname, "../preload/index.js"),
        sandbox: false,
      },
    });

    mainWindow.on("ready-to-show", () => mainWindow!.show());

    // Intercept close → hide to tray unless we are actually quitting.
    mainWindow.on("close", (e) => {
      if (!isQuitting) {
        e.preventDefault();
        mainWindow?.hide();
      }
    });

    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
      shell.openExternal(url);
      return { action: "deny" };
    });

    if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
      mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
    } else {
      mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
    }
  }

  // ── Tray creation ─────────────────────────────────────────────────────────

  function createTray(): void {
    // Use the ICO on Windows (multi-resolution, sharp at 16px),
    // fall back to the PNG on other platforms.
    const img =
      process.platform === "win32"
        ? nativeImage.createFromPath(trayIconPath)
        : nativeImage.createFromPath(icon).resize({ width: 16, height: 16 });

    tray = new Tray(img);
    tray.setToolTip("SCS Config Studio");

    const menu = Menu.buildFromTemplate([
      {
        label: "Show",
        click: () => showWindow(),
      },
      { type: "separator" },
      {
        label: "Quit",
        click: () => {
          isQuitting = true;
          app.quit();
        },
      },
    ]);

    tray.setContextMenu(menu);

    // Left-click on the tray icon restores the window (Windows convention).
    tray.on("click", () => showWindow());
    // Double-click as fallback.
    tray.on("double-click", () => showWindow());
  }

  // ── App lifecycle ─────────────────────────────────────────────────────────

  app.whenReady().then(() => {
    electronApp.setAppUserModelId("com.psydo.scsconfigstudio");

    app.on("browser-window-created", (_, window) => {
      optimizer.watchWindowShortcuts(window);
    });

    registerAllIpcHandlers();
    createWindow();
    createTray();

    // macOS: clicking the dock icon should restore the window.
    app.on("activate", () => showWindow());
  });

  // Do NOT quit when all windows are hidden — the tray keeps the app alive.
  app.on("window-all-closed", () => {
    // intentionally empty
  });

  // Ensure isQuitting is set when the OS requests shutdown or the user
  // picks Quit from the macOS dock menu.
  app.on("before-quit", () => {
    isQuitting = true;
  });
}
