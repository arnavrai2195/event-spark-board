
import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Trophy, Home } from 'lucide-react';

interface AttendeeHeaderProps {
  userName: string;
  userPoints: number;
}

const AttendeeHeader: React.FC<AttendeeHeaderProps> = ({ userName, userPoints }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">Event Manager</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
            <Trophy className="w-4 h-4 text-blue-600" />
            <span className="text-blue-600 font-semibold">{userPoints.toLocaleString()} pts</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500">Attendee</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-semibold text-sm">
                {userName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>

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
