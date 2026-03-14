import { useState } from "react";

interface TooltipProps {
  text: string;
}

export function Tooltip({ text }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="tooltip"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <button
        type="button"
        className="tooltip__trigger"
        aria-label="More info"
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
      >
        i
      </button>
      {visible && (
        <span className="tooltip__box" role="tooltip">
          {text}
        </span>
      )}
    </span>
  );
}
