import { Button, ConfigProvider, Rate, Select, Table } from 'antd';
import type { ColumnType } from 'antd/es/table/interface';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { ReviewTypes } from '../../../types/types';
import { CiCircleInfo } from 'react-icons/ci';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';
import ReviewDetailsModal from '../../../components/modals/ReviewDetailsModal';

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

const orderData: ReviewTypes[] = [
    {
        key: '1',
        customerName: 'John Smith',
        chefName: 'Chef Gordon Ramsay',
        dishName: 'Beef Wellington',
        rating: 5,
        city: 'Toronto',
        reviewText: 'Absolutely fantastic! Perfectly cooked and seasoned.',
        createdAt: '2025-10-15',
        status: 'Approved',
    },
    {
        key: '2',
        customerName: 'Sophia Brown',
        chefName: 'Chef Michael Lee',
        dishName: 'Sushi Platter',
        rating: 4.5,
        city: 'Vancouver',
        reviewText: 'Fresh and delicious. Presentation was great.',
        createdAt: '2025-10-16',
        status: 'Pending',
    },
    {
        key: '3',
        customerName: 'Liam Johnson',
        chefName: 'Chef Emma Wilson',
        dishName: 'Pasta Carbonara',
        rating: 4,
        city: 'Montreal',
        reviewText: 'Tasty, but could use a bit more sauce.',
        createdAt: '2025-10-17',
        status: 'Rejected',
    },
    {
        key: '4',
        customerName: 'Olivia Williams',
        chefName: 'Chef Daniel Clark',
        dishName: 'Chicken Parmesan',
        rating: 5,
        city: 'Calgary',
        reviewText: 'Crispy, cheesy, and flavorful — loved it!',
        createdAt: '2025-10-18',
        status: 'Approved',
    },
    {
        key: '5',
        customerName: 'Noah Miller',
        chefName: 'Chef Ava Davis',
        dishName: 'Grilled Salmon',
        rating: 4.2,
        city: 'Ottawa',
        reviewText: 'Perfectly grilled with nice smoky flavor.',
        createdAt: '2025-10-19',
        status: 'Pending',
    },
    {
        key: '6',
        customerName: 'Emma Johnson',
        chefName: 'Chef Lucas Martin',
        dishName: 'Lobster Bisque',
        rating: 3.8,
        city: 'Edmonton',
        reviewText: 'Good, but slightly too salty for my taste.',
        createdAt: '2025-10-20',
        status: 'Rejected',
    },
    {
        key: '7',
        customerName: 'James Davis',
        chefName: 'Chef Emily Brown',
        dishName: 'Tacos al Pastor',
        rating: 4.7,
        city: 'Winnipeg',
        reviewText: 'Flavor explosion! Definitely ordering again.',
        createdAt: '2025-10-21',
        status: 'Approved',
    },
    {
        key: '8',
        customerName: 'Isabella Moore',
        chefName: 'Chef Benjamin Scott',
        dishName: 'Caesar Salad',
        rating: 3.9,
        city: 'Halifax',
        reviewText: 'Crisp and fresh, but dressing too strong.',
        createdAt: '2025-10-22',
        status: 'Pending',
    },
    {
        key: '9',
        customerName: 'William Anderson',
        chefName: 'Chef Sarah White',
        dishName: 'BBQ Ribs',
        rating: 5,
        city: 'Quebec City',
        reviewText: 'Tender and smoky with perfect glaze.',
        createdAt: '2025-10-23',
        status: 'Approved',
    },
    {
        key: '10',
        customerName: 'Mia Thompson',
        chefName: 'Chef Jack Roberts',
        dishName: 'Chocolate Lava Cake',
        rating: 4.9,
        city: 'Toronto',
        reviewText: 'Rich and gooey — dessert perfection!',
        createdAt: '2025-10-24',
        status: 'Rejected',
    },
    {
        key: '11',
        customerName: 'Ethan Martinez',
        chefName: 'Chef Chloe Carter',
        dishName: 'Margherita Pizza',
        rating: 4.3,
        city: 'Vancouver',
        reviewText: 'Crispy crust and fresh toppings, loved it.',
        createdAt: '2025-10-25',
        status: 'Approved',
    },
    {
        key: '12',
        customerName: 'Charlotte Robinson',
        chefName: 'Chef Henry Lewis',
        dishName: 'Pad Thai',
        rating: 4.5,
        city: 'Calgary',
        reviewText: 'Great balance of flavors. Would recommend.',
        createdAt: '2025-10-26',
        status: 'Pending',
    },
    {
        key: '13',
        customerName: 'Jacob Walker',
        chefName: 'Chef Grace Young',
        dishName: 'Fish and Chips',
        rating: 4,
        city: 'Edmonton',
        reviewText: 'Crispy and delicious, portion was generous.',
        createdAt: '2025-10-27',
        status: 'Rejected',
    },
    {
        key: '14',
        customerName: 'Amelia King',
        chefName: 'Chef Oliver Hall',
        dishName: 'Greek Salad',
        rating: 3.7,
        city: 'Montreal',
        reviewText: 'Fresh but missing a bit of seasoning.',
        createdAt: '2025-10-28',
        status: 'Pending',
    },
    {
        key: '15',
        customerName: 'Benjamin Adams',
        chefName: 'Chef Ella Allen',
        dishName: 'Steak Frites',
        rating: 4.8,
        city: 'Ottawa',
        reviewText: 'Perfect medium rare. Fries were crisp and golden.',
        createdAt: '2025-10-29',
        status: 'Approved',
    },
    {
        key: '16',
        customerName: 'Harper Perez',
        chefName: 'Chef Ryan Nelson',
        dishName: 'Shrimp Alfredo',
        rating: 4.4,
        city: 'Toronto',
        reviewText: 'Creamy and rich with perfectly cooked shrimp.',
        createdAt: '2025-10-30',
        status: 'Pending',
    },
    {
        key: '17',
        customerName: 'Elijah Carter',
        chefName: 'Chef Lily Ramirez',
        dishName: 'Butter Chicken',
        rating: 4.6,
        city: 'Vancouver',
        reviewText: 'Incredible flavor! Naans were soft and warm.',
        createdAt: '2025-10-31',
        status: 'Approved',
    },
    {
        key: '18',
        customerName: 'Ava Lopez',
        chefName: 'Chef Samuel Murphy',
        dishName: 'Vegan Bowl',
        rating: 3.9,
        city: 'Calgary',
        reviewText: 'Healthy and filling but lacked seasoning.',
        createdAt: '2025-11-01',
        status: 'Rejected',
    },
    {
        key: '19',
        customerName: 'Lucas Rivera',
        chefName: 'Chef Natalie Foster',
        dishName: 'Chicken Tikka Masala',
        rating: 4.8,
        city: 'Winnipeg',
        reviewText: 'Rich, creamy, and flavorful. Highly recommend!',
        createdAt: '2025-11-02',
        status: 'Approved',
    },
    {
        key: '20',
        customerName: 'Ella Hill',
        chefName: 'Chef Logan Brooks',
        dishName: 'Pancakes with Maple Syrup',
        rating: 4.1,
        city: 'Halifax',
        reviewText: 'Fluffy and delicious, syrup was authentic!',
        createdAt: '2025-11-03',
        status: 'Pending',
    },
];

