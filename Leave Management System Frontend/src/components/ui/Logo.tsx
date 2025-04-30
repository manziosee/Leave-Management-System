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
      <Calendar className={`${sizeClasses[size].icon} text-teal-600 dark:text-teal-400`} />
      {variant === 'full' && (
        <span className={`${sizeClasses[size].text} font-bold text-gray-900 dark:text-white tracking-tight`}>
          <span className="text-teal-600 dark:text-teal-400">Leave</span>
          Manager
        </span>
      )}
    </div>
  );
};

export default Logo;