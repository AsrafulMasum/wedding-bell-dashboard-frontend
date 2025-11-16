import { ConfigProvider, Menu, MenuProps } from 'antd';
import { TSidebarItem } from '../../utils/generateSidebarItems';
import sidebarItems from '../../utils/sidebarItems';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ReactNode, useState } from 'react';
import { LogOut } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleOpenChange = (keys: string[]) => {
        setOpenKeys(keys);
    };

    const getIcon = (icon: ReactNode | string) => {
        if (typeof icon === 'string') {
            return <img src={icon} className="w-6" alt="icon" />;
        }
        return icon;
    };

    const sidebarItemsGenerator = (items: TSidebarItem[]): MenuProps['items'] => {
        return items.map((item) => {
            if (item.children) {
                return {
                    key: item.key,
                    icon: getIcon(item.icon),
                    label: item.label,
                    children: item.children.map((child) => ({
                        key: `/${child.path}`,
                        icon: getIcon(child.icon),
                        label: <Link to={`/${child.path}`}>{child.label}</Link>,
                    })),
                };
            }
            return {
                key: `/${item.path}`,
                icon: getIcon(item.icon),
                label: <Link to={`/${item.path}`}>{item.label}</Link>,
            };
        });
    };

    return (
        <div className="relative h-[calc(100vh-100px)] w-full border-r border-gray-200">
            <div className="flex flex-col h-[calc(100vh-97px)]">
                <div className="flex-1 overflow-y-auto pb-12 ml-4">
                    <ConfigProvider
                        theme={{
                            token: {
                                colorText: '#808080',
                                motionDurationFast: '0.1s',
                            },
                            components: {
                                Menu: {
                                    itemActiveBg: '#59A817',
                                    itemSelectedColor: '#fff',
                                    itemBorderRadius: '10px 10px 10px 10px' as any,
                                    itemHeight: 45,
                                    itemMarginBlock: 9,
                                    itemSelectedBg: '#59A817',
                                },
                            },
                        }}
                    >
                        <Menu
                            theme="light"
                            mode="inline"
                            selectedKeys={[location.pathname]}
                            openKeys={openKeys}
                            onOpenChange={handleOpenChange}
                            items={sidebarItemsGenerator(sidebarItems)}
                            style={{ background: 'transparent' }}
                        />
                    </ConfigProvider>
                </div>

                <div className="py-3 ps-4 absolute bottom-0 w-full bg-[#FFF]">
                    <button
                        onClick={() => {
                            navigate('/login');
                        }}
                        className="w-full flex items-center gap-3 px-4 bg-white/15 text-[#F44336] font-semibold rounded-md transition"
                    >
                        <LogOut size={20} />
                        <span>Log Out</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Sidebar;
