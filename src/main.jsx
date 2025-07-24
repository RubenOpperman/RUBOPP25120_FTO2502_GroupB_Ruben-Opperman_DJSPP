import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AudioProvider } from "./components/AudioContext.jsx";
import { ThemeProvider } from "./components/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AudioProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </AudioProvider>
  </StrictMode>
);
