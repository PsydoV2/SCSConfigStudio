/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const [activeTab, setActiveTab] = useState("ets2");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    isError: false,
  });

  const [ets2Values, setEts2Values] = useState({
    traffic: 1.0,
    lod: 1.0,
    tree: 1000,
    buffer: 100,
    shadow: 2048,
    fps: 60,
    flyspeed: 10,
  });

  const [atsValues, setAtsValues] = useState({
    traffic: 1.0,
    lod: 1.0,
    tree: 1000,
    buffer: 100,
    shadow: 2048,
    fps: 60,
    flyspeed: 10,
  });

  const parameters = {
    traffic: {
      label: "Traffic Density",
      tooltip:
        "Go beyond the standard 1.0 limit for massive rush hour traffic.",
      min: 0,
      max: 10,
      step: 0.1,
      category: "world",
    },
    lod: {
      label: "LOD Factor",
      tooltip:
        "Improve visual quality by rendering high-detail models further away.",
      min: 0.5,
      max: 3,
      step: 0.1,
      category: "world",
    },
    tree: {
      label: "Tree Distance",
      tooltip:
        "Extend the rendering distance for vegetation to eliminate pop-ins.",
      min: 500,
      max: 5000,
      step: 100,
      category: "world",
    },
    buffer: {
      label: "Buffer Page Size",
      tooltip:
        "Increase the engine's memory buffer (critical for heavy map mods).",
      min: 50,
      max: 500,
      step: 10,
      category: "performance",
    },
    shadow: {
      label: "Sunshadow Texture",
      tooltip: "Force higher resolution shadows for a crisper look.",
      min: 1024,
      max: 8192,
      step: 1024,
      category: "performance",
    },
    fps: {
      label: "FPS Limiter",
      tooltip: "Set a custom frame rate cap independent of VSync.",
      min: 30,
      max: 240,
      step: 10,
      category: "performance",
    },
    flyspeed: {
      label: "Flyspeed",
      tooltip: "Precisely adjust how fast your free camera moves.",
      min: 1,
      max: 100,
      step: 1,
      category: "dev",
    },
  };

  const showToast = (message, isError = false) => {
    setToast({ show: true, message, isError });
    setTimeout(
      () => setToast({ show: false, message: "", isError: false }),
      3000
    );
  };

  const handleSave = () => {
    showToast("Settings saved successfully");
  };

  const handleUndo = () => {
    showToast("Changes reverted");
  };

  const handleReset = () => {
    const defaults = {
      traffic: 1.0,
      lod: 1.0,
      tree: 1000,
      buffer: 100,
      shadow: 2048,
      fps: 60,
      flyspeed: 10,
    };

    if (activeTab === "ets2") {
      setEts2Values(defaults);
    } else {
      setAtsValues(defaults);
    }
    showToast("Settings reset to default");
  };

  const updateValue = (key, value) => {
    if (activeTab === "ets2") {
      setEts2Values((prev) => ({ ...prev, [key]: parseFloat(value) }));
    } else {
      setAtsValues((prev) => ({ ...prev, [key]: parseFloat(value) }));
    }
  };

  const currentValues = activeTab === "ets2" ? ets2Values : atsValues;

  const ParamSlider = ({ paramKey, config }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="param-item"
      >
        <div className="param-header">
          <div className="param-label">
            <span>{config.label}</span>
            <div
              className="info-icon"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              i
              <AnimatePresence>
                {showTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="tooltip"
                  >
                    {config.tooltip}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <motion.div
            key={currentValues[paramKey]}
            initial={{ scale: 1.2, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="param-value"
          >
            {currentValues[paramKey]}
          </motion.div>
        </div>
        <input
          type="range"
          min={config.min}
          max={config.max}
          step={config.step}
          value={currentValues[paramKey]}
          onChange={(e) => updateValue(paramKey, e.target.value)}
          className="slider"
        />
      </motion.div>
    );
  };

  const Section = ({ title, category }) => {
    const params = Object.entries(parameters).filter(
      ([_, config]) => config.category === category
    );

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="section"
      >
        <h2 className="section-title">{title}</h2>
        {params.map(([key, config]) => (
          <ParamSlider key={key} paramKey={key} config={config} />
        ))}
      </motion.div>
    );
  };

  return (
    <div className="app">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
          background: hsl(240, 28%, 14%);
          color: hsl(0, 0%, 90%);
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
        }

        .app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* Header */
        .header {
          padding: 1.5rem 2rem;
          border-bottom: 1px solid hsl(240, 28%, 19%);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-icon {
          font-size: 1.5rem;
        }

        .logo-text h1 {
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: -0.02em;
        }

        .version {
          font-size: 0.625rem;
          color: hsl(0, 0%, 50%);
          font-weight: 400;
          letter-spacing: 0.05em;
        }

        /* Tabs */
        .tabs {
          display: flex;
          gap: 0.25rem;
          padding: 0 2rem;
          border-bottom: 1px solid hsl(240, 28%, 19%);
        }

        .tab {
          padding: 0.75rem 1.5rem;
          background: transparent;
          border: none;
          color: hsl(0, 0%, 60%);
          cursor: pointer;
          font-size: 0.8125rem;
          font-weight: 500;
          position: relative;
          transition: color 150ms ease;
        }

        .tab:hover {
          color: hsl(0, 0%, 90%);
        }

        .tab.active {
          color: hsl(0, 0%, 90%);
        }

        .tab-indicator {
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: hsl(35, 100%, 50%);
        }

        /* Content */
        .content {
          flex: 1;
          padding: 2rem;
          max-width: 900px;
          width: 100%;
          margin: 0 auto;
        }

        .section {
          margin-bottom: 3rem;
        }

        .section-title {
          font-size: 0.6875rem;
          font-weight: 600;
          color: hsl(0, 0%, 50%);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1.5rem;
        }

        /* Parameter Item */
        .param-item {
          margin-bottom: 2rem;
        }

        .param-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .param-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 400;
          color: hsl(0, 0%, 90%);
        }

        .info-icon {
          width: 0.875rem;
          height: 0.875rem;
          background: hsl(240, 28%, 19%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.625rem;
          color: hsl(0, 0%, 60%);
          cursor: help;
          position: relative;
          font-style: italic;
          font-weight: 600;
          transition: all 150ms ease;
        }

        .info-icon:hover {
          background: hsl(240, 28%, 22%);
          color: hsl(35, 100%, 50%);
        }

        .tooltip {
          position: absolute;
          bottom: calc(100% + 0.5rem);
          left: 50%;
          transform: translateX(-50%);
          background: hsl(240, 28%, 19%);
          color: hsl(0, 0%, 90%);
          padding: 0.5rem 0.75rem;
          border-radius: 0.375rem;
          font-size: 0.6875rem;
          line-height: 1.4;
          width: 200px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          z-index: 100;
          pointer-events: none;
          font-style: normal;
          font-weight: 400;
        }

        .param-value {
          font-size: 0.875rem;
          color: hsl(0, 0%, 90%);
          font-weight: 500;
          min-width: 3rem;
          text-align: right;
          font-variant-numeric: tabular-nums;
        }

        /* Slider */
        .slider {
          width: 100%;
          height: 2px;
          background: hsl(240, 28%, 19%);
          border-radius: 2px;
          outline: none;
          -webkit-appearance: none;
          cursor: pointer;
          transition: background 150ms ease;
        }

        .slider:hover {
          background: hsl(240, 28%, 22%);
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 1rem;
          height: 1rem;
          background: hsl(0, 0%, 90%);
          border-radius: 50%;
          cursor: grab;
          transition: all 100ms ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }

        .slider::-webkit-slider-thumb:hover {
          background: hsl(35, 100%, 50%);
          transform: scale(1.1);
        }

        .slider::-webkit-slider-thumb:active {
          cursor: grabbing;
          transform: scale(0.95);
        }

        .slider::-moz-range-thumb {
          width: 1rem;
          height: 1rem;
          background: hsl(0, 0%, 90%);
          border-radius: 50%;
          cursor: grab;
          border: none;
          transition: all 100ms ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }

        .slider::-moz-range-thumb:hover {
          background: hsl(35, 100%, 50%);
          transform: scale(1.1);
        }

        .slider::-moz-range-thumb:active {
          cursor: grabbing;
          transform: scale(0.95);
        }

        /* Actions */
        .actions {
          display: flex;
          gap: 0.5rem;
          padding: 1.5rem 2rem;
          border-top: 1px solid hsl(240, 28%, 19%);
          justify-content: flex-end;
        }

        .btn {
          padding: 0.625rem 1.25rem;
          border: none;
          border-radius: 0.375rem;
          font-size: 0.8125rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 150ms ease;
          background: transparent;
          color: hsl(0, 0%, 70%);
        }

        .btn:hover {
          color: hsl(0, 0%, 90%);
          background: hsl(240, 28%, 19%);
        }

        .btn:active {
          transform: scale(0.98);
        }

        .btn-primary {
          background: hsl(0, 0%, 90%);
          color: hsl(240, 28%, 14%);
        }

        .btn-primary:hover {
          background: hsl(0, 0%, 100%);
        }

        /* Toast */
        .toast {
          position: fixed;
          top: 1.5rem;
          right: 1.5rem;
          background: hsl(240, 28%, 19%);
          color: hsl(0, 0%, 90%);
          padding: 0.75rem 1.25rem;
          border-radius: 0.5rem;
          font-size: 0.8125rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          z-index: 1000;
          border: 1px solid hsl(240, 28%, 22%);
        }

        .toast.error {
          background: hsl(0, 70%, 50%);
          color: white;
          border-color: hsl(0, 70%, 40%);
        }

        /* Footer */
        .footer {
          text-align: center;
          padding: 1.5rem;
          color: hsl(0, 0%, 40%);
          font-size: 0.6875rem;
          border-top: 1px solid hsl(240, 28%, 19%);
        }

        .footer a {
          color: hsl(0, 0%, 60%);
          text-decoration: none;
          transition: color 150ms ease;
        }

        .footer a:hover {
          color: hsl(35, 100%, 50%);
        }
      `}</style>

      {/* Header */}
      <div className="header">
        <div className="logo">
          <div className="logo-icon">🚛</div>
          <div className="logo-text">
            <h1>SCS Config Studio</h1>
            <div className="version">v1.0.0</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "ets2" ? "active" : ""}`}
          onClick={() => setActiveTab("ets2")}
        >
          Euro Truck Simulator 2
          {activeTab === "ets2" && (
            <motion.div
              layoutId="tab-indicator"
              className="tab-indicator"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </button>
        <button
          className={`tab ${activeTab === "ats" ? "active" : ""}`}
          onClick={() => setActiveTab("ats")}
        >
          American Truck Simulator
          {activeTab === "ats" && (
            <motion.div
              layoutId="tab-indicator"
              className="tab-indicator"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="content"
        >
          <Section title="Traffic & World" category="world" />
          <Section title="Technical & Performance" category="performance" />
          <Section title="Developer Tools" category="dev" />
        </motion.div>
      </AnimatePresence>

      {/* Actions */}
      <div className="actions">
        <button className="btn" onClick={handleReset}>
          Reset
        </button>
        <button className="btn" onClick={handleUndo}>
          Undo
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          Save Changes
        </button>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`toast ${toast.isError ? "error" : ""}`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="footer">
        © 2025 SCS Config Studio · MIT License ·{" "}
        <a href="https://github.com">GitHub</a>
      </div>
    </div>
  );
};

export default App;
