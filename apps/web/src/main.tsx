import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import typescriptLogo from "/typescript.svg";
import { TEST_MESSAGE } from "commons";

const App: React.FC = () => (
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" className="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img
        src={typescriptLogo}
        className="logo vanilla"
        alt="TypeScript logo"
      />
    </a>

    <div className="card">{TEST_MESSAGE}</div>
  </div>
);

createRoot(document.getElementById("app")!).render(<App />);
