import React from 'react';
import { useLeave } from '../context/LeaveContext';
import { useAuth } from '../context/AuthContext';
import { getColleaguesOnLeave, mockHolidays } from '../utils/mockData';
import LeaveBalanceCard from '../components/dashboard/LeaveBalanceCard';
import LeaveHistoryCard from '../components/dashboard/LeaveHistoryCard';
import ColleaguesOnLeaveCard from '../components/dashboard/ColleaguesOnLeaveCard';
import UpcomingHolidaysCard from '../components/dashboard/UpcomingHolidaysCard';
import Card from '../components/ui/Card';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { leaves, leaveBalances } = useLeave();
  const colleaguesOnLeave = getColleaguesOnLeave();
  
  if (!user) return null;

  const upcomingLeaves = leaves
    .filter(leave => new Date(leave.startDate) >= new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <LeaveBalanceCard balances={leaveBalances} />
          
          {upcomingLeaves.length > 0 && (
            <Card 
              title="Upcoming Leave" 
              subtitle="Your approved and pending leave requests"
            >
              <div className="space-y-4">
                {upcomingLeaves.map(leave => {
                  const startDate = new Date(leave.startDate);
                  const endDate = new Date(leave.endDate);
                  
                  const formattedStartDate = startDate.toLocaleDateString('default', {
                    month: 'long',
                    day: 'numeric',
                  });
                  
                  const formattedEndDate = endDate.toLocaleDateString('default', {
                    month: 'long',
                    day: 'numeric',
                  });
                  
                  return (
                    <div key={leave.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{leave.type}</h4>
                          <p className="text-sm text-gray-500">
                            {formattedStartDate} - {formattedEndDate}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          leave.status === 'Approved' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {leave.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
          
          <LeaveHistoryCard leaves={leaves} />
        </div>
        
        <div className="space-y-6">
          <ColleaguesOnLeaveCard colleaguesOnLeave={colleaguesOnLeave} />
          <UpcomingHolidaysCard holidays={mockHolidays} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;