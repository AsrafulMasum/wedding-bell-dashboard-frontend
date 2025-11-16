'use client';

import { useState } from 'react';
import { Button, ConfigProvider, Select, Table, Tabs, message } from 'antd';
import type { ColumnType } from 'antd/es/table';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { CategoryTypes } from '../../../types/types';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import AddEditCategoryModal from '../../../components/modals/AddEditCategoryModal';
import DeleteModal from '../../../components/modals/DeleteModal';

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

export const categoryData: CategoryTypes[] = [
    { key: '1', categoryName: 'Italian Cuisine', totalDishes: 45, city: 'Toronto', deliveryStatus: 'active' },
    { key: '2', categoryName: 'Chinese Delights', totalDishes: 38, city: 'Vancouver', deliveryStatus: 'inactive' },
    { key: '3', categoryName: 'Indian Spices', totalDishes: 52, city: 'Calgary', deliveryStatus: 'active' },
    { key: '4', categoryName: 'Mexican Fiesta', totalDishes: 41, city: 'Ottawa', deliveryStatus: 'inactive' },
];

export const subCategoryData: CategoryTypes[] = [
    { key: '1', categoryName: 'Pasta', totalDishes: 12, city: 'Toronto', deliveryStatus: 'active' },
    { key: '2', categoryName: 'Dim Sum', totalDishes: 8, city: 'Vancouver', deliveryStatus: 'inactive' },
    { key: '3', categoryName: 'Curry', totalDishes: 10, city: 'Calgary', deliveryStatus: 'active' },
    { key: '4', categoryName: 'Tacos', totalDishes: 7, city: 'Ottawa', deliveryStatus: 'inactive' },
];

const statusColorMap = {
    active: { color: '#52C41A', bg: '#D9F2CD' },
    inactive: { color: '#FF0000', bg: '#FFCCCC' },
};

