
import React, { useState } from 'react';
import { Download, Filter, Trophy, Medal, Award } from 'lucide-react';

const LeaderboardTab = () => {
  const [sortBy, setSortBy] = useState('points');
  const [filterBy, setFilterBy] = useState('all');

  const mockLeaderboard = [
    { rank: 1, name: 'Sarah Wilson', company: 'TechCorp', points: 2450, activities: 12, lastActivity: '2 mins ago' },
    { rank: 2, name: 'David Chen', company: 'InnovateLab', points: 2320, activities: 11, lastActivity: '8 mins ago' },
    { rank: 3, name: 'Emily Rodriguez', company: 'StartupHub', points: 2180, activities: 10, lastActivity: '15 mins ago' },
    { rank: 4, name: 'Alex Thompson', company: 'FutureTech', points: 1950, activities: 9, lastActivity: '22 mins ago' },
    { rank: 5, name: 'Lisa Park', company: 'DevStudio', points: 1875, activities: 8, lastActivity: '35 mins ago' },
    { rank: 6, name: 'Michael Brown', company: 'CodeCraft', points: 1750, activities: 8, lastActivity: '1 hour ago' },
    { rank: 7, name: 'Jennifer Lee', company: 'TechFlow', points: 1680, activities: 7, lastActivity: '1 hour ago' },
    { rank: 8, name: 'Robert Kim', company: 'InnoSoft', points: 1560, activities: 7, lastActivity: '2 hours ago' },
    { rank: 9, name: 'Amanda Davis', company: 'NextGen', points: 1420, activities: 6, lastActivity: '2 hours ago' },
    { rank: 10, name: 'James Miller', company: 'FutureDev', points: 1350, activities: 6, lastActivity: '3 hours ago' },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />;
    return <span className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold">{rank}</span>;
  };

  const getRankBadge = (rank: number) => {
    if (rank <= 3) return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white';
    if (rank <= 10) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="points">Sort by Points</option>
            <option value="activities">Sort by Activities</option>
            <option value="recent">Sort by Recent Activity</option>
          </select>
          
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Participants</option>
            <option value="top10">Top 10</option>
            <option value="active">Active Today</option>
          </select>
        </div>

        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Download className="w-4 h-4 mr-2" />
          Export Leaderboard
        </button>
      </div>

      {/* Top 3 Podium */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">🏆 Top Performers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockLeaderboard.slice(0, 3).map((participant, index) => (
            <div key={participant.rank} className={`text-center p-6 rounded-xl ${index === 0 ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200' : 'bg-gray-50'}`}>
              <div className="flex justify-center mb-3">
                {getRankIcon(participant.rank)}
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold text-lg">
                  {participant.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h4 className="font-semibold text-gray-900">{participant.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{participant.company}</p>
              <div className="text-2xl font-bold text-blue-600 mb-1">{participant.points}</div>
              <p className="text-sm text-gray-500">points</p>
            </div>
          ))}
        </div>
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rank</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Participant</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Company</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Points</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Activities</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockLeaderboard.map((participant) => (
                <tr key={participant.rank} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getRankIcon(participant.rank)}
                      <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${getRankBadge(participant.rank)}`}>
                        #{participant.rank}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-semibold text-sm">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">{participant.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{participant.company}</td>
                  <td className="px-6 py-4">
                    <span className="text-lg font-bold text-blue-600">{participant.points}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {participant.activities} completed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{participant.lastActivity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        Leaderboard updates in real-time • Last updated: Just now
      </div>
    </div>
  );
};

export default LeaderboardTab;
