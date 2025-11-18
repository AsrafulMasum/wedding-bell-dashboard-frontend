import { useState } from "react";
import { useCreateTermsAndConditionsMutation, useGetTermsAndConditionsQuery } from "../../../redux/apiSlices/rulesSlice";
import NoteTab from "../../../components/shared/NoteTab";
import { message } from "antd";

export default function TermsAndCondition() {
  const { data, refetch } = useGetTermsAndConditionsQuery();
  const [createTermsAndConditions, { isLoading }] = useCreateTermsAndConditionsMutation();

  const [content, setContent] = useState('');

  const handleSave = async () => {
    await createTermsAndConditions({ content }).unwrap();
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
