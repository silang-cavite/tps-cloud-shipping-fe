// NPM Modules
import React from "react";
import { Carousel } from 'react-responsive-carousel';

// Moduled Functions
import Motion from "src/Middleware/MotionVertically";

// Assets
import img from "src/Assets/template.png"
import img2 from "src/Assets/templatew.png"

const DeliveryPartnerDashboard = () => {
    return (
        <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12">
                <Carousel 
                    showThumbs={false}
                    autoPlay={true}
                    infiniteLoop={true}
                    interval={4500}
                    swipeable={true}
                    useKeyboardArrows={true}
                >
                    <div style={{  maxHeight: "250px"}}>
                        <img src={img} alt=""className="rounded-md"/>
                    </div>
                    <div style={{  maxHeight: "250px"}}>
                        <img src={img2} alt=""className="rounded-md"/>
                    </div>
                </Carousel>
            </div>
            <div className="col-span-12 bg-tiffany-10 rounded-md p-4 text-white gap-5" style={{ minHeight: "25vh"}}>
                <p className="text-md font-medium">Delivery Partner Features:</p>
                <ul className="pl-5 grid grid-cols-12">
                    <li className="list-disc text-sm col-span-12 md:col-span-4 py-3">
                        Check Transaction Queue
                        <ul className="pl-7">
                            <li className="list-decimal text-sm">
                                View Transaction Details
                            </li>
                        </ul>
                    </li>
                    <li className="list-disc text-sm col-span-12 md:col-span-4 py-3">
                        Check Transaction Tasks
                        <ul className="pl-7">
                            <li className="list-decimal text-sm">
                                View Transaction by Transaction ID
                            </li>
                            <li className="list-decimal text-sm">
                                Update Transaction Status
                            </li>
                            <li className="list-decimal text-sm">
                                Verify Transaction Complete through QR
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}

// Framer Motion Higher Order Component (HOC)
const FrameDeliveryPartnerDashboard = Motion(DeliveryPartnerDashboard);

export default FrameDeliveryPartnerDashboard;