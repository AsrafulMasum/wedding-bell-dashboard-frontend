import { ICustomer, IPagination, ISubscribers } from "../../types/types";
import { api } from "../api/baseApi";

const customerSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getCustomers: builder.query<{ data: ICustomer[]; pagination: IPagination }, { query?: object }>({
            query: (params) => ({
                url: "/user/customers",
                params: params,
            }),
            transformResponse: (response: { data: { customers: ICustomer[], pagination: IPagination }; }) => ({
                data: response.data.customers,
                pagination: response.data.pagination,
            }),
        }),
        getSubscribers: builder.query<{ data: ISubscribers[]; pagination: IPagination }, { query?: object }>({
            query: (params) => ({
                url: "/subscription",
                params: params,
            }),
            transformResponse: (response: { data: { subscriptions: ISubscribers[], pagination: IPagination }; }) => ({
                data: response.data.subscriptions,
                pagination: response.data.pagination,
            }),
        }),
        getVendors: builder.query<{ data: ICustomer[]; pagination: IPagination }, { query?: object }>({
            query: (params) => ({
                url: "/user/vendors",
                params: params,
            }),
            transformResponse: (response: { data: { vendors: ICustomer[], pagination: IPagination }; }) => ({
                data: response.data.vendors,
                pagination: response.data.pagination,
            }),
        }),
    }),
});

export const {
    useGetCustomersQuery,
    useGetSubscribersQuery,
    useGetVendorsQuery
} = customerSlice;
