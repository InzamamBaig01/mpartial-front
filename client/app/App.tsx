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
import SEO from "react-seo-component";

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
        isPublic = route.isPublic ? true : false;
        isAD = route.isAD ? true : false;
      }
      return route;
    });
    if (isAD) {
      setPageIsAD(isAD);
    } else {
      setPageIsPublicValue(isPublic);
    }
  });

  return (
    <>
      <SEO
        title={"mpartial"}
        titleTemplate={" - Keep Building"}
        description={
          "mpartial - unbiased 3rd-party remote estimating engine that leverages Matterport's geospatial data to generate Xactimate estimates that are Actionable Insights compliant, consistent and poised for approval without hesitation."
        }
        image={
          "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/04/27225255/mpartial_logo.png"
        }
        pathname={"www.mpartial.io"}
        siteLanguage={"English"}
        siteLocale={"US"}
        twitterUsername={"twitterUsername"}
      />
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
