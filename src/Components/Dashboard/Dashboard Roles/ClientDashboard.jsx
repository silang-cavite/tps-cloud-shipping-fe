// NPM Modules
import React from "react";
import { useHistory } from "react-router-dom";

// Moduled Functions
import Motion from "src/Middleware/MotionVertically";
import SwiperSlider from "src/Components/Dashboard/Components/SwiperSlider";

const ClientDashboard = () => {
    // Component Initial Variables
    const history = useHistory();                                               // Navigation to react routes

    return (
        <div>
            <button onClick={() => {
                history.push("/dashboard/transaction/create")
            }}>Create Transaction</button>
            <SwiperSlider />
        </div>
    )
}

// Framer Motion Higher Order Component (HOC)
const FrameClientDashboard = Motion(ClientDashboard);

export default FrameClientDashboard;