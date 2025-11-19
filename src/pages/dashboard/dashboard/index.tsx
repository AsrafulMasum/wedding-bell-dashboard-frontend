import TotalEarning from './TotalEarning';
import TotalUserChart from './TotalUserChart';
import { TbUsers } from 'react-icons/tb';
import { LucideChartSpline, LucideHandCoins } from 'lucide-react';
import { LuUserCheck, LuUserCog } from 'react-icons/lu';
import { LiaGiftsSolid } from 'react-icons/lia';
import TotalSubscriberChart from './TotalSubscriberChart';
import { useGetDashboardSummaryQuery, useGetEarningStatisticsQuery, useGetSubscriptionStatisticsQuery, useGetUserStatisticsQuery } from '../../../redux/apiSlices/homeSlice';

const App: React.FC = () => {

     const {data} = useGetDashboardSummaryQuery();
     const {data:userStaticts} = useGetUserStatisticsQuery({});
     const {data:userReviewStaticts} = useGetEarningStatisticsQuery({});
     const {data:userSubscriptionStaticts} = useGetSubscriptionStatisticsQuery({});


     console.log({data})
    const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string }> = ({ icon, title, value }) => (
        <div className="rounded-lg shadow-sm border border-gray-200 p-2 2xl:p-4">
            <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl`}>
                    {icon}
                </div>
                <div>
                    <p className="text-xl font-semibold text-textBlack">{value}</p>
                    <p className="text-secondaryText text-sm">{title}</p>
                </div>
            </div>
        </div>
    );

    // const earning = [
    //     {
    //         "month": "Jan",
    //         "revenue": 10
    //     },
    //     {
    //         "month": "Feb",
    //         "revenue": 20
    //     },
    //     {
    //         "month": "Mar",
    //         "revenue": 20
    //     },
    //     {
    //         "month": "Apr",
    //         "revenue": 50
    //     },
    //     {
    //         "month": "May",
    //         "revenue": 0
    //     },
    //     {
    //         "month": "Jun",
    //         "revenue": 0
    //     },
    //     {
    //         "month": "Jul",
    //         "revenue": 0
    //     },
    //     {
    //         "month": "Aug",
    //         "revenue": 0
    //     },
    //     {
    //         "month": "Sep",
    //         "revenue": 20
    //     },
    //     {
    //         "month": "Oct",
    //         "revenue": 0
    //     },
    //     {
    //         "month": "Nov",
    //         "revenue": 0
    //     },
    //     {
    //         "month": "Dec",
    //         "revenue": 100
    //     }
    // ]
    // const subscriptions = [
    //     {
    //         "month": "Jan",
    //         "total": 10
    //     },
    //     {
    //         "month": "Feb",
    //         "total": 0
    //     },
    //     {
    //         "month": "Mar",
    //         "total": 0
    //     },
    //     {
    //         "month": "Apr",
    //         "total": 0
    //     },
    //     {
    //         "month": "May",
    //         "total": 0
    //     },
    //     {
    //         "month": "Jun",
    //         "total": 0
    //     },
    //     {
    //         "month": "Jul",
    //         "total": 0
    //     },
    //     {
    //         "month": "Aug",
    //         "total": 0
    //     },
    //     {
    //         "month": "Sep",
    //         "total": 0
    //     },
    //     {
    //         "month": "Oct",
    //         "total": 200
    //     },
    //     {
    //         "month": "Nov",
    //         "total": 50
    //     },
    //     {
    //         "month": "Dec",
    //         "total": 150
    //     }
    // ]


    return (
        <div>
            <div>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3.5 mb-4">
                    <StatCard icon={<TbUsers />} title="Total Customer" value={String(data?.customers ?? 0)} />
                    <StatCard icon={<LuUserCog />} title="Total Organizer" value={String(data?.vendors ?? 0)} />
                    <StatCard icon={<LuUserCheck />} title="Total Subscriber" value={String(data?.subscribers ?? 0)} />
                    <StatCard icon={<LiaGiftsSolid />} title="Packages" value={String(data?.packages ?? 0)} />
                    <StatCard icon={<LucideHandCoins />} title="Total Income" value={String(data?.incomes ?? 0)} />
                    <StatCard icon={<LucideChartSpline />} title="Total Revenue" value={String(data?.revenues ?? 0)} />
                </div>

                {/* Users */}
                <TotalUserChart userStaticts={userStaticts as any} />
                {/* Revenue Chart */}
                <TotalEarning  earning={userReviewStaticts as any}/>
                <TotalSubscriberChart  subscriptions={userSubscriptionStaticts as any} /> 
            </div>
        </div>
    );
};

export default App;
