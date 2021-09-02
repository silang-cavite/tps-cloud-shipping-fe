import React, { useContext, useEffect } from "react";
import { ContextAPI } from "../Middleware/Context";

const Login = () => {
    const Auth = useContext(ContextAPI);

    useEffect(()=>{
        console.log(Auth)
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            test
        </div>
    );
}

export default Login;
