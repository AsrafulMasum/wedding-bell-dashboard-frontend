import { IBanner, IPagination } from "../../types/types";
import { api } from "../api/baseApi";

const bannerSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getBanners: builder.query<
            { data: IBanner[]; pagination: IPagination },
            { query?: string }>({
            query: (params) => ({
                url: "/banner",
                params: params?.query
                    ? new URLSearchParams({ query: params.query })
                    : undefined,
            }),
            transformResponse: (response: { data: IBanner[] ; pagination: IPagination }) => ({
                data: response.data,
                pagination: response.pagination,
            }),
        }),

        createBanner: builder.mutation<void, { image: File }>({
            query: ({ image }) => {
                const formData = new FormData();
                formData.append("image", image);
                return {
                    url: "/banner",
                    method: "POST",
                    body: formData,
                };
            },
        }),
        updateBanner: builder.mutation<void, { id: string; data: any }>({
            query: ({ id, data }) => {
                const formData = new FormData();
                Object.keys(data).forEach(key => formData.append(key, data[key]));
                return {
                    url: `/banner/${id}`,
                    method: "PATCH",
                    body: formData,
                };
            },
        }),
        deleteBanner: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/banner/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetBannersQuery,
    useCreateBannerMutation,
    useUpdateBannerMutation,
    useDeleteBannerMutation,
} = bannerSlice;
