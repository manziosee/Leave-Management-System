import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, FileText, Settings, Users, BarChart, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import Logo from '../ui/Logo';

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile, isOpen, onClose }) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  
  if (!user) return null;
  
  const isManager = user.role === UserRole.MANAGER;
  const isAdmin = user.role === UserRole.ADMIN;

  const navItems = [
    { name: 'Dashboard', to: '/leave-history', icon: <Home size={20} /> },
    { name: 'Leave Application', to: '/apply-leave', icon: <FileText size={20} /> },
    { name: 'Calendar', to: '/calendar', icon: <Calendar size={20} /> },
    ...(isManager || isAdmin ? [{ name: 'Approvals', to: '/approvals', icon: <FileText size={20} /> }] : []),
    ...(isAdmin ? [
      { name: 'Employees', to: '/employees', icon: <Users size={20} /> },
      { name: 'Reports', to: '/reports', icon: <BarChart size={20} /> },
      { name: 'Settings', to: '/settings', icon: <Settings size={20} /> },
    ] : []),
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div 
      className={`
        ${isMobile ? 'fixed z-40 inset-0 transition-opacity ease-linear duration-300' : ''}
        ${isMobile && isOpen ? 'opacity-100 pointer-events-auto' : ''}
        ${isMobile && !isOpen ? 'opacity-0 pointer-events-none' : ''}
      `}
    >
      {/* Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-linear duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`
          ${isMobile ? 'fixed inset-y-0 left-0 w-64 transition-transform ease-in-out duration-300 transform' : 'h-screen sticky top-0 flex-shrink-0 w-64'}
          ${isMobile && isOpen ? 'translate-x-0' : ''}
          ${isMobile && !isOpen ? '-translate-x-full' : ''}
          bg-white dark:bg-gray-800 shadow-lg flex flex-col transition-colors duration-200
        `}
      >
        {/* Logo */}
        <div className="px-4 py-6 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <Logo size="md" />
        </div>
        
        {/* Nav */}
        <nav className="flex-1 px-2 py-4 overflow-y-auto bg-white dark:bg-gray-800 transition-colors duration-200">
          <div className="space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors duration-150 ${
                    active
                      ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-teal-600 dark:hover:text-teal-400'
                  }`}
                  onClick={isMobile ? onClose : undefined}
                >
                  <span className={`mr-3 ${
                    active
                      ? 'text-teal-600 dark:text-teal-400'
                      : 'text-gray-500 dark:text-gray-400 group-hover:text-teal-600 dark:group-hover:text-teal-400'
                  } transition-colors duration-150`}>
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
        
        {/* Profile */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 transition-colors duration-200">
          <div className="flex items-center">
            <img 
              src={user.profilePicture} 
              alt={user.name || 'User'}
              className="h-10 w-10 rounded-full object-cover border-2 border-white dark:border-gray-700 transition-colors duration-200"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-200">
                {user.name || 'Unknown User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">
                {user.role || 'Unknown Role'}
              </p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="mt-4 w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-150"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;