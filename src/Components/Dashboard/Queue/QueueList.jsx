// NPM Modules
import React, { useState, useEffect } from "react"
import ReactMapGL, {Source, Layer} from "react-map-gl";
import mapboxgl from 'mapbox-gl';
import ReactTooltip from "react-tooltip";
import DataTable from "react-data-table-component";
import Ring from "react-loader-spinner";
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

// Moduled Functions
import Motion from "src/Middleware/MotionVertically";
import { axiosAPIHeader } from "src/Middleware/Axios";
import { notify } from "src/Services/Toaster";

const QueueList = () => {
    // Component Initial Variables
    const history = useHistory();                                               // Navigation to react routes
	const [ hideDirector, setHideDirector ] = useState(true);                   // Hide Data table columns
	const [ loader, showLoader ] = useState(false);                             // Loader spinner
    const [ transactionHistory, setTransactionHistory ] = useState([]);         // Transaction List received from the API

    // Redux User State
    const { id, username, user_picture } = useSelector((state) => state.user);  // Logged/Current User"s UUID

    // Map GL Configurations
    const layerStyle = {                                                        // Location circles
        id: "point",
        type: "circle",
        paint: {
            "circle-radius": 10,
            "circle-color": "#007cbf"
        }
    };
    const [viewport, setViewport] = useState({                                  // Map GL component attributes
        width: "100%",
        height: 400,
        latitude: 12.0000,
        longitude: 122.0000,
        zoom: 4
    });
    const geojson = {
        type: "FeatureCollection",
        features: transactionHistory.map((currentTransaction) => {              // Mapping to return an array of Objects containing all locations (lang and long)
            return {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [
                        currentTransaction.target_address.longitude,
                        currentTransaction.target_address.latitude
                    ]
                }
            }
        })
    };
    
    // Check current client breakpoint
    const isMobile = useMediaQuery({                                            // Basis for responsive styling
        query: "(max-width: 800px)"
    });


    // Data table Category/Columns
    const columns = [
        {
            name: "ID",
            selector: "transaction_number",
            sortable: true,
            maxWidth: "50px"
        },
        {
            name: "Address",
            selector: row => `${row.target_address.province.charAt(0).toUpperCase() + row.target_address.province.slice(1).toLowerCase()}, ${ row.target_address.municipality.charAt(0).toUpperCase() + row.target_address.municipality.slice(1).toLowerCase()}, ${ row.target_address.barangay.charAt(0).toUpperCase() + row.target_address.barangay.slice(1).toLowerCase() }`,
            sortable: true
        },
        {
            name: "Payment",
            selector: "shippingCost",
            sortable: true,
			omit: hideDirector,
            maxWidth: "150px"
        },
        {
            name: "Actions",
			cell: function AcceptTransaction (currentRowData) {
				return (
				<div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
					<button
                        className="btn btn-primary btn-xs"
                        onClick={ () => {
                            acceptTransactionId(currentRowData._id)
                        }}
					>
                        <p className="text-xs">
                            {
                                isMobile ?
                                    "Accept"
                                :
                                    "Accept Shipping Request"
                            }
                        </p>
					</button>
				</div>
				)
			},
            maxWidth: isMobile? "50px" : "200px"
        }
    ];

    // Retrieve Data table data from API
    const getTableData = async () => {
        try {
            let tableDataFromAPI = await axiosAPIHeader.get("/transaction/partner/open-transactions/");
            setTransactionHistory(tableDataFromAPI.data.payload)    // Populating the transaciton state
            showLoader(false);
        } catch (err) {
            history.push("/dashboard/")
        }
    };

    // Delivery Partner request to accept the Transaction
    const acceptTransactionId = async (trans_id) => {
        try {
            let postAcceptTransaction = await axiosAPIHeader.patch("/transaction/partner/accept-transaction/", {
                _id: trans_id,
                delivery_partner_id: id,
                delivery_partner_username: username,
                delivery_partner_picture: user_picture
            });
            setTransactionHistory((currenTransactionList) => {              
                return currenTransactionList.filter((currentTransaction) => {   // Reduce the Array once transaction has been accepted
                    return currentTransaction._id !== trans_id
                })
            })
            notify(postAcceptTransaction.data.message, "success")
        } catch (err) {
            err.response ? notify(err.response.data.message, "success") : notify(err.message, "success")  
        }
    }

    // Run once the component has been mounted
    useEffect(() => {
        getTableData()                                                          // Retrieve Data table data from API
    // eslint-disable-next-line
    }, [])
    // Once breakpoint is lower than 880px, Hides selected categories of the data table
    useEffect(() => {
        isMobile === true ?
            setHideDirector(true)
        :
            setHideDirector(false)
    }, [isMobile])
    // During resize of the break, change the height and size of the data table by reloading it
    useEffect(() => {
        showLoader(true);
        transactionHistory.length !== 0 ?
            setTimeout(()=>{
                showLoader(false)
            }, [500])
        :
            console.log("")
    // eslint-disable-next-line
    }, [window.innerWidth, window.innerHeight]);
    
    const ExpandedComponent = ({ data }) => {
        return (
            <div>
                <div className="card">
                    <div className="card-body grid-cols-12 gap-5 text-white">
                        <div className="p-3 col-span-12 md:col-span-4 bg-tiffany-10 rounded-md">
                            <p className="text-sm font-medium pb-2">User Information</p>
                            <p className="text-xs pb-1">Email: { data.user_information.user }</p>
                            <p className="text-xs pb-1">Address: { data.pick_up_address.region }, { data.pick_up_address.province }, { data.pick_up_address.municipality }, { data.pick_up_address.barangay }</p>
                        </div>
                        <div className="p-3 col-span-12 md:col-span-4 bg-tiffany-10 rounded-md">
                            <p className="text-sm font-medium pb-2">Receiver Information</p>
                            <p className="text-xs pb-1">Full Name: { data.receiver_information.receiver_name }</p>
                            <p className="text-xs pb-1">Phone Number: 0{ data.receiver_information.receiver_phone_number }</p>
                            <p className="text-xs pb-1">Email Address: { data.receiver_information.receiver_email }</p>
                            <p className="text-xs pb-1">Address: { data.target_address.region }, { data.target_address.province }, { data.target_address.municipality }, { data.target_address.barangay }</p>
                        </div>
                        <div className="p-3 col-span-12 md:col-span-4 bg-tiffany-10 rounded-md">
                            <p className="text-sm font-medium pb-2">Extended Information </p>
                            <p className="text-xs pb-1"> Category: { data.category } </p>
                            <p className="text-xs pb-1"> Note: { data.notes } </p>
                            <p className="text-xs pb-1"> Payment: { data.shippingCost } </p>
                            <p className="text-xs pb-1"> Listed at: { data.createdAt } </p>
                        </div>
                        <div className="col-span-12 bg-tiffany-10 rounded-md p-3">
                            <p className="text-sm font-medium pb-2"> Products </p>
                            <div className="grid xs:grid-cols-1 md:grid-cols-3">
                                {
                                    data.products.map((currentProduct, productkey) => {
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
                    </div>
                </div>
                {/* <pre>
                    {JSON.stringify(data, null, 2)}                              // Print a JSON with styling
                </pre> */}
            </div>
        )
    };

    return (
        <div>
            {
                loader === true ?
                <div className="flex flex-col justify-center items-center" style={{ minHeight: "64vh" }}>
                    <Ring
                        type="Puff"
                        color="#0ABAB5"
                        height={100}
                        width={100}
                    />
                </div>
                :
                <div class="grid">
                    <div className="overflow-y-auto px-5 py-3 bg-white rounded-md mb-5">
                        <DataTable
                            columns={columns}
                            data={transactionHistory}
                            pagination
                            striped={true}
                            highlightOnHover={true}
                            pointerOnHover={true}
                            expandableRows
                            expandableRowsComponent={ExpandedComponent}
                        />
                        <ReactTooltip />
                    </div>
                    <div className="overflow-y-auto px-5 py-3 bg-white rounded-md grid xs:grid-cols-1 md:grid-cols-12 gap-5">
                        <div className="flex justify-center items-center col-span-6 min-h-full">
                            <ReactMapGL
                                mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_GL_KEY}
                                {...viewport}
                                onViewportChange={nextViewport => setViewport(nextViewport)}
                                className="rounded-md"
                                mapStyle={process.env.REACT_APP_MAP_STYLE}
                            >
                                <Source id="my-data" type="geojson" data={geojson}>
                                    <Layer {...layerStyle} />
                                </Source>
                            </ReactMapGL>
                        </div>
                        <div className="bg-tiffany-10 rounded-md col-span-6 p-5">
                            {
                                [
                                    {
                                        category: "Transaction Region Sites",
                                        field: "region"
                                    },
                                    {
                                        category: "Transaction Province Sites",
                                        field: "province"
                                    },
                                ].map((currentCategory, categoryKey) => {
                                    return (
                                        <div key={categoryKey}>
                                            <div class="card-header mx-0 px-0">
                                                <p className="font-medium">{currentCategory.category}</p>
                                            </div>
                                            <div className="py-2">
                                                {
                                                    transactionHistory.map((currentTransaction) => {  
                                                        return `${currentTransaction.target_address[`${currentCategory.field}`].charAt(0).toUpperCase() + currentTransaction.target_address[`${currentCategory.field}`].slice(1).toLowerCase()}`
                                                    }).filter( (value, index, array) => { 
                                                        return array.indexOf(value) === index;              // Remove duplicates
                                                    }).map((newTransactionMap, transactioKey) => {
                                                        return (
                                                        <p key={transactioKey} className="py-1">
                                                                {transactioKey+1}. {newTransactionMap}
                                                            </p>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

// Framer Motion Higher Order Component (HOC)
const FrameQueueList = Motion(QueueList);
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

export default FrameQueueList;
