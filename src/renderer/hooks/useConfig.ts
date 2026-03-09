import { useState, useCallback } from "react";
import { DEFAULT_VALUES } from "../../constants/parameters";
import type { GameId, ParamValues } from "../../shared/types";

export type ConfigStatus = "idle" | "loading" | "saving" | "error";

export interface UseConfigReturn {
  values: ParamValues;
  configPath: string | null;
  status: ConfigStatus;
  lastError: string | null;
  isDirty: boolean;
  updateValue: (key: string, value: number) => void;
  loadFromFile: () => Promise<void>;
  saveToFile: () => Promise<string | null>; // returns backup path on success
  resetToDefaults: () => void;
  applyRecommended: (recommended: Record<string, number>) => void;
}

export function useConfig(gameId: GameId): UseConfigReturn {
  const [values, setValues] = useState<ParamValues>({ ...DEFAULT_VALUES });
  const [savedValues, setSavedValues] = useState<ParamValues>({ ...DEFAULT_VALUES });
  const [configPath, setConfigPath] = useState<string | null>(null);
  const [status, setStatus] = useState<ConfigStatus>("idle");
  const [lastError, setLastError] = useState<string | null>(null);

  const isDirty = JSON.stringify(values) !== JSON.stringify(savedValues);

  const updateValue = useCallback((key: string, value: number) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const loadFromFile = useCallback(async () => {
    setStatus("loading");
    setLastError(null);
    try {
      const result = await window.api.config.read(gameId);
      if (result.success && result.values) {
        setValues(result.values);
        setSavedValues(result.values);
        setConfigPath(result.configPath ?? null);
        setStatus("idle");
      } else {
        setLastError(result.error ?? "Unknown error");
        setStatus("error");
      }
    } catch (err) {
      setLastError((err as Error).message);
      setStatus("error");
    }
  }, [gameId]);

  const saveToFile = useCallback(async (): Promise<string | null> => {
    setStatus("saving");
    setLastError(null);
    try {
      const result = await window.api.config.save(gameId, values);
      if (result.success) {
        setSavedValues({ ...values });
        setStatus("idle");
        return result.backupPath ?? null;
      } else {
        setLastError(result.error ?? "Unknown error");
        setStatus("error");
        return null;
      }
    } catch (err) {
      setLastError((err as Error).message);
      setStatus("error");
      return null;
    }
  }, [gameId, values]);

  const resetToDefaults = useCallback(() => {
    setValues({ ...DEFAULT_VALUES });
  }, []);

  const applyRecommended = useCallback((recommended: Record<string, number>) => {
    setValues((prev) => ({ ...prev, ...recommended }));
  }, []);

  return {
    values,
    configPath,
    status,
    lastError,
    isDirty,
    updateValue,
    loadFromFile,
    saveToFile,
    resetToDefaults,
    applyRecommended,
  };
}
