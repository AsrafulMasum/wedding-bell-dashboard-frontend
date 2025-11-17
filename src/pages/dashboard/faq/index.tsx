import { useState } from 'react';
import { Button, ConfigProvider, Modal, Form, Input, Spin, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { GoQuestion } from 'react-icons/go';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useCreateFaqMutation, useDeleteFaqMutation, useGetFaqsQuery, useUpdateFaqMutation } from '../../../redux/apiSlices/faqSlice';
import { Ifaq } from '../../../types/types';

const FAQ = () => {
    const { data: faqsData, isLoading, refetch } = useGetFaqsQuery({});
    const [createFaq] = useCreateFaqMutation();
    const [updateFaq] = useUpdateFaqMutation();
    const [deleteFaq] = useDeleteFaqMutation();
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [selectedFaq, setSelectedFaq] = useState<Ifaq | null>(null);
    const [deleteId, setDeleteId] = useState<string>('');

    const [addForm] = Form.useForm();
    const [editForm] = Form.useForm();


    // ADD
    const handleAdd = () => {
        addForm.validateFields().then(async (values) => {
            try {
                await createFaq({ data: values }).unwrap();
                message.success('FAQ added successfully');
                addForm.resetFields();
                setIsAddOpen(false);
                refetch();
            } catch (error) {
                message.error('Failed to add FAQ');
            }
        });
    };

    // EDIT
    const openEdit = (item: Ifaq) => {
        setSelectedFaq(item);
        editForm.setFieldsValue(item);
        setIsEditOpen(true);
    };

    const handleEdit = () => {
        editForm.validateFields().then(async (values) => {
            if (!selectedFaq) return;
            try {
                await updateFaq({ id: selectedFaq._id, data: values }).unwrap();
                message.success('FAQ updated successfully');
                setIsEditOpen(false);
                refetch();
            } catch (error) {
                message.error('Failed to update FAQ');
            }
        });
    };

    // DELETE
    const openDelete = (id: string) => {
        setDeleteId(id);
        setIsDeleteOpen(true);
    };

    const handleDelete = async () => {
        try {
            await deleteFaq({ id: deleteId }).unwrap();
            message.success('FAQ deleted successfully');
            setIsDeleteOpen(false);
            refetch();
        } catch (error) {
            message.error('Failed to delete FAQ');
        }
    };

    console.log('faqsData',faqsData)

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#C8A284',
                },
            }}
        >
            <div className="bg-white h-full px-3 py-2 rounded-lg">
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-3">
                    <h3 className="text-[#757575] text-[18px] font-medium">FAQ</h3>

                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsAddOpen(true)}
                        style={{
                            background: '#C8A284',
                            border: 'none',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        Add FAQ
                    </Button>
                </div>

                {/* LIST VIEW - SAME DESIGN AS YOUR ORIGINAL */}
                <div className="bg-white pb-6 px-4 rounded-md">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <Spin size="large" />
                        </div>
                    ) : (
                        (faqsData?.data ?? [])?.map((item) => (
                            <div key={item._id} className="flex justify-between items-start gap-4 border-b pb-4 mt-4">
                                {/* Icon */}
                                <div className="mt-3">
                                    <GoQuestion color="#C8A284" size={25} />
                                </div>

                                {/* Text Section */}
                                <div className="w-full">
                                    <p className="text-base font-medium border-b py-2 px-4 rounded-lg bg-[#f8f8f8] flex items-center gap-8 text-[#757575]">
                                        {item.question} ?
                                    </p>

                                    <div className="flex items-start gap-2 py-2 px-4 rounded-lg mt-3">
                                        <p className="text-[#757575] leading-[24px]">{item.answer}</p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-2 mt-2">
                                    <CiEdit
                                        size={26}
                                        onClick={() => openEdit(item)}
                                        className="cursor-pointer text-[#FFC107]"
                                    />
                                    <RiDeleteBin6Line
                                        size={24}
                                        onClick={() => openDelete(item._id)}
                                        className="cursor-pointer text-[#D93D04]"
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* ---------------- Add Modal ---------------- */}
                <Modal
                    centered
                    open={isAddOpen}
                    onCancel={() => setIsAddOpen(false)}
                    onOk={handleAdd}
                    okText="Save"
                    width={450}
                >
                    <h2 className="text-lg font-semibold mb-4">Add FAQ</h2>

                    <Form form={addForm} layout="vertical">
                        <Form.Item name="question" label="Question" rules={[{ required: true }]}>
                            <Input placeholder="Enter question" />
                        </Form.Item>

                        <Form.Item name="answer" label="Answer" rules={[{ required: true }]}>
                            <Input.TextArea rows={4} placeholder="Enter answer" />
                        </Form.Item>
                    </Form>
                </Modal>

                {/* ---------------- Edit Modal ---------------- */}
                <Modal
                    centered
                    open={isEditOpen}
                    onCancel={() => setIsEditOpen(false)}
                    onOk={handleEdit}
                    okText="Update"
                    width={450}
                >
                    <h2 className="text-lg font-semibold mb-4">Update FAQ</h2>

                    <Form form={editForm} layout="vertical">
                        <Form.Item name="question" label="Question" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="answer" label="Answer" rules={[{ required: true }]}>
                            <Input.TextArea rows={4} />
                        </Form.Item>
                    </Form>
                </Modal>

                {/* ---------------- Delete Modal ---------------- */}
                <Modal
                    centered
                    open={isDeleteOpen}
                    onCancel={() => setIsDeleteOpen(false)}
                    onOk={handleDelete}
                    okText="Delete"
                    okButtonProps={{ danger: true }}
                    width={380}
                >
                    <div className="text-center py-6">
                        <p className="text-[#D93D04] font-semibold text-lg">Are you sure?</p>
                        <p className="mt-3 text-gray-700">Do you want to delete this FAQ?</p>
                    </div>
                </Modal>
            </div>
        </ConfigProvider>
    );
};

export default FAQ;
