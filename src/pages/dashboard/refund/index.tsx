import { Button, ConfigProvider, Input, Table } from 'antd';
import type { ColumnType } from 'antd/es/table/interface';
// import { User } from '../../../demo-data/users.data';
// import { useState } from 'react';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { RefundType } from '../../../types/types';
import { CiCircleInfo } from 'react-icons/ci';
import { useState } from 'react';
import RefundDetailsModal from '../../../components/modals/RefundDetailsModal';

// const { Option } = Select;

// const canadianCities = [
//     'Toronto',
//     'Vancouver',
//     'Montreal',
//     'Calgary',
//     'Edmonton',
//     'Ottawa',
//     'Winnipeg',
//     'Quebec City',
//     'Hamilton',
//     'Kitchener',
//     'London',
//     'Victoria',
//     'Halifax',
//     'Oshawa',
//     'Windsor',
//     'Saskatoon',
//     'Regina',
//     'St. Johns',
//     'Barrie',
//     'Kelowna',
//     'Abbotsford',
//     'Sherbrooke',
//     'Guelph',
//     'Kingston',
//     'Forfield', // From your original data
//     'Noperville', // From your original data
//     'Orange', // From your original data
//     'Toledo', // From your original data
//     'Austin', // From your original data
// ];

const refundData: RefundType[] = [
    {
        key: '1',
        orderNumber: 'ORD-1001',
        customerName: 'Emma Johnson',
        chefName: 'Chef Michael',
        refundType: 'Full Refund',
        paidAmount: '$120.00',
        refundPercentage: '100%',
        refundPercent: 100,
        amount: '$120.00',
        reason: 'Food was cold upon delivery',
        deliveryStatus: 'Approved',
    },
    {
        key: '2',
        orderNumber: 'ORD-1002',
        customerName: 'Liam Smith',
        chefName: 'Chef Olivia',
        refundType: 'Partial Refund',
        paidAmount: '$90.00',
        refundPercentage: '50%',
        refundPercent: 50,
        amount: '$45.00',
        reason: 'Late delivery',
        deliveryStatus: 'Pending',
    },
    {
        key: '3',
        orderNumber: 'ORD-1003',
        customerName: 'Sophia Brown',
        chefName: 'Chef Noah',
        refundType: 'Full Refund',
        paidAmount: '$75.00',
        refundPercentage: '100%',
        refundPercent: 100,
        amount: '$75.00',
        reason: 'Wrong order received',
        deliveryStatus: 'Approved',
    },
    {
        key: '4',
        orderNumber: 'ORD-1004',
        customerName: 'James Davis',
        chefName: 'Chef Emma',
        refundType: 'Partial Refund',
        paidAmount: '$110.00',
        refundPercentage: '30%',
        refundPercent: 30,
        amount: '$33.00',
        reason: 'Item missing',
        deliveryStatus: 'Rejected',
    },
    {
        key: '5',
        orderNumber: 'ORD-1005',
        customerName: 'Olivia Wilson',
        chefName: 'Chef Liam',
        refundType: 'Full Refund',
        paidAmount: '$150.00',
        refundPercentage: '100%',
        refundPercent: 100,
        amount: '$150.00',
        reason: 'Customer canceled before preparation',
        deliveryStatus: 'Approved',
    },
    {
        key: '6',
        orderNumber: 'ORD-1006',
        customerName: 'Benjamin Lee',
        chefName: 'Chef Sophia',
        refundType: 'Partial Refund',
        paidAmount: '$85.00',
        refundPercentage: '40%',
        refundPercent: 40,
        amount: '$34.00',
        reason: 'Under-cooked food',
        deliveryStatus: 'Pending',
    },
    {
        key: '7',
        orderNumber: 'ORD-1007',
        customerName: 'Mia Taylor',
        chefName: 'Chef Daniel',
        refundType: 'Full Refund',
        paidAmount: '$60.00',
        refundPercentage: '100%',
        refundPercent: 100,
        amount: '$60.00',
        reason: 'Food never arrived',
        deliveryStatus: 'Approved',
    },
    {
        key: '8',
        orderNumber: 'ORD-1008',
        customerName: 'Ethan Martinez',
        chefName: 'Chef Ava',
        refundType: 'Partial Refund',
        paidAmount: '$95.00',
        refundPercentage: '25%',
        refundPercent: 25,
        amount: '$23.75',
        reason: 'Packaging damaged',
        deliveryStatus: 'Rejected',
    },
    {
        key: '9',
        orderNumber: 'ORD-1009',
        customerName: 'Charlotte White',
        chefName: 'Chef James',
        refundType: 'Full Refund',
        paidAmount: '$130.00',
        refundPercentage: '100%',
        refundPercent: 100,
        amount: '$130.00',
        reason: 'Duplicate order placed',
        deliveryStatus: 'Approved',
    },
    {
        key: '10',
        orderNumber: 'ORD-1010',
        customerName: 'William Harris',
        chefName: 'Chef Grace',
        refundType: 'Partial Refund',
        paidAmount: '$70.00',
        refundPercentage: '50%',
        refundPercent: 50,
        amount: '$35.00',
        reason: 'Cold food',
        deliveryStatus: 'Pending',
    },
    {
        key: '11',
        orderNumber: 'ORD-1011',
        customerName: 'Ava Clark',
        chefName: 'Chef Henry',
        refundType: 'Full Refund',
        paidAmount: '$140.00',
        refundPercentage: '100%',
        refundPercent: 100,
        amount: '$140.00',
        reason: 'Incorrect meal delivered',
        deliveryStatus: 'Approved',
    },
    {
        key: '12',
        orderNumber: 'ORD-1012',
        customerName: 'Lucas Young',
        chefName: 'Chef Ella',
        refundType: 'Partial Refund',
        paidAmount: '$80.00',
        refundPercentage: '35%',
        refundPercent: 35,
        amount: '$28.00',
        reason: 'Missing side dish',
        deliveryStatus: 'Rejected',
    },
    {
        key: '13',
        orderNumber: 'ORD-1013',
        customerName: 'Amelia King',
        chefName: 'Chef Jack',
        refundType: 'Full Refund',
        paidAmount: '$95.00',
        refundPercentage: '100%',
        refundPercent: 100,
        amount: '$95.00',
        reason: 'Late and incorrect order',
        deliveryStatus: 'Pending',
    },
    {
        key: '14',
        orderNumber: 'ORD-1014',
        customerName: 'Elijah Scott',
        chefName: 'Chef Emily',
        refundType: 'Partial Refund',
        paidAmount: '$100.00',
        refundPercentage: '20%',
        refundPercent: 20,
        amount: '$20.00',
        reason: 'Small portion size',
        deliveryStatus: 'Rejected',
    },
    {
        key: '15',
        orderNumber: 'ORD-1015',
        customerName: 'Isabella Green',
        chefName: 'Chef Ryan',
        refundType: 'Full Refund',
        paidAmount: '$85.00',
        refundPercentage: '100%',
        refundPercent: 100,
        amount: '$85.00',
        reason: 'Found hair in food',
        deliveryStatus: 'Approved',
    },
    {
        key: '16',
        orderNumber: 'ORD-1016',
        customerName: 'Henry Adams',
        chefName: 'Chef Mia',
        refundType: 'Partial Refund',
        paidAmount: '$90.00',
        refundPercentage: '45%',
        refundPercent: 45,
        amount: '$40.50',
        reason: 'Poor taste quality',
        deliveryStatus: 'Pending',
    },
    {
        key: '17',
        orderNumber: 'ORD-1017',
        customerName: 'Evelyn Baker',
        chefName: 'Chef Logan',
        refundType: 'Full Refund',
        paidAmount: '$115.00',
        refundPercentage: '100%',
        refundPercent: 100,
        amount: '$115.00',
        reason: 'Customer complaint verified',
        deliveryStatus: 'Approved',
    },
    {
        key: '18',
        orderNumber: 'ORD-1018',
        customerName: 'Alexander Perez',
        chefName: 'Chef Lily',
        refundType: 'Partial Refund',
        paidAmount: '$65.00',
        refundPercentage: '30%',
        refundPercent: 30,
        amount: '$19.50',
        reason: 'Delivery delay',
        deliveryStatus: 'Rejected',
    },
    {
        key: '19',
        orderNumber: 'ORD-1019',
        customerName: 'Harper Carter',
        chefName: 'Chef Noah',
        refundType: 'Full Refund',
        paidAmount: '$105.00',
        refundPercentage: '100%',
        refundPercent: 100,
        amount: '$105.00',
        reason: 'Order not confirmed',
        deliveryStatus: 'Approved',
    },
    {
        key: '20',
        orderNumber: 'ORD-1020',
        customerName: 'Daniel Roberts',
        chefName: 'Chef Ava',
        refundType: 'Partial Refund',
        paidAmount: '$125.00',
        refundPercentage: '50%',
        refundPercent: 50,
        amount: '$62.50',
        reason: 'Incomplete meal set',
        deliveryStatus: 'Pending',
    },
];

