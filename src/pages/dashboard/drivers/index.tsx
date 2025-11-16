import { Button, ConfigProvider, Input, Select, Table, Tabs } from 'antd';
import { useState } from 'react';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { CiCircleInfo, CiLock, CiUnlock } from 'react-icons/ci';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import UserModal from '../users/UserModal';
import BlockModal from '../users/BlockModal';
import { DriverTypes } from '../../../types/types';

const { Option } = Select;
const { TabPane } = Tabs;

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

const userData: DriverTypes[] = [
    {
        key: '1',
        serialId: 'DRV-1001',
        userName: 'John Doe',
        email: 'john.doe@example.com',
        address: '123 King Street W, Apt 12',
        city: 'Toronto',
        vehicleType: 'Car',
        licenseNo: 'ON-2345678',
        files: 'Profile, NID, License',
        status: 'active',
    },
    {
        key: '2',
        serialId: 'DRV-1002',
        userName: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        address: '58 W 5th Ave',
        city: 'Vancouver',
        vehicleType: 'Motorbike',
        licenseNo: 'BC-7865432',
        files: 'Profile, NID',
        status: 'inactive',
    },
    // ... (rest of your data remains unchanged)
];

// ✅ New dummy request data
const driverRequests = [
    {
        key: '1',
        serialId: 'REQ-2001',
        userName: 'Mark Stone',
        email: 'mark.stone@example.com',
        address: '55 York St',
        city: 'Toronto',
        vehicleType: 'Car',
        licenseNo: 'ON-989898',
        files: 'Profile, License',
        status: 'Pending',
    },
    {
        key: '2',
        serialId: 'REQ-2002',
        userName: 'Ella Green',
        email: 'ella.green@example.com',
        address: '18 West St',
        city: 'Vancouver',
        vehicleType: 'Motorbike',
        licenseNo: 'BC-223344',
        files: 'Profile, NID',
        status: 'Approved',
    },
];

const statusColorMap = {
    Pending: { color: '#D48806', bg: '#F7F1CC' },
    Rejected: { color: '#FF4D4F', bg: '#FFD8D7' },
    Approved: { color: '#52C41A', bg: '#D9F2CD' },
};

