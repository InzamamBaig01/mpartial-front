import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

/**
 * Private Route component, modified from Route
 */
const PrivateRoute = ({
 component: Component, isAuthenticated, redirectPath, ...rest
}) => {
  return (
    <Route
      { ...rest }
      render={
        (props) => {
          return (
            isAuthenticated ?
              // * If user is authenticated, render the page
              <Component { ...props } /> :
              // * If user is not authenticated, redirect to login
              <Redirect to={ { pathname: redirectPath, state: { from: props.location } } } />
          )
        }
      }
    />
  )
};

/**
 * Recursively render routes
 */
//TODO: : RouteConfig[]
export const renderRoutes = (
  routes,
  opts: { deep: boolean, isAuthenticated: boolean },
) => routes.map((route) => {
    // * Recursively render nested child routes if 'deep=true'
    if (opts.deep && route.routes) {
      return [renderRoutes([route], opts)].concat(renderRoutes(route.routes, opts));
    }

    let routeComponent;
    if (route.component) {
      // * If route is public, render Route component
      if(route.isLogin){
        routeComponent = (
          <PrivateRoute
            key={ route.slug }
            exact={ route.isExact }
            path={ route.path }
            component={ route.component }
            isAuthenticated={ !opts.isAuthenticated }
            redirectPath={ route.redirectTo }
          />
        );
      }else{
        
        if (route.isPublic) {
          routeComponent = (
            <Route
              key={ route.slug }
              exact={ route.isExact }
              path={ route.path }
              component={ route.component }
            />
          );
        // * Otherwise, render PrivateRoute component
        } else {
          routeComponent = (
            <PrivateRoute
              key={ route.slug }
              exact={ route.isExact }
              path={ route.path }
              component={ route.component }
              isAuthenticated={ opts.isAuthenticated }
              redirectPath={ route.redirectTo }
            />
          );
        }
        
      }
    }
    return routeComponent;
  });
