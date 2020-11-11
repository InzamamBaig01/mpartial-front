import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./app/App";
import * as serviceWorker from "./serviceWorker";
import history from "./utils/history";
import { Router } from "react-router-dom";

import AuthContext from "./contexts/authContext";
import AppContext from "./contexts/appContext";
import AppAlertsContext from "./contexts/appAlertsContext";

ReactDOM.render(
  <AppAlertsContext>
    <AuthContext>
      <AppContext>
        <Router history={history}>
          <App />
        </Router>
      </AppContext>
    </AuthContext>
  </AppAlertsContext>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
