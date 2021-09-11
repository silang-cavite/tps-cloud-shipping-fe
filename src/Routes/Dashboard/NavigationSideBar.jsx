import React from "react";
import SidebarItems from "./SidebarItems";
import { Link } from "react-router-dom";

const NavigationSideBar = () => {

    return (
        <div style={{ width: "30%" }}>
            <div style={{ position: "fixed" }}>
                {
                    SidebarItems.map((item, index) => {
                        return (
                            <Link to={item.route} key={index}>
                                <div key={item.name}>
                                    <p>{item.name}</p>
                                </div>
                            </Link>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default NavigationSideBar
