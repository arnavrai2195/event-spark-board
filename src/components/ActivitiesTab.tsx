
import React, { useState } from 'react';
import { Plus, QrCode, Edit2, Trash2, Calendar } from 'lucide-react';

const ActivitiesTab = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newActivity, setNewActivity] = useState({
    name: '',
    type: 'booth',
    points: 50,
    description: ''
  });

  const mockActivities = [
    { id: 1, name: 'Welcome Booth Visit', type: 'booth', points: 50, description: 'Visit the welcome booth and get event information', qrCode: 'QR001' },
    { id: 2, name: 'Tech Talk Attendance', type: 'session', points: 100, description: 'Attend the main tech presentation', qrCode: 'QR002' },
    { id: 3, name: 'Networking Lunch', type: 'networking', points: 75, description: 'Join the networking lunch session', qrCode: 'QR003' },
    { id: 4, name: 'Product Demo', type: 'demo', points: 80, description: 'Watch the live product demonstration', qrCode: 'QR004' },
    { id: 5, name: 'Feedback Survey', type: 'survey', points: 25, description: 'Complete the event feedback form', qrCode: 'QR005' },
  ];

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating activity:', newActivity);
    setShowCreateForm(false);
    setNewActivity({ name: '', type: 'booth', points: 50, description: '' });
  };

  const getTypeColor = (type: string) => {
    const colors = {
      booth: 'bg-blue-100 text-blue-800',
      session: 'bg-green-100 text-green-800',
      networking: 'bg-purple-100 text-purple-800',
      demo: 'bg-orange-100 text-orange-800',
      survey: 'bg-gray-100 text-gray-800',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Activity Management</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Activity
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Activity</h3>
          <form onSubmit={handleCreateActivity} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Name
                </label>
                <input
                  type="text"
                  value={newActivity.name}
                  onChange={(e) => setNewActivity({...newActivity, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter activity name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Type
                </label>
                <select
                  value={newActivity.type}
                  onChange={(e) => setNewActivity({...newActivity, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="booth">Booth Visit</option>
                  <option value="session">Session/Talk</option>
                  <option value="networking">Networking</option>
                  <option value="demo">Product Demo</option>
                  <option value="survey">Survey/Feedback</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Point Value
              </label>
              <input
                type="number"
                value={newActivity.points}
                onChange={(e) => setNewActivity({...newActivity, points: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                max="500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={newActivity.description}
                onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Brief description of the activity"
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Activity
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{activity.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(activity.type)}`}>
                    {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                  </span>
                </div>
                <div className="flex space-x-1">
                  <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-bold text-blue-600">{activity.points} pts</span>
                  <span className="text-sm text-gray-500">Code: {activity.qrCode}</span>
                </div>
                <button className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <QrCode className="w-4 h-4 mr-1" />
                  <span className="text-sm">QR</span>
                </button>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="w-16 h-16 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mx-auto">
                  <QrCode className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 text-center mt-1">Sample QR Code</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesTab;
