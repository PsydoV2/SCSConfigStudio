import { GameParameters, ParameterSlider } from "@renderer/App";
import ParamSlider from "./ParamSlider";

interface SectionProps {
  activeValues: GameParameters;
  updateValue: (key: string, value: string) => void;
}

export default function Section({ activeValues, updateValue }: SectionProps) {
  const parameters: ParameterSlider[] = [
    {
      label: "Traffic Density",
      tooltip:
        "Go beyond the standard 1.0 limit for massive rush hour traffic.",
      min: 0,
      max: 10,
      step: 0.1,
      category: "world",
      key: "traffic",
    },
    {
      label: "LOD Factor",
      tooltip:
        "Improve visual quality by rendering high-detail models further away.",
      min: 0.5,
      max: 3,
      step: 0.1,
      category: "world",
      key: "lod",
    },
    {
      label: "Tree Distance",
      tooltip:
        "Extend the rendering distance for vegetation to eliminate pop-ins.",
      min: 500,
      max: 5000,
      step: 100,
      category: "world",
      key: "tree",
    },
    {
      label: "Buffer Page Size",
      tooltip:
        "Increase the engine's memory buffer (critical for heavy map mods).",
      min: 50,
      max: 500,
      step: 10,
      category: "performance",
      key: "buffer",
    },
    {
      label: "Sunshadow Texture",
      tooltip: "Force higher resolution shadows for a crisper look.",
      min: 1024,
      max: 8192,
      step: 1024,
      category: "performance",
      key: "shadow",
    },
    {
      label: "FPS Limiter",
      tooltip: "Set a custom frame rate cap independent of VSync.",
      min: 30,
      max: 240,
      step: 10,
      category: "performance",
      key: "fps",
    },
    {
      label: "Flyspeed",
      tooltip: "Precisely adjust how fast your free camera moves.",
      min: 1,
      max: 100,
      step: 1,
      category: "dev",
      key: "flyspeed",
    },
  ];

  return (
    <section>
      {parameters.map((parameter: ParameterSlider, index) => (
        <ParamSlider
          param={parameter}
          key={index}
          updateValue={updateValue}
          currentValue={activeValues[parameter.key]}
        ></ParamSlider>
      ))}
    </section>
  );
}
