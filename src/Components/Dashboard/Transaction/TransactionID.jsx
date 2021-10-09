// NPM Packages
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Ring from "react-loader-spinner";
import QRCode from "qrcode.react";

// Moduled Functions
import Motion from "src/Middleware/MotionVertically";
import { notify } from "src/Services/Toaster";
import { axiosAPIHeader } from "src/Middleware/Axios";

// Assets
import logo from "src/Assets/Group 1.png";

const TransactionID = () => {
    // Component Initial Variables
    const history = useHistory();                                               // Navigation to react routes
    const { transaction_id } = useParams();                                     // Route params which is /:id
    const [ transactionData, setTransactionData ] = useState({});               // Transaction state to received the API data
    const [ loading, setLoading ] = useState(true);                             // Loader for Framer
    const [ mapLocation, setMapLocation ] = useState({                          // Lang and Long of Addresses for Map
        pickup: {
            latitude: undefined,
            longitude: undefined
        },
        target: {
            latitude: undefined,
            longitude: undefined
        }
    });
    const imageSettings = {                                                     // QR Image Configuration
        src: logo,
        height: 40,
        width: 60
    };

    // Redux State
    const { id } = useSelector((state) => state.user);                          // Logged/Current User's UUID

    // Retrieve a specific Transaction and set it's data to corresponding component state variables
    const getSpecificId = async () => {
        try {
            let dataIdFromAPI = await axiosAPIHeader.get(`transaction/user/transaction/${transaction_id}`);
            if(dataIdFromAPI.data.payload.user_information.user_id !== id) {
                notify("You don't have privellage to view this transaction!", "warning")
                history.push("/dashboard/transaction")
            }
            setTransactionData({
                category: dataIdFromAPI.data.payload.category,
                createdAt: dataIdFromAPI.data.payload.createdAt,
                notes: dataIdFromAPI.data.payload.notes,
                shippingCost: dataIdFromAPI.data.payload.shippingCost,
                transaction_number: dataIdFromAPI.data.payload.transaction_number,
                status:{
                    numStatus: dataIdFromAPI.data.payload.status.numStatus,
                    updateText: dataIdFromAPI.data.payload.status.updateText
                },
                receiver_information:{
                    receiver_email: dataIdFromAPI.data.payload.receiver_information.receiver_email,
                    receiver_name: dataIdFromAPI.data.payload.receiver_information.receiver_name,
                    receiver_phone_number: dataIdFromAPI.data.payload.receiver_information.receiver_phone_number
                },
                products: dataIdFromAPI.data.payload.products,
                pick_up_address: {
                    barangay: dataIdFromAPI.data.payload.pick_up_address.barangay,
                    municipality: dataIdFromAPI.data.payload.pick_up_address.municipality,
                    province: dataIdFromAPI.data.payload.pick_up_address.province,
                    region: dataIdFromAPI.data.payload.pick_up_address.region,
                },
                target_address: {
                    barangay: dataIdFromAPI.data.payload.target_address.barangay,
                    municipality: dataIdFromAPI.data.payload.target_address.municipality,
                    province: dataIdFromAPI.data.payload.target_address.province,
                    region: dataIdFromAPI.data.payload.target_address.region,
                }
            })
            Number(dataIdFromAPI.data.payload.status.numStatus) === 1 ?
                console.log("Transaction is current in its initial state")
            :
                setTransactionData((currentData) => {
                    return {
                        ...currentData,
                        delivery_information: {
                            delivery_partner: dataIdFromAPI.data.payload.delivery_information.delivery_partner,
                            delivery_partner_id: dataIdFromAPI.data.payload.delivery_information.delivery_partner_id,
                            delivery_partner_picture: dataIdFromAPI.data.payload.delivery_information.delivery_partner_picture
                        }
                    }
                })
            setMapLocation({
                pickup: {
                    latitude: dataIdFromAPI.data.payload.pick_up_address.latitude,
                    longitude: dataIdFromAPI.data.payload.pick_up_address.longitude
                },
                target: {
                    latitude: dataIdFromAPI.data.payload.target_address.latitude,
                    longitude: dataIdFromAPI.data.payload.target_address.longitude
                }
            })
            setLoading(false)
        } catch (err) {
            console.log(err.response)
        }
    };

    // Fetched data once component has been rendered
    useEffect(() => {
        getSpecificId()
    // eslint-disable-next-line
    }, []);

    return (
        <div>
            {
                loading === true ?
                    <div className="flex flex-col justify-center items-center" style={{ minHeight: "75vh" }}>
                        <Ring
                            type="Puff"
                            color="#0ABAB5"
                            height={100}
                            width={100}
                        />
                    </div>
                :
                    <div>
                        <p> { transactionData.category } </p>
                        <p> { transactionData.createdAt } </p>
                        <p> { transactionData.notes } </p>
                        <p> { transactionData.transaction_number } </p>
                        <p> { transactionData.status.updateText } </p>
                        <p> { transactionData.receiver_information.receiver_email } </p>
                        <p> { transactionData.receiver_information.receiver_name } </p>
                        <p> 0{ transactionData.receiver_information.receiver_phone_number } </p>
                        <p> { transactionData.pick_up_address.barangay } </p>
                        <p> { transactionData.pick_up_address.municipality } </p>
                        <p> { transactionData.pick_up_address.province } </p>
                        <p> { transactionData.pick_up_address.region } </p>
                        <p> { transactionData.target_address.barangay } </p>
                        <p> { transactionData.target_address.municipality } </p>
                        <p> { transactionData.target_address.province } </p>
                        <p> { transactionData.target_address.region } </p>
                        { 
                            transactionData.products.map((currentData) => {
                                return (
                                    <>
                                        <p>
                                            { currentData.product_name } { currentData.product_weight }
                                        </p>
                                    </>
                                )
                            }) 
                        }
                        {
                            transactionData.status.numStatus !== 1 && transactionData.delivery_information  ?
                                <div>
                                    <p>{ transactionData.delivery_information.delivery_partner }</p>
                                    <p>{ transactionData.delivery_information.delivery_partner_id }</p>
                                    <p>{ transactionData.delivery_information.delivery_partner_picture }</p>
                                </div>
                            :
                                ""
                        }
                        <p> { mapLocation.pickup.latitude } </p>
                        <p> { mapLocation.pickup.longitude } </p>
                        <p> { mapLocation.target.latitude } </p>
                        <p> { mapLocation.target.latitude } </p>
                        <QRCode value="https://cloud-shipping.netlify.app/ketchup" imageSettings={imageSettings}/>
                    </div>
            }
        </div>
    )
}

const FrameTransactionID = Motion(TransactionID);

export default FrameTransactionID;