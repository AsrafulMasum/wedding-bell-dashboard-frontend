import { useState } from "react";
import { useCreateAboutMutation, useGetAboutQuery } from "../../../redux/apiSlices/rulesSlice";
import NoteTab from "../../../components/shared/NoteTab";
import { message } from "antd";


export default function AboutUs() {
  const { data, refetch } = useGetAboutQuery();
  const [createAbout, { isLoading }] = useCreateAboutMutation();

  const [content, setContent] = useState('');


  const handleSave = async () => {
    await createAbout({ content }).unwrap();
    refetch()
    message.success("Updated successfully...")
  };

  return (
    <div className="px-3">
      <h4 className="text-2xl font-semibold py-3">About Us</h4>
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

