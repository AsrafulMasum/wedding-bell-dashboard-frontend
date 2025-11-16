import { Button, Modal } from 'antd'


export default function BlockModal({
    isBlockModalVisible,
    handleBlockCancel,
    handleBlockConfirm,
    isUserBlocked
}:{
    isBlockModalVisible: boolean,
    handleBlockCancel: () => void,
    handleBlockConfirm: () => void,
    isUserBlocked: boolean
}) {
    
  return (
     <Modal
          open={isBlockModalVisible}
          onCancel={handleBlockCancel}
          footer={null}
          closeIcon={<span className="text-gray-400 hover:text-gray-600 text-xl">×</span>}
          width={400}
          centered
        >
          <div className="text-center py-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{isUserBlocked ? "Unblock User" : "Block User"}</h2>
            <p className="text-gray-500 mb-8">Are You Sure You Want To {isUserBlocked ? "Unblock" : "Block"} This User?</p>
            <div className="flex justify-center gap-4">
              <Button 
                onClick={handleBlockCancel}
                className="px-8 py-2 h-10 border border-gray-300 hover:border-gray-400"
              >
                No
              </Button>
              <Button 
                type="primary"
                danger
                onClick={handleBlockConfirm}
                className="px-8 py-2 h-10 bg-red-500 hover:bg-red-600"
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal>
  )
}
