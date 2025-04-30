import React, { useState } from 'react';
import { User, Leave, LeaveStatus } from '../../types';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { useLeave } from '../../context/LeaveContext';
import { formatDateRange } from '../../utils/helpers';

interface ApprovalItemProps {
  leave: Leave;
  requester: User;
}

const ApprovalItem: React.FC<ApprovalItemProps> = ({ leave, requester }) => {
  const { approveLeave, rejectLeave, isLoading } = useLeave();
  const [comments, setComments] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleApprove = () => {
    approveLeave(leave.id, comments);
  };

  const handleReject = () => {
    if (!comments.trim()) {
      setShowComments(true);
      return;
    }
    rejectLeave(leave.id, comments);
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4">
      <div className="flex items-start">
        <Avatar src={requester.profilePicture} alt={requester.name} size="md" />
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900 dark:text-white">
              {requester.name} - {leave.type}
            </h3>
            <span className={`text-xs px-2 py-1 rounded-full ${
              leave.status === LeaveStatus.PENDING 
                ? 'bg-amber-100 text-amber-800' 
                : leave.status === LeaveStatus.APPROVED 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
            }`}>
              {leave.status}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {formatDateRange(leave.startDate, leave.endDate)}
          </p>
          {leave.reason && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {leave.reason}
            </p>
          )}
          {showComments && (
            <div className="mt-3">
              <textarea
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                rows={3}
                placeholder="Enter comments (required for rejection)"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>
          )}
          {leave.status === LeaveStatus.PENDING && (
            <div className="mt-3 flex space-x-2">
              <Button
                variant="success"
                size="sm"
                onClick={handleApprove}
                isLoading={isLoading}
              >
                Approve
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleReject}
                isLoading={isLoading}
              >
                Reject
              </Button>
              {!showComments && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowComments(true)}
                >
                  Add Comments
                </Button>
              )}
            </div>
          )}
          {leave.comments && leave.status === LeaveStatus.REJECTED && (
            <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded-md">
              <p className="text-sm text-red-600 dark:text-red-400">
                <strong>Comments:</strong> {leave.comments}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovalItem;