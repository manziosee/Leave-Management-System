import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Leave, LeaveBalance, LeaveType, LeaveStatus } from '../types';
import { getLeaveBalanceForUser, getLeavesForUser } from '../utils/mockData';
import { useAuth } from './AuthContext';

interface LeaveContextType {
  leaves: Leave[];
  leaveBalances: LeaveBalance[];
  applyForLeave: (leaveData: Partial<Leave>) => Promise<void>;
  cancelLeave: (leaveId: string) => Promise<void>;
  approveLeave: (leaveId: string, comments?: string) => Promise<void>;
  rejectLeave: (leaveId: string, comments: string) => Promise<void>;
  fetchUserLeaves: () => void;
  fetchLeaveBalances: () => void;
  isLoading: boolean;
}

const LeaveContext = createContext<LeaveContextType | undefined>(undefined);

export const LeaveProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [leaveBalances, setLeaveBalances] = useState<LeaveBalance[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserLeaves = () => {
    if (!user) return;
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      const userLeaves = getLeavesForUser(user.id);
      setLeaves(userLeaves);
    } catch (error) {
      console.error('Failed to fetch leaves:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLeaveBalances = () => {
    if (!user) return;
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      const balances = getLeaveBalanceForUser(user.id);
      setLeaveBalances(balances);
    } catch (error) {
      console.error('Failed to fetch leave balances:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserLeaves();
      fetchLeaveBalances();
    }
  }, [user]);

  const applyForLeave = async (leaveData: Partial<Leave>) => {
    if (!user) throw new Error('User not authenticated');
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      const newLeave: Leave = {
        id: Math.random().toString(36).substr(2, 9), // Generate a random ID
        userId: user.id,
        type: leaveData.type || LeaveType.PTO,
        status: LeaveStatus.PENDING,
        startDate: leaveData.startDate || '',
        endDate: leaveData.endDate || '',
        reason: leaveData.reason || '',
        documentUrl: leaveData.documentUrl,
        appliedOn: new Date().toISOString().split('T')[0],
      };
      
      setLeaves(prev => [...prev, newLeave]);
      
      // Update leave balances
      const updatedBalances = leaveBalances.map(balance => {
        if (balance.type === newLeave.type) {
          return {
            ...balance,
            pending: balance.pending + calculateDays(newLeave.startDate, newLeave.endDate),
            remaining: balance.remaining - calculateDays(newLeave.startDate, newLeave.endDate)
          };
        }
        return balance;
      });
      
      setLeaveBalances(updatedBalances);
    } catch (error) {
      console.error('Failed to apply for leave:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelLeave = async (leaveId: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      const leaveToCancel = leaves.find(leave => leave.id === leaveId);
      
      if (!leaveToCancel) {
        throw new Error('Leave not found');
      }
      
      setLeaves(prev => prev.filter(leave => leave.id !== leaveId));
      
      // Update leave balances
      if (leaveToCancel.status === LeaveStatus.PENDING) {
        const updatedBalances = leaveBalances.map(balance => {
          if (balance.type === leaveToCancel.type) {
            return {
              ...balance,
              pending: balance.pending - calculateDays(leaveToCancel.startDate, leaveToCancel.endDate),
              remaining: balance.remaining + calculateDays(leaveToCancel.startDate, leaveToCancel.endDate)
            };
          }
          return balance;
        });
        
        setLeaveBalances(updatedBalances);
      }
    } catch (error) {
      console.error('Failed to cancel leave:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const approveLeave = async (leaveId: string, comments?: string) => {
    if (!user) throw new Error('User not authenticated');
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      setLeaves(prev => prev.map(leave => {
        if (leave.id === leaveId) {
          return {
            ...leave,
            status: LeaveStatus.APPROVED,
            approvedBy: user.id,
            approvedOn: new Date().toISOString().split('T')[0],
            comments: comments || leave.comments
          };
        }
        return leave;
      }));
      
      // Update leave balances
      const approvedLeave = leaves.find(leave => leave.id === leaveId);
      
      if (approvedLeave) {
        const updatedBalances = leaveBalances.map(balance => {
          if (balance.type === approvedLeave.type) {
            return {
              ...balance,
              pending: balance.pending - calculateDays(approvedLeave.startDate, approvedLeave.endDate),
              used: balance.used + calculateDays(approvedLeave.startDate, approvedLeave.endDate)
            };
          }
          return balance;
        });
        
        setLeaveBalances(updatedBalances);
      }
    } catch (error) {
      console.error('Failed to approve leave:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const rejectLeave = async (leaveId: string, comments: string) => {
    if (!user) throw new Error('User not authenticated');
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      setLeaves(prev => prev.map(leave => {
        if (leave.id === leaveId) {
          return {
            ...leave,
            status: LeaveStatus.REJECTED,
            approvedBy: user.id,
            approvedOn: new Date().toISOString().split('T')[0],
            comments
          };
        }
        return leave;
      }));
      
      // Update leave balances
      const rejectedLeave = leaves.find(leave => leave.id === leaveId);
      
      if (rejectedLeave) {
        const updatedBalances = leaveBalances.map(balance => {
          if (balance.type === rejectedLeave.type) {
            return {
              ...balance,
              pending: balance.pending - calculateDays(rejectedLeave.startDate, rejectedLeave.endDate),
              remaining: balance.remaining + calculateDays(rejectedLeave.startDate, rejectedLeave.endDate)
            };
          }
          return balance;
        });
        
        setLeaveBalances(updatedBalances);
      }
    } catch (error) {
      console.error('Failed to reject leave:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to calculate days between two dates
  const calculateDays = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Include both start and end days
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
        fetchUserLeaves,
        fetchLeaveBalances,
        isLoading
      }}
    >
      {children}
    </LeaveContext.Provider>
  );
};

export const useLeave = (): LeaveContextType => {
  const context = useContext(LeaveContext);
  if (context === undefined) {
    throw new Error('useLeave must be used within a LeaveProvider');
  }
  return context;
};