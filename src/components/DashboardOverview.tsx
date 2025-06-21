
import React from 'react';
import { Users, Calendar, Trophy, TrendingUp } from 'lucide-react';

const DashboardOverview = () => {
  const stats = [
    { label: 'Total Users', value: '1,234', icon: Users, color: 'blue' },
    { label: 'Active Activities', value: '12', icon: Calendar, color: 'green' },
    { label: 'Total Points Awarded', value: '45,678', icon: Trophy, color: 'yellow' },
    { label: 'Participation Rate', value: '89%', icon: TrendingUp, color: 'purple' },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      purple: 'bg-purple-100 text-purple-600',
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(stat.color)}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { user: 'John Doe', action: 'Scanned QR Code', activity: 'Welcome Booth', points: '+50', time: '2 mins ago' },
              { user: 'Jane Smith', action: 'Completed Survey', activity: 'Feedback Form', points: '+25', time: '5 mins ago' },
              { user: 'Mike Johnson', action: 'Attended Session', activity: 'Tech Talk', points: '+100', time: '12 mins ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action} - {activity.activity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{activity.points}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
          <div className="space-y-4">
            {[
              { rank: 1, name: 'Sarah Wilson', company: 'TechCorp', points: 2450, badge: '🥇' },
              { rank: 2, name: 'David Chen', company: 'InnovateLab', points: 2320, badge: '🥈' },
              { rank: 3, name: 'Emily Rodriguez', company: 'StartupHub', points: 2180, badge: '🥉' },
              { rank: 4, name: 'Alex Thompson', company: 'FutureTech', points: 1950, badge: '4' },
              { rank: 5, name: 'Lisa Park', company: 'DevStudio', points: 1875, badge: '5' },
            ].map((performer) => (
              <div key={performer.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{performer.badge}</span>
                  <div>
                    <p className="font-medium text-gray-900">{performer.name}</p>
                    <p className="text-sm text-gray-600">{performer.company}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600">{performer.points}</p>
                  <p className="text-xs text-gray-500">points</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
