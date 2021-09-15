import React, { useState } from "react"
import Client from "./SignUpComponents/Client";
import DeliveryPartner from "./SignUpComponents/DeliveryPartner";

const SignUp = () => {
    const [ tab, setTab ] = useState("Client")
    return (
        <div>
            <button className={`tab tab-lg tab-lifted ${tab === "Client" ? "tab-active" : ""}`} 
            onClick={()=>{ setTab("Client") }}>
                Client
            </button> 
            <button className={`tab tab-lg tab-lifted ${tab === "Delivery Partner" ? "tab-active" : ""}`} 
            onClick={()=>{ setTab("Delivery Partner") }}>    
                Delivery Partner
            </button> 
            <div>
                {
                    tab === "Client" ? <Client /> : <DeliveryPartner />
                }
            </div>
        </div>
    )
}

export default SignUp
