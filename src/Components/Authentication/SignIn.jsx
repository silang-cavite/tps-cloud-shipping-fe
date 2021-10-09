// NPM Packages
import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";

// Moduled Functions
import { signIn } from "src/State/UserInformation/UserData";
import { axiosAPI } from "src/Middleware/Axios";
import { notify } from "src/Services/Toaster";
import { ContextAPI } from "src/Middleware/Context";

const SignIn = () => {
    // Component Initial Variables
    const dispatch = useDispatch();                                             // Use Reducer Actions
    const Auth = useContext(ContextAPI)                                         // Context API Variable from Parent to check current Authorization Status
    const [ username, setUsername ] = useState("client_cloud_shipping");        // Username input field value
    const [ password, setPassword ] = useState("password");                     // Password input field value

    // Login Request to be submitted to the API as a request body
    const signInRequest = async (formTarget) => {
        formTarget.preventDefault();
        try {
            const loginResponse = await axiosAPI.post('authentication/sign-in', {
                username: username,
                password: password
            })
            dispatch(signIn({
                id: loginResponse.data.status.id,
                first_name: loginResponse.data.status.first_name.charAt(0).toUpperCase() + loginResponse.data.status.first_name.slice(1),
                last_name: loginResponse.data.status.last_name.charAt(0).toUpperCase() + loginResponse.data.status.last_name.slice(1),
                username: loginResponse.data.status.username,
                user_picture: loginResponse.data.status.user_picture,
                address: loginResponse.data.status.address,
                email: loginResponse.data.status.email,
                phone_number: loginResponse.data.status.phone_number,
                role: loginResponse.data.status.role
            }))
            localStorage.setItem("Authorization", loginResponse.data.payload)
            Auth.setAuth(true)
            notify(`Welcome ${loginResponse.data.status.first_name.charAt(0).toUpperCase() + loginResponse.data.status.first_name.slice(1)} ${loginResponse.data.status.last_name.charAt(0).toUpperCase() + loginResponse.data.status.last_name.slice(1)}`, "success")  
        } catch (err) {
            err.response ? notify(err.response.data.message, "success") : notify(err.message, "success")  
        }
    }

    return (
        <div className="min-w-min min-h-screen flex justify-center items-center">
            <form className="w-full md:w-4/12 mx-auto py-10" onSubmit={signInRequest}>
                <label className="block text-sm mb-1" htmlFor="emailinput">
                    Your Email
                </label>
                <input
                    className="form-input"
                    type="text"
                    placeholder="Ex. james@bond.com"
                    id="emailinput"
                    value={username}
                    onChange={(e)=>{
                        setUsername(e.target.value)
                    }}
                    required
                />
                <label className="block text-sm mb-1 mt-4" htmlFor="passwordinput">
                    Your Password
                </label>
                <input
                    className="form-input"
                    type="password"
                    placeholder="••••••••"
                    id="passwordinput"
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                    required
                />
                <label className="flex items-center mt-4">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2 cursor-pointer text-sm">Remember me</span>
                </label>
                <input
                    type="submit"
                    className="btn btn-primary w-full mt-4"
                    value="Login"
                />
            </form>
        </div>
    );
};

export default SignIn;
