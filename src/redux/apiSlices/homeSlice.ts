import { IDashboardData, IEarningStatistics, IEsubscriptonStatistics, IUserStatistics } from "../../types/types";
import { api } from "../api/baseApi";
const homeSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardSummary: builder.query<IDashboardData, void>({
            query: () => ({
                url: "/admin/summary",
            }),
            transformResponse: (data: { data: IDashboardData }) => data.data,
        }),
        getUserStatistics: builder.query<IUserStatistics, { startDate?: string; endDate?: string }>({
            query: () => ({
                url: "/admin/users-statistic",
                // params: { startDate, endDate },
            }),
            transformResponse: (data: { data: IUserStatistics }) => data.data,
        }),
        getEarningStatistics: builder.query<IEarningStatistics, { startDate?: string; endDate?: string }>({
            query: () => ({
                url: "/admin/revenues-statistic",
                // params: { startDate, endDate },
            }),
            transformResponse: (data: { data: IEarningStatistics }) => data.data,
        }),
        getSubscriptionStatistics: builder.query<IEsubscriptonStatistics, { startDate?: string; endDate?: string }>({
            query: () => ({
                url: "/admin/subscriptions-statistic",
                // params: { startDate, endDate },
            }),
            transformResponse: (data: { data: IEsubscriptonStatistics }) => data.data,
        }),
    }),
});

export const {
    useGetDashboardSummaryQuery,
    useGetUserStatisticsQuery,
    useGetEarningStatisticsQuery,
    useGetSubscriptionStatisticsQuery
} = homeSlice;
