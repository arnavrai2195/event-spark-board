
import React from 'react';
import { ArrowLeft, Trophy, Medal, Award, TrendingUp, Search } from 'lucide-react';

interface AttendeeLeaderboardProps {
  currentUser: string;
  currentRank: number;
  onBack: () => void;
}

const AttendeeLeaderboard: React.FC<AttendeeLeaderboardProps> = ({ currentUser, currentRank, onBack }) => {
  const mockLeaderboard = [
    { rank: 1, name: 'K Balaji', company: 'Amrita Vishwa Vidya Peetham', points: 49200, change: '+2', avatar: 'K' },
    { rank: 2, name: 'Mayursinh Chavada', company: 'Mayurhirs Achievers', points: 48800, change: '+1', avatar: 'M' },
    { rank: 3, name: 'Hiral Chavada', company: 'Achievers Teachers Training', points: 46900, change: '-1', avatar: 'H' },
    { rank: 4, name: 'Alex Thompson', company: 'FutureTech', points: 1950, change: '0', avatar: 'A' },
    { rank: 5, name: 'Lisa Park', company: 'DevStudio', points: 1875, change: '+3', avatar: 'L' },
    { rank: 6, name: 'Michael Brown', company: 'CodeCraft', points: 1750, change: '-2', avatar: 'MB' },
    { rank: 7, name: 'Jennifer Lee', company: 'TechFlow', points: 1680, change: '+1', avatar: 'J' },
    { rank: 8, name: currentUser, company: 'TechCorp', points: 1560, change: '+4', isCurrentUser: true, avatar: 'JD' },
    { rank: 9, name: 'Amanda Davis', company: 'NextGen', points: 1420, change: '0', avatar: 'AD' },
    { rank: 10, name: 'James Miller', company: 'FutureDev', points: 1350, change: '-1', avatar: 'JM' },
  ];

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500';
    if (rank === 3) return 'bg-gradient-to-r from-amber-400 to-amber-600';
    return 'bg-gradient-to-r from-gray-400 to-gray-600';
  };

  const getChangeIcon = (change: string) => {
    if (change.startsWith('+')) return <TrendingUp className="w-3 h-3 text-green-500" />;
    if (change.startsWith('-')) return <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />;
    return <div className="w-3 h-3 bg-gray-300 rounded-full"></div>;
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-gray-900">Leaderboard</h2>
      </div>

      {/* Top 3 Podium */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex justify-center items-end space-x-4 mb-6">
          {/* 2nd Place */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center mb-2 relative">
              <span className="text-white font-bold text-lg">M</span>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">2</span>
              </div>
            </div>
            <p className="font-semibold text-sm">Mayursinh...</p>
            <p className="text-xs text-gray-500">48,800 pts</p>
          </div>

          {/* 1st Place */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-2 relative">
              <span className="text-white font-bold text-xl">K</span>
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">1</span>
              </div>
            </div>
            <p className="font-semibold text-sm">K Balaji</p>
            <p className="text-xs text-gray-500">49,200 pts</p>
          </div>

          {/* 3rd Place */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mb-2 relative">
              <span className="text-white font-bold text-lg">H</span>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">3</span>
              </div>
            </div>
            <p className="font-semibold text-sm">Hiral Chavada</p>
            <p className="text-xs text-gray-500">46,900 pts</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-4">
        <button className="flex-1 py-2 px-4 bg-red-100 text-red-600 rounded-lg font-medium text-sm">
          Today's Score
        </button>
        <button className="flex-1 py-2 px-4 bg-gray-100 text-gray-600 rounded-lg font-medium text-sm">
          Points Overview
        </button>
        <button className="flex-1 py-2 px-4 bg-gray-100 text-gray-600 rounded-lg font-medium text-sm">
          Rewards
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
        <input
          type="text"
          placeholder="Search Here"
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      {/* Full Leaderboard */}
      <div className="space-y-3">
        {mockLeaderboard.map((participant) => (
          <div 
            key={participant.rank} 
            className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between ${
              participant.isCurrentUser ? 'ring-2 ring-red-500 bg-red-50' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${getRankBadge(participant.rank)}`}>
                  {participant.rank}
                </div>
                {getChangeIcon(participant.change)}
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {participant.avatar}
                </span>
              </div>
              <div>
                <h4 className={`font-semibold text-sm ${participant.isCurrentUser ? 'text-red-900' : 'text-gray-900'}`}>
                  {participant.name} {participant.isCurrentUser && '(You)'}
                </h4>
                <p className="text-xs text-gray-500">{participant.company}</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-lg font-bold ${participant.isCurrentUser ? 'text-red-600' : 'text-gray-900'}`}>
                {participant.points.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">pts</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendeeLeaderboard;
