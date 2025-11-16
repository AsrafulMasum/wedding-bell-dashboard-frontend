'use client';

import { useState } from 'react';
import { Button, ConfigProvider, Input, Select, Table, Tabs } from 'antd';
import type { ColumnType } from 'antd/es/table/interface';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { TransactionTypes } from '../../../types/types';
import { CiCircleInfo } from 'react-icons/ci';

const { Option } = Select;

const canadianCities = [
    'Toronto',
    'Vancouver',
    'Montreal',
    'Calgary',
    'Edmonton',
    'Ottawa',
    'Winnipeg',
    'Quebec City',
    'Hamilton',
    'Kitchener',
    'London',
    'Victoria',
    'Halifax',
    'Oshawa',
    'Windsor',
    'Saskatoon',
    'Regina',
    'St. Johns',
    'Barrie',
    'Kelowna',
    'Abbotsford',
    'Sherbrooke',
    'Guelph',
    'Kingston',
    'Forfield',
    'Noperville',
    'Orange',
    'Toledo',
    'Austin',
];

const statusColorMap = {
    Pending: { color: '#D48806', bg: '#F7F1CC' },
    Rejected: { color: '#FF4D4F', bg: '#FFD8D7' },
    Approved: { color: '#52C41A', bg: '#D9F2CD' },
};

// 🔹 Sample data for each tab
const chefTransactions: TransactionTypes[] = [
    {
        key: '1',
        transactionID: 'TXN-1001',
        name: 'Chef Emma',
        email: 'emma@chefs.com',
        city: 'Toronto',
        date: '2025-11-01',
        totalSales: '$1,200',
        income: '$900',
        revenue: '$300',
        deliveryStatus: 'Approved',
    },
    {
        key: '2',
        transactionID: 'TXN-1002',
        name: 'Chef Liam',
        email: 'liam@chefs.com',
        city: 'Vancouver',
        date: '2025-11-02',
        totalSales: '$950',
        income: '$720',
        revenue: '$230',
        deliveryStatus: 'Pending',
    },
    {
        key: '3',
        transactionID: 'TXN-1003',
        name: 'Chef Sophia',
        email: 'sophia@chefs.com',
        city: 'Montreal',
        date: '2025-11-03',
        totalSales: '$1,050',
        income: '$790',
        revenue: '$260',
        deliveryStatus: 'Approved',
    },
    {
        key: '4',
        transactionID: 'TXN-1004',
        name: 'Chef Noah',
        email: 'noah@chefs.com',
        city: 'Calgary',
        date: '2025-11-04',
        totalSales: '$870',
        income: '$640',
        revenue: '$230',
        deliveryStatus: 'Rejected',
    },
    {
        key: '5',
        transactionID: 'TXN-1005',
        name: 'Chef Ava',
        email: 'ava@chefs.com',
        city: 'Ottawa',
        date: '2025-11-05',
        totalSales: '$1,300',
        income: '$950',
        revenue: '$350',
        deliveryStatus: 'Approved',
    },
    {
        key: '6',
        transactionID: 'TXN-1006',
        name: 'Chef Ethan',
        email: 'ethan@chefs.com',
        city: 'Winnipeg',
        date: '2025-11-06',
        totalSales: '$1,150',
        income: '$820',
        revenue: '$330',
        deliveryStatus: 'Pending',
    },
    {
        key: '7',
        transactionID: 'TXN-1007',
        name: 'Chef Isabella',
        email: 'isabella@chefs.com',
        city: 'Edmonton',
        date: '2025-11-07',
        totalSales: '$1,400',
        income: '$1,000',
        revenue: '$400',
        deliveryStatus: 'Approved',
    },
    {
        key: '8',
        transactionID: 'TXN-1008',
        name: 'Chef James',
        email: 'james@chefs.com',
        city: 'Halifax',
        date: '2025-11-08',
        totalSales: '$900',
        income: '$670',
        revenue: '$230',
        deliveryStatus: 'Rejected',
    },
    {
        key: '9',
        transactionID: 'TXN-1009',
        name: 'Chef Amelia',
        email: 'amelia@chefs.com',
        city: 'Saskatoon',
        date: '2025-11-09',
        totalSales: '$1,000',
        income: '$750',
        revenue: '$250',
        deliveryStatus: 'Pending',
    },
    {
        key: '10',
        transactionID: 'TXN-1010',
        name: 'Chef William',
        email: 'william@chefs.com',
        city: 'Victoria',
        date: '2025-11-10',
        totalSales: '$1,250',
        income: '$930',
        revenue: '$320',
        deliveryStatus: 'Approved',
    },
];

