import React from 'react';
import { LeaveBalance } from '../../types';
import Card from '../ui/Card';

interface LeaveBalanceCardProps {
  balances: LeaveBalance[];
  className?: string;
}

const LeaveBalanceCard: React.FC<LeaveBalanceCardProps> = ({ balances, className = '' }) => {
  return (
    <Card 
      title="Leave Balance" 
      subtitle="Your current leave balance"
      className={className}
    >
      <div className="space-y-4">
        {balances.map((balance) => (
          <div key={balance.type} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-700">{balance.type}</h4>
              <p className="text-sm font-semibold">
                {balance.remaining}/{balance.total} days
              </p>
            </div>
            
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${(balance.used / balance.total) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
                ></div>
                <div
                  style={{ width: `${(balance.pending / balance.total) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-300"
                ></div>
              </div>
            </div>
            
            <div className="mt-2 flex text-xs">
              <div className="flex items-center mr-4">
                <span className="h-2 w-2 rounded-full bg-teal-500 mr-1"></span>
                <span className="text-gray-500">Used ({balance.used} days)</span>
              </div>
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-amber-300 mr-1"></span>
                <span className="text-gray-500">Pending ({balance.pending} days)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LeaveBalanceCard;