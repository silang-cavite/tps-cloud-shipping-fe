// NPM Modules
import React from "react";

// Moduled Functions
import Motion from "src/Middleware/MotionVertically";

const WebAdminDashboard = () => {
    return (
        <div>
            WebAdminDashboard
        </div>
    )
}

// Framer Motion Higher Order Component (HOC)
const FrameWebAdminDashboard = Motion(WebAdminDashboard);

export default FrameWebAdminDashboard;