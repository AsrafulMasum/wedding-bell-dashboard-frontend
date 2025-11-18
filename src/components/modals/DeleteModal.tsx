'use client';

import { ConfigProvider, Modal } from 'antd';

interface DeleteCategoryModalProps {
    open: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    confirmLoading?: boolean;
}

const DeleteModal = ({ open, onCancel, onConfirm, confirmLoading }: DeleteCategoryModalProps) => {
    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#C8A284' } }}>
            <Modal
                title="Confirm Delete"
                centered
                open={open}
                onOk={onConfirm}
                onCancel={onCancel}
                okText="Delete"
                okButtonProps={{ danger: true }}
                confirmLoading={confirmLoading}
            >
                <p>Are you sure you want to delete this item?</p>
            </Modal>
        </ConfigProvider>
    );
};

export default DeleteModal;
