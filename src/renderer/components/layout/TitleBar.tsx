import { useState, useEffect } from "react";

function IconClose() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
      <line x1="1.5" y1="1.5" x2="6.5" y2="6.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="6.5" y1="1.5" x2="1.5" y2="6.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function IconMinimize() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
      <line x1="1" y1="4" x2="7" y2="4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function IconMaximize() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
      <polyline points="5,1 7,1 7,3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <polyline points="3,7 1,7 1,5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="7" y1="1" x2="4.5" y2="3.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="1" y1="7" x2="3.5" y2="4.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function IconRestore() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
      <polyline points="3,1 1,1 1,3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <polyline points="5,7 7,7 7,5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="1" y1="1" x2="3.5" y2="3.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="7" y1="7" x2="4.5" y2="4.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
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
      <div className="titlebar__controls">
        {/* Close — red */}
        <button
          className="titlebar__btn titlebar__btn--close"
          onClick={() => window.api.window.close()}
          aria-label="Close"
        >
          <span className="titlebar__btn-icon"><IconClose /></span>
        </button>

        {/* Minimize — yellow */}
        <button
          className="titlebar__btn titlebar__btn--minimize"
          onClick={() => window.api.window.minimize()}
          aria-label="Minimize"
        >
          <span className="titlebar__btn-icon"><IconMinimize /></span>
        </button>

        {/* Maximize / Restore — green */}
        <button
          className="titlebar__btn titlebar__btn--maximize"
          onClick={() => window.api.window.maximize()}
          aria-label={isMaximized ? "Restore" : "Maximize"}
        >
          <span className="titlebar__btn-icon">
            {isMaximized ? <IconRestore /> : <IconMaximize />}
          </span>
        </button>
      </div>
    </div>
  );
}
