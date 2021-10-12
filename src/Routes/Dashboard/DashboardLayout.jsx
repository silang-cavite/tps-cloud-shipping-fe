// NPM Packages
import React, { useEffect, useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import SlidingPanel from "react-sliding-side-panel";

// Moduled Functions
import { ContextAPI } from "src/Middleware/Context";

// Components
import NavigationSideBar from "src/Routes/Dashboard/NavigationSideBar";
import NavigationHeader from "src/Routes/Dashboard/NavigationHeader";
import NavigationFooter from "src/Routes/Dashboard/NavigationFooter";

const DashboardLayout = (props) => {
    // Component Initial Variables
    const Auth = useContext(ContextAPI);                                       // Context API Variable from Parent to check current Authorization Status
    const disableSideBar = useMediaQuery({                                     // Basis for responsive styling
      query: "(max-width: 800px)"
    });
    const [ sideBar, setSideBar ] =                                            // Mobile view Sliding Side Bar basis
    useState(disableSideBar === true ? false : true)    

    const slidingPanelBackdropClicked = () => {                                // Disable Mobile Sliding Side Bar
        Auth.setSlidingPanel(!Auth.slidingPanel)
    }

    // Set the Sliding Bar once the breakpoint change
    useEffect(()=> {
        setSideBar(!sideBar)
    // eslint-disable-next-line
    }, [disableSideBar])
    
    return (
        <div>
            <div className="flex bg-tiffany-30">
                {
                    // Conditionall render the side navigation bar depending on the breakpoint
                    // !sideBar is for the Desktop ViewPort
                    // sideBar is for the Mobile ViewPort
                    !sideBar ? 
                        <div className="sticky top-0" style={{
                            minWidth: !disableSideBar ? "250px" : "100%",
                            minHeight: "100vh",
                            maxHeight: "100vh",
                            alignSelf: "flex-start"
                        }}>
                            <NavigationSideBar/>
                        </div>
                    :
                        <SlidingPanel type="left" size="75" isOpen={Auth.slidingPanel} backdropClicked={slidingPanelBackdropClicked}>
                            <NavigationSideBar/>
                        </SlidingPanel>
                }
                <div className="min-h-screen flex-grow z-50 relative overflow-hidden flex flex-col" style={{ flex: 1 }}>
                    <NavigationHeader/>
                    <div className="m-6 mb-28 flex justify-center">
                        <div className="flex-grow" style={{ maxWidth: "1100px" }}>
                            { props.children }
                        </div>
                    </div>
                    <NavigationFooter />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout
