import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Leave, LeaveBalance, LeaveType, LeaveStatus } from '../types';

interface LeaveContextType {
  leaves: Leave[];
  leaveBalances: LeaveBalance[];
  applyForLeave: (leaveData: Partial<Leave>) => Promise<void>;
  cancelLeave: (leaveId: string) => Promise<void>;
  approveLeave: (leaveId: string, comments?: string) => Promise<void>;
  rejectLeave: (leaveId: string, comments: string) => Promise<void>;
  isLoading: boolean;
}

const LeaveContext = createContext<LeaveContextType | undefined>(undefined);

export const LeaveProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [leaveBalances] = useState<LeaveBalance[]>([
    { type: LeaveType.PTO, total: 20, used: 5, pending: 2, remaining: 13 },
    { type: LeaveType.SICK, total: 10, used: 1, pending: 0, remaining: 9 },
    { type: LeaveType.COMPASSIONATE, total: 5, used: 0, pending: 0, remaining: 5 },
    { type: LeaveType.MATERNITY, total: 0, used: 0, pending: 0, remaining: 0 }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const applyForLeave = async (leaveData: Partial<Leave>) => {
    setIsLoading(true);
    try {
      const newLeave: Leave = {
        id: Math.random().toString(36).substr(2, 9),
        userId: '1', // Mock user ID
        type: leaveData.type || LeaveType.PTO,
        status: LeaveStatus.PENDING,
        startDate: leaveData.startDate || '',
        endDate: leaveData.endDate || '',
        reason: leaveData.reason || '',
        appliedOn: new Date().toISOString()
      };
      
      setLeaves(prev => [...prev, newLeave]);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelLeave = async (leaveId: string) => {
    setIsLoading(true);
    try {
      setLeaves(prev => prev.filter(leave => leave.id !== leaveId));
    } finally {
      setIsLoading(false);
    }
  };

  const approveLeave = async (leaveId: string, comments?: string) => {
    setIsLoading(true);
    try {
      setLeaves(prev => prev.map(leave => 
        leave.id === leaveId 
          ? { ...leave, status: LeaveStatus.APPROVED, comments }
          : leave
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const rejectLeave = async (leaveId: string, comments: string) => {
    setIsLoading(true);
    try {
      setLeaves(prev => prev.map(leave => 
        leave.id === leaveId 
          ? { ...leave, status: LeaveStatus.REJECTED, comments }
          : leave
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LeaveContext.Provider
      value={{
        leaves,
        leaveBalances,
        applyForLeave,
        cancelLeave,
        approveLeave,
        rejectLeave,
        isLoading
      }}
    >
      {children}
    </LeaveContext.Provider>
  );
};

export const useLeave = () => {
  const context = useContext(LeaveContext);
  if (context === undefined) {
    throw new Error('useLeave must be used within a LeaveProvider');
  }
  return context;
};