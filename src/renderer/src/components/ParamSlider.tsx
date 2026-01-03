import { ParameterSlider } from "@renderer/App";

interface ParamSliderProps {
  param: ParameterSlider;
  currentValue: number;
  updateValue: (key: string, value: string) => void;
}

export default function ParamSlider({
  param,
  currentValue,
  updateValue,
}: ParamSliderProps) {
  return (
    <div>
      <span>{param.label}</span>
      <input
        type="range"
        min={param.min}
        max={param.max}
        step={param.step}
        value={currentValue}
        onChange={(e) => updateValue(param.key, e.target.value)}
      />
      <span>{currentValue}</span>
    </div>
  );
}
