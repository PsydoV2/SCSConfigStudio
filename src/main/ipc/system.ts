import { ipcMain } from "electron";

export function registerSystemHandlers(): void {
  ipcMain.handle("get-system-info", (): { platform: string; arch: string } => {
    return {
      platform: process.platform,
      arch: process.arch,
    };
  });
}
