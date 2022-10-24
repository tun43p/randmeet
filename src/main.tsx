import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./style.css";

// TODO(tun43p): Setup ESLint
// TODO(tun43p): Setup Prettier
// TODO(tun43p): Download results as CSV file

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
