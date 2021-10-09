// NPM Packages
import React, { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Icon } from "react-icons-kit";
import { menu } from "react-icons-kit/iconic/";
import { useLocation } from 'react-router-dom';

// Moduled Functions
import { ContextAPI } from "src/Middleware/Context";
import Motion from "src/Middleware/MotionRTLOnce";


const NavigationHeader = () => {
    // Component Initial Variables
    const Auth = useContext(ContextAPI);                                        // Context API Variable from Parent to check current Authorization Status
    const location = useLocation();                                             // Router Location 
    const [ loaded, setLoaded ] = useState(true);                               // Loader for Framer to set the trigger animation only once
    const [ pathName, setPathName ] = useState("")

    // Redux State
    const {                                                                     // Logged/Current User's UUID
        first_name, last_name, user_picture, role 
    } = useSelector((state) => state.user);

    // Open Function for Mobile Sliding Panel
    const openSidePanelIfMobile = () => {
        Auth.setSlidingPanel(true);
    }

    // Set the Loader for the Framer once the breakpoint change so it won't repeat animating
    useEffect(() => {
        if(location.pathname !== "/dashboard/"){
            setLoaded(false)
        }
        setPathName(`${location.pathname.split("/")[2]}`)
    // eslint-disable-next-line
    }, [location.pathname])


    const UserInformation = () => {
        return (
            <div className="flex flex-row items-center">
                <div className="md:pr-5">
                    <p className="font-medium flex flex-row justify-center"> { first_name } { last_name }</p>
                    <div className="min-w-full text-xs rounded bg-tiffany-10 text-white py-1 flex flex-row justify-center"> { role } </div>
                </div>
                <div className="avatar online hidden md:block">
                    <img src={user_picture} alt="" style={{ position: "absolute", minHeight: "100%", minWidth: "100%" }}/>
                </div>
            </div>
        )
    };
    
    // Framer Motion Higher Order Component (HOC)
    const FrameUserInformation = Motion(UserInformation, loaded);

    return (
        <div className="min-h-navigation max-h-navigation bg-tiffany-30 flex flex-row justify-between px-5 shadow-lg">
            <div className="flex flex-row items-center">
                <div className="block md:hidden">
                    <Icon icon={menu} size={25} onClick={ () => { openSidePanelIfMobile() } }/>
                </div>
                <div className="hidden md:block">
                    <p className="font-medium">
                        Dashboard { 
                        pathName !== "" ?
                            <span>
                                <span>/ </span>
                                <span>{ pathName.charAt(0).toUpperCase() +  pathName.slice(1) }</span>
                            </span>
                            :
                            ""
                        }
                    </p>
                </div>
            </div>
            <div className="flex flex-row items-center">
                <FrameUserInformation />
            </div>
        </div>
    )
}

export default NavigationHeader
