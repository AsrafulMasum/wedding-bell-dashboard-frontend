import { Card } from 'antd';
import TotalEarning from './TotalEarning';
import TotalUserChart from './TotalUserChart';
import { TbUsers } from 'react-icons/tb';
import { LucideChartSpline } from 'lucide-react';
import { PiChefHat, PiSteeringWheelLight } from 'react-icons/pi';

const App: React.FC = () => {
    const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string }> = ({ icon, title, value }) => (
        <Card className="rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl`}>
                    {icon}
                </div>
                <div>
                    <p className="text-2xl font-semibold text-textBlack">{value}</p>
                    <p className="text-secondaryText text-xl mb-1">{title}</p>
                </div>
            </div>
        </Card>
    );

    return (
        <div>
            <div>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
                    <StatCard icon={<TbUsers />} title="Total Customer" value="32k" />
                    <StatCard icon={<PiChefHat />} title="Total Chef" value="68K" />
                    <StatCard icon={<PiSteeringWheelLight />} title="Total Driver" value="20K" />
                    <StatCard icon={<LucideChartSpline />} title="Total Revenue" value="18K" />
                </div>

                {/* Users */}
                <TotalUserChart />
                {/* Chart */}
                <TotalEarning />
            </div>
        </div>
    );
};

export default App;
