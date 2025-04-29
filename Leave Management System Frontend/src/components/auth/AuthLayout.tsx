import React from 'react';
import { Calendar } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex dark:bg-gray-900">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="flex justify-center">
              <div className="flex items-center space-x-2">
                <Calendar className="h-12 w-12 text-teal-600 dark:text-teal-400" />
                <span className="text-3xl font-bold text-gray-900 dark:text-white">LeaveManager</span>
              </div>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              {title}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          </div>
          {children}
        </div>
      </div>
      
      {/* Right side - Image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Team working together"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-500/30 to-teal-900/80 mix-blend-multiply" />
      </div>
    </div>
  );
};

export default AuthLayout;