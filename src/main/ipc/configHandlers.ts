import { ipcMain } from "electron";
import { readConfig, saveConfig, detectConfigPath } from "../services/configService";
import type { GameId, ParamValues } from "../../shared/types";

export const IPC = {
  READ_CONFIG:    "config:read",
  SAVE_CONFIG:    "config:save",
  DETECT_PATH:    "config:detectPath",
} as const;

export function registerConfigHandlers(): void {
  ipcMain.handle(IPC.READ_CONFIG, (_event, gameId: GameId) => {
    return readConfig(gameId);
  });

  ipcMain.handle(
    IPC.SAVE_CONFIG,
    (_event, gameId: GameId, values: ParamValues) => {
      return saveConfig(gameId, values);
    }
  );

  ipcMain.handle(IPC.DETECT_PATH, (_event, gameId: GameId) => {
    const p = detectConfigPath(gameId);
    return p
      ? { success: true, path: p }
      : { success: false, error: "Config file not found" };
  });
}
