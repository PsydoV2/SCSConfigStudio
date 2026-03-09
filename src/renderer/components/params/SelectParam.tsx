import type { ParameterDef } from "../../../shared/types";
import { Badge } from "../ui/Badge";
import { Tooltip } from "../ui/Tooltip";

interface SelectParamProps {
  param: ParameterDef;
  value: number;
  onChange: (key: string, value: number) => void;
}

export function SelectParam({ param, value, onChange }: SelectParamProps) {
  const isModified = value !== param.defaultValue;

  return (
    <div className="param-card">
      <div className="param-card__header">
        <div className="param-card__meta">
          <div className="param-card__label-row">
            <span className="param-card__label">{param.label}</span>
            {isModified && <Badge variant="modified">modified</Badge>}
            <Tooltip text={param.tooltip} />
          </div>
          <div className="param-card__sub-row">
            <code className="param-card__cfg-key">{param.cfgKey}</code>
            {param.warning && (
              <span className="param-card__warn">{param.warning}</span>
            )}
          </div>
        </div>
      </div>

      <div className="param-card__control param-card__control--select">
        {param.options?.map((opt) => (
          <button
            key={opt.value}
            className={`seg-btn ${value === opt.value ? "seg-btn--active" : ""}`}
            onClick={() => onChange(param.key, opt.value)}
            aria-pressed={value === opt.value}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
