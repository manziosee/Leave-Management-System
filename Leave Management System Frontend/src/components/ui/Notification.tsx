import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

const Notification: React.FC<{ notification: { id: string; message: string; type: 'success' | 'error' | 'warning' | 'info' } }> = ({ notification }) => {
  const { removeNotification } = useNotifications();

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'error':
        return <XCircle size={16} className="text-red-500" />;
      case 'warning':
        return <AlertCircle size={16} className="text-amber-500" />;
      default:
        return <Info size={16} className="text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20';
      case 'warning':
        return 'bg-amber-50 dark:bg-amber-900/20';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20';
    }
  };

  const getBorderColor = () => {
    switch (notification.type) {
      case 'success':
        return 'border-green-200 dark:border-green-800';
      case 'error':
        return 'border-red-200 dark:border-red-800';
      case 'warning':
        return 'border-amber-200 dark:border-amber-800';
      default:
        return 'border-blue-200 dark:border-blue-800';
    }
  };

  return (
    <div 
      className={`${getBgColor()} ${getBorderColor()} border rounded-md p-3 mb-2 flex items-start shadow-sm`}
    >
      <div className="mr-2 mt-0.5 flex-shrink-0">
        {getIcon()}
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-800 dark:text-gray-200">
          {notification.message}
        </p>
      </div>
      <button
        onClick={() => removeNotification(notification.id)}
        className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
      >
        <span className="sr-only">Dismiss</span>
        <X size={16} />
      </button>
    </div>
  );
};

export default Notification;