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
  const { isUserAuthenticated, setPageIsPublicValue } = useContext(AuthContext);

  useState(() => {
    isUserAuthenticated();
    // console.log(props);
    let isPublic = false;
    ROUTES.map((route) => {
      if (
        route.path.split("/").join("") ===
        props.location.pathname.split("/").join("")
      ) {
        isPublic = route.isPublic ? true : false;
      }
      return route;
    });
    setPageIsPublicValue(isPublic);
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
      <LocalApp isAuthenticated={isUserAuthenticated()}></LocalApp>
    </>
  );
};

export default withRouter(hot(module)(App));

const LocalApp = (props) => {
  const { isAuthenticated, isUserAuthenticated } = useContext(AuthContext);
  return (
    <Switch>
      {renderRoutes(ROUTES, {
        isAuthenticated: props.isAuthenticated,
        deep: false,
      })}
      <Route component={() => <Redirect to="/" />} />
    </Switch>
  );
};
