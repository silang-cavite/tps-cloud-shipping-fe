// NPM Module
import React from "react";
import { Route, Redirect } from "react-router-dom";

// For unauthorized components such as the: Landing Page, Services Page, Sign in and Sign up Pages and etc.
const UnprotectedRoutes = ({ auth, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={() => (
                // If Auth is false then redirect to Unprotected Components
                !auth ?
                    <Component />
                :
                    <Redirect to="/dashboard/" />
            )}
        />
    )
};
  
export default UnprotectedRoutes;