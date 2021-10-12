// NPM Modules
import React from "react";
import { Carousel } from 'react-responsive-carousel';
import { useHistory } from "react-router";

// Moduled Functions
import Motion from "src/Middleware/MotionVertically";

// Assets
import img from "src/Assets/template.png"
import img2 from "src/Assets/templatew.png"

const ClientDashboard = () => {
    const history = useHistory();
    return (
        <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12">
                <Carousel 
                    showThumbs={false}
                    autoPlay={true}
                    infiniteLoop={true}
                    interval={1500}
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
                <div className="flex justify-between">
                    <p className="text-md font-medium">Client Features:</p>
                    <button className="btn btn-sm btn-primary" onClick={()=> {  history.push("/dashboard/transaction/create") }}>
                        Create Transaction
                    </button>
                </div>
                <ul className="pl-5 grid grid-cols-12">
                    <li className="list-decimal text-sm col-span-12 md:col-span-4 py-3">
                        Create Transaction Request
                        <ul className="pl-7">
                            <li className="list-disc text-sm">
                                Add Receiver Information
                            </li>
                            <li className="list-disc text-sm">
                                Add Product and Details
                            </li>
                        </ul>
                    </li>
                    <li className="list-decimal text-sm col-span-12 md:col-span-4 py-3">
                        Check Transaction List
                        <ul className="pl-7">
                            <li className="list-disc text-sm">
                                Data table View
                            </li>
                            <li className="list-disc text-sm">
                                Philippine GeoLocation Marker based on receiver's address
                            </li>
                        </ul>
                    </li>
                    <li className="list-decimal text-sm col-span-12 md:col-span-4 py-3">
                        View Transaction by ID
                        <ul className="pl-7">
                            <li className="list-disc text-sm">
                                Overview of All Products
                            </li>
                            <li className="list-disc text-sm">
                                Transaction Current Status
                            </li>
                            <li className="list-disc text-sm">
                                Delivery Partner
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}

// Framer Motion Higher Order Component (HOC)
const FrameClientDashboard = Motion(ClientDashboard);

export default FrameClientDashboard;