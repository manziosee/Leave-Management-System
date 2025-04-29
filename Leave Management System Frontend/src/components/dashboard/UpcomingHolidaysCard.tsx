import React from 'react';
import Card from '../ui/Card';
import { Holiday } from '../../types';
import { Calendar } from 'lucide-react';

interface UpcomingHolidaysCardProps {
  holidays: Holiday[];
  className?: string;
}

const UpcomingHolidaysCard: React.FC<UpcomingHolidaysCardProps> = ({ 
  holidays,
  className = ''
}) => {
  // Sort holidays by date, starting with the closest upcoming ones
  const sortedHolidays = [...holidays].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  // Only show upcoming holidays and limit to 5
  const upcomingHolidays = sortedHolidays
    .filter(holiday => new Date(holiday.date) >= new Date())
    .slice(0, 5);

  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('default', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  // Calculate days remaining
  const getDaysRemaining = (dateString: string): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const holidayDate = new Date(dateString);
    holidayDate.setHours(0, 0, 0, 0);
    
    const diffTime = holidayDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  return (
    <Card 
      title="Upcoming Holidays" 
      subtitle="Public holidays in the next few months"
      className={className}
    >
      {upcomingHolidays.length === 0 ? (
        <div className="py-4 text-center text-gray-500">
          <p>No upcoming holidays found</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {upcomingHolidays.map((holiday) => {
            const daysRemaining = getDaysRemaining(holiday.date);
            let badgeClass = 'text-xs px-2 py-1 rounded-full';
            
            if (daysRemaining === 0) {
              badgeClass += ' bg-green-100 text-green-800';
            } else if (daysRemaining <= 7) {
              badgeClass += ' bg-amber-100 text-amber-800';
            } else {
              badgeClass += ' bg-gray-100 text-gray-800';
            }
            
            return (
              <div key={holiday.id} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{holiday.name}</h4>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar size={16} className="mr-1" />
                      <span>{formatDate(holiday.date)}</span>
                    </div>
                  </div>
                  
                  <span className={badgeClass}>
                    {daysRemaining === 0
                      ? 'Today'
                      : daysRemaining === 1
                      ? 'Tomorrow'
                      : `${daysRemaining} days`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default UpcomingHolidaysCard;