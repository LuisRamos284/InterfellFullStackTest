import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import Home from "./layout/home";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => (
  <>
    <Home /> <ToastContainer />
  </>
);

createRoot(document.getElementById("app")!).render(<App />);
