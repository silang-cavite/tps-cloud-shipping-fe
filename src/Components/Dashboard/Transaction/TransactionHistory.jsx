// NPM Modules
import React, { useState, useEffect } from "react";
import ReactMapGL, {Source, Layer} from "react-map-gl";
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
        width: 400,
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
            selector: row => `${row.target_address.province.charAt(0).toUpperCase() + row.target_address.province.slice(1).toLowerCase()}, ${ row.target_address.municipality.charAt(0).toUpperCase() + row.target_address.municipality.slice(1).toLowerCase()}, ${ row.target_address.barangay.charAt(0).toUpperCase() + row.target_address.barangay.slice(1).toLowerCase() }`,
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
    const columnsExcel = [
        {
            name: 'Id',
            sortable: true,
            maxWidth: "50px",
			cell: function OrderItems(currentRowData) {
                console.log(currentRowData)
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
            name: 'Address',
            selector: "target_address.municipality",
            sortable: true,
			omit: hideDirector
        },
        {
            name: 'Address',
            selector: "target_address.barangay",
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
                <div className="flex flex-col justify-center items-center bg-red-400" style={{ minHeight: "64vh" }}>
                    <Ring
                        type="Puff"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                </div>
                :
                <div class="grid ">
                    <div className="overflow-y-auto">
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
                    <div className="overflow-y-auto">
                        <ReactMapGL
                            mapboxApiAccessToken={`pk.eyJ1Ijoia2x5bHlseWRlZWUiLCJhIjoiY2tsb3c4bHoyMDl0MDJxbXh5ZzZ3dWR6OSJ9.hp2Au5hK2f-qbtuHSslxGA`}
                            {...viewport}
                            onViewportChange={nextViewport => setViewport(nextViewport)}
                        >
                            <Source id="my-data" type="geojson" data={geojson}>
                                <Layer {...layerStyle} />
                            </Source>
                        </ReactMapGL>
                    </div>
                </div>
            }
        </div>
    )
}

// Framer Motion Higher Order Component (HOC)
const FrameHistory = Motion(TransactionHistory);

export default FrameHistory;