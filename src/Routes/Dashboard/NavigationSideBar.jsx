// NPM Packages
import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

// Moduled Components
import Motion from "src/Middleware/MotionVerticallyOnce";

// Components
import SidebarItems from "src/Routes/Dashboard/SidebarItems";

// Assets
import backgroundImage from "src/Assets/sidebar-background.jpg";

const NavigationSideBar = () => {
    // Component Initial Variables
    const location = useLocation();                                                 // Router Location 
    const [ loaded, setLoaded ] = useState(true);                                   // Loader for Framer to set the trigger animation only once
    const { role } = useSelector((state) => state.user);                            // Logged/Current User's UUID
    const changeToasterPosition = useMediaQuery({                                   // Basis for responsive styling
      query: "(max-width: 800px)"
    });

    // Set the Loader for the Framer once the breakpoint change so it won't repeat animating
    useEffect(() => {
        if(location.pathname !== "/dashboard/"){
            setLoaded(false)
        }
    // eslint-disable-next-line
    }, [location.pathname])

    const SideBarContents = () => {
        return (
            <div className="min-w-full flex flex-col" style={{ minHeight: "100vh" }}>
            <div className="relative">
                testeraaa
            </div>
            {
                SidebarItems.map((item, index) => {
                    let checkIfRoleExists = item.roles.some((currentRole) => {
                        return currentRole === role
                    });
                    return checkIfRoleExists ? 
                        (
                            <Link to={item.route} key={index} className={`${item.class} ml-5 my-1 relative`}>
                                <NavLink activeClassName="bg-tiffany-30 current-navigation" to={item.route} exact key={item.name} className="flex py-2 rounded-full tester">
                                    <p className="mx-5"> { item.icon } </p>
                                    <NavLink activeClassName="font-semibold" to={item.route} exact> { item.name } </NavLink>
                                </NavLink>
                            </Link>
                        )
                    :
                        ""
                })
            }
            </div>
        )
    };

    // Framer Motion Higher Order Component (HOC)
    const FrameSideBarContents = Motion(SideBarContents, loaded);

    return (
        <div className="w-full bg-tiffany-10 z-0 shadow-2xl relative inline-block overflow-hidden m-0 p-0" 
            style={{ 
                minHeight: changeToasterPosition? "100vh": "",
                maxHeight: "100vh",
                backgroundImage: `url(${backgroundImage})`,
                backgroundPosition: "-50% 30%",
                backgroundColor: "#0ABAB5",
                backgroundBlendMode: "multiply"
        }}>
            <div className="block absolute min-h-full" style={{ minWidth: "100%", background: 'linear-gradient(350deg, rgba(255,255,255,0.25) 1%, rgba(54,25,153,1) 73%, rgba(54,25,153,1) 100%)' }}/>
            <FrameSideBarContents />
        </div>
    )
}

export default NavigationSideBar