const statusColorMap = {
    Pending: { color: '#D48806', bg: '#F7F1CC' },
    Rejected: { color: '#FF4D4F', bg: '#FFD8D7' },
    Approved: { color: '#52C41A', bg: '#D9F2CD' },
};

export default function Refund({ dashboard }: { dashboard?: boolean }) {
    const [selectedReview, setSelectedReview] = useState<RefundType | null>(null);
    const [showModal, setShowModal] = useState(false);

    const showUserDetails = (record: RefundType) => {
        setSelectedReview(record);
        setShowModal(true);
    };
    const columns: ColumnType<RefundType>[] = [
        {
            title: 'Order ID',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
            responsive: ['sm'] as any,
        },
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Chef Name',
            dataIndex: 'chefName',
            key: 'chefName',
        },
        {
            title: 'Refund Type',
            dataIndex: 'refundType',
            key: 'refundType',
            responsive: ['md'] as any,
        },
        // {
        //     title: 'City',
        //     dataIndex: 'city',
        //     key: 'city',
        //     responsive: ['lg'] as any,
        //     filterDropdown: ({
        //         setSelectedKeys,
        //         selectedKeys,
        //         confirm,
        //         clearFilters,
        //     }: {
        //         setSelectedKeys?: (keys: React.Key[]) => void;
        //         selectedKeys?: React.Key[];
        //         confirm?: () => void;
        //         clearFilters?: () => void;
        //     }) => (
        //         <div style={{ padding: 8 }}>
        //             <Select
        //                 placeholder="Select a Canadian city"
        //                 value={selectedKeys?.[0] ?? undefined}
        //                 style={{ width: 200 }}
        //                 onChange={(value) => {
        //                     setSelectedKeys?.(value ? [value] : []);
        //                     confirm?.();
        //                 }}
        //                 allowClear
        //                 showSearch
        //                 filterOption={(input, option) =>
        //                     (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
        //                 }
        //             >
        //                 {canadianCities?.map((city) => (
        //                     <Option key={city} value={city}>
        //                         {city}
        //                     </Option>
        //                 ))}
        //             </Select>
        //             <div style={{ marginTop: 8 }}>
        //                 <a
        //                     onClick={() => {
        //                         clearFilters?.();
        //                         confirm?.();
        //                     }}
        //                     style={{ width: 90, marginRight: 8 }}
        //                 >
        //                     Reset
        //                 </a>
        //             </div>
        //         </div>
        //     ),
        //     onFilter: (value: boolean | React.Key, record: Order) => record.city === value,
        //     render: (city: string) => city,
        // },
        {
            title: 'Paid Amount',
            dataIndex: 'paidAmount',
            key: 'paidAmount',
            responsive: ['sm'] as any,
        },
        {
            title: 'Refund %',
            dataIndex: 'refundPercentage',
            key: 'refundPercentage',
            responsive: ['lg'] as any,
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            key: 'reason',
            responsive: ['sm'] as any,
        },
        {
            title: 'Status',
            dataIndex: 'deliveryStatus',
            key: 'deliveryStatus',
            render: (status: RefundType['deliveryStatus'], record: RefundType) => {
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
                        {record?.deliveryStatus}
                    </p>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button
                        type="text"
                        icon={<CiCircleInfo size={24} />}
                        className="text-gray-500 hover:text-blue-500"
                        onClick={() => showUserDetails(record)}
                    />
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                    <HeaderTitle title="Refund Requests" />
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
                        dataSource={refundData as any}
                        pagination={dashboard ? false : { pageSize: 9, total: refundData.length }}
                        className="custom-table"
                    />
                </ConfigProvider>
            </div>
            <RefundDetailsModal open={showModal} onClose={() => setShowModal(false)} refund={selectedReview} />
        </>
    );
}
