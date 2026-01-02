import { ipcMain } from "electron";

export function registerNotyHandlers(): void {
  ipcMain.on("notify", (_event, text) => console.log(text));
}
