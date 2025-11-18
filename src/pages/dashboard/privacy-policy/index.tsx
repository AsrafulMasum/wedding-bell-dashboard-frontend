import { useState } from "react";
import { useCreatePrivacyPolicyMutation, useGetPrivacyPolicyQuery } from "../../../redux/apiSlices/rulesSlice";
import NoteTab from "../../../components/shared/NoteTab";
import { message } from "antd";

export default function PrivacyPolicy() {
  const { data, refetch } = useGetPrivacyPolicyQuery();
  const [createPrivacyPolicy, { isLoading }] = useCreatePrivacyPolicyMutation();

  const [content, setContent] = useState('');

  const handleSave = async () => {
    await createPrivacyPolicy({ content }).unwrap();
    refetch();
    message.success("Updated successfully...");
  };

  return (
    <div className="px-3">
      <h4 className="text-2xl font-semibold py-3">Terms & Conditions</h4>
      <NoteTab
        content={data?.content}
        handleContentChange={setContent}
      />
      <button
        className="bg-primary h-12 w-full rounded-md text-white text-lg font-semibold"
        onClick={handleSave}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </div>
  )
}
