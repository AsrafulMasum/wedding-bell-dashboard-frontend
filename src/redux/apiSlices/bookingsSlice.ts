// import { IBooking, IPagination } from "../../types/types";
// import { api } from "../api/baseApi";

// const bookingsSlice = api.injectEndpoints({
//     endpoints: (builder) => ({
//         getBookings: builder.query<{ data: IBooking[]; pagination: IPagination }, { query?: object }>({
//             query: (params) => ({
//                 url: "/booking/lists",
//                 params: params,
//             }),
//             transformResponse: (response: { data: { bookings: IBooking[], pagination: IPagination }; }) => ({
//                 data: response.data.bookings,
//                 pagination: response.data.pagination,
//             }),
//         }),
//     }),
// });

// export const {
//     useGetBookingsQuery,
// } = bookingsSlice;
