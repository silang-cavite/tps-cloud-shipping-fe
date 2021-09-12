import Axios from "axios";

export const axiosAPI = Axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

export const axiosAPIHeader = Axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { 
        "Authorization": `Bearer ${localStorage.getItem("Authorization")}` 
    },
});
