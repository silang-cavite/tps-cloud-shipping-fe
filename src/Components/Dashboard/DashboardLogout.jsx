// NPM Packages
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";

// Moduled Functions
import { ContextAPI } from "src/Middleware/Context";

const DashboardLogout = () => {
    // Component Initial Variables
    const Auth = useContext(ContextAPI);                                       // Context API Variable from Parent to check current Authorization Status
    const history = useHistory();                                              // Navigation to react routes
    
    // Once the component has been rendered, deletes the authorization in local storage and reverts the auth boolean variable to false
    // Which redircts the client to /sign-in
    useEffect(()=>{
        Auth.setAuth(false)
        history.push("/sign-in")
        localStorage.removeItem("Authorization")
    // eslint-disable-next-line
    }, [])

    return (
        <div>
        </div>
    )
}

export default DashboardLogout
