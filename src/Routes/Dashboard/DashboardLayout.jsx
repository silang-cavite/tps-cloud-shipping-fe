import React, { useEffect, useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import SlidingPanel from "react-sliding-side-panel";
import { ContextAPI } from "src/Middleware/Context";
import NavigationSideBar from "./NavigationSideBar";
import NavigationHeader from "./NavigationHeader";
import "./SlidingPanel.scss";

const DashboardLayout = (props) => {
    const Auth = useContext(ContextAPI)
    const disableSideBar = useMediaQuery({
      query: "(max-width: 800px)"
    });
    const [ sideBar, setSideBar ] = useState(disableSideBar === true ? false : true)

    const slidingPanelBackdropClicked = () => {
        Auth.setSlidingPanel(!Auth.slidingPanel)
    }

    useEffect(()=> {
        setSideBar(!sideBar)
    // eslint-disable-next-line
    }, [disableSideBar])
    
    return (
        <div>
            <div className="flex">
                {
                    !sideBar ? 
                    <NavigationSideBar/> :
                    <SlidingPanel type="left" size="75" isOpen={Auth.slidingPanel} backdropClicked={slidingPanelBackdropClicked} />
                }
                <div className="bg-red-300 min-h-screen flex-grow">
                    <NavigationHeader/>
                    <div className="m-6 grid grid-cols-1 gap-3 md:grid-cols-3">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout
