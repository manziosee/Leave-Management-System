import React from 'react';
import { Bell, Menu, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  onOpenSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenSidebar }) => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  if (!user) return null;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-30 transition-colors duration-200">
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
              <h1 className="hidden md:block text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-200">
                LeaveManager
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon size={20} />
              ) : (
                <Sun size={20} className="text-yellow-300" />
              )}
            </button>

            {/* Notification bell */}
            <button
              type="button"
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <span className="sr-only">View notifications</span>
              <Bell size={20} aria-hidden="true" />
            </button>
            
            {/* User profile */}
            <div className="flex items-center">
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={user.profilePicture}
                  alt={user.name}
                />
                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200 hidden md:block transition-colors duration-200">
                  {user.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;