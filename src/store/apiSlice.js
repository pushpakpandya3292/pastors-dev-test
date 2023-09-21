import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let apiUrl = process.env.REACT_APP_API_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers, { getState }) => {
        //For testing purpose only
        const accessToken = process.env.REACT_APP_TOKEN || getState().auth.user.access;
        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`);
        }
        return headers;
    },
});

export const apiSlice = createApi({
    baseQuery: baseQuery,
    endpoints: (builder) => ({}),
});
