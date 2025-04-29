import React from 'react';
import Card from '../ui/Card';
import Avatar from '../ui/Avatar';
import { User, Leave } from '../../types';

interface ColleaguesOnLeaveCardProps {
  colleaguesOnLeave: { user: User; leave: Leave }[];
  className?: string;
}

const ColleaguesOnLeaveCard: React.FC<ColleaguesOnLeaveCardProps> = ({ 
  colleaguesOnLeave,
  className = ''
}) => {
  return (
    <Card 
      title="Team on Leave" 
      subtitle="Colleagues currently on leave"
      className={className}
    >
      {colleaguesOnLeave.length === 0 ? (
        <div className="py-4 text-center text-gray-500">
          <p>No colleagues are currently on leave</p>
        </div>
      ) : (
        <div className="space-y-4">
          {colleaguesOnLeave.map(({ user, leave }) => {
            const endDate = new Date(leave.endDate);
            const formattedEndDate = endDate.toLocaleDateString('default', {
              month: 'short',
              day: 'numeric',
            });
            
            return (
              <div key={user.id} className="flex items-center">
                <div className="relative group">
                  <Avatar src={user.profilePicture} alt={user.name} size="md" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full"></div>
                    <span className="text-white text-xs z-10">Until {formattedEndDate}</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.department}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default ColleaguesOnLeaveCard;