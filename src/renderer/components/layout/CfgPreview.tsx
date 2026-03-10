import { PARAMETERS } from "../../../constants/parameters";
import type { ParamValues } from "../../../shared/types";
import { Button } from "../ui/Button";

interface CfgPreviewProps {
  values:    ParamValues;
  onCopy:    () => void;
}

export function CfgPreview({ values, onCopy }: CfgPreviewProps) {
  const lines = PARAMETERS.map(
    (p) => `uset ${p.cfgKey} "${values[p.key] ?? p.defaultValue}"`
  ).join("\n");

  return (
    <div className="cfg-preview">
      <div className="cfg-preview__header">
        <span className="cfg-preview__title">config.cfg preview</span>
        <Button variant="ghost" size="sm" onClick={onCopy}>
          Copy all
        </Button>
      </div>
      <pre className="cfg-preview__code">{lines}</pre>
    </div>
  );
}
