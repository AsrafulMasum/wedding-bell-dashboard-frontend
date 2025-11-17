'use client';

import { useState } from 'react';
import { Button, ConfigProvider, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { CategoryTypes } from '../../../types/types';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import AddEditCategoryModal from '../../../components/modals/AddEditCategoryModal';
import DeleteModal from '../../../components/modals/DeleteModal';
import { useCreateCategoryMutation, useGetCategoriesQuery } from '../../../redux/apiSlices/categorySlice';
import { imageUrl } from '../../../redux/api/baseApi';

export const categoryData: CategoryTypes[] = [
    { key: '1', categoryName: 'Italian Cuisine', totalDishes: 45 },
    { key: '2', categoryName: 'Chinese Delights', totalDishes: 38 },
    { key: '3', categoryName: 'Indian Spices', totalDishes: 52 },
    { key: '4', categoryName: 'Mexican Fiesta', totalDishes: 41 },
];

export default function Category({ dashboard }: { dashboard?: boolean }) {
    const { data } = useGetCategoriesQuery({})
    const [createCategory] = useCreateCategoryMutation();
    const categoryList = data?.data;

    // modal states
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<CategoryTypes | null>(null);
    const [deletingKey, setDeletingKey] = useState<string | null>(null);

    const handleAddEditSubmit = (values: Partial<CategoryTypes>) => {
        if (editingItem) {
            const updated = categoryList.map((item) =>
                item.key === editingItem.key ? { ...item, ...values } : item
            );
            setCategoryList(updated);
            message.success('Updated successfully!');
        } else {
            const newItem: CategoryTypes = {
                key: Date.now().toString(),
                categoryName: values.categoryName || '',
                totalDishes: values.totalDishes || 0,
            };
            setCategoryList([...categoryList, newItem]);
            message.success('Added successfully!');
        }
        setIsAddEditModalOpen(false);
        setEditingItem(null);
    };

    const handleDeleteConfirm = () => {
        const updated = categoryList.filter((item) => item.key !== deletingKey);
        setCategoryList(updated);
        setIsDeleteModalOpen(false);
        setDeletingKey(null);
        message.success('Deleted successfully!');
    };

    const columns: ColumnsType<CategoryTypes> = [
        {
            title: 'Serial No.',
            dataIndex: 'index',
            key: 'index',
            render: (_, __, index) => index + 1,
        },
        {
            title: 'Image',
            key: 'image',
            render: (_, record) => (
                <div className="h-12 w-20">
                    <img
                        src={`${imageUrl}/${record.image}`}
                        alt="slider"
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
            ),
        },
        {
            title: 'Category',
            dataIndex: 'name',
            key: 'name',
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
                <HeaderTitle title="Categories" />

                <button
                    className="bg-primary h-10 px-4 rounded-md text-white text-sm font-semibold"
                    onClick={() => setIsAddEditModalOpen(true)}
                >
                    Add Category
                </button>
            </div>

            <ConfigProvider theme={{ token: { colorPrimary: '#C8A284' } }}>
                <Table
                    columns={columns}
                    dataSource={categoryList}
                    pagination={dashboard ? false : { pageSize: 9 }}
                    rowKey="key"
                />
            </ConfigProvider>

            <AddEditCategoryModal
                open={isAddEditModalOpen}
                onCancel={() => setIsAddEditModalOpen(false)}
                onSubmit={handleAddEditSubmit}
                editingItem={editingItem}
            />

            <DeleteModal
                open={isDeleteModalOpen}
                onCancel={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
            />
        </div>
    );
}