const statusColorMap = {
    Pending: { color: '#D48806', bg: '#F7F1CC' },
    Approved: { color: '#52C41A', bg: '#D9F2CD' },
    Rejected: { color: '#FF0000', bg: '#FFCCCC' },
};

export default function Reviews({ dashboard }: { dashboard?: boolean }) {
    const [selectedReview, setSelectedReview] = useState<ReviewTypes | null>(null);
    const [showModal, setShowModal] = useState(false);

    const showUserDetails = (record: ReviewTypes) => {
        setSelectedReview(record);
        setShowModal(true);
    };

    const columns: ColumnType<ReviewTypes>[] = [
        {
            title: 'Serial No.',
            dataIndex: 'key',
            key: 'key',
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
            title: 'Dish Name',
            dataIndex: 'dishName',
            key: 'dishName',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            responsive: ['md'] as any,
            render: (_, record) => <Rate disabled defaultValue={record.rating} style={{ color: '#59A817' }} />,
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
                            className="hover:text-primary"
                        >
                            Reset
                        </a>
                    </div>
                </div>
            ),
            onFilter: (value: boolean | React.Key, record: ReviewTypes) => record.city === value,
            render: (city: string) => city,
        },
        {
            title: 'Review Text',
            dataIndex: 'reviewText',
            key: 'reviewText',
            responsive: ['sm'] as any,
            render: (reviewText: string) => (
                <div className="w-32 overflow-hidden whitespace-nowrap text-ellipsis">
                    {reviewText?.slice(0, 20)} ...
                </div>
            ),
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            responsive: ['lg'] as any,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Approved', value: 'Approved' },
                { text: 'Pending', value: 'Pending' },
                { text: 'Rejected', value: 'Rejected' },
            ],
            onFilter: (value: boolean | React.Key, record: ReviewTypes) => record.status === value,
            render: (status: ReviewTypes['status'], record: ReviewTypes) => {
                const key = status as keyof typeof statusColorMap;
                const currentStyle =
                    status in statusColorMap ? statusColorMap[key] : { color: '#595959', bg: '#FAFAFA' };

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
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button
                        type="text"
                        icon={<CiCircleInfo size={24} />}
                        className="text-gray-500 hover:text-blue-500"
                        onClick={() => showUserDetails(record)}
                    />
                    <Button
                        type="text"
                        icon={<IoCheckmarkOutline size={24} />}
                        className={`text-primary`}
                        // onClick={() => showBlockModal(record)}
                    />
                    <Button
                        type="text"
                        icon={<IoMdClose size={24} />}
                        className={`text-red-500`}
                        // onClick={() => showBlockModal(record)}
                    />
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                    <HeaderTitle title="Reviews" />
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
                        dataSource={orderData as any}
                        pagination={dashboard ? false : { pageSize: 9, total: orderData.length }}
                        className="custom-table"
                    />
                </ConfigProvider>
            </div>

            <ReviewDetailsModal open={showModal} onClose={() => setShowModal(false)} review={selectedReview} />
        </>
    );
}
