// NPM Modules
import { configureStore } from "@reduxjs/toolkit";

// Reducers
import userInformation from 'src/State/UserInformation/UserData';


const reducer = configureStore({
    reducer: {
        user: userInformation
    }
})

export default reducer;