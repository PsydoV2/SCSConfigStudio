import { GAMES } from "../../../constants/parameters";
import type { GameId } from "../../../shared/types";
import { Button } from "../ui/Button";
import { IconRotateCcw, IconRefreshCw, IconSparkles, IconSave } from "../ui/Icons";

interface ActionBarProps {
  activeGame: GameId;
  isDirty: boolean;
  status: "idle" | "loading" | "saving" | "error";
  configNotFound: boolean;
  onReset: () => void;
  onRecommended: () => void;
  onLoad: () => void;
  onSave: () => void;
}

export function ActionBar({
  activeGame,
  isDirty,
  status,
  configNotFound,
  onReset,
  onRecommended,
  onLoad,
  onSave,
}: ActionBarProps) {
  const game = GAMES.find((g) => g.id === activeGame);
  const isBusy = status === "loading" || status === "saving";

  return (
    <footer className="action-bar">
      <div className="action-bar__left">
        <Button
          variant="ghost"
          onClick={onReset}
          disabled={isBusy || configNotFound}
        >
          <IconRotateCcw size={13} />
          Reset to Defaults
        </Button>
        <Button
          variant="secondary"
          onClick={onRecommended}
          disabled={isBusy || configNotFound}
        >
          <IconSparkles size={13} />
          Apply Recommended
        </Button>
      </div>

      <div className="action-bar__right">
        {game && (
          <div className="action-bar__game-chip">
            <span>{game.shortName}</span>
            {isDirty && (
              <span
                className="action-bar__dirty-indicator"
                aria-label="Unsaved changes"
              />
            )}
          </div>
        )}
        <Button variant="secondary" onClick={onLoad} disabled={isBusy}>
          <IconRefreshCw size={13} />
          {status === "loading" ? "Loading…" : "Reload File"}
        </Button>
        <Button
          variant="primary"
          onClick={onSave}
          disabled={isBusy || !isDirty || configNotFound}
        >
          <IconSave size={13} />
          {status === "saving" ? "Saving…" : "Save to File"}
        </Button>
      </div>
    </footer>
  );
}
