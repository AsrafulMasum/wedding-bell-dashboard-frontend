import { Button, Checkbox, ConfigProvider, Form, FormProps, Input, message } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';
import { Link } from 'react-router-dom';
import { setToLocalStorage } from '../../services/auth.service';
import { useLoginMutation } from '../../redux/apiSlices/authSlice';


export type errorType = {
    data: {
        errorMessages: { message: string }[];
        message: string;
    };
};
const Login = () => {
    const [login, { isLoading }] = useLoginMutation();

    const onFinish: FormProps<FieldNamesType>['onFinish'] = async (values) => {
        try {
            const result = await login(values).unwrap();
            if (result?.data?.accessToken) {
                message.success('Sign in successful!');
                setToLocalStorage(result?.data?.accessToken);
            }
        } catch (err: any) {
            if (err?.data?.errorMessages?.length) {
                message.error(err.data.errorMessages[0].message);
            } else if (err?.data?.message) {
                message.error(err.data.message);
            } else {
                message.error('Sign in failed. Please try again.');
            }
        }
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#C8A284',

                    colorBgContainer: '#F1F4F9',
                },
                components: {
                    Input: {
                        borderRadius: 10,
                        colorBorder: 'transparent',
                        colorPrimaryBorder: 'transparent',
                        hoverBorderColor: 'transparent',
                        controlOutline: 'none',
                        activeBorderColor: 'transparent',
                    },
                },
            }}
        >
            <div className="flex items-center justify-center p-5 h-screen  " >
                <div className="bg-white max-w-[630px] w-full rounded-lg drop-shadow-2xl p-10 ">
                    <div className=" space-y-5 !pb-3 text-center">
                        <h1 className="text-3xl text-[#000]  font-medium text-center mt-2">Login to Account!</h1>
                        <p className='text-xl text-gray-400'>Please enter your email and password to continue</p>
                    </div>

                    <Form
                        name="normal_login"
                        className="login-form"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label={
                                <label htmlFor="email" className="block text-primaryText mb-1 text-lg">
                                    Email
                                </label>
                            }
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input placeholder="Enter your email address" type="email" className=" h-12  px-6 " />
                        </Form.Item>

                        <Form.Item
                            label={
                                <label htmlFor="password" className="block text-primaryText mb-1 text-lg">
                                    Password
                                </label>
                            }
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input.Password placeholder="Enter your password" className=" h-12  px-6" />
                        </Form.Item>

                        <div className="flex items-center justify-between mb-4">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox className="text-primaryText text-lg">Remember me</Checkbox>
                            </Form.Item>
                            <Link to="/forget-password" className="text-primary text-md hover:text-primary">
                                Forget password
                            </Link>
                        </div>

                        <Form.Item>
                            <Button
                                className='!bg-primary'
                                htmlType="submit"
                                style={{
                                    height: 45,
                                    width: '100%',
                                    fontWeight: 500,
                                    color: '#fff',
                                    fontSize: 20,
                                }}
                                loading={isLoading} // add loading prop for status
                            >
                                {isLoading ? "Signing In..." : "Sign In"}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default Login;
