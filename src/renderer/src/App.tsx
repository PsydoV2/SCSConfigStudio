import { useState } from "react";
import { useToast } from "./context/ToastProvider";
import Section from "./components/Section";

export interface ParameterSlider {
  label: string;
  tooltip: string;
  min: number;
  max: number;
  step: number;
  category: string;
  key: string;
}

export interface GameParameters {
  traffic: number;
  lod: number;
  tree: number;
  buffer: number;
  shadow: number;
  fps: number;
  flyspeed: number;
}

const App = () => {
  const parameterDefaults: GameParameters = {
    traffic: 1.0,
    lod: 1.0,
    tree: 1000,
    buffer: 100,
    shadow: 2048,
    fps: 60,
    flyspeed: 10,
  };

  const [activeTab, setActiveTab] = useState<string>("ets2");

  // TODO So werden immer die Defaults geladen aber nicht die aus der Config wenn etwas geändert wurde
  const [ets2Values, setEts2Values] =
    useState<GameParameters>(parameterDefaults);

  const [atsValues, setAtsValues] = useState<GameParameters>(parameterDefaults);

  const { showToast } = useToast();

  const handleSave = () => {
    // TODO handleSave implementieren
    showToast("Settings saved successfully", "success");
  };

  const handleUndo = () => {
    // TODO handleUndo implementieren
    showToast("Changes reverted", "success");
  };

  const handleReset = () => {
    if (activeTab === "ets2") {
      setEts2Values(parameterDefaults);
    } else {
      setAtsValues(parameterDefaults);
    }

    // TODO Hier wird bisher nur der State gesetzt aber dann nicht in die File gespeichert

    showToast("Settings reset to default", "success");
  };

  const updateValue = (key: string, value: string) => {
    if (activeTab === "ets2") {
      setEts2Values((prev) => ({ ...prev, [key]: parseFloat(value) }));
    } else {
      setAtsValues((prev) => ({ ...prev, [key]: parseFloat(value) }));
    }
  };

  return (
    <>
      <header>
        <img src="./assets/icon.png" alt="Logo" />
      </header>
      <Section
        activeValues={activeTab === "ets2" ? ets2Values : atsValues}
        updateValue={updateValue}
      ></Section>
      <footer></footer>
    </>
  );
};

export default App;
