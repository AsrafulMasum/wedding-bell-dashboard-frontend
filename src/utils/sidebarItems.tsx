import { TSidebarItem } from './generateSidebarItems';
import { LuClipboardList, LuLayoutDashboard, LuUserCheck, LuUserCog } from 'react-icons/lu';
import { TbBook, TbUsers } from 'react-icons/tb';
import { MdOutlineCategory, MdOutlinePayments } from 'react-icons/md';
import { IoCalendarOutline, IoSettingsOutline } from 'react-icons/io5';
import { FaRegCircleQuestion } from 'react-icons/fa6';
import { PiImagesSquare } from 'react-icons/pi';

const sidebarItems: TSidebarItem[] = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '',
        icon: <LuLayoutDashboard size={24} />,
    },
    {
        key: 'banners',
        label: 'Banners',
        path: 'banners',
        icon: <PiImagesSquare size={24} />,
    },
    {
        key: 'categories',
        label: 'Categories',
        path: 'categories',
        icon: <MdOutlineCategory size={24} />,
    },
    {
        key: 'chefs',
        label: 'Organizers',
        path: 'chefs',
        icon: <LuUserCog size={24} />,
    },
    {
        key: 'users',
        label: 'Customers',
        path: 'users',
        icon: <TbUsers size={24} />,
    },
    {
        key: 'drivers',
        label: 'Subscribers',
        path: 'drivers',
        icon: <LuUserCheck size={24} />,
    },
    {
        key: 'orders',
        label: 'Bookings',
        path: 'orders',
        icon: <IoCalendarOutline size={24} />,
    },
    {
        key: 'subscriptions',
        label: 'Subscriptions',
        path: 'subscriptions',
        icon: <MdOutlinePayments size={24} />,
    },
    {
        key: 'settings',
        label: 'Settings',
        path: 'settings',
        icon: <IoSettingsOutline size={24} />,
        children: [
            {
                key: 'faq',
                label: 'FAQs',
                path: 'faq',
                icon: <FaRegCircleQuestion size={20} />,
            },
            {
                key: 'about-us',
                label: 'About us',
                path: 'about-us',
                icon: <TbBook size={20} />,
            },
            {
                key: 'terms-and-condition',
                label: 'Terms and Condition',
                path: 'terms-and-condition',
                icon: <LuClipboardList size={20} />,
            },
            {
                key: 'privacy-policy',
                label: 'Privacy Policy',
                path: 'privacy-policy',
                icon: <LuClipboardList size={20} />,
            }
        ],
    },
];

export default sidebarItems;
