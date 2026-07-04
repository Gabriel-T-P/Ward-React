import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { PremiumProvider } from "./context/PremiumProvider.tsx";
import "leaflet/dist/leaflet.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <PremiumProvider>
        <App />
      </PremiumProvider>
    </BrowserRouter>
  </StrictMode>,
);
