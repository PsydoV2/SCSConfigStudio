import fs from "fs";
import path from "path";
import os from "os";
import { PARAMETERS } from "../../constants/parameters";
import type { GameId, IpcReadConfigResult, IpcSaveConfigResult, ParamValues, RawConfig } from "../../shared/types";

// ─── Paths ────────────────────────────────────────────────────────────────────

const GAME_CONFIG_SUBPATHS: Record<GameId, string> = {
  ets2: path.join("Euro Truck Simulator 2", "config.cfg"),
  ats:  path.join("American Truck Simulator", "config.cfg"),
};

function getDocumentsDir(): string {
  if (process.platform === "win32") {
    return path.join(os.homedir(), "Documents");
  }
  if (process.platform === "darwin") {
    return path.join(os.homedir(), "Documents");
  }
  // Linux: Steam usually stores saves under ~/.local/share
  return path.join(os.homedir(), ".local", "share");
}

export function resolveConfigPath(gameId: GameId): string {
  return path.join(getDocumentsDir(), GAME_CONFIG_SUBPATHS[gameId]);
}

// ─── Parsing ──────────────────────────────────────────────────────────────────

/**
 * Parses a SCS config file into a raw key→value map.
 * Each relevant line looks like:  uset g_traffic "3"
 */
function parseConfigFile(content: string): RawConfig {
  const result: RawConfig = {};
  for (const line of content.split(/\r?\n/)) {
    const match = line.match(/^\s*uset\s+(\S+)\s+"([^"]*)"/);
    if (match) {
      result[match[1]] = match[2];
    }
  }
  return result;
}

/**
 * Maps raw cfg key→value pairs onto our internal ParamValues.
 * Falls back to the parameter's defaultValue if a key is missing.
 */
function rawConfigToParamValues(raw: RawConfig): ParamValues {
  const values: ParamValues = {};
  for (const param of PARAMETERS) {
    const raw_val = raw[param.cfgKey];
    values[param.key] =
      raw_val !== undefined ? parseFloat(raw_val) : param.defaultValue;
  }
  return values;
}

// ─── Serialisation ────────────────────────────────────────────────────────────

/**
 * Applies updated ParamValues back into the raw file content,
 * preserving every other line exactly as-is.
 */
function applyParamValuesToContent(
  originalContent: string,
  values: ParamValues
): string {
  // Build a lookup: cfgKey → new value string
  const updates: Record<string, string> = {};
  for (const param of PARAMETERS) {
    const v = values[param.key];
    if (v !== undefined) {
      updates[param.cfgKey] = String(v);
    }
  }

  const lines = originalContent.split(/\r?\n/);
  const updatedLines = lines.map((line) => {
    const match = line.match(/^(\s*uset\s+)(\S+)(\s+)"([^"]*)"(.*)/);
    if (match) {
      const cfgKey = match[2];
      if (cfgKey in updates) {
        return `${match[1]}${cfgKey}${match[3]}"${updates[cfgKey]}"${match[5]}`;
      }
    }
    return line;
  });

  // Append any keys that weren't in the file yet
  const existingKeys = new Set(
    lines
      .map((l) => l.match(/^\s*uset\s+(\S+)/)?.[1])
      .filter(Boolean) as string[]
  );
  for (const param of PARAMETERS) {
    if (!(param.cfgKey in existingKeys) && param.key in values) {
      // Only add if we actually want to override it
      if (values[param.key] !== param.defaultValue) {
        updatedLines.push(`uset ${param.cfgKey} "${values[param.key]}"`);
      }
    }
  }

  return updatedLines.join("\n");
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function readConfig(gameId: GameId): IpcReadConfigResult {
  const configPath = resolveConfigPath(gameId);

  if (!fs.existsSync(configPath)) {
    return {
      success: false,
      error: `Config file not found at: ${configPath}`,
    };
  }

  try {
    const content = fs.readFileSync(configPath, "utf-8");
    const raw = parseConfigFile(content);
    const values = rawConfigToParamValues(raw);
    return { success: true, values, configPath };
  } catch (err) {
    return {
      success: false,
      error: `Failed to read config: ${(err as Error).message}`,
    };
  }
}

export function saveConfig(
  gameId: GameId,
  values: ParamValues
): IpcSaveConfigResult {
  const configPath = resolveConfigPath(gameId);

  if (!fs.existsSync(configPath)) {
    return {
      success: false,
      error: `Config file not found at: ${configPath}`,
    };
  }

  try {
    const originalContent = fs.readFileSync(configPath, "utf-8");

    // Create a timestamped backup before writing
    const backupPath = configPath + `.bak_${Date.now()}`;
    fs.writeFileSync(backupPath, originalContent, "utf-8");

    const updatedContent = applyParamValuesToContent(originalContent, values);
    fs.writeFileSync(configPath, updatedContent, "utf-8");

    return { success: true, backupPath };
  } catch (err) {
    return {
      success: false,
      error: `Failed to save config: ${(err as Error).message}`,
    };
  }
}

export function detectConfigPath(gameId: GameId): string | null {
  const configPath = resolveConfigPath(gameId);
  return fs.existsSync(configPath) ? configPath : null;
}
