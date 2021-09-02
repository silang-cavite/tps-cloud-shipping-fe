import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { ContextAPI } from "../Middleware/Context";
import UnprotectedRoutes from "./UnprotectedRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import NotFoundRoute from "./NotFound";
import Dashboard from "../Pages/Dashboard";
import Login from "../Pages/Login";

const Routes = () => {
    const Auth = useContext(ContextAPI)
    console.log(Auth)
    return (
      <Switch>
        <UnprotectedRoutes path="/" exact auth={Auth.auth} component={Login} />
        <ProtectedRoutes path="/dashboard" auth={Auth.auth} component={Dashboard} />
        <Route path="*" component={NotFoundRoute} />
      </Switch>
    )
};

export default Routes;
