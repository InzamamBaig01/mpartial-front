import React, { useContext, useState, useEffect } from "react";
import { renderRoutes } from "../utils/render-routes/render-routes.util";
import {
  withRouter,
  RouteComponentProps,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { ROUTES } from "./pages/routes";
import { hot } from "react-hot-loader";
import { AuthContext } from "../contexts/authContext";

const App: React.FC<RouteComponentProps<any>> = props => {
  const { isUserAuthenticated, setPageIsPublicValue } = useContext(AuthContext);

  useState(() => {
    isUserAuthenticated();
    // console.log(props);
    let isPublic = false;
    ROUTES.map(route => {
      if (route.path.split("/").join("") === props.location.pathname.split("/").join("")) {
        isPublic = route.isPublic ? true : false;
      }
      return route;
    });
    setPageIsPublicValue(isPublic);
  });

  return (
    <>
      <LocalApp isAuthenticated={true}></LocalApp>
    </>
  );
};

export default withRouter(hot(module)(App));

const LocalApp = props => {
  const { isAuthenticated, isUserAuthenticated } = useContext(AuthContext);
  return (
    <Switch>
      {renderRoutes(ROUTES, {
        isAuthenticated: props.isAuthenticated,
        deep: false
      })}
      <Route component={() => <Redirect to="/" />} />
    </Switch>
  );
};
