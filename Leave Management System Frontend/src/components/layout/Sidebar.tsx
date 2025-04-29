import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar, FileText, Settings, Users, BarChart, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile, isOpen, onClose }) => {
  const { user, logout } = useAuth();
  
  if (!user) return null;
  
  const isManager = user.role === UserRole.MANAGER;
  const isAdmin = user.role === UserRole.ADMIN;

  const navItems = [
    { name: 'Dashboard', to: '/', icon: <Home size={20} /> },
    { name: 'Leave Application', to: '/apply-leave', icon: <FileText size={20} /> },
    { name: 'Calendar', to: '/calendar', icon: <Calendar size={20} /> },
    ...(isManager || isAdmin ? [{ name: 'Approvals', to: '/approvals', icon: <FileText size={20} /> }] : []),
    ...(isAdmin ? [
      { name: 'Employees', to: '/employees', icon: <Users size={20} /> },
      { name: 'Reports', to: '/reports', icon: <BarChart size={20} /> },
      { name: 'Settings', to: '/settings', icon: <Settings size={20} /> },
    ] : []),
  ];

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
          bg-white shadow-lg flex flex-col
        `}
      >
        {/* Logo */}
        <div className="px-4 py-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-teal-600" />
            <span className="text-xl font-bold text-gray-900">LeaveManager</span>
          </div>
        </div>
        
        {/* Nav */}
        <nav className="flex-1 px-2 py-4 overflow-y-auto bg-white">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-teal-600 transition-colors duration-150"
                onClick={isMobile ? onClose : undefined}
              >
                <span className="mr-3 text-gray-500 group-hover:text-teal-600 transition-colors duration-150">
                  {item.icon}
                </span>
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
        
        {/* Profile */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center">
            <img 
              src={user.profilePicture} 
              alt={user.name}
              className="h-10 w-10 rounded-full object-cover border-2 border-white"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="mt-4 w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors duration-150"
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