import React from 'react';
import { Leave } from '../../types';
import ApprovalItem from './ApprovalItem';
import { mockUsers } from '../../utils/mockData';

interface ApprovalsListProps {
  leaves: Leave[];
}

const ApprovalsList: React.FC<ApprovalsListProps> = ({ leaves }) => {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {leaves.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          <p>No pending leave requests</p>
        </div>
      ) : (
        leaves.map((leave) => {
          const requester = mockUsers.find(user => user.id === leave.userId);
          if (!requester) return null;
          return (
            <ApprovalItem 
              key={leave.id} 
              leave={leave} 
              requester={requester} 
            />
          );
        })
      )}
    </div>
  );
};

export default ApprovalsList;