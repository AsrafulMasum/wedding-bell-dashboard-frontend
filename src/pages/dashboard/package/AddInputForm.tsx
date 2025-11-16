import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input } from "antd";
import { SubscriptionType } from ".";

interface AddInputFormProps {
  setOpenAddModel: (v: boolean) => void;
  handleAdd: (pkg: SubscriptionType) => void;
}

const AddInputForm: React.FC<AddInputFormProps> = ({
  setOpenAddModel,
  handleAdd,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const newData: SubscriptionType = {
      id: Date.now().toString(),
      name: values.name,
      duration: values.duration,
      price: Number(values.price),
      features: values.features,
    };

    handleAdd(newData);
    form.resetFields();
    setOpenAddModel(false);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#C8A284",
        },
      }}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="name" label="Package Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="duration"
          label="Package Duration"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>

        {/* Dynamic Fields */}
        <Form.List name="features">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <div key={field.key} className="flex items-center gap-3 mb-2">
                  <Form.Item
                    {...field}
                    rules={[{ required: true, message: "Enter feature" }]}
                    className="flex-1"
                  >
                    <Input placeholder="Feature" />
                  </Form.Item>

                  <MinusCircleOutlined
                    className="text-red-600"
                    onClick={() => remove(field.name)}
                  />
                </div>
              ))}

              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
                style={{ width: "100%" }}
              >
                Add Feature
              </Button>
            </>
          )}
        </Form.List>

        <Button
          type="primary"
          htmlType="submit"
          className="w-full mt-5 h-11"
          style={{ backgroundColor: "#C8A284" }}
        >
          Submit
        </Button>
      </Form>
    </ConfigProvider>
  );
};

export default AddInputForm;
