import type { ParameterDef } from "../../../shared/types";
import { Badge } from "../ui/Badge";
import { Tooltip } from "../ui/Tooltip";

interface ToggleParamProps {
  param: ParameterDef;
  value: number;
  onChange: (key: string, value: number) => void;
}

export function ToggleParam({ param, value, onChange }: ToggleParamProps) {
  const isOn       = value === 1;
  const isModified = value !== param.defaultValue;

  function handleClick() {
    onChange(param.key, isOn ? 0 : 1);
  }

  return (
    <div className="param-card param-card--inline">
      <div className="param-card__meta">
        <div className="param-card__label-row">
          <span className="param-card__label">{param.label}</span>
          {isModified && <Badge variant="modified">modified</Badge>}
          <Tooltip text={param.tooltip} />
        </div>
        <code className="param-card__cfg-key">{param.cfgKey}</code>
      </div>

      <button
        className={`toggle ${isOn ? "toggle--on" : ""}`}
        onClick={handleClick}
        aria-pressed={isOn}
        aria-label={`${param.label}: ${isOn ? "on" : "off"}`}
      >
        <span className="toggle__track">
          <span className="toggle__knob" />
        </span>
        <span className="toggle__label">{isOn ? "ON" : "OFF"}</span>
      </button>
    </div>
  );
}
