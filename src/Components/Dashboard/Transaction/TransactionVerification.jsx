// NPM Packages
import React, { useEffect } from 'react'
import { useLocation, useHistory } from "react-router-dom";
import * as qs from 'query-string';
import { decryptQueryParams } from "query-string-hash";
import Ring from "react-loader-spinner";

// Moduled Functions
import { axiosAPIHeader } from 'src/Middleware/Axios';

const TransactionVerification = () => {
    // Component Initial Variables
    const location = useLocation();                               // Loader for Framer to set the trigger animation only once
    const history = useHistory();                               // Loader for Framer to set the trigger animation only once
    const parsed = qs.parse(location.search);                     // Selecting Query Params from URL
    const queryParams = decryptQueryParams(                       // Decrypting query params of Hash field
        parsed.hash,
        process.env.REACT_APP_QUERY_KEY
    );

    const VerifyData = async () => {
        try {
            await axiosAPIHeader.patch("/transaction/partner/update-transaction/", {
                _id: queryParams.id,
                updateText: "Shipping Transaction is Completed!",
                numStatus: 8
            });
            history.push(`/dashboard/transaction/${queryParams.id}`)
        } catch (err) {

        }
    };

    useEffect(()=> {
        VerifyData();
    // eslint-disable-next-line
    }, []);

    return (
        <div>
            <div className="flex flex-col justify-center items-center" style={{ minHeight: "64vh" }}>
                <Ring
                    type="Puff"
                    color="#0ABAB5"
                    height={100}
                    width={100}
                />
            </div>
        </div>
    )
}

export default TransactionVerification
