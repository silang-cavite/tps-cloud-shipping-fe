import Axios from "axios";
import env from "react-dotenv";

export const axiosAPI = Axios.create({
    baseURL: `${env.API_URL}`
});