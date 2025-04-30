import React, { useState } from 'react';
import { Calendar, Upload, PlusCircle } from 'lucide-react';
import { LeaveType } from '../types'; // Adjusted the path to match the correct location
import Card from '../components/ui/Card'; // Adjusted the path to the correct location
import Button from '../components/ui/Button';
import { useLeave } from '../context/LeaveContext';

const LeaveApplicationForm: React.FC = () => {
  const { applyForLeave, isLoading } = useLeave();
  
  const [leaveType, setLeaveType] = useState<LeaveType>(LeaveType.PTO);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [documents, setDocuments] = useState<File[]>([]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await applyForLeave({
        type: leaveType,
        startDate,
        endDate,
        reason,
        documentUrl: documents.length > 0 ? 'https://example.com/document.pdf' : undefined,
      });
      
      setLeaveType(LeaveType.PTO);
      setStartDate('');
      setEndDate('');
      setReason('');
      setDocuments([]);
      
      alert('Leave application submitted successfully!');
    } catch (error) {
      console.error('Failed to submit leave application:', error);
      alert('Failed to submit leave application. Please try again.');
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setDocuments([...documents, ...newFiles]);
    }
  };
  
  const removeDocument = (index: number) => {
    const newDocuments = [...documents];
    newDocuments.splice(index, 1);
    setDocuments(newDocuments);
  };
  
  return (
    <Card title="Apply for Leave">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Leave Type
            </label>
            <select
              id="leaveType"
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value as LeaveType)}
              required
            >
              {Object.values(LeaveType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          
          <div className="md:col-span-2 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Date
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="date"
                  id="startDate"
                  className="pl-10 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                End Date
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="date"
                  id="endDate"
                  className="pl-10 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Reason for Leave
            </label>
            <textarea
              id="reason"
              rows={3}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please provide a reason for your leave request..."
              required={leaveType === LeaveType.SICK || leaveType === LeaveType.COMPASSIONATE}
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Supporting Documents
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md bg-white dark:bg-gray-700">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-teal-600 dark:text-teal-400 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500">
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PDF, DOC, DOCX, PNG, JPG, JPEG up to 10MB
                </p>
              </div>
            </div>
            
            {documents.length > 0 && (
              <ul className="mt-4 divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700">
                {documents.map((file, index) => (
                  <li key={index} className="px-4 py-3 flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <PlusCircle size={16} className="flex-shrink-0 mr-2 text-gray-500 dark:text-gray-400" />
                      <span className="truncate text-gray-900 dark:text-white">{file.name}</span>
                    </div>
                    <button
                      type="button"
                      className="ml-4 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                      onClick={() => removeDocument(index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Submit Application
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default LeaveApplicationForm;