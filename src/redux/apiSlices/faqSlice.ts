import { Ifaq, IPagination } from "../../types/types";
import { api } from "../api/baseApi";

const faqSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getFaqs: builder.query<
            { data: Ifaq[]; pagination: IPagination },
            { query?: string }>({
            query: (params) => ({
                url: "/faq",
                params: params?.query
                    ? new URLSearchParams({ query: params.query })
                    : undefined,
            }),
            transformResponse: (response: { data: { faqs: Ifaq[] }; pagination: IPagination }) => ({
                data: response.data.faqs,
                pagination: response.pagination,
            }),
        }),

        createFaq: builder.mutation<void, { data: any }>({
            query: ({ data }) => ({
                url: "/faq",
                method: "POST",
                body: data,
            }),
        }),
        updateFaq: builder.mutation<void, { id: string; data: any }>({
            query: ({ id, data }) => ({
                url: `/faq/${id}`,
                method: "PATCH",
                body: data,
            }),
        }),
        deleteFaq: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/faq/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetFaqsQuery,
    useCreateFaqMutation,
    useUpdateFaqMutation,
    useDeleteFaqMutation,
} = faqSlice;
