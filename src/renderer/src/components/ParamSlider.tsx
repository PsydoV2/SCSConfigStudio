import { ParameterSlider } from "@renderer/App";
import { FaInfo } from "react-icons/fa6";

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
    <div className="paramSlider">
      <div className="paramSliderHeader">
        <h3>{param.label}</h3>
        <div className="infoIcon">
          <FaInfo />
        </div>
      </div>
      <div>
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
    </div>
  );
}
