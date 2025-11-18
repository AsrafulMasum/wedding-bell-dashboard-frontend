import { ConfigProvider, Form, Input, Select, Button } from "antd";
import type { PlanFormValues } from ".";

interface AddInputFormProps {
  setOpenAddModel: (v: boolean) => void;
  handleAdd: (values: PlanFormValues) => void;
}

const AddInputForm: React.FC<AddInputFormProps> = ({
  setOpenAddModel,
  handleAdd,
}) => {
  const [form] = Form.useForm<PlanFormValues>();

  const onFinish = (values: PlanFormValues) => {
    handleAdd({
      ...values,
      price: Number(values.price),
    });
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
        <Form.Item
          name="title"
          label="Plan Title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter a price" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="duration"
          label="Duration"
          rules={[{ required: true, message: "Please select a duration" }]}
        >
          <Select
            placeholder="Select duration"
            options={[
              { label: "Select one", value: "", disabled: true },
              { label: "1 month", value: "1 month" },
              { label: "3 months", value: "3 months" },
              { label: "6 months", value: "6 months" },
              { label: "1 year", value: "1 year" },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="paymentType"
          label="Payment Type"
          rules={[{ required: true, message: "Please select a payment type" }]}
        >
          <Select
            placeholder="Select type"
            options={[
              { label: "Select type", value: "", disabled: true },
              { label: "Monthly", value: "Monthly" },
              { label: "Yearly", value: "Yearly" },
            ]}
          />
        </Form.Item>

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
