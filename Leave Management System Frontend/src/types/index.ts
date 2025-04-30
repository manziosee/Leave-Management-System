export enum LeaveType {
  PTO = 'Personal Time Off',
  SICK = 'Sick Leave',
  COMPASSIONATE = 'Compassionate Leave',
  MATERNITY = 'Maternity Leave',
  UNPAID = 'Unpaid Leave'
}

export enum LeaveStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected'
}

export enum UserRole {
  STAFF = 'Staff',
  MANAGER = 'Manager',
  ADMIN = 'Admin'
}

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  role: UserRole;
  department: string;
}

export interface LeaveBalance {
  type: LeaveType;
  total: number;
  used: number;
  pending: number;
  remaining: number;
}

export interface Leave {
  id: string;
  userId: string;
  type: LeaveType;
  status: LeaveStatus;
  startDate: string;
  endDate: string;
  reason: string;
  documentUrl?: string;
  appliedOn: string;
  approvedBy?: string;
  approvedOn?: string;
  comments?: string;
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
  description?: string;
}

export interface Department {
  id: string;
  name: string;
  managerId: string;
}