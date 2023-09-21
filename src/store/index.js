import { configureStore } from "@reduxjs/toolkit";
import { contactReducer } from "./contacts/contacts.slice";
import { apiSlice } from './apiSlice'

export * from "./contacts/contacts.slice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        contacts: contactReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devtools: true,
});
