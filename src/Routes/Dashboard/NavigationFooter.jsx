// NPM Packages
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

// Moduled Functions
import Motion from "src/Middleware/MotionRTLOnce";

const NavigationFooter = () => {
    // Component Initial Variables
    const [ loaded, setLoaded ] = useState(true);                               // Loader for Framer to set the trigger animation only once
    const location = useLocation();                                             // Router Location 

    // Set the Loader for the Framer once the breakpoint change so it won't repeat animating
    useEffect(() => {
        if(location.pathname !== "/dashboard/"){
            setLoaded(false)
        }
    // eslint-disable-next-line
    }, [location.pathname])


    const FooterInformation = () => {
        return (
            <div className="flex flex-row items-center font-medium">
                Cloud Shipping Version { process.env.REACT_APP_TPS_VERSION }
            </div>
        )
    };
    
    // Framer Motion Higher Order Component (HOC)
    const FrameUserInformation = Motion(FooterInformation, loaded);

    return (
        <div className="min-h-navigation max-h-navigation bg-tiffany-30 flex flex-row justify-between px-5 shadow-lgabove absolute bottom-0 min-w-full">
            <div className="flex flex-row items-center">
            </div>
            <div className="flex flex-row items-center">
                <FrameUserInformation />
            </div>
        </div>
    )
}

export default NavigationFooter