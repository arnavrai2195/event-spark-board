
import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Trophy, Bell } from 'lucide-react';

interface AttendeeHeaderProps {
  userName: string;
  userPoints: number;
}

const AttendeeHeader: React.FC<AttendeeHeaderProps> = ({ userName, userPoints }) => {
  return (
    <header className="bg-white px-4 py-4 sticky top-0 z-40 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {userName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500">Attendee</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-2 rounded-full">
            <Trophy className="w-4 h-4 text-white" />
            <span className="text-white font-semibold text-sm">{userPoints.toLocaleString()}</span>
          </div>
          
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>

          <Link
            to="/"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AttendeeHeader;
