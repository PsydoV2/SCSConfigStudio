import { useEffect, useState, useMemo } from "react";
import { GrDocumentConfig } from "react-icons/gr";
import { motion } from "framer-motion";
import "./App.css";
import { FaSave, FaTrafficLight } from "react-icons/fa";
import { RxReset } from "react-icons/rx";
import { FaPersonWalking } from "react-icons/fa6";

// type SimKey = "ats" | "ets";

type SimState = {
  hasConfig: boolean;
  traffic: number;
  pedestrian: number;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28 } },
};

export default function App() {
  const [ats, setAts] = useState<SimState>({
    hasConfig: false,
    traffic: 1,
    pedestrian: 1,
  });
  const [ets, setEts] = useState<SimState>({
    hasConfig: false,
    traffic: 1,
    pedestrian: 1,
  });
  const [loading, setLoading] = useState(true);

  // Initial load (kein Loop)
  useEffect(() => {
    (async () => {
      window.api.checkConfig((result: { ats: boolean; ets: boolean }) => {
        setAts((s) => ({ ...s, hasConfig: result.ats }));
        setEts((s) => ({ ...s, hasConfig: result.ets }));

        if (result.ats) {
          window.api.readAtsValuesFromConfig(
            (r: { traffic: number; pedestrian: number }) =>
              setAts({
                hasConfig: true,
                traffic: r.traffic,
                pedestrian: r.pedestrian,
              })
          );
        }
        if (result.ets) {
          window.api.readEtsValuesFromConfig(
            (r: { traffic: number; pedestrian: number }) =>
              setEts({
                hasConfig: true,
                traffic: r.traffic,
                pedestrian: r.pedestrian,
              })
          );
        }
        setLoading(false);
      });
    })();
  }, []);

  const saveAts = () =>
    window.api.setAtsValues({
      traffic: ats.traffic,
      pedestrian: ats.pedestrian,
    });
  const saveEts = () =>
    window.api.setEtsValues({
      traffic: ets.traffic,
      pedestrian: ets.pedestrian,
    });

  const resetAts = () => {
    const v = { traffic: 1, pedestrian: 1 };
    setAts((s) => ({ ...s, ...v }));
    window.api.setAtsValues(v);
  };
  const resetEts = () => {
    const v = { traffic: 1, pedestrian: 1 };
    setEts((s) => ({ ...s, ...v }));
    window.api.setEtsValues(v);
  };

  return (
    <div className="appRoot">
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.25 } }}
        className="topbar"
      >
        <span className="logo">Traffic Density Changer</span>
        <span className="badge">ATS / ETS2</span>
      </motion.nav>

      <main className="grid">
        <GameCard
          title="American Truck Simulator"
          state={ats}
          onChange={(patch) => setAts((s) => ({ ...s, ...patch }))}
          onSave={saveAts}
          onReset={resetAts}
          loading={loading}
        />
        <GameCard
          title="Euro Truck Simulator 2"
          state={ets}
          onChange={(patch) => setEts((s) => ({ ...s, ...patch }))}
          onSave={saveEts}
          onReset={resetEts}
          loading={loading}
        />
      </main>
    </div>
  );
}

function GameCard({
  title,
  state,
  onChange,
  onSave,
  onReset,
  loading,
}: {
  title: string;
  state: { hasConfig: boolean; traffic: number; pedestrian: number };
  onChange: (patch: Partial<{ traffic: number; pedestrian: number }>) => void;
  onSave: () => void;
  onReset: () => void;
  loading: boolean;
}) {
  const disabled = !state.hasConfig;
  const max = 10;

  const header = useMemo(
    () => (
      <div className="cardHeader">
        <h2>{title}</h2>
        <div className="pillGroup" aria-hidden>
          <span className="pill">
            <FaTrafficLight /> Traffic <strong>{state.traffic}</strong>/{max}
          </span>
          <span className="pill">
            <FaPersonWalking /> Pedestrian <strong>{state.pedestrian}</strong>/
            {max}
          </span>
        </div>
      </div>
    ),
    [title, state.traffic, state.pedestrian]
  );

  return (
    <motion.section
      className="card"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      layout
    >
      {header}

      <div className="field">
        <label htmlFor={`${title}-traffic`}>Traffic</label>
        <div className="rangeRow">
          <input
            id={`${title}-traffic`}
            type="range"
            min={0}
            max={max}
            step={1}
            value={state.traffic}
            onChange={(e) => onChange({ traffic: Number(e.target.value) })}
            disabled={disabled}
          />
          <span className="value">{state.traffic}</span>
        </div>
      </div>

      <div className="field">
        <label htmlFor={`${title}-pedestrian`}>Pedestrian</label>
        <div className="rangeRow">
          <input
            id={`${title}-pedestrian`}
            type="range"
            min={0}
            max={max}
            step={1}
            value={state.pedestrian}
            onChange={(e) => onChange({ pedestrian: Number(e.target.value) })}
            disabled={disabled}
          />
          <span className="value">{state.pedestrian}</span>
        </div>
      </div>

      <div className="actions">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="btn primary"
          onClick={onSave}
          disabled={disabled}
        >
          <FaSave /> Save
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="btn ghost"
          onClick={onReset}
          disabled={disabled}
        >
          <RxReset /> Reset
        </motion.button>
      </div>

      {loading && (
        <motion.div
          className="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="loader"></div>
        </motion.div>
      )}

      {!loading && disabled && (
        <motion.div
          className="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <GrDocumentConfig />
          <p>No config file found!</p>
        </motion.div>
      )}
    </motion.section>
  );
}
