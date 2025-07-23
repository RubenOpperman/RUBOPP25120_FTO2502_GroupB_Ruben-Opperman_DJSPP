import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AudioProvider } from "./components/AudioContext.jsx";
import { ThemeProvider } from "./components/ThemeContext";

/**
 * Entry point for the React application.
 *
 * - Wraps the entire app inside React's StrictMode to help identify potential issues.
 * - Renders the root component `<App />` into the DOM element with the ID `root`.
 *
 */

// Select the root DOM element and render the application
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
