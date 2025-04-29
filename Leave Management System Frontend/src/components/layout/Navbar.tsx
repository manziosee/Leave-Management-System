import React from 'react';
import { Bell, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  onOpenSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenSidebar }) => {
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button
              type="button"
              className="px-4 text-gray-500 md:hidden"
              onClick={onOpenSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu size={24} aria-hidden="true" />
            </button>
            
            <div className="flex-shrink-0 flex items-center">
              <h1 className="hidden md:block text-xl font-semibold text-gray-900">LeaveManager</h1>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center">
              {/* Notification bell */}
              <button
                type="button"
                className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
              >
                <span className="sr-only">View notifications</span>
                <Bell size={20} aria-hidden="true" />
              </button>
              
              {/* User profile */}
              <div className="flex items-center ml-4">
                <div className="flex items-center">
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={user.profilePicture}
                    alt={user.name}
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
                    {user.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;