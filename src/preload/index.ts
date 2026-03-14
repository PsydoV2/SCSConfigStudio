import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import type {
  GameId,
  IpcDetectPathResult,
  IpcReadConfigResult,
  IpcSaveConfigResult,
  IpcSystemInfo,
  ParamValues,
} from "../shared/types";

import { IPC as CONFIG_IPC } from "../main/ipc/configHandlers";
import { IPC as SYSTEM_IPC } from "../main/ipc/systemHandlers";
import { WINDOW_IPC } from "../main/ipc/windowHandlers";

const api = {
  config: {
    read:       (gameId: GameId): Promise<IpcReadConfigResult> =>
      ipcRenderer.invoke(CONFIG_IPC.READ_CONFIG, gameId),

    save:       (gameId: GameId, values: ParamValues): Promise<IpcSaveConfigResult> =>
      ipcRenderer.invoke(CONFIG_IPC.SAVE_CONFIG, gameId, values),

    detectPath: (gameId: GameId): Promise<IpcDetectPathResult> =>
      ipcRenderer.invoke(CONFIG_IPC.DETECT_PATH, gameId),
  },

  system: {
    getInfo: (): Promise<IpcSystemInfo> =>
      ipcRenderer.invoke(SYSTEM_IPC.GET_SYSTEM_INFO),
  },

  window: {
    minimize:    (): void        => ipcRenderer.send(WINDOW_IPC.MINIMIZE),
    maximize:    (): void        => ipcRenderer.send(WINDOW_IPC.MAXIMIZE),
    close:       (): void        => ipcRenderer.send(WINDOW_IPC.CLOSE),
    isMaximized: (): Promise<boolean> => ipcRenderer.invoke(WINDOW_IPC.IS_MAXIMIZED),
  },
} as const;

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (err) {
    console.error("[preload] Failed to expose API:", err);
  }
} else {
  // @ts-ignore
  window.electron = electronAPI;
  // @ts-ignore
  window.api = api;
}
