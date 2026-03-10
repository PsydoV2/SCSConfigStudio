import { GAMES } from "../../../constants/parameters";
import type { GameId } from "../../../shared/types";
import { Button } from "../ui/Button";

interface ActionBarProps {
  activeGame: GameId;
  isDirty: boolean;
  status: "idle" | "loading" | "saving" | "error";
  onReset: () => void;
  onRecommended: () => void;
  onLoad: () => void;
  onSave: () => void;
}

export function ActionBar({
  activeGame,
  isDirty,
  status,
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
        <Button variant="ghost" onClick={onReset} disabled={isBusy}>
          ↺ Reset All
        </Button>
        <Button variant="secondary" onClick={onRecommended} disabled={isBusy}>
          ★ Apply Recommended
        </Button>
      </div>

      <div className="action-bar__right">
        {game && (
          <div className="action-bar__game-chip">
            <span>{game.flag}</span>
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
          {status === "loading" ? "Loading…" : "↺ Reload File"}
        </Button>
        <Button
          variant="primary"
          onClick={onSave}
          disabled={isBusy || !isDirty}
        >
          {status === "saving" ? "Saving…" : "Save & Apply"}
        </Button>
      </div>
    </footer>
  );
}
