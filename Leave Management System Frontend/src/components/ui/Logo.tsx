import React from 'react';
import { Calendar } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'full',
  className = '' 
}) => {
  const sizeClasses = {
    sm: {
      icon: 'w-6 h-6',
      text: 'text-lg'
    },
    md: {
      icon: 'w-8 h-8',
      text: 'text-xl'
    },
    lg: {
      icon: 'w-12 h-12',
      text: 'text-3xl'
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-teal-600 rounded-lg transform rotate-3 scale-105" />
        <Calendar className={`${sizeClasses[size].icon} text-white relative z-10 p-1`} />
      </div>
      {variant === 'full' && (
        <span className={`${sizeClasses[size].text} font-bold text-gray-900 dark:text-white tracking-tight`}>
          <span className="text-teal-600 dark:text-teal-400">Leave</span>
          <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent dark:from-teal-400 dark:to-teal-300">Manager</span>
        </span>
      )}
    </div>
  );
};

export default Logo;