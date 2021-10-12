// NPM Module
import { createSlice } from "@reduxjs/toolkit";

export const userInformation = createSlice({
    // Reducer States
    name: "userInformation",
    initialState: {
        id: undefined,
        first_name: undefined,
        last_name: undefined,
        username: undefined,
        user_picture: undefined,
        address: {
            region: undefined,
            province: undefined,
            municipality: undefined,
            barangay: undefined
        },
        email: undefined,
        phone_number: undefined,
        role: undefined
    },
    // Reducer Actions
    reducers: {
        signIn: (state, action) => {
            state.id = action.payload.id;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.username = action.payload.username;
            state.user_picture = action.payload.user_picture;
            state.address = action.payload.address;
            state.email = action.payload.email;
            state.phone_number = action.payload.phone_number;
            state.role = action.payload.role;
        },
        signOut: (state, action) => {
            state.id = undefined
            state.first_name = undefined
            state.last_name = undefined
            state.username = undefined
            state.user_picture = undefined
            state.address = {
                tregion: undefined,
                province: undefined,
                municipality: undefined,
                barangay: undefined
            }
            state.email = undefined
            state.phone_number = undefined
            state.role = undefined
        },
    },
});

// Exported Reducer Actions to be used for components
export const { signIn, signOut } = userInformation.actions;

export default userInformation.reducer;
