import { LeaveType, LeaveStatus, UserRole, User, LeaveBalance, Leave, Holiday, Department } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    role: UserRole.STAFF,
    department: 'Engineering'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    role: UserRole.MANAGER,
    department: 'Engineering'
  },
  {
    id: '3',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    role: UserRole.ADMIN,
    department: 'HR'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    profilePicture: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    role: UserRole.STAFF,
    department: 'Marketing'
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    profilePicture: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    role: UserRole.STAFF,
    department: 'Engineering'
  }
];

// Mock Leave Balances
export const mockLeaveBalances: Record<string, LeaveBalance[]> = {
  '1': [
    { type: LeaveType.PTO, total: 20, used: 5, pending: 2, remaining: 13 },
    { type: LeaveType.SICK, total: 10, used: 1, pending: 0, remaining: 9 },
    { type: LeaveType.COMPASSIONATE, total: 5, used: 0, pending: 0, remaining: 5 },
    { type: LeaveType.MATERNITY, total: 0, used: 0, pending: 0, remaining: 0 }
  ],
  '2': [
    { type: LeaveType.PTO, total: 20, used: 8, pending: 0, remaining: 12 },
    { type: LeaveType.SICK, total: 10, used: 2, pending: 0, remaining: 8 },
    { type: LeaveType.COMPASSIONATE, total: 5, used: 0, pending: 0, remaining: 5 },
    { type: LeaveType.MATERNITY, total: 0, used: 0, pending: 0, remaining: 0 }
  ],
  '3': [
    { type: LeaveType.PTO, total: 20, used: 10, pending: 0, remaining: 10 },
    { type: LeaveType.SICK, total: 10, used: 0, pending: 0, remaining: 10 },
    { type: LeaveType.COMPASSIONATE, total: 5, used: 0, pending: 0, remaining: 5 },
    { type: LeaveType.MATERNITY, total: 0, used: 0, pending: 0, remaining: 0 }
  ],
  '4': [
    { type: LeaveType.PTO, total: 20, used: 3, pending: 5, remaining: 12 },
    { type: LeaveType.SICK, total: 10, used: 3, pending: 0, remaining: 7 },
    { type: LeaveType.COMPASSIONATE, total: 5, used: 0, pending: 0, remaining: 5 },
    { type: LeaveType.MATERNITY, total: 0, used: 0, pending: 0, remaining: 0 }
  ],
  '5': [
    { type: LeaveType.PTO, total: 20, used: 7, pending: 0, remaining: 13 },
    { type: LeaveType.SICK, total: 10, used: 2, pending: 0, remaining: 8 },
    { type: LeaveType.COMPASSIONATE, total: 5, used: 0, pending: 0, remaining: 5 },
    { type: LeaveType.MATERNITY, total: 0, used: 0, pending: 0, remaining: 0 }
  ],
};

// Mock Leaves
export const mockLeaves: Leave[] = [
  {
    id: '1',
    userId: '1',
    type: LeaveType.PTO,
    status: LeaveStatus.APPROVED,
    startDate: '2024-05-10',
    endDate: '2024-05-15',
    reason: 'Family vacation',
    appliedOn: '2024-04-20',
    approvedBy: '2',
    approvedOn: '2024-04-22'
  },
  {
    id: '2',
    userId: '1',
    type: LeaveType.PTO,
    status: LeaveStatus.PENDING,
    startDate: '2024-06-20',
    endDate: '2024-06-22',
    reason: 'Personal event',
    appliedOn: '2024-04-25'
  },
  {
    id: '3',
    userId: '4',
    type: LeaveType.SICK,
    status: LeaveStatus.APPROVED,
    startDate: '2024-05-05',
    endDate: '2024-05-06',
    reason: 'Fever',
    documentUrl: 'https://example.com/document1.pdf',
    appliedOn: '2024-05-04',
    approvedBy: '2',
    approvedOn: '2024-05-04'
  },
  {
    id: '4',
    userId: '5',
    type: LeaveType.PTO,
    status: LeaveStatus.REJECTED,
    startDate: '2024-05-01',
    endDate: '2024-05-10',
    reason: 'Extended vacation',
    appliedOn: '2024-04-15',
    approvedBy: '2',
    approvedOn: '2024-04-18',
    comments: 'Dates conflict with important project deadline.'
  },
  {
    id: '5',
    userId: '2',
    type: LeaveType.PTO,
    status: LeaveStatus.APPROVED,
    startDate: '2024-07-10',
    endDate: '2024-07-17',
    reason: 'Summer vacation',
    appliedOn: '2024-03-15',
    approvedBy: '3',
    approvedOn: '2024-03-18'
  },
  {
    id: '6',
    userId: '4',
    type: LeaveType.PTO,
    status: LeaveStatus.PENDING,
    startDate: '2024-06-05',
    endDate: '2024-06-10',
    reason: 'Family event',
    appliedOn: '2024-04-28'
  }
];

// Mock Holidays
export const mockHolidays: Holiday[] = [
  {
    id: '1',
    name: 'New Year',
    date: '2024-01-01',
    description: 'New Year\'s Day celebration'
  },
  {
    id: '2',
    name: 'Labor Day',
    date: '2024-05-01',
    description: 'International Workers\' Day'
  },
  {
    id: '3',
    name: 'Independence Day',
    date: '2024-07-04',
    description: 'Rwanda Independence Day'
  },
  {
    id: '4',
    name: 'Christmas',
    date: '2024-12-25',
    description: 'Christmas Day'
  },
  {
    id: '5',
    name: 'Boxing Day',
    date: '2024-12-26',
    description: 'Day after Christmas'
  }
];

// Mock Departments
export const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Engineering',
    managerId: '2'
  },
  {
    id: '2',
    name: 'Marketing',
    managerId: '4'
  },
  {
    id: '3',
    name: 'HR',
    managerId: '3'
  },
  {
    id: '4',
    name: 'Finance',
    managerId: '2'
  }
];

// Get current user - for demo purposes we'll use the first user
export const getCurrentUser = (): User => {
  return mockUsers[0];
};

export const getLeaveBalanceForUser = (userId: string): LeaveBalance[] => {
  return mockLeaveBalances[userId] || [];
};

export const getLeavesForUser = (userId: string): Leave[] => {
  return mockLeaves.filter(leave => leave.userId === userId);
};

export const getPendingLeavesForApproval = (managerId: string): Leave[] => {
  const departmentsManaged = mockDepartments.filter(dept => dept.managerId === managerId);
  const departmentIds = departmentsManaged.map(dept => dept.id);
  
  const usersInDepartments = mockUsers.filter(user => 
    departmentIds.includes(user.department)
  );
  
  const userIds = usersInDepartments.map(user => user.id);
  
  return mockLeaves.filter(leave => 
    userIds.includes(leave.userId) && leave.status === LeaveStatus.PENDING
  );
};

export const getColleaguesOnLeave = (): { user: User, leave: Leave }[] => {
  const today = new Date().toISOString().split('T')[0];
  
  const onLeave = mockLeaves.filter(leave => 
    leave.status === LeaveStatus.APPROVED &&
    leave.startDate <= today &&
    leave.endDate >= today
  );
  
  return onLeave.map(leave => {
    const user = mockUsers.find(user => user.id === leave.userId)!;
    return { user, leave };
  });
};