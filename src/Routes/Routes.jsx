// NPM Module
import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Moduled Functions
import { ContextAPI } from "src/Middleware/Context";

// Configuration Components
import UnprotectedRoutes from "src/Routes/UnprotectedRoutes";
import ProtectedRoutes from "src/Routes/ProtectedRoutes";
import NotFoundRoute from "src/Routes/NotFound";
import DashboardLayout from "src/Routes/Dashboard/DashboardLayout";

// Unprotected Components
import Landing from "src/Components/Homepage/Landing";
import Services from "src/Components/Homepage/Services" ;
import Contact from "src/Components/Homepage/Contact";
import Team from "src/Components/Homepage/Team";
import Partner from "src/Components/Homepage/Partner";
import SignIn from "src/Components/Authentication/SignIn";
import SignUp from "src/Components/Authentication/SignUp";

// Procted Components
import DashboardHome from "src/Components/Dashboard/DashboardHome";
import TransactionHistory from "src/Components/Dashboard/Transaction/TransactionHistory";
import TransactionID from "src/Components/Dashboard/Transaction/TransactionID";
import TransactionCreate from "src/Components/Dashboard/Transaction/TransactionCreate";
import TransactionVerification from "src/Components/Dashboard/Transaction/TransactionVerification";
import QueueList from "src/Components/Dashboard/Queue/QueueList";
import TasksList from "src/Components/Dashboard/Tasks/TasksList";
import DashboardLogout from "src/Components/Dashboard/DashboardLogout";

const Routes = () => {
    // Component Initial Variables
    const Auth = useContext(ContextAPI);                                        // Context API Variable from Parent to check current Authorization Status
    
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
                <AnimatePresence exitBeforeEnter>
                    <DashboardLayout {...props}>
                        <Switch>
                            <ProtectedRoutes path="/dashboard/" auth={Auth.auth} exact component={DashboardHome} role={["Client", "Delivery Partner"]}/>
                            <ProtectedRoutes path="/dashboard/transaction" auth={Auth.auth} exact component={TransactionHistory} role={["Client"]}/>
                            <ProtectedRoutes path="/dashboard/transaction/create" auth={Auth.auth} exact component={TransactionCreate} role={["Client"]}/>
                            <ProtectedRoutes path="/dashboard/transaction/:transaction_id" auth={Auth.auth} exact component={TransactionID} role={["Client"]}/>
                            <ProtectedRoutes path="/dashboard/verify" auth={Auth.auth} exact component={TransactionVerification} role={["Delivery Partner"]}/>
                            <ProtectedRoutes path="/dashboard/queue" auth={Auth.auth} exact component={QueueList} role={["Delivery Partner"]}/>
                            <ProtectedRoutes path="/dashboard/tasks" auth={Auth.auth} exact component={TasksList} role={["Delivery Partner"]}/>
                            <ProtectedRoutes path="/dashboard/log-out" auth={Auth.auth} exact component={DashboardLogout} role={["Client", "Delivery Partner"]}/>
                            <ProtectedRoutes path="/dashboard/*" auth={Auth.auth} exact component={NotFoundRoute} role={["Client", "Delivery Partner"]}/>
                        </Switch>
                    </DashboardLayout>
                </AnimatePresence>
            )}/>

            <Route path="*" component={NotFoundRoute} />
        </Switch>
    )
}

export default Routes
