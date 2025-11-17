import { ICategory, IPagination } from "../../types/types";
import { api } from "../api/baseApi";

const categorySlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<
            { data: ICategory[]; pagination: IPagination },
            { query?: string }>({
            query: (params) => ({
                url: "/category",
                params: params?.query
                    ? new URLSearchParams({ query: params.query })
                    : undefined,
            }),
            transformResponse: (response: { data: ICategory[]; pagination: IPagination }) => ({
                data: response.data,
                pagination: response.pagination,
            }),
        }),
        createCategory: builder.mutation<void, FormData>({
            query: (data) => ({
                url: "/category",
                method: "POST",
                body: data,
            }),
        }),
        updateCategory: builder.mutation<void, { id: string; data: FormData }>({
            query: ({ id, data }) => ({
                url: `/category/${id}`,
                method: "PATCH",
                body: data,
            }),
        }),
        deleteCategory: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/category/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categorySlice;
