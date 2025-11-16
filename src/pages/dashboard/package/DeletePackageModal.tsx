import { Button, Modal } from "antd";
import { SubscriptionPlan } from ".";

interface DeletePackageModalProps {
    isDeleteModalVisible: boolean;
    setIsDeleteModalVisible: (visible: boolean) => void;
    planToDelete: SubscriptionPlan | null;
    setPlanToDelete: (plan: SubscriptionPlan | null) => void;
}
const DeletePackageModal = ({ isDeleteModalVisible, setIsDeleteModalVisible, planToDelete, setPlanToDelete }: DeletePackageModalProps) => {
    const handleDeleteConfirm = () => {
        if (planToDelete) {
            setIsDeleteModalVisible(false);
            setPlanToDelete(null);
        }
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalVisible(false);
        setPlanToDelete(null);
    };
    return (
        <div>
            <Modal
                open={isDeleteModalVisible}
                onCancel={handleDeleteCancel}
                footer={null}
                closeIcon={<span className="text-gray-400 hover:text-gray-600 text-xl">×</span>}
                width={400}
                centered
            >
                <div className="text-center py-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Delete Subscription</h2>
                    <p className="text-gray-500 mb-8">
                        Are You Sure You Want To Delete This Subscription Plan?
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button
                            onClick={handleDeleteCancel}
                            className="px-8 py-2 h-10 border border-gray-300 hover:border-gray-400"
                        >
                            No
                        </Button>
                        <Button
                            type="primary"
                            danger
                            onClick={handleDeleteConfirm}
                            className="px-8 py-2 h-10 bg-red-500 hover:bg-red-600"
                        >
                            Yes
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default DeletePackageModal;