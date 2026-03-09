import { useState, useCallback, useMemo } from "react";
import { PARAMETERS, RECOMMENDED_VALUES } from "../constants/parameters";
import { useConfig } from "./hooks/useConfig";
import { useToast } from "./context/ToastContext";
import { Sidebar }    from "./components/layout/Sidebar";
import { Toolbar }    from "./components/layout/Toolbar";
import { ActionBar }  from "./components/layout/ActionBar";
import { CfgPreview } from "./components/layout/CfgPreview";
import { ParamControl } from "./components/params/ParamControl";
import type { CategoryId, GameId } from "../shared/types";

export function App() {
  const [activeGame, setActiveGame]         = useState<GameId>("ets2");
  const [activeCategory, setActiveCategory] = useState<CategoryId>("world");
  const [searchQuery, setSearchQuery]       = useState("");
  const [showPreview, setShowPreview]       = useState(false);

  const { showToast } = useToast();

  const config = useConfig(activeGame);

  // Switch game without losing independent state per game
  function handleGameChange(game: GameId) {
    setActiveGame(game);
    setSearchQuery("");
  }

  function handleCategoryChange(cat: CategoryId) {
    setActiveCategory(cat);
    setSearchQuery("");
  }

  const handleLoad = useCallback(async () => {
    await config.loadFromFile();
    if (config.status !== "error") {
      showToast("Config loaded from file", "success");
    } else {
      showToast(config.lastError ?? "Failed to load config", "error");
    }
  }, [config, showToast]);

  const handleSave = useCallback(async () => {
    const backupPath = await config.saveToFile();
    if (backupPath) {
      showToast("Config saved. Backup created.", "success");
    } else {
      showToast(config.lastError ?? "Failed to save config", "error");
    }
  }, [config, showToast]);

  const handleReset = useCallback(() => {
    config.resetToDefaults();
    showToast("Reset to defaults", "info");
  }, [config, showToast]);

  const handleApplyRecommended = useCallback(() => {
    config.applyRecommended(RECOMMENDED_VALUES);
    showToast("Recommended values applied", "success");
  }, [config, showToast]);

  const handleCopyPreview = useCallback(() => {
    const lines = PARAMETERS.map(
      (p) => `uset ${p.cfgKey} "${config.values[p.key] ?? p.defaultValue}"`
    ).join("\n");
    navigator.clipboard.writeText(lines);
    showToast("Copied to clipboard", "success");
  }, [config.values, showToast]);

  // Filtered parameters: search across all categories, or filter by active category
  const displayedParams = useMemo(() => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return PARAMETERS.filter(
        (p) =>
          p.label.toLowerCase().includes(q) ||
          p.cfgKey.toLowerCase().includes(q) ||
          p.tooltip.toLowerCase().includes(q)
      );
    }
    return PARAMETERS.filter((p) => p.category === activeCategory);
  }, [searchQuery, activeCategory]);

  const modifiedCount = useMemo(
    () => PARAMETERS.filter((p) => config.values[p.key] !== p.defaultValue).length,
    [config.values]
  );

  return (
    <div className="app">
      <Sidebar
        activeGame={activeGame}
        activeCategory={activeCategory}
        values={config.values}
        configPath={config.configPath}
        modifiedCount={modifiedCount}
        showPreview={showPreview}
        onGameChange={handleGameChange}
        onCategoryChange={handleCategoryChange}
        onTogglePreview={() => setShowPreview((v) => !v)}
      />

      <div className="main">
        <Toolbar
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          paramCount={displayedParams.length}
          onSearchChange={setSearchQuery}
        />

        {showPreview && (
          <CfgPreview values={config.values} onCopy={handleCopyPreview} />
        )}

        {config.lastError && (
          <div className="error-banner" role="alert">
            ⚠ {config.lastError}
          </div>
        )}

        <div className="param-list">
          {displayedParams.length === 0 ? (
            <p className="param-list__empty">
              No parameters found for "{searchQuery}"
            </p>
          ) : (
            displayedParams.map((param) => (
              <ParamControl
                key={param.key}
                param={param}
                value={config.values[param.key] ?? param.defaultValue}
                onChange={config.updateValue}
              />
            ))
          )}
        </div>

        <ActionBar
          activeGame={activeGame}
          isDirty={config.isDirty}
          status={config.status}
          onReset={handleReset}
          onRecommended={handleApplyRecommended}
          onLoad={handleLoad}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
