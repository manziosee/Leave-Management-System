import React from 'react';
import { useLeave } from '../context/LeaveContext';
import ApprovalsList from '../components/approvals/ApprovalsList';
import Card from '../components/ui/Card';

const Approvals: React.FC = () => {
  const { leaves } = useLeave();

  // Filter leaves that are pending approval
  const pendingLeaves = leaves.filter(leave => leave.status === 'Pending');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Leave Approvals</h1>
      
      <Card title="Pending Approvals" subtitle={`${pendingLeaves.length} requests awaiting your action`}>
        <ApprovalsList leaves={pendingLeaves} />
      </Card>
    </div>
  );
};

export default Approvals;