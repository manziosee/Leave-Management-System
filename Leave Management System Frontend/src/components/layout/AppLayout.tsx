import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const closeSidebar = () => setSidebarOpen(false);
  const openSidebar = () => setSidebarOpen(true);
  
  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar for mobile */}
      <Sidebar
        isMobile={true}
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />
      
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar
          isMobile={false}
          isOpen={true}
          onClose={() => {}}
        />
      </div>
      
      {/* Main content */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <Navbar onOpenSidebar={openSidebar} />
        
        <main className="flex-1 relative overflow-y-auto py-6 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;