import { ConfigProvider, Input, Select, Table } from 'antd';
import type { ColumnType } from 'antd/es/table/interface';
// import { User } from '../../../demo-data/users.data';
// import { useState } from 'react';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import type { WaitingListTypes } from '../../../types/types';

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
    'Forfield', // From your original data
    'Noperville', // From your original data
    'Orange', // From your original data
    'Toledo', // From your original data
    'Austin', // From your original data
];

export const orderData: WaitingListTypes[] = [
    {
        key: '1',
        customerName: 'John Doe',
        city: 'Toronto',
        zipCode: 'M5B 2H1',
        email: 'john.doe@example.com',
        contact: '+1 (416) 555-0134',
    },
    {
        key: '2',
        customerName: 'Sarah Johnson',
        city: 'Vancouver',
        zipCode: 'V5K 0A1',
        email: 'sarah.johnson@example.com',
        contact: '+1 (604) 555-0178',
    },
    {
        key: '3',
        customerName: 'Michael Brown',
        city: 'Montreal',
        zipCode: 'H3B 1A1',
        email: 'michael.brown@example.com',
        contact: '+1 (514) 555-0102',
    },
    {
        key: '4',
        customerName: 'Emily Davis',
        city: 'Calgary',
        zipCode: 'T2P 1J9',
        email: 'emily.davis@example.com',
        contact: '+1 (403) 555-0159',
    },
    {
        key: '5',
        customerName: 'Robert Wilson',
        city: 'Ottawa',
        zipCode: 'K1P 5G4',
        email: 'robert.wilson@example.com',
        contact: '+1 (613) 555-0147',
    },
    {
        key: '6',
        customerName: 'Olivia Martin',
        city: 'Edmonton',
        zipCode: 'T5J 3N4',
        email: 'olivia.martin@example.com',
        contact: '+1 (780) 555-0113',
    },
    {
        key: '7',
        customerName: 'Daniel Thompson',
        city: 'Winnipeg',
        zipCode: 'R3C 4T3',
        email: 'daniel.thompson@example.com',
        contact: '+1 (204) 555-0192',
    },
    {
        key: '8',
        customerName: 'Sophia White',
        city: 'Quebec City',
        zipCode: 'G1R 4P5',
        email: 'sophia.white@example.com',
        contact: '+1 (418) 555-0126',
    },
    {
        key: '9',
        customerName: 'James Anderson',
        city: 'Halifax',
        zipCode: 'B3J 1R7',
        email: 'james.anderson@example.com',
        contact: '+1 (902) 555-0183',
    },
    {
        key: '10',
        customerName: 'Ava Taylor',
        city: 'Hamilton',
        zipCode: 'L8P 1A1',
        email: 'ava.taylor@example.com',
        contact: '+1 (905) 555-0168',
    },
];

export default function WaitingList({ dashboard }: { dashboard?: boolean }) {
    // const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    // const [selectedUser, setSelectedUser] = useState<User | null>(null);
    // const [isBlockModalVisible, setIsBlockModalVisible] = useState<boolean>(false);
    // const [userToBlock, setUserToBlock] = useState<User | null>(null);

    // const showUserDetails = (user: User) => {
    //     setSelectedUser(user);
    //     setIsModalVisible(true);
    // };

    // const handleModalClose = () => {
    //     setIsModalVisible(false);
    //     setSelectedUser(null);
    // };

    // const showBlockModal = (user: User) => {
    //     setUserToBlock(user);
    //     setIsBlockModalVisible(true);
    // };

    // const handleBlockConfirm = () => {
    //     // Handle block user logic here
    //     console.log('Blocking user:', userToBlock);
    //     setIsBlockModalVisible(false);
    //     setUserToBlock(null);
    // };

    // const handleBlockCancel = () => {
    //     setIsBlockModalVisible(false);
    //     setUserToBlock(null);
    // };
    // import type { ColumnType } from 'antd/es/table';

    const columns: ColumnType<WaitingListTypes>[] = [
        {
            title: 'Serial No.',
            dataIndex: 'key',
            key: 'key',
            responsive: ['sm'] as any,
        },
        {
            title: 'Name',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            responsive: ['lg'] as any,
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }: {
                setSelectedKeys?: (keys: React.Key[]) => void;
                selectedKeys?: React.Key[];
                confirm?: () => void;
                clearFilters?: () => void;
            }) => (
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
                        {canadianCities?.map((city) => (
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
            onFilter: (value: boolean | React.Key, record: WaitingListTypes) => record.city === value,
            render: (city: string) => city,
        },
        {
            title: 'Zip Code',
            dataIndex: 'zipCode',
            key: 'zipCode',
            responsive: ['sm'] as any,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            responsive: ['lg'] as any,
        },
        {
            title: 'Chef’s Contact No',
            dataIndex: 'contact',
            key: 'contact',
            responsive: ['sm'] as any,
        },
    ];

    return (
        <>
            <div className="rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                    <HeaderTitle title="Waiting List" />
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#59A817',
                            },
                        }}
                    >
                        <Input
                            placeholder="Search"
                            className=""
                            style={{ width: 280, height: 40 }}
                            prefix={<i className="bi bi-search"></i>}
                        />
                    </ConfigProvider>
                </div>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#59A817',
                        },
                    }}
                >
                    <Table
                        columns={columns}
                        dataSource={orderData}
                        pagination={dashboard ? false : { pageSize: 9, total: orderData.length }}
                        className="custom-table"
                    />
                </ConfigProvider>
            </div>
        </>
    );
}
