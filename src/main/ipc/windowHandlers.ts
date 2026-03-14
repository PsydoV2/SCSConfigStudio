import { ipcMain, BrowserWindow } from "electron";

export const WINDOW_IPC = {
  MINIMIZE:     "window:minimize",
  MAXIMIZE:     "window:maximize",
  CLOSE:        "window:close",
  IS_MAXIMIZED: "window:isMaximized",
} as const;

export function registerWindowHandlers(): void {
  ipcMain.on(WINDOW_IPC.MINIMIZE, () => {
    BrowserWindow.getFocusedWindow()?.minimize();
  });

  ipcMain.on(WINDOW_IPC.MAXIMIZE, () => {
    const win = BrowserWindow.getFocusedWindow();
    if (!win) return;
    win.isMaximized() ? win.unmaximize() : win.maximize();
  });

  ipcMain.on(WINDOW_IPC.CLOSE, () => {
    BrowserWindow.getFocusedWindow()?.close();
  });

  ipcMain.handle(WINDOW_IPC.IS_MAXIMIZED, () => {
    return BrowserWindow.getFocusedWindow()?.isMaximized() ?? false;
  });
}
