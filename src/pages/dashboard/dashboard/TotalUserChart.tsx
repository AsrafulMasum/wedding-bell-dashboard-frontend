import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {  Card } from 'antd';
import { IUserStatistics } from '../../../types/types';

// const { Option } = Select;


const CustomLegend = () => {
    return (
        <div className="flex gap-2 2xl:gap-4 text-sm text-[#757575] pr-4">
            <div className="flex items-center gap-1 whitespace-nowrap">
                <div className="w-3 h-3 bg-[#C8A284] rounded-full" />
                Customers
            </div>
            <div className="flex items-center gap-1 whitespace-nowrap">
                <div className="w-3 h-3 bg-[#52C41A] rounded-full" />
                Organizers
            </div>
        </div>
    );
};

const TotalUserChart = ({ userStaticts }: { userStaticts: IUserStatistics[] }) => {


    return (
        <div>
            <Card className="mb-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Total Users</h2>
                    <div className="flex gap-2">
                        <CustomLegend />
                        {/* City Dropdown */}
                        {/* <Select value={selectedCity} onChange={setSelectedCity} className="w-40">
                            {canadianCities.map((city) => (
                                <Option key={city} value={city}>
                                    {city}
                                </Option>
                            ))}
                        </Select> */}

                        {/* Year Dropdown */}
                        {/* <Select value={selectedYear} onChange={setSelectedYear} className="w-24">
                            <Option value="2023">2023</Option>
                            <Option value="2024">2024</Option>
                            <Option value="2025">2025</Option>
                        </Select> */}
                    </div>
                </div>

                <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={userStaticts}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" stroke="#999" style={{ fontSize: '12px' }} />
                        <YAxis stroke="#999" style={{ fontSize: '12px' }} tickFormatter={(value) => `${value}`} />
                        <Tooltip
                            formatter={(value) => `${value}`}
                            contentStyle={{
                                backgroundColor: '#f5f5f5',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '8px 12px',
                            }}
                            labelStyle={{ color: '#c61f1f' }}
                        />
                        <Bar
                            dataKey="customers"
                            name="Customers"
                            fill="#C8A284"
                            radius={[6, 6, 0, 0]} // rounded top corners
                            barSize={15}
                        />
                        <Bar
                            dataKey="vendors"
                            name="Organizers"
                            fill="#52C41A"
                            radius={[6, 6, 0, 0]} // rounded top corners
                            barSize={15}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};

export default TotalUserChart;
