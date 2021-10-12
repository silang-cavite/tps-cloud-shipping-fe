// NPM Packages
import React from "react";
import { useSelector } from "react-redux";

// Moduled Functions
import Motion from "src/Middleware/MotionVertically";

// Components
import ClientDashboard from "src/Components/Dashboard/Dashboard Roles/ClientDashboard";
import DeliveryPartnerDashboard from "src/Components/Dashboard/Dashboard Roles/DeliveryPartnerDashboard";

const DashboardHome = () => {
    // Component Initial Variables / Redux State
    const { role } = useSelector((state) => state.user);                        // Logged/Current User's Role

    return (
        <div>
            {
                role === "Client" ?
                    <ClientDashboard />
                :
                    <DeliveryPartnerDashboard />
            }
        </div>
    );
};

// Framer Motion Higher Order Component (HOC)
const FrameDashboardHome = Motion(DashboardHome);

export default FrameDashboardHome;