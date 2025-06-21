
import React, { useState } from 'react';
import { Users, Calendar, Trophy, BarChart3, Upload, QrCode, Download } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import UsersTab from '../components/UsersTab';
import ActivitiesTab from '../components/ActivitiesTab';
import LeaderboardTab from '../components/LeaderboardTab';
import DashboardOverview from '../components/DashboardOverview';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'users':
        return <UsersTab />;
      case 'activities':
        return <ActivitiesTab />;
      case 'leaderboard':
        return <LeaderboardTab />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 lg:ml-64">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'users' && 'User Management'}
              {activeTab === 'activities' && 'Activity Management'}
              {activeTab === 'leaderboard' && 'Leaderboard'}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Admin Panel</span>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">A</span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
