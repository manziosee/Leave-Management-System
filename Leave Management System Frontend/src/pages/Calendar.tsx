import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLeave } from '../context/LeaveContext';
import { mockUsers, mockLeaves, mockHolidays } from '../utils/mockData';
import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';

type CalendarEvent = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  type: 'holiday' | 'leave';
  userId?: string;
};

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  
  // Create events from holidays and leaves
  const events: CalendarEvent[] = [
    ...mockHolidays.map(holiday => ({
      id: `holiday-${holiday.id}`,
      title: holiday.name,
      startDate: new Date(holiday.date),
      endDate: new Date(holiday.date),
      type: 'holiday' as const,
    })),
    ...mockLeaves
      .filter(leave => leave.status === 'Approved')
      .map(leave => ({
        id: `leave-${leave.id}`,
        title: leave.type,
        startDate: new Date(leave.startDate),
        endDate: new Date(leave.endDate),
        type: 'leave' as const,
        userId: leave.userId,
      })),
  ];
  
  // Filter events by department if needed
  const filteredEvents = events.filter(event => {
    if (selectedDepartment === 'all') return true;
    if (event.type === 'holiday') return true;
    if (!event.userId) return false;
    
    const user = mockUsers.find(u => u.id === event.userId);
    return user?.department === selectedDepartment;
  });
  
  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Generate days for the calendar
  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    
    // Determine the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDayOfMonth.getDay();
    
    // Calculate days from previous month to display
    const prevMonthDays = firstDayOfWeek;
    
    // Calculate days from next month to display (to fill a 6-row calendar)
    const totalCells = 42; // 6 rows x 7 days
    const nextMonthDays = totalCells - daysInMonth - prevMonthDays;
    
    // Get days from previous month
    const prevMonth = new Date(currentYear, currentMonth, 0);
    const prevMonthLastDay = prevMonth.getDate();
    
    const days = [];
    
    // Add days from previous month
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      const date = new Date(currentYear, currentMonth - 1, day);
      days.push({
        date,
        currentMonth: false,
        events: getEventsForDay(date),
      });
    }
    
    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      days.push({
        date,
        currentMonth: true,
        events: getEventsForDay(date),
      });
    }
    
    // Add days from next month
    for (let i = 1; i <= nextMonthDays; i++) {
      const date = new Date(currentYear, currentMonth + 1, i);
      days.push({
        date,
        currentMonth: false,
        events: getEventsForDay(date),
      });
    }
    
    return days;
  };
  
  // Get events for a specific day
  const getEventsForDay = (date: Date) => {
    return filteredEvents.filter(event => {
      const startDate = new Date(event.startDate);
      startDate.setHours(0, 0, 0, 0);
      
      const endDate = new Date(event.endDate);
      endDate.setHours(23, 59, 59, 999);
      
      const checkDate = new Date(date);
      checkDate.setHours(0, 0, 0, 0);
      
      return checkDate >= startDate && checkDate <= endDate;
    });
  };
  
  // Handler for navigating to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };
  
  // Handler for navigating to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };
  
  // Handler for navigating to current month
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  // Format month and year
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('default', { month: 'long', year: 'numeric' });
  };
  
  // Departments for filter
  const departments = [
    { id: 'all', name: 'All Departments' },
    ...mockUsers
      .map(user => user.department)
      .filter((value, index, self) => self.indexOf(value) === index)
      .map(dept => ({ id: dept, name: dept })),
  ];
  
  // Generate array of days of the week
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Get user info for leave events
  const getUserForLeave = (userId: string) => {
    return mockUsers.find(user => user.id === userId);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900">Team Calendar</h1>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <select
            className="block rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
          
          <Button onClick={goToToday} variant="outline" size="sm">
            Today
          </Button>
        </div>
      </div>
      
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {formatMonthYear(currentDate)}
          </h2>
          
          <div className="flex space-x-2">
            <button
              onClick={prevMonth}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden shadow">
          {/* Calendar header (day names) */}
          {daysOfWeek.map((day, index) => (
            <div 
              key={index} 
              className="bg-gray-50 text-center py-2 font-medium text-gray-500 text-sm"
            >
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {generateCalendarDays().map((day, index) => {
            const isToday = day.date.toDateString() === new Date().toDateString();
            
            return (
              <div 
                key={index}
                className={`
                  min-h-24 bg-white p-1 relative
                  ${!day.currentMonth ? 'text-gray-400' : 'text-gray-900'}
                  ${isToday ? 'bg-teal-50' : ''}
                `}
              >
                <div className="flex justify-between items-start">
                  <span className={`
                    text-sm p-1 rounded-full w-7 h-7 flex items-center justify-center
                    ${isToday ? 'bg-teal-600 text-white' : ''}
                  `}>
                    {day.date.getDate()}
                  </span>
                </div>
                
                <div className="mt-1 space-y-1 max-h-20 overflow-y-auto">
                  {day.events
                    .filter(event => event.type === 'holiday')
                    .map(event => (
                      <div
                        key={event.id}
                        className="text-xs p-1 rounded bg-amber-100 text-amber-800 truncate"
                      >
                        {event.title}
                      </div>
                    ))}
                  
                  {day.events
                    .filter(event => event.type === 'leave')
                    .map(event => {
                      const user = event.userId ? getUserForLeave(event.userId) : null;
                      
                      return (
                        <div
                          key={event.id}
                          className="text-xs p-1 rounded bg-teal-100 text-teal-800 flex items-center"
                        >
                          {user && (
                            <Avatar
                              src={user.profilePicture}
                              alt={user.name}
                              size="xs"
                              className="mr-1"
                            />
                          )}
                          <span className="truncate">{user?.name || 'Unknown'}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 flex space-x-4">
          <div className="flex items-center">
            <span className="h-3 w-3 rounded bg-teal-100 mr-1"></span>
            <span className="text-sm text-gray-600">Leave</span>
          </div>
          <div className="flex items-center">
            <span className="h-3 w-3 rounded bg-amber-100 mr-1"></span>
            <span className="text-sm text-gray-600">Holiday</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Calendar;