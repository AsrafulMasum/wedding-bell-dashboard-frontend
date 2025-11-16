import { BsPatchQuestion } from 'react-icons/bs';
import { TSidebarItem } from './generateSidebarItems';
import { LuClipboardList, LuLayoutDashboard } from 'react-icons/lu';
import { TbBook } from 'react-icons/tb';
import { PiChefHat, PiSteeringWheelLight } from 'react-icons/pi';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { MdOutlineCategory } from 'react-icons/md';
import { GiSandsOfTime } from 'react-icons/gi';
import { BiUser } from 'react-icons/bi';
import { CiCreditCard1, CiSettings, CiStar } from 'react-icons/ci';
import { RiRefund2Fill } from 'react-icons/ri';
import { IoCloudUploadOutline } from 'react-icons/io5';

const sidebarItems: TSidebarItem[] = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '',
        icon: <LuLayoutDashboard size={24} />,
    },
    {
        key: 'control-publish',
        label: 'Control Publish',
        path: 'control-publish',
        icon: <IoCloudUploadOutline size={24} />,
    },
    {
        key: 'orders',
        label: 'Orders',
        path: 'orders',
        icon: <HiOutlineClipboardDocumentList size={24} />,
    },
    {
        key: 'categories',
        label: 'Categories',
        path: 'categories',
        icon: <MdOutlineCategory size={24} />,
    },
    {
        key: 'waiting-list',
        label: 'Waiting List',
        path: 'waiting-list',
        icon: <GiSandsOfTime size={24} />,
    },
    {
        key: 'chefs',
        label: 'Chefs',
        path: 'chefs',
        icon: <PiChefHat size={24} />,
    },
    {
        key: 'users',
        label: 'Customers',
        path: 'users',
        icon: <BiUser size={24} />,
    },
    {
        key: 'drivers',
        label: 'Drivers',
        path: 'drivers',
        icon: <PiSteeringWheelLight size={24} />,
    },
    {
        key: 'reviews',
        label: 'Reviews',
        path: 'reviews',
        icon: <CiStar size={24} />,
    },
    {
        key: 'transactions',
        label: 'Transactions',
        path: 'transactions',
        icon: <CiCreditCard1 size={24} />,
    },
    {
        key: 'refund-requests',
        label: 'Refund Requests',
        path: 'refund-requests',
        icon: <RiRefund2Fill size={24} />,
    },
    {
        key: 'settings',
        label: 'Settings',
        path: 'settings',
        icon: <CiSettings size={24} />,
        children: [
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
            },
            {
                key: 'disclaimer',
                label: 'Disclaimer',
                path: 'disclaimer',
                icon: <BsPatchQuestion size={20} />,
            },
        ],
    },
];

export default sidebarItems;
