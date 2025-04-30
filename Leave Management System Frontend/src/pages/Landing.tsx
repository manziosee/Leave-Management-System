import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Clock, Shield } from 'lucide-react';
import Logo from '../components/ui/Logo';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Streamline Your Leave Management
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
              Simplify leave requests, approvals, and tracking with our comprehensive leave management system.
            </p>
            <div className="mt-10">
              <Link
                to="/register"
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-md font-medium text-lg transition-colors inline-flex items-center"
              >
                Start Free Trial
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="bg-teal-100 dark:bg-teal-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Leave Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track and manage all types of leave requests in one place.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="bg-teal-100 dark:bg-teal-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Team Calendar
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                View your team's availability and plan accordingly.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="bg-teal-100 dark:bg-teal-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Quick Approvals
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Streamlined approval process for faster responses.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="bg-teal-100 dark:bg-teal-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Secure Access
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Role-based access control for data security.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;