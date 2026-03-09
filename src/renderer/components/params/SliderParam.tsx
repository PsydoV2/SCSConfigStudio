import type { ParameterDef } from "../../../shared/types";
import { Badge } from "../ui/Badge";
import { Tooltip } from "../ui/Tooltip";

interface SliderParamProps {
  param: ParameterDef;
  value: number;
  onChange: (key: string, value: number) => void;
}

export function SliderParam({ param, value, onChange }: SliderParamProps) {
  const isModified  = value !== param.defaultValue;
  const hasWarning  = !!(param.warning && param.recommended && value > param.recommended);
  const fillPercent = ((value - (param.min ?? 0)) / ((param.max ?? 1) - (param.min ?? 0))) * 100;

  function handleSliderChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(param.key, parseFloat(e.target.value));
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = parseFloat(e.target.value);
    if (isNaN(v)) return;
    const clamped = Math.min(param.max ?? v, Math.max(param.min ?? v, v));
    onChange(param.key, clamped);
  }

  return (
    <div className="param-card">
      <div className="param-card__header">
        <div className="param-card__meta">
          <div className="param-card__label-row">
            <span className="param-card__label">{param.label}</span>
            {isModified  && <Badge variant="modified">modified</Badge>}
            {hasWarning  && <Badge variant="warning">⚠ warning</Badge>}
            <Tooltip text={param.tooltip} />
          </div>
          <div className="param-card__sub-row">
            <code className="param-card__cfg-key">{param.cfgKey}</code>
            {param.recommended !== undefined && (
              <span className="param-card__hint">
                Recommended: {param.recommended}{param.unit}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="param-card__control param-card__control--slider">
        <div className="slider-track">
          <div className="slider-track__fill" style={{ width: `${fillPercent}%` }} />
          <input
            type="range"
            className="slider-track__input"
            min={param.min}
            max={param.max}
            step={param.step}
            value={value}
            onChange={handleSliderChange}
            aria-label={param.label}
          />
        </div>
        <div className="slider-value">
          <input
            type="number"
            className="slider-value__input"
            min={param.min}
            max={param.max}
            step={param.step}
            value={value}
            onChange={handleInputChange}
            aria-label={`${param.label} value`}
          />
          {param.unit && (
            <span className="slider-value__unit">{param.unit}</span>
          )}
        </div>
      </div>
    </div>
  );
}
