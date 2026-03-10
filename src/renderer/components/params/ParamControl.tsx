import type { ParameterDef } from "../../../shared/types";
import { SliderParam } from "./SliderParam";
import { ToggleParam } from "./ToggleParam";
import { SelectParam } from "./SelectParam";

interface ParamControlProps {
  param: ParameterDef;
  value: number;
  savedValue: number;
  onChange: (key: string, value: number) => void;
}

export function ParamControl({
  param,
  value,
  savedValue,
  onChange,
}: ParamControlProps) {
  switch (param.type) {
    case "slider":
      return (
        <SliderParam
          param={param}
          value={value}
          savedValue={savedValue}
          onChange={onChange}
        />
      );
    case "toggle":
      return (
        <ToggleParam
          param={param}
          value={value}
          savedValue={savedValue}
          onChange={onChange}
        />
      );
    case "select":
      return (
        <SelectParam
          param={param}
          value={value}
          savedValue={savedValue}
          onChange={onChange}
        />
      );
  }
}
