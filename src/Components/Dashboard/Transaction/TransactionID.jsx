import React from "react";
import { useParams } from "react-router-dom";

const TransactionID = () => {
    let { id } = useParams();

    return (
        <div>
            Transaction { id }
        </div>
    )
}

export default TransactionID
