import { CATEGORIES, PARAMETERS } from "../../../constants/parameters";
import { GAMES } from "../../../constants/parameters";
import type { CategoryId, GameId, ParamValues } from "../../../shared/types";
import {
  IconTruckLogo,
  IconGlobe,
  IconZap,
  IconTerminal,
  IconTruck,
  IconVr,
} from "../ui/Icons";

interface SidebarProps {
  activeGame: GameId;
  activeCategory: CategoryId;
  values: ParamValues;
  savedValues: ParamValues;
  configPath: string | null;
  modifiedCount: number;
  onGameChange: (game: GameId) => void;
  onCategoryChange: (cat: CategoryId) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  world: <IconGlobe size={15} />,
  performance: <IconZap size={15} />,
  developer: <IconTerminal size={15} />,
  physics: <IconTruck size={15} />,
  vr: <IconVr size={15} />,
};

export function Sidebar({
  activeGame,
  activeCategory,
  values,
  savedValues,
  configPath,
  modifiedCount,
  onGameChange,
  onCategoryChange,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon" aria-hidden="true">
          <IconTruckLogo size={26} />
        </div>
        <div className="sidebar__logo-title">SCS Config Studio</div>
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
            <span className="game-btn__abbr">{game.shortName}</span>
            <div className="game-btn__text">
              <span className="game-btn__name">{game.name}</span>
            </div>
            {activeGame === game.id && (
              <span className="game-btn__dot" aria-hidden="true" />
            )}
          </button>
        ))}
      </div>

      {/* Category Nav */}
      <nav className="sidebar__nav" aria-label="Parameter categories">
        <p className="sidebar__section-label">Categories</p>
        {CATEGORIES.map((cat) => {
          const modified = PARAMETERS.filter(
            (p) =>
              p.category === cat.id && values[p.key] !== savedValues[p.key],
          ).length;

          return (
            <button
              key={cat.id}
              className={`cat-btn ${activeCategory === cat.id ? "cat-btn--active" : ""}`}
              onClick={() => onCategoryChange(cat.id)}
              aria-current={activeCategory === cat.id ? "page" : undefined}
            >
              <span className="cat-btn__icon" aria-hidden="true">
                {CATEGORY_ICONS[cat.icon] ?? null}
              </span>
              <span className="cat-btn__label">{cat.label}</span>
              {modified > 0 && (
                <span
                  className="cat-btn__badge"
                  aria-label={`${modified} unsaved`}
                >
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
            <span>
              {modifiedCount} unsaved change{modifiedCount !== 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}
