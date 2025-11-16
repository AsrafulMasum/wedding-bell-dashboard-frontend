import TotalEarning from './TotalEarning';
import TotalUserChart from './TotalUserChart';
import { TbUsers } from 'react-icons/tb';
import { LucideChartSpline, LucideHandCoins } from 'lucide-react';
import { LuUserCheck, LuUserCog } from 'react-icons/lu';
import { LiaGiftsSolid } from 'react-icons/lia';
import TotalSubscriberChart from './TotalSubscriberChart';

const App: React.FC = () => {
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

    return (
        <div>
            <div>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3.5 mb-4">
                    <StatCard icon={<TbUsers />} title="Total Customer" value="68k" />
                    <StatCard icon={<LuUserCog />} title="Total Organizer" value="32k" />
                    <StatCard icon={<LuUserCheck />} title="Total Subscriber" value="18K" />
                    <StatCard icon={<LiaGiftsSolid />} title="Packages" value="20K" />
                    <StatCard icon={<LucideHandCoins />} title="Total Income" value="78K" />
                    <StatCard icon={<LucideChartSpline />} title="Total Revenue" value="18K" />
                </div>

                {/* Users */}
                <TotalUserChart />
                {/* Revenue Chart */}
                <TotalEarning />
                {/* Subscriber Chart */}
                <TotalSubscriberChart />
            </div>
        </div>
    );
};

export default App;
