import { Link } from 'react-router-dom';
import { useProfileQuery } from '../../redux/apiSlices/authSlice';
import { imageUrl } from '../../redux/api/baseApi';

export default function DashboardHeader() {
    const { data: profile } = useProfileQuery({});

    return (
        <div>
            <div className="bg-bg px-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Left section - Greeting */}
                    <Link to="/">
                        <div className="flex flex-col gap-3 items-center justify-center pl-24">
                            <img src="/logo.svg" alt="" className="h-20" />
                        </div>
                    </Link>

                    {/* Right section - Actions */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {/* Notifications */}
                        {/* <Link to="/notification">
                            <button className="relative p-2 text-[#223047] hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                                <FiBell className="h-6 w-6" />
                                <span className="absolute -top-1 -right-0 flex items-center justify-center bg-primary text-white text-xs font-semibold rounded-full w-6 h-6 shadow-md border-2 border-white">
                                    2
                                </span>
                            </button>
                        </Link> */}
                        {/* Profile */}
                        <div className="flex items-center space-x-3">
                            <Link to="/profile">
                                <img
                                    src={
                                        profile?.data?.profile
                                            ? profile.data.profile.includes('https')
                                                ? profile.data.profile
                                                : `${imageUrl}/${profile.data.profile}`
                                            : ''
                                    } alt="Profile"
                                    className="w-8 h-8 rounded-full object-cover cursor-pointer"
                                />
                            </Link>
                            <div className="flex flex-col">
                                <span className="text-sm sm:text-base font-semibold text-gray-900">Administrator</span>
                                <span className="text-xs sm:text-sm text-gray-400">Super Admin</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
