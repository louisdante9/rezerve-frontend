import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, role, removeToken, requiredRoles, test, ...rest }) => {
  const userHasRequiredRole = requiredRoles.includes(role);
  return (
    <Route {...rest} render={props => (
     
        localStorage.getItem('token') && userHasRequiredRole
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
    )} />
  )
}