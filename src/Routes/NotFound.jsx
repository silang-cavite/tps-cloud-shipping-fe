import React, { useContext } from "react";
import { ContextAPI } from "src/Middleware/Context";
import { useHistory } from "react-router-dom";
import NotFoundImage from "src/Assets/NotFound.jpg";

const NotFound = () => {
    const Auth = useContext(ContextAPI)
    const history = useHistory();

    const returnToHomapage = () => {
        history.push(Auth.auth === false ? "/" : "/dashboard/")
    }

    return (
        <section className="flex justify-center items-center min-h-screen px-20 lg:px-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                <div className="bg-gray-200 rounded-lg p-10 flex flex-col justify-center">
                    <p className="text-xs font-semibold tracking-wide uppercase">Error 404</p>
                    <p className="text-2xl font-extrabold leading-tight tracking-tight py-2">Page doesn't exists.</p>
                    <p className="text-base pt-2 pb-4">
                        You have entered a wrong address or the page may have removed.
                    </p>
                    <div className="flex flex-row">
                        <p className="btn btn-sm btn-success mr-4" onClick={returnToHomapage}>Back to homepage</p>
                        <p className="btn btn-sm btn-white">Contact us</p>    
                    </div>
                </div>
                <div className="bg-green-300 hidden md:block rounded-lg">
                    <div className="relative w-full h-full rounded-lg" style={{ minHeight: "250px" }}>
                            <img src={NotFoundImage} alt="" className="absolute w-full h-full max-w-full max-h-full object-cover rounded-lg"/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