export default function Category({ dashboard }: { dashboard?: boolean }) {
    const [activeTab, setActiveTab] = useState<'category' | 'subcategory'>('category');

    const [categoryList, setCategoryList] = useState<CategoryTypes[]>(categoryData);
    const [subCategoryList, setSubCategoryList] = useState<CategoryTypes[]>(subCategoryData);

    // modal states
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<CategoryTypes | null>(null);
    const [deletingKey, setDeletingKey] = useState<string | null>(null);

    const handleAddEditSubmit = (values: Partial<CategoryTypes>) => {
        if (editingItem) {
            const updated = (activeTab === 'category' ? categoryList : subCategoryList).map((item) =>
                item.key === editingItem.key ? { ...item, ...values } : item,
            );
            activeTab === 'category' ? setCategoryList(updated) : setSubCategoryList(updated);
            message.success('Updated successfully!');
        } else {
            const newItem: CategoryTypes = {
                key: Date.now().toString(),
                categoryName: '',
                totalDishes: 0,
                city: '',
                deliveryStatus: 'active',
                ...values,
            };
            activeTab === 'category'
                ? setCategoryList([...categoryList, newItem])
                : setSubCategoryList([...subCategoryList, newItem]);
            message.success('Added successfully!');
        }
        setIsAddEditModalOpen(false);
        setEditingItem(null);
    };

    const handleDeleteConfirm = () => {
        const updated = (activeTab === 'category' ? categoryList : subCategoryList).filter(
            (item) => item.key !== deletingKey,
        );
        activeTab === 'category' ? setCategoryList(updated) : setSubCategoryList(updated);
        setIsDeleteModalOpen(false);
        setDeletingKey(null);
        message.success('Deleted successfully!');
    };

    const columns: ColumnType<CategoryTypes>[] = [
        {
            title: 'Serial No.',
            dataIndex: 'key',
            key: 'key',
            responsive: ['sm'] as any,
        },
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: 'Total Dishes',
            dataIndex: 'totalDishes',
            key: 'totalDishes',
            responsive: ['sm'] as any,
        },
        // {
        //   title: 'City',
        //   dataIndex: 'city',
        //   key: 'city',
        //   responsive: ['lg'] as any,
        //   filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        //     <div style={{ padding: 8 }}>
        //       <Select
        //         placeholder="Select a Canadian city"
        //         value={selectedKeys?.[0] ?? undefined}
        //         style={{ width: 200 }}
        //         onChange={(value) => {
        //           setSelectedKeys?.(value ? [value] : []);
        //           confirm?.();
        //         }}
        //         allowClear
        //         showSearch
        //         filterOption={(input, option) =>
        //           (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
        //         }
        //       >
        //         {canadianCities?.map((city) => (
        //           <Option key={city} value={city}>
        //             {city}
        //           </Option>
        //         ))}
        //       </Select>
        //       <div style={{ marginTop: 8 }}>
        //         <a
        //           onClick={() => {
        //             clearFilters?.();
        //             confirm?.();
        //           }}
        //           style={{ width: 90, marginRight: 8 }}
        //         >
        //           Reset
        //         </a>
        //       </div>
        //     </div>
        //   ),
        //   onFilter: (value: string | number | boolean, record: CategoryTypes) => record.city === value,
        //   render: (city: string) => city,
        // },
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
            onFilter: (value, record) => record.city === String(value),
            render: (city: string) => city,
        },
        {
            title: 'Status',
            dataIndex: 'deliveryStatus',
            key: 'deliveryStatus',
            render: (status: CategoryTypes['deliveryStatus']) => {
                const currentStyle =
                    status in statusColorMap
                        ? statusColorMap[status as keyof typeof statusColorMap]
                        : { color: '#595959', bg: '#FAFAFA' };

                return (
                    <p
                        className="capitalize px-1 py-0.5 text-center rounded-lg max-w-40"
                        style={{ color: currentStyle.color, backgroundColor: currentStyle.bg }}
                    >
                        {status}
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
                        icon={<FiEdit size={20} />}
                        onClick={() => {
                            setEditingItem(record);
                            setIsAddEditModalOpen(true);
                        }}
                    />
                    <Button
                        type="text"
                        icon={<MdOutlineDeleteOutline size={24} />}
                        className="text-red-500"
                        onClick={() => {
                            setDeletingKey(record.key);
                            setIsDeleteModalOpen(true);
                        }}
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
                <HeaderTitle title={activeTab === 'category' ? 'Categories' : 'Sub-Categories'} />
                <button
                    className="bg-primary h-10 px-4 rounded-md text-white text-sm font-semibold"
                    onClick={() => setIsAddEditModalOpen(true)}
                >
                    Add {activeTab === 'category' ? 'Category' : 'Sub-Category'}
                </button>
            </div>

            <ConfigProvider
                theme={{
                    token: { colorPrimary: '#59A817' },
                }}
            >
                <Tabs
                    defaultActiveKey="category"
                    onChange={(key) => setActiveTab(key as 'category' | 'subcategory')}
                    items={[
                        {
                            key: 'category',
                            label: 'Categories',
                            children: (
                                <Table
                                    columns={columns}
                                    dataSource={categoryList}
                                    pagination={dashboard ? false : { pageSize: 9, total: categoryList.length }}
                                    className="custom-table"
                                />
                            ),
                        },
                        {
                            key: 'subcategory',
                            label: 'Sub-Categories',
                            children: (
                                <Table
                                    columns={columns}
                                    dataSource={subCategoryList}
                                    pagination={dashboard ? false : { pageSize: 9, total: subCategoryList.length }}
                                    className="custom-table"
                                />
                            ),
                        },
                    ]}
                />
            </ConfigProvider>

            {/* Modals */}
            <AddEditCategoryModal
                open={isAddEditModalOpen}
                onCancel={() => setIsAddEditModalOpen(false)}
                onSubmit={handleAddEditSubmit}
                editingItem={editingItem}
                activeTab={activeTab}
                canadianCities={canadianCities}
            />

            <DeleteModal
                open={isDeleteModalOpen}
                onCancel={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
            />
        </div>
    );
}
