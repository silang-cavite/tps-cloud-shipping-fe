// NPM Modules
import React from "react";

// Moduled Functions
import Motion from "src/Middleware/MotionVertically";

const DeliveryPartnerDashboard = () => {
    return (
        <div>
            DeliveryPartnerDashboard
        </div>
    )
}

// Framer Motion Higher Order Component (HOC)
const FrameDeliveryPartnerDashboard = Motion(DeliveryPartnerDashboard);

export default FrameDeliveryPartnerDashboard;