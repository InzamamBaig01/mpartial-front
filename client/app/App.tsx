import React, { useContext, useEffect } from "react";
import { renderRoutes } from "../utils/render-routes/render-routes.util";
import {
  withRouter,
  RouteComponentProps,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ROUTES } from "./pages/routes";
import { hot } from "react-hot-loader";
import { AuthContext } from "../contexts/authContext";
import * as Sentry from '@sentry/browser';

import appConfig from '../appconfig.json';
const App: React.FC<RouteComponentProps<any>> = (props) => {
  const {
    isUserAuthenticated,
    setPageIsPublicValue,
    isADAuthenticated,
    setPageIsAD,
    setRouteChange
  } = useContext(AuthContext);

  useEffect(() => {
    isUserAuthenticated();
    let isPublic = false;
    let isAD = false;
    ROUTES.map((route) => {
      if (
        route.path.split("/").join("") ===
        props.location.pathname.split("/").join("")
      ) {
        isPublic = route.checkLogin ? true : false;
        isAD = route.checkADLogin ? true : false;
      }
      return route;
    });
    setPageIsPublicValue(isAD ? undefined : isPublic);
    setPageIsAD(isAD);
    Sentry.init({ dsn: appConfig.sentryDSN });

  }, []);

  useEffect(() => {
    isUserAuthenticated();
    let isPublic = false;
    let isAD = false;
    ROUTES.map((route) => {
      if (
        route.path.split("/").join("") ===
        props.location.pathname.split("/").join("")
      ) {
        isPublic = route.checkLogin ? true : false;
        isAD = route.checkADLogin ? true : false;
      }
      return route;
    });
    setPageIsPublicValue(isAD ? undefined : isPublic);
    setRouteChange(Math.random())
    setPageIsAD(isAD);
  }, [props.location.pathname])

  return (
    <>

      <LocalApp
        isAuthenticated={isUserAuthenticated()}
        isADAuthenticated={isADAuthenticated()}
      ></LocalApp>
    </>
  );
};

export default withRouter(hot(module)(App));

const LocalApp = (props) => {
  return (
    <Switch>
      {renderRoutes(ROUTES, {
        isAuthenticated: props.isAuthenticated,
        isADAuthenticated: props.isADAuthenticated,
        deep: false,
      })}
      <Route component={() => <Redirect to="/" />} />
    </Switch>
  );
};
