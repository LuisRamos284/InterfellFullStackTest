import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import Home from "./layout/home";

const App: React.FC = () => <Home />;

createRoot(document.getElementById("app")!).render(<App />);
