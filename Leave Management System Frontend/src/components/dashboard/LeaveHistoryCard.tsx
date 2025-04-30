import React from 'react';
import { Calendar, Check, X, Clock } from 'lucide-react';
import { Leave, LeaveStatus } from '../../types';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

interface LeaveHistoryCardProps {
  leaves: Leave[];
  className?: string;
}


const LeaveHistoryCard: React.FC<LeaveHistoryCardProps> = ({ 
  leaves,
  className = ''
}) => {
  // Helper function to get badge variant based on leave status
  const getBadgeVariant = (status: LeaveStatus) => {
    switch (status) {
      case LeaveStatus.APPROVED:
        return 'success';
      case LeaveStatus.REJECTED:
        return 'danger';
      case LeaveStatus.PENDING:
        return 'warning';
      default:
        return 'neutral';
    }
  };

  // Helper function to get status icon
  const getStatusIcon = (status: LeaveStatus) => {
    switch (status) {
      case LeaveStatus.APPROVED:
        return <Check size={16} className="text-green-500" />;
      case LeaveStatus.REJECTED:
        return <X size={16} className="text-red-500" />;
      case LeaveStatus.PENDING:
        return <Clock size={16} className="text-amber-500" />;
      default:
        return null;
    }
  };
  
  // Format date range
  const formatDateRange = (startDate: string, endDate: string): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startMonth = start.toLocaleString('default', { month: 'short' });
    const endMonth = end.toLocaleString('default', { month: 'short' });
    
    if (startMonth === endMonth && start.getFullYear() === end.getFullYear()) {
      return `${startMonth} ${start.getDate()} - ${end.getDate()}, ${start.getFullYear()}`;
    }
    
    return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}, ${end.getFullYear()}`;
  };

  return (
    <Card 
      title="Leave History" 
      subtitle="Your recent leave requests"
      className={className}
    >
      {leaves.length === 0 ? (
        <div className="py-4 text-center text-gray-500">
          <p>No leave history found</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {leaves.map((leave) => (
            <div key={leave.id} className="py-3 first:pt-0 last:pb-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-gray-900">{leave.type}</h4>
                <Badge variant={getBadgeVariant(leave.status)}>
                  <div className="flex items-center">
                    {getStatusIcon(leave.status)}
                    <span className="ml-1">{leave.status}</span>
                  </div>
                </Badge>
              </div>
              
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Calendar size={16} className="mr-1" />
                <span>{formatDateRange(leave.startDate, leave.endDate)}</span>
              </div>
              
              {leave.reason && (
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {leave.reason}
                </p>
              )}
              
              {leave.comments && leave.status === LeaveStatus.REJECTED && (
                <p className="mt-1 text-sm text-red-600 border-l-2 border-red-400 pl-2">
                  {leave.comments}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default LeaveHistoryCard;