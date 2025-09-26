import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";  
import "./index.css";
import App from "./App";  

const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(e) {
  if (e.matches) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
applyTheme(mediaQuery);
mediaQuery.addEventListener("change", applyTheme);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App /> 
    </BrowserRouter>
  </React.StrictMode>
);
