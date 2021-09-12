import React from "react";
import { notify } from "src/Services/Toaster";

const callHome = () => {
    notify("This is a test", "success")
}

const DashboardHome = () => {
    return (
        <div>
            Home
            <button onClick={callHome}>Make me a toast</button>
        </div>
    );
};

export default DashboardHome;
