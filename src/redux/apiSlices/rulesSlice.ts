import { api } from "../api/baseApi";

// Response type for GET /rule/about, /rule/privacy-policy, and /rule/terms-and-conditions
export interface IContentResponse {
    _id: string;
    content: string;
    __v: number;
}

// Payload for update
export interface IContentInput {
    content: string;
}

export const contentSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        // GET ABOUT
        getAbout: builder.query<IContentResponse, void>({
            query: () => ({
                url: "/rule/about",
                method: "GET",
            }),
            transformResponse: (response: IContentResponse) => (response as any)?.data,
        }),

        // UPDATE ABOUT
        createAbout: builder.mutation<IContentResponse, IContentInput>({
            query: (body) => ({
                url: `/rule/about`,
                method: "POST",
                body,
            }),
        }),

        // GET PRIVACY POLICY
        getPrivacyPolicy: builder.query<IContentResponse, void>({
            query: () => ({
                url: "/rule/privacy-policy",
                method: "GET",
            }),
            transformResponse: (response: IContentResponse) => (response as any)?.data,
        }),

        // UPDATE PRIVACY POLICY
        createPrivacyPolicy: builder.mutation<IContentResponse, IContentInput>({
            query: (body) => ({
                url: `/rule/privacy-policy`,
                method: "POST",
                body,
            }),
        }),

        // GET TERMS & CONDITIONS
        getTermsAndConditions: builder.query<IContentResponse, void>({
            query: () => ({
                url: "/rule/terms-and-conditions",
                method: "GET",
            }),
            transformResponse: (response: IContentResponse) => (response as any)?.data,
        }),

        // UPDATE TERMS & CONDITIONS
        createTermsAndConditions: builder.mutation<IContentResponse, IContentInput>({
            query: (body) => ({
                url: `/rule/terms-and-conditions`,
                method: "POST",
                body,
            }),
        }),
    }),
});

export const {
    useGetAboutQuery,
    useCreateAboutMutation,
    useGetPrivacyPolicyQuery,
    useCreatePrivacyPolicyMutation,
    useGetTermsAndConditionsQuery,
    useCreateTermsAndConditionsMutation,
} = contentSlice;
