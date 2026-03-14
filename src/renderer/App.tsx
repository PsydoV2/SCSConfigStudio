import { useState, useCallback, useEffect, useMemo } from "react";
import { PARAMETERS, RECOMMENDED_VALUES } from "../constants/parameters";
import { useConfig } from "./hooks/useConfig";
import { useToast } from "./context/ToastContext";
import { TitleBar } from "./components/layout/TitleBar";
import { Sidebar } from "./components/layout/Sidebar";
import { Toolbar } from "./components/layout/Toolbar";
import { ActionBar } from "./components/layout/ActionBar";
import { ConfigEmpty } from "./components/layout/ConfigEmpty";
import { ParamControl } from "./components/params/ParamControl";
import type { CategoryId, GameId } from "../shared/types";

export function App() {
  const [activeGame, setActiveGame] = useState<GameId>("ets2");
  const [activeCategory, setActiveCategory] = useState<CategoryId>("world");
  const [searchQuery, setSearchQuery] = useState("");

  const { showToast } = useToast();
  const config = useConfig(activeGame);

  function handleGameChange(game: GameId) {
    setActiveGame(game);
    setSearchQuery("");
  }

  function handleCategoryChange(cat: CategoryId) {
    setActiveCategory(cat);
    setSearchQuery("");
  }

  // Auto-load config when the active game changes and on initial mount.
  // Only show a toast for errors — a successful load is the expected happy path.
  // loadFromFile and showToast are stable (useCallback), safe to exclude from deps.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    config.loadFromFile().then((ok) => {
      if (!ok) {
        showToast("Config file not found — is the game installed?", "error");
      }
    });
  }, [activeGame]); // intentionally only re-runs when the active game changes

  const handleLoad = useCallback(async () => {
    const ok = await config.loadFromFile();
    if (ok) {
      showToast("Config reloaded from file", "success");
    } else {
      showToast("Config file not found.", "error");
    }
  }, [config.loadFromFile, showToast]);

  const handleSave = useCallback(async () => {
    const backupPath = await config.saveToFile();
    if (backupPath) {
      showToast("Saved. Backup created.", "success");
    } else {
      showToast("Failed to save — check the error above.", "error");
    }
  }, [config.saveToFile, showToast]);

  const handleReset = useCallback(() => {
    if (
      !window.confirm(
        "Reset all parameters to their default values?\n\nThis does not affect the file on disk until you save.",
      )
    )
      return;
    config.resetToDefaults();
    showToast("Reset to defaults", "info");
  }, [config.resetToDefaults, showToast]);

  const handleApplyRecommended = useCallback(() => {
    config.applyRecommended(RECOMMENDED_VALUES);
    showToast("Recommended values applied", "success");
  }, [config.applyRecommended, showToast]);

  // Keyboard shortcuts: Ctrl+S (save), Ctrl+R (reload), Ctrl+F (focus search)
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;
      if (e.key === "s") {
        e.preventDefault();
        if (config.isDirty && config.status === "idle") handleSave();
      } else if (e.key === "r") {
        e.preventDefault();
        if (config.status === "idle" || config.status === "error") handleLoad();
      } else if (e.key === "f") {
        e.preventDefault();
        document.querySelector<HTMLInputElement>(".search__input")?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [config.isDirty, config.status, handleSave, handleLoad]);

  const displayedParams = useMemo(() => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return PARAMETERS.filter(
        (p) =>
          p.label.toLowerCase().includes(q) ||
          p.cfgKey.toLowerCase().includes(q) ||
          p.tooltip.toLowerCase().includes(q),
      );
    }
    return PARAMETERS.filter((p) => p.category === activeCategory);
  }, [searchQuery, activeCategory]);

  const modifiedCount = useMemo(
    () =>
      PARAMETERS.filter(
        (p) => config.values[p.key] !== config.savedValues[p.key],
      ).length,
    [config.values, config.savedValues],
  );

  const configNotFound =
    config.status === "error" && config.configPath === null;

  return (
    <div className="app">
      <TitleBar />
      <Sidebar
        activeGame={activeGame}
        activeCategory={activeCategory}
        values={config.values}
        savedValues={config.savedValues}
        configPath={config.configPath}
        modifiedCount={modifiedCount}
        onGameChange={handleGameChange}
        onCategoryChange={handleCategoryChange}
      />

      <div className="main">
        <Toolbar
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          paramCount={displayedParams.length}
          onSearchChange={setSearchQuery}
          disabled={configNotFound}
        />

        {configNotFound ? (
          <ConfigEmpty
            activeGame={activeGame}
            errorMessage={config.lastError}
            isRetrying={config.status === "loading"}
            onRetry={handleLoad}
          />
        ) : (
          <div className="param-list">
            {displayedParams.length === 0 ? (
              <p className="param-list__empty">
                No parameters found for &ldquo;{searchQuery}&rdquo;
              </p>
            ) : (
              displayedParams.map((param) => (
                <ParamControl
                  key={param.key}
                  param={param}
                  value={config.values[param.key] ?? param.defaultValue}
                  savedValue={
                    config.savedValues[param.key] ?? param.defaultValue
                  }
                  onChange={config.updateValue}
                />
              ))
            )}
          </div>
        )}

        <ActionBar
          activeGame={activeGame}
          isDirty={config.isDirty}
          status={config.status}
          configNotFound={configNotFound}
          onReset={handleReset}
          onRecommended={handleApplyRecommended}
          onLoad={handleLoad}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
