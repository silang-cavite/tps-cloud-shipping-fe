// NPM Packages
import React, { useContext, useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import jwt from 'jsonwebtoken';

// Moduled Functions
import { notify } from "src/Services/Toaster";
import { ContextAPI } from "src/Middleware/Context";
import { signIn } from "src/State/UserInformation/UserData";

// For authorized components such as the: Dashboard pages and its child routes
const ProtectedRoutes = ({ auth, component: Component, role: componentRole, ...rest }) => {
    // Component Initial Variables
    const dispatch = useDispatch();                                             // Use Reducer Actions
    const history = useHistory();                                               // Navigation to react routes
    const Auth = useContext(ContextAPI);                                        // Context API Variable from Parent to check current Authorization Status

    // Redux State
    const { role } = useSelector((state) => state.user);                        // Logged/Current User's Role

    // Once component has been rendered, check whether the role exists in the component role before completing the render
    // If role does not exists, then the client is pushed to the dashboard page
    useEffect(() => {
        if(!componentRole.some((currentRole) => {
            return currentRole === role
        })){
            history.push("/dashboard/")
            notify("You don't have the privellege to access that route!", "success")
        }
    // eslint-disable-next-line
    }, [])

    // Prevents reloading and redirect to the based Redirect of Routes which is "/Dashboard/"
    // Instead lets the current fresh route be accessed by setting the Auth boolean to true if Authorization exists and valid
    if(localStorage.getItem("Authorization") && auth === false){
        jwt.verify(localStorage.getItem("Authorization"), process.env.REACT_APP_JWT_BACKEND, (err, callback) => {
            if(err) {
                localStorage.removeItem("Authorization")
                err.response ? notify(err.response.data.message, "success") : notify(err.message, "success")
            }
            dispatch(signIn({
                id: callback.id,
                first_name: callback.first_name.charAt(0).toUpperCase() + callback.first_name.slice(1),
                last_name: callback.last_name.charAt(0).toUpperCase() + callback.last_name.slice(1),
                username: callback.username,
                user_picture: callback.user_picture,
                address: callback.address,
                email: callback.email,
                phone_number: callback.phone_number,
                role: callback.role
            }))
            Auth.setAuth(true)
            // eslint-disable-next-line
            auth = true
        })
    }

    return (
        <Route
            {...rest}
            render={()=>(
                // If Auth is true then redirect to protected Components
                auth ? 
                    <Component className="overflow-hidden"/>
                : 
                    <Redirect to="/" />
            )}
        />
    )
}

export default ProtectedRoutes
