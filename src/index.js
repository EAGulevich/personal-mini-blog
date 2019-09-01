import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App.js";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
