import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  contacts: [],
  contact: {},
  searchTerm: "",
  frequent: [],
};

const existedFrequent = Cookies.get("frequent");
if (existedFrequent) {
  initialState.frequent = JSON.parse(existedFrequent);
}

export const contactSlice = createSlice({
  name: "contactSlice",
  initialState,
  reducers: {
    getContacts: (state, { payload }) => {
      state.contacts = payload;
    },
    getSingleContact: (state, { payload }) => {
      (state.contact = payload),
        Cookies.set("contact", JSON.stringify(state.contact));
    },
    setSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
    },
    getFrequent: (state, { payload }) => {
      const isExisted = state.frequent.find((item) => item.id === payload.id);
      if (isExisted) {
        return state;
      }
      state.frequent.push(payload);
      Cookies.set("frequent", JSON.stringify(state.frequent));
    },
    removeFrequent: (state, { payload }) => {
      state.frequent = state.frequent.filter((item) => item.id != payload);
      Cookies.set("frequent", JSON.stringify(state.frequent));
    },
    removeAllFrequent: (state) => {
      (state.frequent = []),
        Cookies.set("frequent", JSON.stringify(state.frequent));
    },
  },
});

export const {
  getContacts,
  getSingleContact,
  setSearchTerm,
  getFrequent,
  removeFrequent,
  removeAllFrequent,
} = contactSlice.actions;
export default contactSlice.reducer;
