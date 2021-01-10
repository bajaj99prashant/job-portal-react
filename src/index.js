import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import DataLayer from "./DataLayer";

ReactDOM.render(
  <React.StrictMode>
    <DataLayer>
      <App />
    </DataLayer>
  </React.StrictMode>,
  document.getElementById("root")
);
