import { useState, useEffect } from "react";
import { IconTruckLogo } from "../ui/Icons";

function IconClose() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function IconMinimize() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <line x1="1" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function IconMaximize() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <rect x="1.5" y="1.5" width="7" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

function IconRestore() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <rect x="1.5" y="3" width="5.5" height="5.5" rx="0.5" stroke="currentColor" strokeWidth="1.1" />
      <path d="M3 3V1.5h5.5V7H7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function TitleBar() {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function syncState() {
      const maximized = await window.api.window.isMaximized();
      if (!cancelled) setIsMaximized(maximized);
    }

    syncState();
    window.addEventListener("resize", syncState);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", syncState);
    };
  }, []);

  return (
    <div className="titlebar" onDoubleClick={() => window.api.window.maximize()}>
      <div className="titlebar__brand">
        <IconTruckLogo size={14} />
        <span className="titlebar__brand-title">SCS Config Studio</span>
      </div>

      <div className="titlebar__controls">
        <button
          className="titlebar__btn titlebar__btn--minimize"
          onClick={() => window.api.window.minimize()}
          aria-label="Minimize"
        >
          <IconMinimize />
        </button>

        <button
          className="titlebar__btn titlebar__btn--maximize"
          onClick={() => window.api.window.maximize()}
          aria-label={isMaximized ? "Restore" : "Maximize"}
        >
          {isMaximized ? <IconRestore /> : <IconMaximize />}
        </button>

        <button
          className="titlebar__btn titlebar__btn--close"
          onClick={() => window.api.window.close()}
          aria-label="Close"
        >
          <IconClose />
        </button>
      </div>
    </div>
  );
}
