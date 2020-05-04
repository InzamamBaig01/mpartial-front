import React, { useContext, useState, useEffect } from "react";
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
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';
import * as Sentry from '@sentry/browser';

import appConfig from '../appconfig.json';
const App: React.FC<RouteComponentProps<any>> = (props) => {
  const {
    isUserAuthenticated,
    setPageIsPublicValue,
    isADAuthenticated,
    setPageIsAD,
  } = useContext(AuthContext);

  useEffect(() => {
    isUserAuthenticated();
    // console.log(props);
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
    Sentry.init({dsn: appConfig.sentryDSN});

  },[]);

  return (
    <>
      <GoogleReCaptchaProvider
        reCaptchaKey={appConfig.captchaKey}
      >
        <GoogleReCaptcha onVerify={token => console.log(token)} />
        <LocalApp
          isAuthenticated={isUserAuthenticated()}
          isADAuthenticated={isADAuthenticated()}
        ></LocalApp>
      </GoogleReCaptchaProvider>
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
