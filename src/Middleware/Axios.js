// NPM Packages
import Axios from "axios";

// Axios for Unprotected Routes/Components
export const axiosAPI = Axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

// Axios for Protected Routes/Components
export const axiosAPIHeader = Axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { 
        "Authorization": `Bearer ${localStorage.getItem("Authorization")}` 
    },
});
