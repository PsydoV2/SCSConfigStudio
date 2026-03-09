import { ipcMain } from "electron";
import type { IpcSystemInfo } from "../../shared/types";

export const IPC = {
  GET_SYSTEM_INFO: "system:getInfo",
} as const;

export function registerSystemHandlers(): void {
  ipcMain.handle(IPC.GET_SYSTEM_INFO, (): IpcSystemInfo => ({
    platform: process.platform,
    arch:     process.arch,
    version:  process.versions.electron ?? "unknown",
  }));
}
