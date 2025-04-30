import React, { useEffect } from 'react';
import Logo from '../ui/Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  // Set body class for auth pages
  useEffect(() => {
    document.body.classList.add('bg-gray-50', 'dark:bg-gray-900');
    return () => {
      document.body.classList.remove('bg-gray-50', 'dark:bg-gray-900');
    };
  }, []);

  return (
    <div className="min-h-screen flex transition-colors duration-200 dark:bg-gray-900">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 shadow-lg shadow-gray-200/20 dark:shadow-none">
        <div className="max-w-md w-full space-y-8 py-12">
          <div className="flex flex-col items-center">
            <Logo size="lg" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white transition-colors duration-200">
              {title}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
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
        <div className="absolute inset-0 bg-gradient-to-b from-teal-500/40 to-teal-900/80 mix-blend-multiply" />
        <div className="absolute inset-0 flex flex-col items-start justify-end p-12">
          <blockquote className="max-w-xl mb-4">
            <p className="text-xl font-medium text-white">
              "Efficiency is doing things right; effectiveness is doing the right things."
            </p>
          </blockquote>
          <p className="text-white font-medium">- Peter Drucker</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;