const customerTransactions: TransactionTypes[] = [
    {
        key: '1',
        transactionID: 'TXN-2001',
        name: 'Customer Olivia',
        email: 'olivia@customers.com',
        city: 'Calgary',
        date: '2025-11-03',
        totalOrders: 12,
        payment: '$850',
        revenue: '$250',
        deliveryStatus: 'Approved',
    },
    {
        key: '2',
        transactionID: 'TXN-2002',
        name: 'Customer Noah',
        email: 'noah@customers.com',
        city: 'Ottawa',
        date: '2025-11-04',
        totalOrders: 10,
        payment: '$740',
        revenue: '$240',
        deliveryStatus: 'Rejected',
    },
    {
        key: '3',
        transactionID: 'TXN-2003',
        name: 'Customer Ava',
        email: 'ava@customers.com',
        city: 'Toronto',
        date: '2025-11-05',
        totalOrders: 14,
        payment: '$920',
        revenue: '$280',
        deliveryStatus: 'Pending',
    },
    {
        key: '4',
        transactionID: 'TXN-2004',
        name: 'Customer Ethan',
        email: 'ethan@customers.com',
        city: 'Vancouver',
        date: '2025-11-06',
        totalOrders: 11,
        payment: '$800',
        revenue: '$220',
        deliveryStatus: 'Approved',
    },
    {
        key: '5',
        transactionID: 'TXN-2005',
        name: 'Customer Emma',
        email: 'emma@customers.com',
        city: 'Montreal',
        date: '2025-11-07',
        totalOrders: 15,
        payment: '$970',
        revenue: '$300',
        deliveryStatus: 'Pending',
    },
    {
        key: '6',
        transactionID: 'TXN-2006',
        name: 'Customer Liam',
        email: 'liam@customers.com',
        city: 'Edmonton',
        date: '2025-11-08',
        totalOrders: 9,
        payment: '$690',
        revenue: '$210',
        deliveryStatus: 'Rejected',
    },
    {
        key: '7',
        transactionID: 'TXN-2007',
        name: 'Customer Charlotte',
        email: 'charlotte@customers.com',
        city: 'Halifax',
        date: '2025-11-09',
        totalOrders: 13,
        payment: '$910',
        revenue: '$280',
        deliveryStatus: 'Approved',
    },
    {
        key: '8',
        transactionID: 'TXN-2008',
        name: 'Customer Mason',
        email: 'mason@customers.com',
        city: 'Saskatoon',
        date: '2025-11-10',
        totalOrders: 8,
        payment: '$620',
        revenue: '$180',
        deliveryStatus: 'Pending',
    },
    {
        key: '9',
        transactionID: 'TXN-2009',
        name: 'Customer Amelia',
        email: 'amelia@customers.com',
        city: 'Winnipeg',
        date: '2025-11-11',
        totalOrders: 16,
        payment: '$1,050',
        revenue: '$320',
        deliveryStatus: 'Approved',
    },
    {
        key: '10',
        transactionID: 'TXN-2010',
        name: 'Customer Lucas',
        email: 'lucas@customers.com',
        city: 'Victoria',
        date: '2025-11-12',
        totalOrders: 10,
        payment: '$740',
        revenue: '$230',
        deliveryStatus: 'Rejected',
    },
];

