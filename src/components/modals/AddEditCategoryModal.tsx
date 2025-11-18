import { Modal, Form, Input, ConfigProvider, Upload, Button } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { ICategory } from '../../types/types';
import { imageUrl } from '../../redux/api/baseApi';

export type CategoryFormValues = {
    categoryName?: string;
    image?: UploadFile[];
};

interface AddEditCategoryModalProps {
    open: boolean;
    onCancel: () => void;
    onSubmit: (values: CategoryFormValues) => void;
    editingItem?: ICategory | null;
    confirmLoading?: boolean;
}

const AddEditCategoryModal = ({
    open,
    onCancel,
    onSubmit,
    editingItem,
    confirmLoading,
}: AddEditCategoryModalProps) => {
    const [form] = Form.useForm<CategoryFormValues>();

    console.log({editingItem})

    // Prefill form when editing
    useEffect(() => {
        if (editingItem) {
            form.setFieldsValue({
                categoryName: editingItem.name,
                image: editingItem.image
                    ? ([
                          {
                              uid: editingItem._id,
                              name: editingItem.image,
                              status: 'done',
                              url: `${imageUrl}/${editingItem.image}`,
                          } as UploadFile,
                      ] as UploadFile[])
                    : ([] as UploadFile[]),
            });
            return;
        }
        form.resetFields();
    }, [editingItem, form]);

    const handleFinish = (values: CategoryFormValues) => {
        onSubmit(values);
        form.resetFields();
    };

    const normFile = (e: any) => (Array.isArray(e) ? e : e?.fileList);


    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#C8A284' } }}>
            <Modal
                centered
                title={editingItem ? `Edit Category` : `Add Category`}
                open={open}
                onCancel={() => {
                    form.resetFields();
                    onCancel();
                }}
                onOk={() => form.submit()}
                okText={editingItem ? 'Update' : 'Add'}
                destroyOnClose
                confirmLoading={confirmLoading}
            >
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Form.Item
                        name="categoryName"
                        label="Name"
                        rules={[{ required: true, message: 'Please enter a name' }]}
                    >
                        <Input placeholder="Enter category name" style={{ height: '48px' }} />
                    </Form.Item>

                    <Form.Item
                        name="image"
                        label="Image"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ required: !editingItem, message: 'Please upload an image' }]}
                    >
                        <Upload
                            name="image"
                            listType="picture"
                            maxCount={1}
                            beforeUpload={() => false} // prevent automatic upload
                        >
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </ConfigProvider>
    );
};

export default AddEditCategoryModal;
