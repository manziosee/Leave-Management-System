import React, { useState } from 'react';
import { LeaveType } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Settings: React.FC = () => {
  const [leavePolicies, setLeavePolicies] = useState([
    { type: LeaveType.PTO, days: 20, carryOver: 5 },
    { type: LeaveType.SICK, days: 10, carryOver: 0 },
    { type: LeaveType.COMPASSIONATE, days: 5, carryOver: 0 },
    { type: LeaveType.MATERNITY, days: 90, carryOver: 0 }
  ]);

  const handlePolicyChange = (index: number, field: string, value: number) => {
    const updatedPolicies = [...leavePolicies];
    updatedPolicies[index] = {
      ...updatedPolicies[index],
      [field]: value
    };
    setLeavePolicies(updatedPolicies);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>

      <Card title="Leave Policies">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Per Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Carry Over</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
              {leavePolicies.map((policy, index) => (
                <tr key={policy.type}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {policy.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      min="0"
                      className="w-20 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                      value={policy.days}
                      onChange={(e) => handlePolicyChange(index, 'days', parseInt(e.target.value) || 0)}
                      placeholder="Enter days"
                      title="Days per year"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      min="0"
                      className="w-20 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                      value={policy.carryOver}
                      onChange={(e) => handlePolicyChange(index, 'carryOver', parseInt(e.target.value) || 0)}
                      placeholder="Enter carry over"
                      title="Max carry over"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="primary">Save Changes</Button>
        </div>
      </Card>

      <Card title="System Configuration">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Accrual Frequency</label>
            <label htmlFor="accrual-frequency" className="block text-sm font-medium text-gray-700 mb-1">Accrual Frequency</label>
            <select id="accrual-frequency" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm">
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Annually</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fiscal Year Start</label>
            <input
              type="date"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              value="2024-01-01"
              placeholder="Select a date"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="primary">Save Configuration</Button>
        </div>
      </Card>
    </div>
  );
};

export default Settings;