import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { ContextAPI } from "src/Middleware/Context";
import UnprotectedRoutes from "./UnprotectedRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import NotFoundRoute from "./NotFound";
import DashboardLayout from "./Dashboard/DashboardLayout";

import Landing from "src/Components/Homepage/Landing";
import Services from "src/Components/Homepage/Services" ;
import Contact from "src/Components/Homepage/Contact";
import Team from "src/Components/Homepage/Team";
import Partner from "src/Components/Homepage/Partner";

import SignIn from "src/Components/Authentication/SignIn";
import SignUp from "src/Components/Authentication/SignUp";

import DashboardHome from "src/Components/Dashboard/DashboardHome";

import TransactionHistory from "src/Components/Dashboard/Transaction/TransactionHistory";
import TransactionID from "src/Components/Dashboard/Transaction/TransactionID";

import QueueList from "src/Components/Dashboard/Queue/QueueList";

import TasksList from "src/Components/Dashboard/Tasks/TasksList";

import DashboardLogout from "src/Components/Dashboard/DashboardLogout";

const Routes = () => {
    const Auth = useContext(ContextAPI)

    return (
        <Switch>
            <UnprotectedRoutes path="/" exact auth={Auth.auth} component={Landing} />
            <UnprotectedRoutes path="/services" exact auth={Auth.auth} component={Services} />
            <UnprotectedRoutes path="/contact" exact auth={Auth.auth} component={Contact} />
            <UnprotectedRoutes path="/team" exact auth={Auth.auth} component={Team} />
            <UnprotectedRoutes path="/become-a-partner" exact auth={Auth.auth} component={Partner} />

            <UnprotectedRoutes path="/sign-in" exact auth={Auth.auth} component={SignIn} />
            <UnprotectedRoutes path="/sign-up" exact auth={Auth.auth} component={SignUp} />

            <Route path="/dashboard" render={(props)=>(
                <DashboardLayout {...props}>
                    <Switch>
                        <ProtectedRoutes path="/dashboard/" auth={Auth.auth} exact component={DashboardHome}/>
                        <ProtectedRoutes path="/dashboard/transaction" auth={Auth.auth} exact component={TransactionHistory}/>
                        <ProtectedRoutes path="/dashboard/transaction/:id" auth={Auth.auth} exact component={TransactionID}/>
                        <ProtectedRoutes path="/dashboard/queue" auth={Auth.auth} exact component={QueueList}/>
                        <ProtectedRoutes path="/dashboard/tasks" auth={Auth.auth} exact component={TasksList}/>
                        <ProtectedRoutes path="/dashboard/log-out" auth={Auth.auth} exact component={DashboardLogout}/>
                        <ProtectedRoutes path="/dashboard/*" auth={Auth.auth} exact component={NotFoundRoute}/>
                    </Switch>
                </DashboardLayout>
            )}/>

            <Route path="*" component={NotFoundRoute} />
        </Switch>
    )
}

export default Routes
