import React from "react";
import SidebarItems from "./SidebarItems";
import { Link } from "react-router-dom";

const NavigationSideBar = () => {

    return (
        <div className="w-full bg-gray-400" style={{ maxWidth: "250px" }}>
            <div className="fixed">
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
