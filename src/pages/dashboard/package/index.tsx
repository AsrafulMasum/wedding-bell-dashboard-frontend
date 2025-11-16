import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md';
import AddInputForm from './AddInputForm';
import EditInputForm from './EditInputForm';

export interface SubscriptionType {
    id: string;
    name: string;
    duration: string;
    price: number;
    features: string[];
}

const Subscription = () => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [editPackage, setEditPackage] = useState<SubscriptionType | null>(null);

    const [packages, setPackages] = useState<SubscriptionType[]>([
        {
            id: '1',
            name: 'Basic',
            duration: '1 Month',
            price: 19,
            features: ['Access to basic courses', 'Limited community support'],
        },
        {
            id: '2',
            name: 'Premium',
            duration: '3 Months',
            price: 49,
            features: ['Everything in Basic', 'Priority support', 'Access to premium lessons'],
        },
    ]);

    // Handle Add
    const handleAdd = (pkg: SubscriptionType) => {
        setPackages((prev) => [...prev, pkg]);
    };

    // Handle Edit
    const handleEdit = (updatedPkg: SubscriptionType) => {
        setPackages((prev) => prev.map((item) => (item.id === updatedPkg.id ? updatedPkg : item)));
    };

    // Handle Delete
    const handleDelete = () => {
        if (!deleteId) return;
        setPackages((prev) => prev.filter((item) => item.id !== deleteId));
        setShowDelete(false);
    };

    return (
        <div className="bg-[#FFF] pt-4 px-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-{#757575}">Subscriptions</h2>

                <Button
                    onClick={() => setOpenAddModal(true)}
                    style={{
                        width: 200,
                        height: 40,
                        backgroundColor: '#A67B5B',
                        border: 'none',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                    }}
                >
                    <PlusOutlined />
                    Create Subscription
                </Button>
            </div>

            {/* Subscription Cards */}
            <div className="flex flex-wrap justify-center gap-10 mt-10">
                {packages.map((pkg) => (
                    <div
                        key={pkg.id}
                        className="max-w-[320px] bg-[#F4F4F4] py-4 px-6 border border-[#C8A284] rounded-lg"
                    >
                        {/* Delete Button */}
                        <div className="flex justify-end py-2">
                            <div
                                className="cursor-pointer bg-[#C8A284] p-2 rounded-full"
                                onClick={() => {
                                    setDeleteId(pkg.id);
                                    setShowDelete(true);
                                }}
                            >
                                <MdDeleteOutline className="text-xl text-white" />
                            </div>
                        </div>

                        {/* Title */}
                        <h4 className="text-xl font-medium text-center pb-2">Get {pkg.name}</h4>

                        {/* Price */}
                        <h4 className="text-center pb-3">
                            <span className="text-4xl font-semibold">${pkg.price}</span> / per {pkg.duration}
                        </h4>

                        {/* Features */}
                        <div className="space-y-3">
                            {pkg.features.map((feature, idx) => (
                                <div className="flex gap-2" key={idx}>
                                    <IoCheckmarkCircle className="text-green-600 min-w-[24px]" />
                                    <p className="text-sm">{feature}</p>
                                </div>
                            ))}
                        </div>

                        {/* Edit Button */}
                        <button
                            onClick={() => {
                                setEditPackage(pkg);
                                setOpenEditModal(true);
                            }}
                            style={{
                                width: '100%',
                                height: '40px',
                                marginTop: '20px',
                                backgroundColor: '#C8A284',
                                color: 'white',
                                fontWeight: 500,
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Edit Package
                        </button>
                    </div>
                ))}
            </div>

            {/* Add Modal */}
            <Modal centered open={openAddModal} onCancel={() => setOpenAddModal(false)} width={600} footer={false}>
                <AddInputForm setOpenAddModel={setOpenAddModal} handleAdd={handleAdd} />
            </Modal>

            {/* Edit Modal */}
            <Modal centered open={openEditModal} onCancel={() => setOpenEditModal(false)} width={600} footer={false}>
                <EditInputForm setOpenEditModal={setOpenEditModal} packageData={editPackage} handleEdit={handleEdit} />
            </Modal>

            {/* Delete Modal */}
            <Modal centered open={showDelete} onCancel={() => setShowDelete(false)} footer={false}>
                <div className="p-6 text-center">
                    <p className="text-red-600 font-semibold text-lg">Are you sure?</p>
                    <p className="py-4 text-gray-700">Do you want to delete this package?</p>
                    <button onClick={handleDelete} className="bg-[#C8A284] text-white px-6 py-2 rounded-md">
                        Confirm
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Subscription;
