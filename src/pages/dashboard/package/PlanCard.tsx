// PlanCard.tsx
import { Button, Card } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
export type FeatureItem = {
    image: string
    title: string
    subtitle: string
}

export type SubscriptionPlan = {
    id: string
    title: string
    billingCycle: string
    price: number
    frequency: string
    features?: FeatureItem[]
}

type PlanCardProps = {
    plan: SubscriptionPlan
    showEditModal: (plan: SubscriptionPlan) => void
    showDeleteModal: (plan: SubscriptionPlan) => void
}

function FeatureRow({ image, title, subtitle }: { image: string; title: string; subtitle: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className=' h-14 w-14 bg-[#4A87F212] flex items-center justify-center rounded-full'>
                <img src={image} alt={title} className="h-8 w-8 object-contain" />
            </div>
            <div className="min-w-0">
                <div className="text-[16px] font-semibold text-gray-800 truncate">{title}</div>
                <div className="text-sm text-gray-500 truncate">{subtitle}</div>
            </div>
        </div>
    )
}

export default function PlanCard({ plan, showEditModal, showDeleteModal }: PlanCardProps) {
    return (
        <Card
            key={plan.id}
            className="rounded-lg shadow-sm border border-gray-200 bg-gray-50"
            bodyStyle={{ padding: 24 }}
        >
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="text-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">{plan.title}</h2>
                    <p className="text-sm text-gray-400">{plan.billingCycle}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-4">
                    <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-primary">${plan.price.toFixed(2)}</span>
                        <span className="text-gray-500 ml-1">/{plan.frequency}</span>
                    </div>
                </div>

                {/* Features grid with max height and scroll */}
                {plan.features && plan.features.length > 0 ? (
                    <div className="mb-5">
                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 max-h-72 overflow-y-auto pr-2">
                            {plan.features.map((f, idx) => (
                                <FeatureRow key={idx} image={f.image} title={f.title} subtitle={f.subtitle} />
                            ))}
                        </div>
                    </div>
                ) : null}

                {/* Actions */}
                <div className="mt-auto flex  gap-3 justify-between  ">
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        style={{ width: 180 }}
                        className="h-11  flex items-center justify-center font-medium"
                        onClick={() => showDeleteModal(plan)}
                    > Delete Subscription </Button> 

                    <Button
                        type="primary"
                        style={{ width: 180 }}
                        icon={<EditOutlined />}
                        className=" bg-primary  h-11 text-base"
                        onClick={() => showEditModal(plan)}
                    >
                        Edit Subscription
                    </Button>

                </div>
            </div>
        </Card>
    )
}