export default function Drivers({ dashboard }: { dashboard?: boolean }) {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<DriverTypes | null>(null);
    const [isBlockModalVisible, setIsBlockModalVisible] = useState<boolean>(false);
    const [userToBlock, setUserToBlock] = useState<DriverTypes | null>(null);

    const showUserDetails = (user: DriverTypes) => {
        setSelectedUser(user);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedUser(null);
    };

    const showBlockModal = (user: DriverTypes) => {
        setUserToBlock(user);
        setIsBlockModalVisible(true);
    };

    const handleBlockConfirm = () => {
        console.log('Blocking user:', userToBlock);
        setIsBlockModalVisible(false);
        setUserToBlock(null);
    };

    const handleBlockCancel = () => {
        setIsBlockModalVisible(false);
        setUserToBlock(null);
    };

    // Existing columns unchanged
    const columns = [
        {
            title: 'Serial ID',
            dataIndex: 'serialId',
            key: 'serialId',
            responsive: ['sm'] as any,
        },
        {
            title: 'Name',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            responsive: ['md'] as any,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            responsive: ['lg'] as any,
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            responsive: ['lg'] as any,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
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
            onFilter: (value: boolean | React.Key, record: DriverTypes) => record.city === value,
            render: (city: string) => city,
        },
        {
            title: 'Vehicle Type',
            dataIndex: 'vehicleType',
            key: 'vehicleType',
            responsive: ['sm'] as any,
        },
        {
            title: 'License No.',
            dataIndex: 'licenseNo',
            key: 'licenseNo',
            responsive: ['sm'] as any,
        },
        {
            title: 'Uploaded Files',
            dataIndex: 'files',
            key: 'files',
            responsive: ['sm'] as any,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: DriverTypes) => (
                <div className="flex gap-2">
                    <Button
                        type="text"
                        icon={<CiCircleInfo size={24} />}
                        className="text-gray-500 hover:text-primary"
                        onClick={() => showUserDetails(record)}
                    />
                    <Button
                        type="text"
                        icon={record?.status == 'active' ? <CiLock size={24} /> : <CiUnlock size={24} />}
                        className={
                            record?.status == 'active'
                                ? 'text-gray-500 hover:!text-red-500'
                                : 'hover:!text-gray-500 !text-red-500'
                        }
                        onClick={() => showBlockModal(record)}
                    />
                    <Button
                        type="text"
                        icon={<MdOutlineDeleteOutline size={24} />}
                        className={'text-red-400 hover:!text-red-500'}
                        onClick={() => showBlockModal(record)}
                    />
                </div>
            ),
        },
    ];

    const requestColumns = [
        {
            title: 'Serial ID',
            dataIndex: 'serialId',
            key: 'serialId',
            responsive: ['sm'] as any,
        },
        {
            title: 'Name',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            responsive: ['md'] as any,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            responsive: ['lg'] as any,
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            responsive: ['lg'] as any,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
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
            onFilter: (value: boolean | React.Key, record: DriverTypes) => record.city === value,
            render: (city: string) => city,
        },
        {
            title: 'Vehicle Type',
            dataIndex: 'vehicleType',
            key: 'vehicleType',
            responsive: ['sm'] as any,
        },
        {
            title: 'License No.',
            dataIndex: 'licenseNo',
            key: 'licenseNo',
            responsive: ['sm'] as any,
        },
        {
            title: 'Uploaded Files',
            dataIndex: 'files',
            key: 'files',
            responsive: ['sm'] as any,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: DriverTypes['status'], record: DriverTypes) => {
                const key = status as keyof typeof statusColorMap;
                const currentStyle =
                    status in statusColorMap
                        ? statusColorMap[key]
                        : {
                              color: '#595959',
                              bg: '#FAFAFA',
                          };

                return (
                    <p
                        className="capitalize px-1 py-0.5 text-center rounded-lg"
                        style={{
                            color: currentStyle.color,
                            backgroundColor: currentStyle.bg,
                        }}
                    >
                        {record?.status}
                    </p>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: DriverTypes) => (
                <div className="flex gap-2">
                    <Button
                        type="text"
                        icon={<CiCircleInfo size={24} />}
                        className="text-gray-500 hover:text-primary"
                        onClick={() => showUserDetails(record)}
                    />
                    <Button
                        type="text"
                        icon={record?.status == 'active' ? <CiLock size={24} /> : <CiUnlock size={24} />}
                        className={
                            record?.status == 'active'
                                ? 'text-gray-500 hover:!text-red-500'
                                : 'hover:!text-gray-500 !text-red-500'
                        }
                        onClick={() => showBlockModal(record)}
                    />
                    <Button
                        type="text"
                        icon={<MdOutlineDeleteOutline size={24} />}
                        className={'text-red-400 hover:!text-red-500'}
                        onClick={() => showBlockModal(record)}
                    />
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="rounded-lg shadow-sm border border-gray-200 p-4">
                <ConfigProvider theme={{ token: { colorPrimary: '#59A817' } }}>
                    <Tabs defaultActiveKey="1">
                        {/* 🧍‍♂️ Existing Drivers Tab (unchanged) */}
                        <TabPane tab="Drivers" key="1">
                            <div className="flex items-center justify-between mb-4">
                                <HeaderTitle title="Users" />
                                <Input
                                    placeholder="Search"
                                    style={{ width: 280, height: 40 }}
                                    prefix={<i className="bi bi-search"></i>}
                                />
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
                                    dataSource={userData}
                                    pagination={dashboard ? false : { pageSize: 9, total: userData.length }}
                                    className="custom-table"
                                />
                            </ConfigProvider>
                        </TabPane>

                        {/* 🆕 New Requests Tab */}
                        <TabPane tab="Requests" key="2">
                            <div className="flex items-center justify-between mb-4">
                                <HeaderTitle title="Driver Requests" />
                                <Input
                                    placeholder="Search Requests"
                                    style={{ width: 280, height: 40 }}
                                    prefix={<i className="bi bi-search"></i>}
                                />
                            </div>
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimary: '#59A817',
                                    },
                                }}
                            >
                                <Table<any>
                                    columns={requestColumns}
                                    dataSource={driverRequests}
                                    pagination={{
                                        pageSize: 9,
                                        total: driverRequests.length,
                                    }}
                                />
                            </ConfigProvider>
                        </TabPane>
                    </Tabs>
                </ConfigProvider>
            </div>

            <UserModal
                isModalVisible={isModalVisible}
                handleModalClose={handleModalClose}
                selectedUser={selectedUser}
            />

            <BlockModal
                isBlockModalVisible={isBlockModalVisible}
                handleBlockCancel={handleBlockCancel}
                handleBlockConfirm={handleBlockConfirm}
                isUserBlocked={userToBlock?.status !== 'active'}
            />
        </>
    );
}
