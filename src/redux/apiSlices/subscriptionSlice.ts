import { IPagination, ISubscriptionPlan } from "../../types/types";
import { api } from "../api/baseApi";

// Payload shape for creating/updating a plan (matches backend format without metadata fields)
export interface IPlanInput {
    title: string;
    description: string;
    price: number;
    duration: string;
    paymentType: string;
    productId: string;
    paymentLink: string;
    status: string;
}

export const planSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        // GET PLANS
        getPlans: builder.query<
            { data: ISubscriptionPlan[]; pagination: IPagination },
            { query?: string }
        >({
            query: (params) => ({
                url: "/plan",
                params: params?.query ? { query: params.query } : undefined,
            }),
            transformResponse: (response: {
                data: ISubscriptionPlan[];
                pagination: IPagination;
            }) => ({
                data: response.data,
                pagination: response.pagination,
            }),
        }),

        // CREATE PLAN — JSON body
        createPlan: builder.mutation<void, IPlanInput>({
            query: (body) => ({
                url: "/plan",
                method: "POST",
                body,
            }),
        }),

        // UPDATE PLAN — JSON body
        updatePlan: builder.mutation<void, { id: string; data: Partial<IPlanInput> }>({
            query: ({ id, data }) => ({
                url: `/plan/${id}`,
                method: "PATCH",
                body: data,
            }),
        }),

        // DELETE PLAN
        deletePlan: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/plan/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetPlansQuery,
    useCreatePlanMutation,
    useUpdatePlanMutation,
    useDeletePlanMutation,
} = planSlice;
