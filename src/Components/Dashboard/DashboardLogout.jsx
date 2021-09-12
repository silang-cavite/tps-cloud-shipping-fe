import React, { useContext, useEffect } from "react";
import { ContextAPI } from "src/Middleware/Context";

const DashboardLogout = () => {
    const Auth = useContext(ContextAPI)

    useEffect(()=>{
        Auth.setAuth(false)
        localStorage.removeItem("Authorization")
    // eslint-disable-next-line
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default DashboardLogout
