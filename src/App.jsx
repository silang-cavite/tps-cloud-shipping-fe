import React, { useState, useEffect } from "react";
import jwt from 'jsonwebtoken';
import { ContextAPI } from "./Middleware/Context";
import Routes from "./Routes/Routes";
import { Toaster } from "react-hot-toast";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "src/Services/Toaster";
import { signIn } from "src/State/UserInformation/UserData";

const Apps = () => {
    const dispatch = useDispatch();
    const [auth, setAuth] = useState(false);
    const [slidingPanel, setSlidingPanel] = useState(false);
    const [ toasterPosition, setToasterPosition ] = useState(true)
    const changeToasterPosition = useMediaQuery({
      query: "(max-width: 800px)"
    });

    const { id, first_name, last_name, username, user_picture, address, email, phone_number, role } = useSelector((state) => state.user)

    useEffect(()=> {
        setToasterPosition(!toasterPosition)
    // eslint-disable-next-line
    }, [changeToasterPosition])

    // eslint-disable-next-line
    useEffect(async () => {
        try{
            if(localStorage.getItem("Authorization")){
                let decodedData = await jwt.verify(localStorage.getItem("Authorization"), process.env.REACT_APP_JWT_BACKEND);
                dispatch(signIn({
                    id: decodedData.id,
                    first_name: decodedData.first_name,
                    last_name: decodedData.last_name,
                    username: decodedData.username,
                    address: decodedData.address,
                    email: decodedData.email,
                    phone_number: decodedData.phone_number,
                    role: decodedData.role
                }))
                setAuth(true)
                notify(`Welcome ${decodedData.first_name} ${decodedData.last_name}`, "success")  
            }
        } catch (err) {
            err.response ? notify(err.response.data.message, "success") : notify(err.message, "success")  
        }
    // eslint-disable-next-line
    }, [])

    useEffect(()=> {
        if(auth){
            console.log(id)
            console.log(first_name)
            console.log(last_name)
            console.log(username)
            console.log(user_picture)
            console.log(address)
            console.log(email)
            console.log(phone_number)
            console.log(role)
        }
    // eslint-disable-next-line
    }, [id])

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
