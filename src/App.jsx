import React, { useState, useEffect } from "react";
import { ContextAPI } from "./Middleware/Context";
import Routes from "./Routes/Routes";
import { Toaster } from "react-hot-toast";
import { useMediaQuery } from "react-responsive";
import "./App.scss"

const Apps = () => {
    const [auth, setAuth] = useState(true);
    const [slidingPanel, setSlidingPanel] = useState(true);
    const [ toasterPosition, setToasterPosition ] = useState(true)
    const changeToasterPosition = useMediaQuery({
      query: "(max-width: 800px)"
    });

    useEffect(()=> {
        setToasterPosition(!toasterPosition)
    // eslint-disable-next-line
    }, [changeToasterPosition])

    return (
        <React.Fragment>
            <ContextAPI.Provider value={{ auth, setAuth, slidingPanel, setSlidingPanel }}>
                <Routes />
                <Toaster 
                    position={toasterPosition === true ? "top-center" : "bottom-right"} 
                    reverseOrder={false}
                    gutter={10}
                    toastOptions={{
                        custom: {
                            duration: 1500
                        }
                    }}
                />
            </ContextAPI.Provider>
        </React.Fragment>
    )
}

export default Apps