const driverTransactions: TransactionTypes[] = [
    {
        key: '1',
        transactionID: 'TXN-3001',
        name: 'Driver Ava',
        email: 'ava@drivers.com',
        city: 'Montreal',
        date: '2025-11-05',
        totalDeliveries: 22,
        income: '$800',
        revenue: '$250',
        deliveryStatus: 'Approved',
    },
    {
        key: '2',
        transactionID: 'TXN-3002',
        name: 'Driver Mason',
        email: 'mason@drivers.com',
        city: 'Edmonton',
        date: '2025-11-06',
        totalDeliveries: 18,
        income: '$640',
        revenue: '$230',
        deliveryStatus: 'Pending',
    },
    {
        key: '3',
        transactionID: 'TXN-3003',
        name: 'Driver Liam',
        email: 'liam@drivers.com',
        city: 'Toronto',
        date: '2025-11-07',
        totalDeliveries: 20,
        income: '$720',
        revenue: '$260',
        deliveryStatus: 'Approved',
    },
    {
        key: '4',
        transactionID: 'TXN-3004',
        name: 'Driver Emma',
        email: 'emma@drivers.com',
        city: 'Vancouver',
        date: '2025-11-08',
        totalDeliveries: 16,
        income: '$600',
        revenue: '$220',
        deliveryStatus: 'Rejected',
    },
    {
        key: '5',
        transactionID: 'TXN-3005',
        name: 'Driver Noah',
        email: 'noah@drivers.com',
        city: 'Calgary',
        date: '2025-11-09',
        totalDeliveries: 19,
        income: '$690',
        revenue: '$240',
        deliveryStatus: 'Pending',
    },
    {
        key: '6',
        transactionID: 'TXN-3006',
        name: 'Driver Sophia',
        email: 'sophia@drivers.com',
        city: 'Ottawa',
        date: '2025-11-10',
        totalDeliveries: 21,
        income: '$750',
        revenue: '$270',
        deliveryStatus: 'Approved',
    },
    {
        key: '7',
        transactionID: 'TXN-3007',
        name: 'Driver James',
        email: 'james@drivers.com',
        city: 'Halifax',
        date: '2025-11-11',
        totalDeliveries: 15,
        income: '$580',
        revenue: '$200',
        deliveryStatus: 'Rejected',
    },
    {
        key: '8',
        transactionID: 'TXN-3008',
        name: 'Driver Amelia',
        email: 'amelia@drivers.com',
        city: 'Winnipeg',
        date: '2025-11-12',
        totalDeliveries: 24,
        income: '$820',
        revenue: '$280',
        deliveryStatus: 'Approved',
    },
    {
        key: '9',
        transactionID: 'TXN-3009',
        name: 'Driver Ethan',
        email: 'ethan@drivers.com',
        city: 'Saskatoon',
        date: '2025-11-13',
        totalDeliveries: 17,
        income: '$640',
        revenue: '$220',
        deliveryStatus: 'Pending',
    },
    {
        key: '10',
        transactionID: 'TXN-3010',
        name: 'Driver Charlotte',
        email: 'charlotte@drivers.com',
        city: 'Victoria',
        date: '2025-11-14',
        totalDeliveries: 20,
        income: '$710',
        revenue: '$250',
        deliveryStatus: 'Approved',
    },
];

