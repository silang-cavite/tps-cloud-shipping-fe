// NPM Modules
import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import jwt from "jsonwebtoken";

// Moduled Functions
import Routes from "src/Routes/Routes";
import { ContextAPI } from "src/Middleware/Context";
import { notify } from "src/Services/Toaster";
import { signIn } from "src/State/UserInformation/UserData";

// Assets
import "mapbox-gl/dist/mapbox-gl.css";
import "react-data-table-component-extensions/dist/index.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "src/Styles/App.scss";
import "src/Styles/Tailwind.scss";
import "src/Styles/SlidingPanel.scss";
import "src/Styles/NavigationSideBar.scss";
import "src/Styles/DataTable.scss";
import "src/Styles/SwiperPagination.scss";

const Apps = () => {
    // Component Initial Variables
    const dispatch = useDispatch();
    const [ auth, setAuth ] = useState(false);                                  // Authentication basis to redirect to /Dashboard
    const [ slidingPanel, setSlidingPanel ] = useState(false);                  // Sliding Panel basis
    const [ toasterPosition, setToasterPosition ] = useState(true);             // Toaster selected position basis
    const changeToasterPosition = useMediaQuery({                               // Basis for responsive styling
      query: "(max-width: 800px)"
    });

    // Change toaster position on breakpoint change
    useEffect(()=> {
        setToasterPosition(!toasterPosition);
    // eslint-disable-next-line
    }, [changeToasterPosition]);

    // Decode the existing JWT in localStorage then set the information for persistant logged in
    const checkAuthorization = async () => {
        try{
            if(localStorage.getItem("Authorization")){
                let decodedData = await jwt.verify(localStorage.getItem("Authorization"), process.env.REACT_APP_JWT_BACKEND);
                dispatch(signIn({
                    id: decodedData.id,
                    first_name: decodedData.first_name.charAt(0).toUpperCase() + decodedData.first_name.slice(1),
                    last_name: decodedData.last_name.charAt(0).toUpperCase() + decodedData.last_name.slice(1),
                    username: decodedData.username,
                    user_picture: decodedData.user_picture,
                    address: decodedData.address,
                    email: decodedData.email,
                    phone_number: decodedData.phone_number,
                    role: decodedData.role
                }))
                setAuth(true)
                notify(`Welcome ${decodedData.first_name.charAt(0).toUpperCase() + decodedData.first_name.slice(1)} ${decodedData.last_name.charAt(0).toUpperCase() + decodedData.last_name.slice(1)}`, "success")  
            }
        } catch (err) {
            localStorage.removeItem("Authorization")
            err.response ? notify(err.response.data.message, "success") : notify(err.message, "success")  
        }
    };

    // Run once component has been mounted
    useEffect(() => {
        checkAuthorization();                                                   // Decode the existing JWT in localStorage then set the information for persistant logged in
    // eslint-disable-next-line
    }, []);

    return (
        <React.Fragment>
            <ContextAPI.Provider value={{ auth, setAuth, slidingPanel, setSlidingPanel }}>
                <Routes />
                <Toaster 
                    position={toasterPosition === true ? "top-center" : "bottom-right"} 
                    reverseOrder={false}
                    gutter={10}
                    toastOptions={{
                        custom: {
                            duration: 1500
                        }
                    }}
                />
            </ContextAPI.Provider>
        </React.Fragment>
    )
}

export default Apps
