import { configureStore } from "@reduxjs/toolkit";

import userInformation from './UserInformation/UserData';

const reducer = configureStore({
  reducer: {
    user: userInformation
  }
})

export default reducer;