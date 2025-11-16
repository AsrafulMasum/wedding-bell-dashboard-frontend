import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import UpdateModal from './UpdateModal';
import PackageAddModal from './PackageAddModal';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { plans } from '../../../demo-data/subscription-data';
import DeletePackageModal from './DeletePackageModal';
import PlanCard from './PlanCard';
export interface SubscriptionPlan {
  id: string;
  title: string;
  billingCycle: string;
  price: number;
  frequency: string;
}
const Packages: React.FC = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [planToDelete, setPlanToDelete] = useState<SubscriptionPlan | null>(null);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const showEditModal = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setIsEditModalVisible(true);
  };

  const showDeleteModal = (plan: SubscriptionPlan) => {
    setPlanToDelete(plan);
    setIsDeleteModalVisible(true);
  };

  return (
    <div className="">
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <HeaderTitle title="Subscription Plans" />
          <button className=' flex items-center gap-2 bg-[#003877]/15 text-[#003877] border-0  h-[45px] px-6 rounded font-medium' onClick={showAddModal}>
            <span > <PlusOutlined size={20} /> </span>
            <span> Add Subscription</span>
          </button>

        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              showEditModal={showEditModal}
              showDeleteModal={showDeleteModal}
            />
          ))}
        </div>

        {/* Add Subscription Modal */}
        <PackageAddModal
          isAddModalVisible={isAddModalVisible}
          setIsAddModalVisible={setIsAddModalVisible}
        />

        {/* Edit Subscription Modal */}
        <UpdateModal
          isEditModalVisible={isEditModalVisible}
          setIsEditModalVisible={setIsEditModalVisible}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
        />

        {/* Delete Subscription Modal */}
        <DeletePackageModal
          isDeleteModalVisible={isDeleteModalVisible}
          setIsDeleteModalVisible={setIsDeleteModalVisible}
          planToDelete={planToDelete}
          setPlanToDelete={setPlanToDelete}
        />

      </div>
    </div>
  );
};

export default Packages;