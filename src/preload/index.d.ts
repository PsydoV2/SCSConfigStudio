import { ElectronAPI } from "@electron-toolkit/preload";
import type {
  GameId,
  IpcDetectPathResult,
  IpcReadConfigResult,
  IpcSaveConfigResult,
  IpcSystemInfo,
  ParamValues,
} from "../shared/types";

interface AppAPI {
  config: {
    read:       (gameId: GameId) => Promise<IpcReadConfigResult>;
    save:       (gameId: GameId, values: ParamValues) => Promise<IpcSaveConfigResult>;
    detectPath: (gameId: GameId) => Promise<IpcDetectPathResult>;
  };
  system: {
    getInfo: () => Promise<IpcSystemInfo>;
  };
  window: {
    minimize:    () => void;
    maximize:    () => void;
    close:       () => void;
    isMaximized: () => Promise<boolean>;
  };
}

declare global {
  interface Window {
    electron: ElectronAPI;
    api: AppAPI;
  }
}
