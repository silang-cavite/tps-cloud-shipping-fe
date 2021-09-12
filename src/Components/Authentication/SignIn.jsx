import React, { useState, useContext } from "react";
import { axiosAPI } from "src/Middleware/Axios";
import { notify } from "src/Services/Toaster";
import { ContextAPI } from "src/Middleware/Context";
import { useDispatch } from "react-redux";
import { signIn } from "src/State/UserInformation/UserData";

const SignIn = () => {
    const dispatch = useDispatch();
    const Auth = useContext(ContextAPI)
    const [ username, setUsername ] = useState("client_cloud_shipping");
    const [ password, setPassword ] = useState("password");

    const signInRequest = async (formTarget) => {
        formTarget.preventDefault();
        try {
            const loginResponse = await axiosAPI.post('authentication/sign-in', {
                username: username,
                password: password
            })
            dispatch(signIn({
                id: loginResponse.data.status.id,
                first_name: loginResponse.data.status.first_name,
                last_name: loginResponse.data.status.last_name,
                username: loginResponse.data.status.username,
                address: loginResponse.data.status.address,
                email: loginResponse.data.status.email,
                phone_number: loginResponse.data.status.phone_number,
                role: loginResponse.data.status.role
            }))
            localStorage.setItem("Authorization", loginResponse.data.payload)
            Auth.setAuth(true)
            notify(`Welcome ${loginResponse.data.status.first_name} ${loginResponse.data.status.last_name}`, "success")  
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
