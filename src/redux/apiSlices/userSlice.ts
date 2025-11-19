import { api } from "../api/baseApi";

const userSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: ({query}:{query?:string}) => {
               
                
                return {
                    url: "/user?"+query,
                };
            },
        }),
        changeStatusUser: builder.mutation({
            query: ({id}:{id:string}) => {
                return {
                    method: "PATCH",
                    url: `/user/${id}`,
                };
            },
        }),

        updateProfile: builder.mutation({
            query: (formData: FormData) => {
                return {
                    method: "PATCH",
                    url: "/user",
                    body: formData,
                    formData: true,
                };
            },
        }),

        getHosts: builder.query({
            query: ({query}:{query?:string}) => {
                return {
                    url: "/user/host?"+query,
                };
            },
        }),
    }),
});
export const {useGetUsersQuery, useChangeStatusUserMutation,useGetHostsQuery,useUpdateProfileMutation} = userSlice;