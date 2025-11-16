import React from 'react'
import { Button, Divider, Form, Input, InputNumber, Modal } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import FeatureFields, { Feature } from './FeatureFields'

type FormValues = {
  title: string
  billingCycle: string
  price: number
  frequency: string
  features: Feature[]
}

export default function PackageAddModal({
  isAddModalVisible,
  setIsAddModalVisible,
  onSubmit
}: {
  isAddModalVisible: boolean
  setIsAddModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit?: (values: FormValues) => void
}) {
  const [form] = Form.useForm<FormValues>()

  const handleFinish = (values: FormValues) => {
    onSubmit?.(values)
    setIsAddModalVisible(false)
    form.resetFields()
  }

  return (
    <Modal
      title={<span className='text-xl font-medium'>Add Subscription Plan</span>}
      open={isAddModalVisible}
      onCancel={() => setIsAddModalVisible(false)}
      footer={
        <div className='flex justify-center items-center'>
          <Button type='primary' htmlType='submit' style={{ height: 40 , width: 180 }} form='planForm' className='!bg-primary'>
            Add Plan
          </Button>
        </div>
      }
      width={560}
      centered
      destroyOnClose
    >
      <Form
        id='planForm'
        form={form}
        layout='vertical'
        initialValues={{
          price: 0,
          features: [{}]
        }}
        onFinish={handleFinish}
      >
        <Form.Item
          label='Plan Title'
          name='title'
          rules={[{ required: true, message: 'Enter plan title' }]}
        >
          <Input placeholder='e.g., Monthly, Yearly' style={{ height: 42 }} />
        </Form.Item>

        <Form.Item
          label='Billing Cycle'
          name='billingCycle'
          rules={[{ required: true, message: 'Enter billing cycle' }]}
        >
          <Input placeholder='e.g., Billed monthly' style={{ height: 42 }} />
        </Form.Item>

        <Form.Item
          label='Price'
          name='price'
          rules={[{ required: true, message: 'Enter price' }]}
        >
          <InputNumber
            className='w-full'
            placeholder='0.00'
            style={{ height: 42, width: '100%' }}
            min={0}
            precision={2}
            prefix='$'
          />
        </Form.Item>

        <Form.Item
          label='Frequency'
          name='frequency'
          rules={[{ required: true, message: 'Enter frequency' }]}
        >
          <Input placeholder='e.g., Annually, Monthly' style={{ height: 42 }} />
        </Form.Item>

        <Divider>Features</Divider>

        <Form.List name='features'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(field => (
                <FeatureFields
                  key={field.key}
                  field={field}
                  canRemove={fields.length > 1}
                  onRemove={() => remove(field.name)}
                />
              ))}

              <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                <Button type='dashed' icon={<PlusCircleOutlined />} onClick={() => add({})}>
                  Add feature
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  )
}