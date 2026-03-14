import { GAMES } from "../../../constants/parameters";
import type { GameId } from "../../../shared/types";
import { Button } from "../ui/Button";
import { IconRefreshCw } from "../ui/Icons";

interface ConfigEmptyProps {
  activeGame: GameId;
  errorMessage: string | null;
  isRetrying: boolean;
  onRetry: () => void;
}

export function ConfigEmpty({
  activeGame,
  errorMessage,
  isRetrying,
  onRetry,
}: ConfigEmptyProps) {
  const game = GAMES.find((g) => g.id === activeGame);

  // Extract the file path from the error message if present
  const pathMatch = errorMessage?.match(/at:\s*(.+)$/);
  const expectedPath = pathMatch?.[1]?.trim() ?? null;

  return (
    <div className="config-empty">
      <div className="config-empty__icon" aria-hidden="true">
        <svg
          width="52"
          height="52"
          viewBox="0 0 28 28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="9" width="14" height="11" rx="1.5" />
          <path d="M16 12h7l2 4v5H16V12z" />
          <path d="M16 12l2 4h6" />
          <circle cx="7" cy="22" r="2.5" />
          <circle cx="21" cy="22" r="2.5" />
        </svg>
      </div>

      <h2 className="config-empty__title">Config file not found</h2>

      <p className="config-empty__desc">
        {game?.name ?? "The game"} needs to be installed and launched at least
        once so it can generate its config file.
      </p>

      {expectedPath && (
        <div className="config-empty__path-block">
          <span className="config-empty__path-label">Expected location</span>
          <code className="config-empty__path">{expectedPath}</code>
        </div>
      )}

      <Button variant="secondary" onClick={onRetry} disabled={isRetrying}>
        <IconRefreshCw size={13} />
        {isRetrying ? "Checking…" : "Try again"}
      </Button>
    </div>
  );
}
