import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, message } from 'antd';
import { MdDeleteOutline } from 'react-icons/md';
import AddInputForm from './AddInputForm';
import EditInputForm from './EditInputForm';
import {
    useCreatePlanMutation,
    useDeletePlanMutation,
    useGetPlansQuery,
    useUpdatePlanMutation,
} from '../../../redux/apiSlices/subscriptionSlice';
import type { ISubscriptionPlan } from '../../../types/types';

export interface PlanFormValues {
    title: string;
    description: string;
    price: number;
    duration: string;
    paymentType: string;
    productId: string;
    paymentLink: string;
    status: string;
}

const Subscription = () => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [editPackage, setEditPackage] = useState<ISubscriptionPlan | null>(null);

    const { data: packages, refetch } = useGetPlansQuery({});
    const [createPlan, { isLoading: isCreating }] = useCreatePlanMutation();
    const [updatePlan, { isLoading: isUpdating }] = useUpdatePlanMutation();
    const [deletePlan, { isLoading: isDeleting }] = useDeletePlanMutation();

    // Handle Add (Create)
    const handleAdd = async (values: PlanFormValues) => {
        try {
            await createPlan(values).unwrap();
            message.success('Subscription created successfully');
            setOpenAddModal(false);
            await refetch();
        } catch (error: any) {
            const errorMessage = error?.data?.message ?? 'Failed to create subscription';
            message.error(errorMessage);
        }
    };

    // Handle Edit (Update)
    const handleEdit = async (values: PlanFormValues, id: string) => {
        try {
            await updatePlan({ id, data: values }).unwrap();
            message.success('Subscription updated successfully');
            setOpenEditModal(false);
            setEditPackage(null);
            await refetch();
        } catch (error: any) {
            const errorMessage = error?.data?.message ?? 'Failed to update subscription';
            message.error(errorMessage);
        }
    };

    // Handle Delete
    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await deletePlan({ id: deleteId }).unwrap();
            message.success('Subscription deleted successfully');
            setShowDelete(false);
            setDeleteId(null);
            await refetch();
        } catch (error: any) {
            const errorMessage = error?.data?.message ?? 'Failed to delete subscription';
            message.error(errorMessage);
        }
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
            <div className="flex flex-wrap justify-center gap-12 mt-12">
                {packages?.data?.map((pkg) => (
                    <div
                        key={pkg._id}
                        className="w-[360px] bg-white shadow-lg py-6 px-7 border border-[#C8A284] rounded-xl transition-all duration-200 hover:shadow-xl"
                    >
                        {/* Delete Button */}
                        <div className="flex justify-end pb-4">
                            <button
                                className="cursor-pointer bg-[#C8A284] hover:bg-[#b89170] p-2.5 rounded-full shadow-md"
                                onClick={() => {
                                    setDeleteId(pkg._id);
                                    setShowDelete(true);
                                }}
                            >
                                <MdDeleteOutline className="text-2xl text-white" />
                            </button>
                        </div>

                        {/* Title */}
                        <h4 className="text-2xl font-semibold text-center pb-3">
                             {pkg.title}
                        </h4>

                        {/* Price & Duration */}
                        <h4 className="text-center pb-2">
                            <span className="text-5xl font-bold text-[#C8A284]">${pkg.price}</span>
                            <span className="text-lg font-medium"> / {pkg.duration}</span>
                        </h4>

                        {/* Description */}
                        <p className="text-base text-center text-gray-700 mb-5 leading-relaxed">
                            {pkg.description}
                        </p>

                        {/* Status */}
                        <p className="text-sm text-center mb-2">
                            <span className="font-semibold">Status:</span> {pkg.status}
                        </p>

                        {/* Payment Type */}
                        <p className="text-sm text-center mb-6">
                            <span className="font-semibold">Payment Type:</span> {pkg.paymentType}
                        </p>

                        {/* Edit Button */}
                        <button
                            onClick={() => {
                                setEditPackage(pkg);
                                setOpenEditModal(true);
                            }}
                            className="w-full h-[48px] bg-[#C8A284] hover:bg-[#b89170] text-white font-medium rounded-md transition-colors duration-200"
                        >
                            Edit Package
                        </button>
                    </div>
                ))}
            </div>

            {/* Add Modal */}
            <Modal
                centered
                open={openAddModal}
                onCancel={() => setOpenAddModal(false)}
                width={600}
                footer={false}
                confirmLoading={isCreating}
            >
                <AddInputForm setOpenAddModel={setOpenAddModal} handleAdd={handleAdd} />
            </Modal>

            {/* Edit Modal */}
            <Modal
                centered
                open={openEditModal}
                onCancel={() => setOpenEditModal(false)}
                width={600}
                footer={false}
                confirmLoading={isUpdating}
            >
                <EditInputForm setOpenEditModal={setOpenEditModal} packageData={editPackage} handleEdit={handleEdit} />
            </Modal>

            {/* Delete Modal */}
            <Modal
                centered
                open={showDelete}
                onCancel={() => setShowDelete(false)}
                footer={false}
                confirmLoading={isDeleting}
            >
                <div className="p-6 text-center">
                    <p className="text-red-600 font-semibold text-lg">Are you sure?</p>
                    <p className="py-4 text-gray-700">Do you want to delete this package?</p>
                    <button
                        onClick={handleDelete}
                        className="bg-[#C8A284] text-white px-6 py-2 rounded-md disabled:opacity-60"
                        disabled={isDeleting}
                    >
                        Confirm
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Subscription;
