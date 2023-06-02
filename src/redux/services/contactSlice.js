import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    contacts : [],
    contact: {},
    searchTerm : ""
}

export const contactSlice = createSlice({
    name: "contactSlice",
    initialState,
    reducers: {
        getContacts : (state, {payload}) => {
            state.contacts = payload
        },
        getSingleContact : (state, {payload}) => {
            state.contact = payload,
            Cookies.set("contact", JSON.stringify(state.contact))
        },
        setSearchTerm : (state, {payload}) => {
            state.searchTerm = payload
        }
    }
})

export const {getContacts,getSingleContact, setSearchTerm} = contactSlice.actions;
export default contactSlice.reducer;