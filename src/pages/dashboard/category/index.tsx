'use client';

import { useState } from 'react';
import { Button, ConfigProvider, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import AddEditCategoryModal, { CategoryFormValues } from '../../../components/modals/AddEditCategoryModal';
import DeleteModal from '../../../components/modals/DeleteModal';
import {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoriesQuery,
    useUpdateCategoryMutation,
} from '../../../redux/apiSlices/categorySlice';
import { imageUrl } from '../../../redux/api/baseApi';
import { ICategory } from '../../../types/types';

export default function Category({ dashboard }: { dashboard?: boolean }) {
    const { data, isFetching, refetch } = useGetCategoriesQuery({});
    const categoryList = data?.data ?? [];

    const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
    const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();
    const [updateCategory ] = useUpdateCategoryMutation();

    // modal states
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ICategory | null>(null);
    const [deletingKey, setDeletingKey] = useState<string | null>(null);
    

    const handleAddEditSubmit = async (values: CategoryFormValues) => {
        if (!values.categoryName) {
            message.error('Please enter a category name');
            return;
        }

        if (editingItem) {
            // Editing: PATCH as FormData to updateCategory
            const formData = new FormData();
            formData.append('name', values.categoryName.trim());
            const imageFile = values.image?.[0]?.originFileObj as File | undefined;
            if (imageFile) {
                formData.append('image', imageFile);
            }
            try {
                await updateCategory({ id: editingItem._id, data: formData }).unwrap();
                message.success('Updated successfully!');
                refetch();
                setIsAddEditModalOpen(false);
                setEditingItem(null);
            } catch (error: any) {
                const errorMessage = error?.data?.message ?? 'Failed to update category';
                message.error(errorMessage);
            }
            return;
        }

        // Add (Create): POST as individual fields handled in mutation
        const imageFile = values.image?.[0]?.originFileObj as File | undefined;
        if (!imageFile) {
            message.error('Please upload an image');
            return;
        }

        try {
            await createCategory({ name: values.categoryName.trim(), image: imageFile }).unwrap();
            message.success('Added successfully!');
            refetch();
            setIsAddEditModalOpen(false);
            setEditingItem(null);
        } catch (error: any) {
            const errorMessage = error?.data?.message ?? 'Failed to add category';
            message.error(errorMessage);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!deletingKey) return;
        try {
            await deleteCategory({ id: deletingKey }).unwrap();
            message.success('Deleted successfully!');
            refetch();
        } catch (error: any) {
            const errorMessage = error?.data?.message ?? 'Failed to delete category';
            message.error(errorMessage);
        } finally {
            setIsDeleteModalOpen(false);
            setDeletingKey(null);
        }
    };

    const columns: ColumnsType<ICategory> = [
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
                            setDeletingKey(record._id);
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
                    onClick={() => {
                        setEditingItem(null);
                        setIsAddEditModalOpen(true);
                    }}
                >
                    Add Category
                </button>
            </div>

            <ConfigProvider theme={{ token: { colorPrimary: '#C8A284' } }}>
                <Table
                    columns={columns}
                    dataSource={categoryList}
                    pagination={dashboard ? false : { pageSize: 9 }}
                    rowKey="_id"
                    loading={isFetching}
                />
            </ConfigProvider>

            <AddEditCategoryModal
                open={isAddEditModalOpen}
                onCancel={() => {
                    setIsAddEditModalOpen(false);
                    setEditingItem(null);
                }}
                onSubmit={handleAddEditSubmit}
                editingItem={editingItem}
                confirmLoading={isCreating}
            />

            <DeleteModal
                open={isDeleteModalOpen}
                onCancel={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                confirmLoading={isDeleting}
            />
        </div>
    );
}
