import { CATEGORIES, PARAMETERS } from "../../../constants/parameters";
import { GAMES } from "../../../constants/parameters";
import type { CategoryId, GameId, ParamValues } from "../../../shared/types";
import { Button } from "../ui/Button";

interface SidebarProps {
  activeGame:     GameId;
  activeCategory: CategoryId;
  values:         ParamValues;
  configPath:     string | null;
  modifiedCount:  number;
  showPreview:    boolean;
  onGameChange:       (game: GameId)         => void;
  onCategoryChange:   (cat: CategoryId)      => void;
  onTogglePreview:    ()                     => void;
}

export function Sidebar({
  activeGame,
  activeCategory,
  values,
  configPath,
  modifiedCount,
  showPreview,
  onGameChange,
  onCategoryChange,
  onTogglePreview,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
            <path d="M4 20L14 8L24 20" stroke="#ff9100" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="14" cy="20" r="3" fill="#ff9100"/>
            <path d="M9 20h10" stroke="#ff9100" strokeWidth="2" strokeLinecap="round" opacity="0.35"/>
          </svg>
        </div>
        <div>
          <div className="sidebar__logo-title">SCS Config</div>
          <div className="sidebar__logo-sub">Studio</div>
        </div>
      </div>

      {/* Game Switcher */}
      <div className="sidebar__section">
        <p className="sidebar__section-label">Game</p>
        {GAMES.map((game) => (
          <button
            key={game.id}
            className={`game-btn ${activeGame === game.id ? "game-btn--active" : ""}`}
            onClick={() => onGameChange(game.id)}
            aria-pressed={activeGame === game.id}
          >
            <span className="game-btn__flag">{game.flag}</span>
            <div className="game-btn__text">
              <span className="game-btn__name">{game.name.split(" ").slice(0, 2).join(" ")}</span>
              <span className="game-btn__sub">{game.name.split(" ").slice(2).join(" ")}</span>
            </div>
            {activeGame === game.id && <span className="game-btn__dot" aria-hidden="true" />}
          </button>
        ))}
      </div>

      {/* Category Nav */}
      <nav className="sidebar__nav" aria-label="Parameter categories">
        <p className="sidebar__section-label">Categories</p>
        {CATEGORIES.map((cat) => {
          const modified = PARAMETERS.filter(
            (p) => p.category === cat.id && values[p.key] !== p.defaultValue
          ).length;

          return (
            <button
              key={cat.id}
              className={`cat-btn ${activeCategory === cat.id ? "cat-btn--active" : ""}`}
              onClick={() => onCategoryChange(cat.id)}
              aria-current={activeCategory === cat.id ? "page" : undefined}
            >
              <span className="cat-btn__icon" aria-hidden="true">{cat.icon}</span>
              <span className="cat-btn__label">{cat.label}</span>
              {modified > 0 && (
                <span className="cat-btn__badge" aria-label={`${modified} modified`}>
                  {modified}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="sidebar__footer">
        {configPath && (
          <p className="sidebar__path" title={configPath}>
            {configPath.replace(/\\/g, "/").split("/").slice(-3).join("/")}
          </p>
        )}
        {modifiedCount > 0 && (
          <div className="sidebar__dirty">
            <span className="sidebar__dirty-dot" aria-hidden="true" />
            <span>{modifiedCount} unsaved change{modifiedCount !== 1 ? "s" : ""}</span>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={onTogglePreview}>
          {showPreview ? "Hide" : "Show"} .cfg preview
        </Button>
      </div>
    </aside>
  );
}
