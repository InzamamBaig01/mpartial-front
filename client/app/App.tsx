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

const App: React.FC<RouteComponentProps<any>> = (props) => {
  const {
    isUserAuthenticated,
    setPageIsPublicValue,
    isADAuthenticated,
    setPageIsAD,
  } = useContext(AuthContext);

  useState(() => {
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
  });

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
