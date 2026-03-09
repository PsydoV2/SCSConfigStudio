// ─── Game ─────────────────────────────────────────────────────────────────────

export type GameId = "ets2" | "ats";

export interface GameInfo {
  id: GameId;
  name: string;
  shortName: string;
  flag: string;
  configSubPath: string; // relative path inside documents folder
}

// ─── Parameters ───────────────────────────────────────────────────────────────

export type ParamType = "slider" | "toggle" | "select";
export type CategoryId = "world" | "performance" | "developer" | "physics" | "vr";

export interface SelectOption {
  value: number;
  label: string;
}

export interface ParameterDef {
  key: string;
  cfgKey: string;
  label: string;
  tooltip: string;
  type: ParamType;
  category: CategoryId;
  defaultValue: number;
  recommended?: number;
  warning?: string;
  // slider-specific
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  // select-specific
  options?: SelectOption[];
}

export interface CategoryDef {
  id: CategoryId;
  label: string;
  icon: string;
}

// ─── Config File ──────────────────────────────────────────────────────────────

/** A map of cfg-file keys to their raw string values, e.g. { g_traffic: "3" } */
export type RawConfig = Record<string, string>;

/** A map of our internal parameter keys to numeric values */
export type ParamValues = Record<string, number>;

// ─── IPC Channels ─────────────────────────────────────────────────────────────

export interface IpcReadConfigResult {
  success: boolean;
  values?: ParamValues;
  configPath?: string;
  error?: string;
}

export interface IpcSaveConfigResult {
  success: boolean;
  backupPath?: string;
  error?: string;
}

export interface IpcDetectPathResult {
  success: boolean;
  path?: string;
  error?: string;
}

export interface IpcSystemInfo {
  platform: NodeJS.Platform;
  arch: string;
  version: string;
}
