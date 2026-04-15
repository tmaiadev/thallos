import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ThallOS from "./thallos";
import "./theme.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThallOS />
  </StrictMode>,
);
