import { apiSlice } from '../apiSlice'
export const contactApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        getAllContacts: builder.query({
            query: (data) => ({
                url: `/api/contacts.json?companyId=171&page=${data}`,
                method: "GET",
            }),
        }),
        getAllContactsFilter: builder.mutation({
            query: (data) => ({
                url: `/api/contacts.json?companyId=171&page=1&query=${data}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useLazyGetAllContactsQuery, useGetAllContactsFilterMutation } = contactApiSlice;
