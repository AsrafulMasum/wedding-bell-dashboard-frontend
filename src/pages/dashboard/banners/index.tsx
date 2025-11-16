import { PlusOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Input, Modal, Table, Upload } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { FiEdit, FiSearch } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';

// ---------------- Types ------------------------
interface BannerType {
    _id: string;
    name: string;
    banner: string;
}

// ---------------- Dummy Data -------------------
const dummyBanners: BannerType[] = [
    {
        _id: '1',
        name: 'Summer Offer',
        banner: '/banner1.jpg',
    },
    {
        _id: '2',
        name: 'Winter Sale',
        banner: '/banner2.jpg',
    },
];

const AppSliderList: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const [banners, setBanners] = useState<BannerType[]>(dummyBanners);

    // Modal states
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

    const [editData, setEditData] = useState<BannerType | null>(null);
    const [deleteId, setDeleteId] = useState<string>('');

    // ---------------- Search -----------------------
    const filteredData = banners.filter((x) => x.name.toLowerCase().includes(searchTerm.toLowerCase()));

    // ---------------- Delete -----------------------
    const handleDelete = () => {
        setBanners((prev) => prev.filter((item) => item._id !== deleteId));
        setOpenDeleteModal(false);
    };

    // ---------------- Add --------------------------
    const handleAddBanner = (name: string, banner: string) => {
        const newItem: BannerType = {
            _id: (banners.length + 1).toString(),
            name,
            banner,
        };
        setBanners([...banners, newItem]);
        setOpenAddModal(false);
    };

    // ---------------- Edit --------------------------
    const handleEditBanner = (name: string, banner: string) => {
        if (!editData) return;

        setBanners((prev) => prev.map((item) => (item._id === editData._id ? { ...item, name, banner } : item)));
        setOpenEditModal(false);
    };

    // ---------------- Columns -----------------------
    const columns: ColumnsType<BannerType> = [
        {
            title: 'Serial No.',
            key: 'serial',
            render: (_, __, index) => <span>{index + 1}</span>,
        },
        {
            title: 'Title',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Slider Image',
            key: 'banner',
            render: (_, record) => (
                <div className="h-12 w-20">
                    <img src={record.banner} alt="slider" className="w-full h-full object-cover rounded-md" />
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
                        <RiDeleteBin6Line size={18} className="text-secondary" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="h-full">
            <div style={{ background: '#FFFFFF', borderRadius: '12px' }}>
                {/* Header */}
                <div className="flex items-center justify-between p-4">
                    <h3 className="text-[#757575] text-lg font-medium">App Slider</h3>

                    <div className="flex items-center gap-3">
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#C8A284',
                                },
                            }}
                        >
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
                    <Table
                        size="small"
                        columns={columns}
                        rowKey="_id"
                        dataSource={filteredData}
                        pagination={{
                            current: page,
                            total: filteredData.length,
                            pageSize: 10,
                            onChange: (page) => setPage(page),
                        }}
                    />
                </div>
            </div>

            {/* ---------------- Add Modal ---------------- */}
            <AddOrEditModal
                open={openAddModal}
                onClose={() => setOpenAddModal(false)}
                onSubmit={handleAddBanner}
                title="Add Banner"
                defaultName=""
                defaultImage=""
            />

            {/* ---------------- Edit Modal ---------------- */}
            <AddOrEditModal
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                onSubmit={handleEditBanner}
                title="Edit Banner"
                defaultName={editData?.name || ''}
                defaultImage={editData?.banner || ''}
            />

            {/* ---------------- Delete Modal ---------------- */}
            <Modal
                centered
                open={openDeleteModal}
                onCancel={() => setOpenDeleteModal(false)}
                footer={false}
                width={350}
            >
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

// ===================================================
//   Add / Edit Modal Component
// ===================================================
interface AddEditProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (name: string, image: string) => void;
    title: string;
    defaultName: string;
    defaultImage: string;
}

const AddOrEditModal: React.FC<AddEditProps> = ({ open, onClose, onSubmit, title, defaultName, defaultImage }) => {
    const [name, setName] = useState<string>(defaultName);
    const [image, setImage] = useState<string>(defaultImage);

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
                        onChange={(info) => {
                            const file = info.file.originFileObj;
                            if (file) {
                                const url = URL.createObjectURL(file);
                                setImage(url);
                            }
                        }}
                    >
                        {image ? (
                            <img src={image} alt="banner" className="w-full h-full object-cover" />
                        ) : (
                            <div>Upload</div>
                        )}
                    </Upload>
                </div>

                <Input
                    placeholder="Banner Title"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mb-4 h-10"
                />

                <Button type="primary" onClick={() => onSubmit(name, image)} className="w-full h-10 mt-4">
                    Submit
                </Button>
            </Modal>
        </ConfigProvider>
    );
};
