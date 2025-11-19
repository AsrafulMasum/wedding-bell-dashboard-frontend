import { CameraOutlined } from '@ant-design/icons';
import { Button, Input, Form, ConfigProvider, message, Upload } from 'antd';
import { useProfileQuery } from '../../../redux/apiSlices/authSlice';
import { imageUrl } from '../../../redux/api/baseApi';
import { useUpdateProfileMutation } from '../../../redux/apiSlices/userSlice';
import { useState } from 'react';

export default function Profile() {
    const { data: profile } = useProfileQuery(undefined);
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");


    // Copied idea from @file_context_0: banners handle image selection
    const handleAvatarChange = (info: any) => {
        console.log('called')
        const uploadedFile = info.file as File;
        if (uploadedFile) {
            setFile(uploadedFile);
            setPreview(URL.createObjectURL(uploadedFile));
        }
    };

    const handleSubmit = async (values: any) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            if (file) {
                formData.append('image', file);
            }
            await updateProfile(formData).unwrap();
            message.success('Profile updated successfully');
            setFile(null);
        } catch (e: any) {
            message.error(e?.data?.message || 'Update failed');
        }
    };

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 sm:p-8">
                        <ConfigProvider theme={{ token: { colorPrimary: '#C8A284' } }}>
                            <div className="flex flex-col items-center mb-8">
                                <div className="relative">
                                    <Upload
                                        listType="picture-card"
                                        showUploadList={false}
                                        accept="image/*"
                                        beforeUpload={() => false}
                                        onChange={handleAvatarChange}
                                    >
                                        <div className="absolute bottom-0 right-0 bg-primary rounded-full p-2 cursor-pointer">
                                            <CameraOutlined className="text-white text-lg" />
                                        </div>
                                        {preview ? (
                                            <img src={preview} alt="banner" className="w-full h-full object-cover" />
                                        ) : (
                                            <img
                                                src={
                                                    profile?.data?.profile
                                                        ? profile.data.profile.includes('https')
                                                            ? profile.data.profile
                                                            : `${imageUrl}/${profile.data.profile}`
                                                        : ''
                                                }
                                                alt="banner"
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </Upload>
                                </div>
                            </div>
                            <Form
                                layout="vertical"
                                initialValues={{
                                    name: profile?.data?.name || '',
                                    phone: profile?.data?.phone || ''
                                }}
                                onFinish={handleSubmit}
                                requiredMark={false}
                            >
                                <Form.Item
                                    name="name"
                                    label={<span className="text-sm font-medium text-gray-700">Name</span>}
                                    rules={[{ required: true, message: 'Please enter your name' }]}
                                >
                                    <Input size="large" className="rounded-lg" placeholder="Enter name" />
                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    label={<span className="text-sm font-medium text-gray-700">Name</span>}
                                    rules={[{ required: true, message: 'Please enter your name' }]}
                                >
                                    <Input size="large" className="rounded-lg" placeholder="Enter phone" />
                                </Form.Item>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <Input
                                        disabled
                                        value={profile?.data?.email || ""}
                                        size="large"
                                        className="rounded-lg bg-gray-100"
                                    />
                                </div>
                                <Button
                                    htmlType="submit"
                                    loading={isLoading}
                                    className="bg-primary hover:bg-primary mt-6 rounded-lg h-12 text-base text-white w-full"
                                >
                                    Save Changes
                                </Button>
                            </Form>
                        </ConfigProvider>
                    </div>
                </div>
            </div>
        </div>
    );
}
