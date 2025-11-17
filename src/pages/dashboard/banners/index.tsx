import { PlusOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Input, Modal, Table, Upload, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { FiEdit, FiSearch } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';

import {
    useCreateBannerMutation,
    useDeleteBannerMutation,
    useGetBannersQuery,
    useUpdateBannerMutation,
} from '../../../redux/apiSlices/bannerSlice';

import { imageUrl } from '../../../redux/api/baseApi';
import { IBanner } from '../../../types/types';

const AppSliderList: React.FC = () => {
    const [page] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const { data, refetch } = useGetBannersQuery({ query: searchTerm });
    const [createBanner] = useCreateBannerMutation();
    const [updateBanner] = useUpdateBannerMutation();
    const [deleteBanner] = useDeleteBannerMutation();

    const banners = data?.data || [];

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const [editData, setEditData] = useState<IBanner | null>(null);
    const [deleteId, setDeleteId] = useState<string>('');

    useEffect(() => {
        refetch();
    }, [searchTerm]);

    /* -----------------------------
        DELETE HANDLER
    ------------------------------ */
    const handleDelete = async () => {
        try {
            await deleteBanner({ id: deleteId }).unwrap();
            message.success('Banner deleted successfully');
            setOpenDeleteModal(false);
            refetch();
        } catch {
            message.error('Failed to delete banner');
        }
    };

    /* -----------------------------
        ADD HANDLER
    ------------------------------ */
    const handleAddBanner = async (image: File | null) => {
        if (!image) return message.error('Please select an image');

        try {
            await createBanner({ image }).unwrap();
            message.success('Banner added successfully');
            setOpenAddModal(false);
            refetch();
        } catch {
            message.error('Failed to add banner');
        }
    };

    /* -----------------------------
        EDIT HANDLER
    ------------------------------ */
    const handleEditBanner = async (image: File | null) => {
        if (!editData) return;

        const form: any = {};
        if (image) form.image = image; // only send if new image selected

        try {
            await updateBanner({ id: editData._id, data: form }).unwrap();
            message.success('Banner updated successfully');
            setOpenEditModal(false);
            refetch();
        } catch {
            message.error('Failed to update banner');
        }
    };

    const columns: ColumnsType<IBanner> = [
        {
            title: 'Serial No.',
            key: 'serial',
            render: (_, __, index) => <span>{(page - 1) * 10 + index + 1}</span>,
        },
        {
            title: 'Slider Image',
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
            title: 'Action',
            key: 'action',
            align: 'right',
            render: (_, record) => (
                <div className="flex justify-end gap-2 pr-6">
                    <button
                        onClick={() => {
                            setEditData(record);
                            setOpenEditModal(true);
                        }}
                    >
                        <FiEdit size={18} className="text-secondary" />
                    </button>

                    <button
                        onClick={() => {
                            setDeleteId(record._id);
                            setOpenDeleteModal(true);
                        }}
                    >
                        <RiDeleteBin6Line size={18} className="text-secondary text-red-500" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="h-full">
            {/* Header */}
            <div style={{ background: '#FFFFFF', borderRadius: '12px' }}>
                <div className="flex items-center justify-between p-4">
                    <h3 className="text-[#757575] text-lg font-medium">App Slider</h3>

                    <div className="flex items-center gap-3">
                        <ConfigProvider theme={{ token: { colorPrimary: '#C8A284' } }}>
                            <Input
                                placeholder="Search..."
                                prefix={<FiSearch size={14} color="#868FA0" />}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ width: 300, height: 40 }}
                            />
                        </ConfigProvider>

                        <button
                            className="bg-primary h-10 px-4 rounded-md text-white text-sm font-semibold"
                            onClick={() => setOpenAddModal(true)}
                        >
                            <PlusOutlined /> Add Banner
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="relative p-2">
                    <Table size="small" columns={columns} rowKey="_id" dataSource={banners} />
                </div>
            </div>

            {/* ADD MODAL */}
            <AddOrEditModal
                open={openAddModal}
                onClose={() => setOpenAddModal(false)}
                onSubmit={handleAddBanner}
                title="Add Banner"
            />

            {/* EDIT MODAL */}
            <AddOrEditModal
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                onSubmit={handleEditBanner}
                title="Edit Banner"
                defaultImageUrl={editData ? `${imageUrl}/${editData.image}` : ''}
            />

            {/* DELETE MODAL */}
            <Modal centered open={openDeleteModal} onCancel={() => setOpenDeleteModal(false)} footer={false} width={350}>
                <div className="p-6 text-center">
                    <p className="text-red-600 text-lg font-semibold">Are you sure?</p>
                    <p className="mt-2 mb-8">Do you want to delete this banner?</p>

                    <button onClick={handleDelete} className="bg-red-500 text-white px-6 py-2 rounded-md">
                        Yes, Delete
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default AppSliderList;

/* ===========================================================
      Add / Edit Modal Component
=========================================================== */
interface AddEditProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (image: File | null) => void;
    title: string;
    defaultImageUrl?: string;
}

const AddOrEditModal: React.FC<AddEditProps> = ({
    open,
    onClose,
    onSubmit,
    title,
    defaultImageUrl,
}) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>(defaultImageUrl || '');

    useEffect(() => {
        setPreview(defaultImageUrl || '');
        setFile(null);
    }, [defaultImageUrl]);

    const handleUploadChange = (info: any) => {
        const uploadedFile = info.file as File;
        if (uploadedFile) {
            setFile(uploadedFile);
            setPreview(URL.createObjectURL(uploadedFile));
        }
    };

    const handleSubmit = () => {
        onSubmit(file || null); // send null if no new file selected
    };

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#C8A284' } }}>
            <Modal open={open} onCancel={onClose} footer={false} centered width={450}>
                <h2 className="text-lg font-semibold mb-4">{title}</h2>

                <div className="flex justify-center items-center">
                    <Upload
                        listType="picture-card"
                        className="mb-8"
                        showUploadList={false}
                        beforeUpload={() => false}
                        onChange={handleUploadChange}
                    >
                        {preview ? (
                            <img src={preview} alt="banner" className="w-full h-full object-cover" />
                        ) : (
                            <div>Upload</div>
                        )}
                    </Upload>
                </div>

                <Button type="primary" onClick={handleSubmit} className="w-full h-10 mt-4">
                    Submit
                </Button>
            </Modal>
        </ConfigProvider>
    );
};
