// NPM Modules
import React, { useState, useEffect } from "react";
import ReactMapGL, {Source, Layer} from "react-map-gl";
import mapboxgl from 'mapbox-gl';
import DataTableExtensions from "react-data-table-component-extensions";
import ReactTooltip from "react-tooltip";
import DataTable from "react-data-table-component-with-filter";
import Ring from "react-loader-spinner";
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

// Moduled Functions
import Motion from "src/Middleware/MotionVertically";
import { axiosAPIHeader } from "src/Middleware/Axios";

const TransactionHistory = () => {
    // Component Initial Variables
    const history = useHistory();                                               // Navigation to react routes
	const [ hideDirector, setHideDirector ] = useState(true);                   // Hide Data table columns
	const [ loader, showLoader ] = useState(false);                             // Loader spinner
    const [ transactionHistory, setTransactionHistory ] = useState([]);         // Transaction List received from the API

    // Redux User State
    const { id } = useSelector((state) => state.user);                          // Logged/Current User's UUID

    // Map GL Configurations
    const layerStyle = {                                                        // Location circles
        id: 'point',
        type: 'circle',
        paint: {
            'circle-radius': 10,
            'circle-color': '#007cbf'
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
        type: 'FeatureCollection',
        features: transactionHistory.map((currentTransaction) => {              // Mapping to return an array of Objects containing all locations (lang and long)
            return {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [
                        currentTransaction.target_address.longitude,
                        currentTransaction.target_address.latitude
                    ]
                }
            }
        })
    };

    // Data table Category/Columns
    
    const columns = [
        {
            name: 'Id',
            selector: 'transaction_number',
            sortable: true,
            maxWidth: "50px"
        },
        {
            name: 'Receiver',
            selector: 'receiver_information.receiver_name',
            sortable: true,
            maxWidth: "200px"
        },
        {
            name: 'Address',
            // selector: row => `${row.target_address.province.charAt(0).toUpperCase() + row.target_address.province.slice(1).toLowerCase()}, ${ row.target_address.municipality.charAt(0).toUpperCase() + row.target_address.municipality.slice(1).toLowerCase()}, ${ row.target_address.barangay.charAt(0).toUpperCase() + row.target_address.barangay.slice(1).toLowerCase() }`,
            sortable: true,
			omit: hideDirector,
        },
        {
            name: 'Status',
            selector: 'status.updateText',
            sortable: true
        },
        {
            name: 'Cost',
            selector: 'shippingCost',
            sortable: true,
			omit: hideDirector,
            maxWidth: "50px"
        }
    ];
    const columnsExcel = [
        {
            name: 'Id',
            sortable: true,
            maxWidth: "50px",
			cell: function OrderItems(currentRowData) {
				return (
                    <p data-tip={`${currentRowData._id}`}>
                        { currentRowData._id }
                    </p>
				)
			}
        },
        {
            name: 'Receiver',
            selector: 'receiver_information.receiver_name',
            sortable: true,
            maxWidth: "200px"
        },
        {
            name: 'Address',
            selector: "target_address.province",
            sortable: true,
			omit: hideDirector
        },
        {
            name: 'Status',
            selector: 'status.updateText',
            sortable: true
        },
        {
            name: 'Cost',
            selector: 'shippingCost',
            sortable: true,
			omit: hideDirector,
            maxWidth: "50px"
        }
    ];

    // Check current client breakpoint
    const isMobile = useMediaQuery({                                            // Basis for responsive styling
        query: "(max-width: 800px)"
    });

    // Retrieve Data table data from API
    const getTableData = async () => {
        try {
            let tableDataFromAPI = await axiosAPIHeader.post("/pages/transaction/user",
            {
                user_id: id,
                "year": 2021
            })
            setTransactionHistory(tableDataFromAPI.data.transaction_history)    // Populating the transaciton state
            console.log(tableDataFromAPI.data.transaction_history)
            showLoader(false);
        } catch (err) {
            history.push("/dashboard/")
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
                <div class="grid ">
                    <div className="overflow-y-auto px-5 py-3 bg-white rounded-md mb-5">
                        <DataTableExtensions columns={columnsExcel} data={transactionHistory}>
                            <DataTable
                                columns={columns}
                                data={transactionHistory}
                                pagination
                                persistTableHead
                                striped={true}
                                highlightOnHover={true}
                                fixedHeader={true}
                                pointerOnHover={true}
                                onRowClicked={ (currentRowData) => { history.push(`/dashboard/transaction/${currentRowData._id}`)}}
                            />
                        </DataTableExtensions >
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
                                transactionHistory.length !== 0 ?
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
                                : 
                                <div>
                                    <div class="card-header mx-0 px-0">
                                        <p className="font-medium">No data available, please accept Delivery Transacitons!</p>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

// Framer Motion Higher Order Component (HOC)
const FrameHistory = Motion(TransactionHistory);
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

export default FrameHistory;