import React from "react";
import NavigationSideBar from "./NavigationSideBar";
import NavigationHeader from "./NavigationHeader";

const DashboardLayout = (props) => {
    return (
        <div>
            <div style={{display: "flex"}}>
                <NavigationSideBar/>
                <div style={{maxWidth: '800px'}}>
                    <NavigationHeader/>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout
