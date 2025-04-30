import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Clock, Shield, ChevronRight, Star, CheckCircle, Award } from 'lucide-react';
import Logo from '../components/ui/Logo';
import ThemeToggle from '../components/ui/ThemeToggle';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-30">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link
              to="/login"
              className="text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md font-medium transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                <span className="block xl:inline">Streamline Your</span>{' '}
                <span className="block text-teal-600 dark:text-teal-400 xl:inline">
                  Leave Management
                </span>
              </h1>
              <p className="mt-6 text-xl text-gray-500 dark:text-gray-400">
                Simplify leave requests, approvals, and tracking with our comprehensive leave management system. Say goodbye to paperwork and hello to efficiency.
              </p>
              <div className="mt-10 flex sm:justify-center lg:justify-start space-x-4">
                <Link
                  to="/register"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-md font-medium text-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg inline-flex items-center"
                >
                  Start Free Trial
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/login"
                  className="bg-white text-teal-600 border border-teal-600 px-8 py-3 rounded-md font-medium text-lg transition-colors hover:bg-teal-50"
                >
                  Sign In
                </Link>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    className="w-full"
                    src="https://images.pexels.com/photos/7654058/pexels-photo-7654058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Dashboard preview"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black opacity-20" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mt-20 opacity-10 dark:opacity-5">
          <svg width="400" height="400" fill="none" viewBox="0 0 400 400">
            <defs>
              <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="400" height="400" fill="url(#pattern)" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-teal-600 dark:text-teal-400 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to manage time off
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
              Our comprehensive leave management solution streamlines the entire process from request to approval.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-teal-100 dark:bg-teal-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Leave Tracking
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Track and manage all types of leave requests in one place. Stay on top of your team's availability.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-teal-100 dark:bg-teal-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Team Calendar
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  View your team's availability and plan accordingly. Identify potential staffing shortages before they happen.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-teal-100 dark:bg-teal-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Quick Approvals
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Streamlined approval process for faster responses. No more waiting for manual approvals.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-teal-100 dark:bg-teal-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Secure Access
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Role-based access control for data security. Ensure only authorized personnel can view sensitive information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-teal-600 dark:text-teal-400 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Trusted by teams everywhere
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                "LeaveManager has transformed our HR processes. We've saved countless hours on leave management and improved employee satisfaction."
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Client"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Sarah Johnson</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">HR Director, Acme Inc.</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                "The intuitive interface and comprehensive features have made leave management a breeze. Our team loves the transparency."
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Client"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Michael Chen</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Team Lead, TechCorp</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                "Since implementing LeaveManager, we've seen a 40% reduction in time spent processing leave requests. It's a game changer!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Client"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Amanda Lopez</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Operations Manager, GlobalFirm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-600 dark:bg-teal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to simplify leave management?</span>
            <span className="block">Start your free trial today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-teal-100">
            Join thousands of teams already using LeaveManager to streamline their processes.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-teal-600 bg-white hover:bg-gray-50 transition-colors"
              >
                Get started
              </Link>
            </div>
            <div className="ml-3 inline-flex">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-700 hover:bg-teal-800 transition-colors"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Logo size="md" />
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                LeaveManager helps teams streamline leave management with powerful tools and an intuitive interface.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-300 uppercase tracking-wider">Features</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
                    <CheckCircle className="inline-block h-4 w-4 mr-2" />
                    Leave Tracking
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
                    <CheckCircle className="inline-block h-4 w-4 mr-2" />
                    Team Calendar
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
                    <CheckCircle className="inline-block h-4 w-4 mr-2" />
                    Approval Workflows
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-300 uppercase tracking-wider">Company</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">About</a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">Blog</a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">Contact</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between">
            <p className="text-base text-gray-400 dark:text-gray-500">
              &copy; 2025 LeaveManager. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
                <span className="sr-only">Twitter</span>
                <Award className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
                <span className="sr-only">LinkedIn</span>
                <Users className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
                <span className="sr-only">GitHub</span>
                <Shield className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;