export default function Transactions({ dashboard }: { dashboard?: boolean }) {
    const [activeTab, setActiveTab] = useState<'chef' | 'customer' | 'driver'>('chef');

    const columns: ColumnType<TransactionTypes>[] = [
        {
            title: 'Transaction ID',
            dataIndex: 'transactionID',
            key: 'transactionID',
            responsive: ['sm'] as any,
        },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            responsive: ['lg'] as any,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Select
                        placeholder="Select a Canadian city"
                        value={selectedKeys?.[0] ?? undefined}
                        style={{ width: 200 }}
                        onChange={(value) => {
                            setSelectedKeys?.(value ? [value] : []);
                            confirm?.();
                        }}
                        allowClear
                        showSearch
                        filterOption={(input, option) =>
                            (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        {canadianCities.map((city) => (
                            <Option key={city} value={city}>
                                {city}
                            </Option>
                        ))}
                    </Select>
                    <div style={{ marginTop: 8 }}>
                        <a
                            onClick={() => {
                                clearFilters?.();
                                confirm?.();
                            }}
                            style={{ width: 90, marginRight: 8 }}
                        >
                            Reset
                        </a>
                    </div>
                </div>
            ),
            onFilter: (value: boolean | React.Key, record: TransactionTypes) => record.city === value,
            render: (city: string) => city,
        },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        {
            title:
                activeTab === 'chef' ? 'Total Sales' : activeTab === 'customer' ? 'Total Orders' : 'Total Deliveries',
            dataIndex:
                activeTab === 'chef' ? 'totalSales' : activeTab === 'customer' ? 'totalOrders' : 'totalDeliveries',
            key: activeTab === 'chef' ? 'totalSales' : activeTab === 'customer' ? 'totalOrders' : 'totalDeliveries',
        },
        {
            title: activeTab === 'customer' ? 'Payment' : 'Income',
            dataIndex: activeTab === 'customer' ? 'payment' : 'income',
            key: activeTab === 'customer' ? 'payment' : 'income',
        },
        { title: 'Revenue', dataIndex: 'revenue', key: 'revenue' },
        {
            title: 'Status',
            dataIndex: 'deliveryStatus',
            key: 'deliveryStatus',
            render: (status: TransactionTypes['deliveryStatus'], record: TransactionTypes) => {
                const key = status as keyof typeof statusColorMap;
                const currentStyle = statusColorMap[key] || { color: '#595959', bg: '#FAFAFA' };

                return (
                    <p
                        className="capitalize px-1 py-0.5 text-center rounded-lg"
                        style={{
                            color: currentStyle.color,
                            backgroundColor: currentStyle.bg,
                        }}
                    >
                        {record?.deliveryStatus}
                    </p>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <div className="flex gap-2">
                    <Button
                        type="text"
                        icon={<CiCircleInfo size={24} />}
                        className="text-gray-500 hover:text-blue-500"
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
                <HeaderTitle
                    title={
                        activeTab === 'chef'
                            ? 'Chef Transactions'
                            : activeTab === 'customer'
                            ? 'Customer Transactions'
                            : 'Driver Transactions'
                    }
                />
                <ConfigProvider theme={{ token: { colorPrimary: '#59A817' } }}>
                    <Input
                        placeholder="Search"
                        style={{ width: 280, height: 40 }}
                        prefix={<i className="bi bi-search"></i>}
                    />
                </ConfigProvider>
            </div>

            <ConfigProvider theme={{ token: { colorPrimary: '#59A817' } }}>
                <Tabs
                    defaultActiveKey="chef"
                    onChange={(key) => setActiveTab(key as 'chef' | 'customer' | 'driver')}
                    items={[
                        {
                            key: 'chef',
                            label: 'Chef',
                            children: (
                                <Table<TransactionTypes>
                                    columns={columns}
                                    dataSource={chefTransactions}
                                    pagination={dashboard ? false : { pageSize: 9, total: chefTransactions.length }}
                                    className="custom-table"
                                />
                            ),
                        },
                        {
                            key: 'customer',
                            label: 'Customer',
                            children: (
                                <Table<TransactionTypes>
                                    columns={columns}
                                    dataSource={customerTransactions}
                                    pagination={dashboard ? false : { pageSize: 9, total: customerTransactions.length }}
                                    className="custom-table"
                                />
                            ),
                        },
                        {
                            key: 'driver',
                            label: 'Driver',
                            children: (
                                <Table<TransactionTypes>
                                    columns={columns}
                                    dataSource={driverTransactions}
                                    pagination={dashboard ? false : { pageSize: 9, total: driverTransactions.length }}
                                    className="custom-table"
                                />
                            ),
                        },
                    ]}
                />
            </ConfigProvider>
        </div>
    );
}
