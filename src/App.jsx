import React, { useState } from "react";
import { ContextAPI } from "./Middleware/Context";
import Routes from "./Routes/Routes";
import "./App.scss"

const Apps = () => {
    const [auth, setAuth] = useState(true);

    return (
        <React.Fragment>
            <ContextAPI.Provider value={{ auth, setAuth }}>
                <Routes />
            </ContextAPI.Provider>
        </React.Fragment>
    )
}

export default Apps
