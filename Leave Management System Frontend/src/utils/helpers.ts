import { Leave } from '../types';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('default', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateRange = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startMonth = start.toLocaleDateString('default', { month: 'short' });
  const endMonth = end.toLocaleDateString('default', { month: 'short' });

  if (startMonth === endMonth && start.getFullYear() === end.getFullYear()) {
    return `${startMonth} ${start.getDate()} - ${end.getDate()}, ${start.getFullYear()}`;
  }

  return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}, ${end.getFullYear()}`;
};

export const calculateLeaveDays = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days
};

export const sortLeaves = (leaves: Leave[], sortBy: 'date' | 'type' | 'status' = 'date'): Leave[] => {
  return [...leaves].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    } else if (sortBy === 'type') {
      return a.type.localeCompare(b.type);
    } else {
      return a.status.localeCompare(b.status);
    }
  });
};