// NPM Packages
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Ring from "react-loader-spinner";
import QRCode from "qrcode.react";
import { encryptQueryParams } from "query-string-hash";

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
    // eslint-disable-next-line
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
    const queryParamsToBeHashed = `id=${transaction_id}`;                          // Query Parameter
    const hashParamsForQR = encryptQueryParams(queryParamsToBeHashed, process.env.REACT_APP_QUERY_KEY);

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

    useEffect(() => {
        console.log(transactionData)
    }, [transactionData])

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
                    <div className="card">
                        <div className="card-body grid-cols-12 gap-5 text-white">
                            <div className="p-3 col-span-12 md:col-span-6 bg-tiffany-10 rounded-md">
                                <p className="text-sm font-medium pb-2">Receiver Information</p>
                                <p className="text-xs pb-1">Full Name: { transactionData.receiver_information.receiver_name }</p>
                                <p className="text-xs pb-1">Phone Number: 0{ transactionData.receiver_information.receiver_phone_number }</p>
                                <p className="text-xs pb-1">Email Address: { transactionData.receiver_information.receiver_email }</p>
                                <p className="text-xs pb-1">Address: { transactionData.target_address.region }, { transactionData.target_address.province }, { transactionData.target_address.municipality }, { transactionData.target_address.barangay }</p>
                            </div>
                            <div className="p-3 col-span-12 md:col-span-6 bg-tiffany-10 rounded-md">
                                <p className="text-sm font-medium pb-2">Extended Information </p>
                                <p className="text-xs pb-1"> Category: { transactionData.category } </p>
                                <p className="text-xs pb-1"> Note: { transactionData.notes } </p>
                                <p className="text-xs pb-1"> Payment: { transactionData.shippingCost } </p>
                                <p className="text-xs pb-1"> Listed at: { transactionData.createdAt } </p>
                            </div>
                            <div className="col-span-12 bg-tiffany-10 rounded-md p-3">
                                <p className="text-sm font-medium pb-2"> Products </p>
                                <div className="grid xs:grid-cols-1 md:grid-cols-3">
                                    {
                                        transactionData.products.map((currentProduct, productkey) => {
                                            return (
                                                <div key={productkey} className="pb-3 grid grid-cols-12 gap-2">
                                                    <div className="bg-white rounded-md flex justify-center items-center col-span-2">
                                                        <p className="text-xs pb-2 text-black"> { productkey } </p>
                                                    </div>
                                                    <div className="col-span-10">
                                                        <p className="text-xs pb-2"> Product: {currentProduct.product_name} </p>
                                                        <p className="text-xs pb-2"> Weight: {currentProduct.product_weight} </p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="col-span-12 bg-tiffany-10 rounded-md p-3 text-black">
                                <div className="py-2 text-white">
                                    <span className="text-sm font-medium pb-2"> Transaction Status: </span> 
                                    <p className="text-xs pb-1"> { transactionData.status.updateText } </p>
                                </div>
                            </div>
                            {
                                transactionData.delivery_information ?
                                    Number(transactionData.status.numStatus) !== 8 ?
                                        <div className="col-span-12 sm:col-span-5 lg:col-span-4 bg-tiffany-10 rounded-md text-black flex justify-center py-3">
                                            <QRCode value={`https://cloud-shipping.netlify.app/dashboard/verify?hash=${hashParamsForQR}`} imageSettings={imageSettings}/>
                                        </div>
                                    :
                                        ""
                                :
                                ""
                            }
                            {
                                transactionData.delivery_information ?
                                <div className={`px-3 ${  Number(transactionData.status.numStatus) !== 8 ?  'col-span-12 sm:col-span-7 lg:col-span-8' : 'col-span-12'} bg-tiffany-10 rounded-md flex flex-col`}>
                                    <div className="py-3">
                                        <span className="text-sm font-medium pb-2"> Delivery Partner: </span> 
                                    </div>
                                    <div className="flex items-center gap-5 pb-3 flex-grow">
                                        <div className="avatar">
                                            <img src={transactionData.delivery_information.delivery_partner_picture} alt="" />
                                        </div>
                                        <div>
                                            <p className="text-xs pb-1">Delivery Partner ID: { transactionData.delivery_information.delivery_partner_id }</p>
                                            <p className="text-xs pb-1">Full Name: { transactionData.delivery_information.delivery_partner }</p>
                                        </div>
                                    </div>
                                </div>
                                : 
                                ""
                            }
                        </div>
                    </div>
            }
        </div>
    )
}

const FrameTransactionID = Motion(TransactionID);

export default FrameTransactionID;