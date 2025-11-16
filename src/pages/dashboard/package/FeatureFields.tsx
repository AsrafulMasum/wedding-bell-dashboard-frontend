import { Form, Upload, Input, Button, Row, Col } from 'antd'
import { MinusCircleOutlined, UploadOutlined } from '@ant-design/icons'
import type { UploadFile } from 'antd/es/upload/interface'
import { useState } from 'react'

export type Feature = {
  image?: UploadFile[]
  title?: string
  subtitle?: string
}

export type FeatureFieldsProps = {
  field: any
  onRemove: () => void
  canRemove: boolean
}

function normFile(e: any) {
  if (Array.isArray(e)) return e
  return e?.fileList || []
}

export default function FeatureFields({
  field,
  onRemove,
  canRemove
}: FeatureFieldsProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  return (
    <div className=' p-3 pb-0 rounded-lg mb-3 border border-[#E7EBED]'>
      <Row gutter={12}>
        <Col span={8}>
          <Form.Item
            name={[field.name, 'image']}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            style={{ marginBottom: 8 }}
          >
            <Upload
              listType="picture-card"
              beforeUpload={() => false}
              fileList={fileList}
              onChange={({ fileList: newList }) => setFileList(newList)}
              maxCount={1}
            >
              {fileList.length >= 1 ? null : (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Image</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Col>

        <Col span={16}>
          <Form.Item
            name={[field.name, 'title']}
            rules={[{ required: true, message: 'Enter feature title' }]}
            style={{ marginBottom: 8 }}
          >
            <Input placeholder="Feature title" style={{ height: 40 }} />
          </Form.Item>

          <Form.Item
            name={[field.name, 'subtitle']}
            rules={[{ required: true, message: 'Enter feature subtitle' }]}
            style={{ marginBottom: 0 }}
          >
            <Input placeholder="Feature subtitle" style={{ height: 40 }} />
          </Form.Item>
        </Col>
      </Row>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {canRemove ? (
          <Button
            type="text"
            icon={<MinusCircleOutlined />}
            danger
            onClick={onRemove}
          >
            Remove
          </Button>
        ) : null}
      </div>
    </div>
  )
}
