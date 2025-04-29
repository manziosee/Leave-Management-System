import React from 'react';
import LeaveApplicationForm from '../components/leave/LeaveApplicationForm';
import { useLeave } from '../context/LeaveContext';
import LeaveBalanceCard from '../components/dashboard/LeaveBalanceCard';

const ApplyLeave: React.FC = () => {
  const { leaveBalances } = useLeave();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Apply for Leave</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <LeaveApplicationForm />
        </div>
        
        <div>
          <LeaveBalanceCard balances={leaveBalances} />
        </div>
      </div>
    </div>
  );
};

export default ApplyLeave;