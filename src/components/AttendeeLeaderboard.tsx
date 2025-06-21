
import React from 'react';
import { ArrowLeft, Trophy, Medal, Award, TrendingUp } from 'lucide-react';

interface AttendeeLeaderboardProps {
  currentUser: string;
  currentRank: number;
  onBack: () => void;
}

const AttendeeLeaderboard: React.FC<AttendeeLeaderboardProps> = ({ currentUser, currentRank, onBack }) => {
  const mockLeaderboard = [
    { rank: 1, name: 'Sarah Wilson', company: 'TechCorp', points: 2450, change: '+2' },
    { rank: 2, name: 'David Chen', company: 'InnovateLab', points: 2320, change: '+1' },
    { rank: 3, name: 'Emily Rodriguez', company: 'StartupHub', points: 2180, change: '-1' },
    { rank: 4, name: 'Alex Thompson', company: 'FutureTech', points: 1950, change: '0' },
    { rank: 5, name: 'Lisa Park', company: 'DevStudio', points: 1875, change: '+3' },
    { rank: 6, name: 'Michael Brown', company: 'CodeCraft', points: 1750, change: '-2' },
    { rank: 7, name: 'Jennifer Lee', company: 'TechFlow', points: 1680, change: '+1' },
    { rank: 8, name: currentUser, company: 'TechCorp', points: 1560, change: '+4', isCurrentUser: true },
    { rank: 9, name: 'Amanda Davis', company: 'NextGen', points: 1420, change: '0' },
    { rank: 10, name: 'James Miller', company: 'FutureDev', points: 1350, change: '-1' },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
    return <span className="w-5 h-5 flex items-center justify-center text-gray-600 font-bold text-sm">{rank}</span>;
  };

  const getChangeIcon = (change: string) => {
    if (change.startsWith('+')) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change.startsWith('-')) return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
    return <div className="w-4 h-4 bg-gray-300 rounded-full"></div>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Leaderboard</h2>
      </div>

      {/* Current User Position */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {getRankIcon(currentRank)}
            <div>
              <h3 className="text-lg font-semibold">Your Position</h3>
              <p className="text-blue-100">Keep scanning to climb higher!</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">#{currentRank}</div>
            <div className="text-blue-100 text-sm">of 50+ participants</div>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">🏆 Top 3</h3>
        <div className="grid grid-cols-3 gap-4">
          {mockLeaderboard.slice(0, 3).map((participant, index) => (
            <div key={participant.rank} className={`text-center p-4 rounded-lg ${index === 0 ? 'bg-gradient-to-br from-yellow-50 to-yellow-100' : 'bg-gray-50'}`}>
              <div className="flex justify-center mb-2">
                {getRankIcon(participant.rank)}
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-semibold text-sm">
                  {participant.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h4 className="font-semibold text-gray-900 text-sm">{participant.name}</h4>
              <p className="text-xs text-gray-600 mb-1">{participant.company}</p>
              <div className="text-lg font-bold text-blue-600">{participant.points}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Participants</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {mockLeaderboard.map((participant) => (
            <div 
              key={participant.rank} 
              className={`px-6 py-4 flex items-center justify-between ${
                participant.isCurrentUser ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {getRankIcon(participant.rank)}
                  {getChangeIcon(participant.change)}
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">
                    {participant.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className={`font-medium ${participant.isCurrentUser ? 'text-blue-900' : 'text-gray-900'}`}>
                    {participant.name} {participant.isCurrentUser && '(You)'}
                  </h4>
                  <p className="text-sm text-gray-600">{participant.company}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${participant.isCurrentUser ? 'text-blue-600' : 'text-gray-900'}`}>
                  {participant.points}
                </div>
                <div className="text-xs text-gray-500">points</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        Leaderboard updates every minute • Last updated: Just now
      </div>
    </div>
  );
};

export default AttendeeLeaderboard;
