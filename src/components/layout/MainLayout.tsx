import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';

const MainLayout: React.FC = () => {
    return (
        <div className={`grid grid-cols-12`}>
            <div className="col-span-12 border-b border-gray-200">
                <DashboardHeader />
            </div>
            {/* side bar */}
            <div className="col-span-2 h-[calc(100vh-97px)] overflow-x-hidden bg-[#FFF]">
                <Sidebar />
            </div>

            {/* main container with header */}
            <div className="col-span-10 bg-[#FFFDFB]">
                <div className="px-4 h-[calc(100vh-97px)]">
                    <div className="h-full overflow-y-auto rounded-md pt-4">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
