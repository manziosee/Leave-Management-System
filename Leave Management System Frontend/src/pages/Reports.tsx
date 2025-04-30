import React, { useState } from 'react';
import { LeaveType } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Download, Printer } from 'lucide-react';

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState<'summary' | 'detailed'>('summary');
  const [leaveType, setLeaveType] = useState<LeaveType>(LeaveType.PTO);
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });

  const handleGenerateReport = () => {
    // Generate report logic
    console.log('Generating report:', { reportType, leaveType, dateRange });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Reports</h1>

      <Card title="Generate Report">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
            <select
              id="reportType"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              value={reportType}
              onChange={(e) => setReportType(e.target.value as 'summary' | 'detailed')}
            >
              <option value="summary">Summary Report</option>
              <option value="detailed">Detailed Report</option>
            </select>
          </div>

          <div>
            <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
            <select
              id="leaveType"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value as LeaveType)}
            >
              {Object.values(LeaveType).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                placeholder="Select start date"
              />
            </div>

            <div>
              <input
                type="date"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                min={dateRange.start}
                placeholder="Select end date"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button variant="outline" icon={<Printer size={16} />}>
            Print
          </Button>
          <Button variant="primary" icon={<Download size={16} />} onClick={handleGenerateReport}>
            Download
          </Button>
        </div>
      </Card>

      {/* Report Preview Section */}
      <Card title="Report Preview">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
          <p className="text-gray-500 dark:text-gray-400 text-center">
            {reportType === 'summary' 
              ? 'Summary report preview will appear here' 
              : 'Detailed report preview will appear here'}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Reports;