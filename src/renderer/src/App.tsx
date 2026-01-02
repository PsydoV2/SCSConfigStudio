import Versions from "./components/Versions";
import electronLogo from "./assets/electron.svg";
import { useEffect, useState } from "react";

interface ISystemInfo {
  platform: string;
  arch: string;
  version: string;
}

function App(): React.JSX.Element {
  const notyHandle = (): void => window.api.sendNotification("Ping");

  const [info, setInfo] = useState<ISystemInfo>();

  useEffect(() => {
    // Sicherer Aufruf über die Bridge
    window.api.getSystemInfo().then(setInfo);
  }, []);

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
      </div>
      <div>
        {info && <pre>{JSON.stringify(info, null, 2)}</pre>}

        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={notyHandle}>
            Send Noty
          </a>
        </div>
      </div>
      <Versions></Versions>
    </>
  );
}

export default App;
