
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, Trophy, QrCode } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Event Manager Pro
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Modern event registration and leaderboard management platform for B2B events
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Admin Portal Card */}
          <Link to="/admin" className="group">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Portal</h2>
                <p className="text-gray-600 mb-6">
                  Manage users, create activities, generate QR codes, and monitor leaderboards
                </p>
                <div className="flex justify-center space-x-4 mb-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    Activities
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <QrCode className="w-4 h-4 mr-2" />
                    QR Codes
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Trophy className="w-4 h-4 mr-2" />
                    Analytics
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors group-hover:bg-blue-700">
                  Access Admin Panel
                </button>
              </div>
            </div>
          </Link>

          {/* Attendee Portal Card */}
          <Link to="/attendee" className="group">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <QrCode className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Attendee Portal</h2>
                <p className="text-gray-600 mb-6">
                  Scan QR codes, earn points, and track your position on the leaderboard
                </p>
                <div className="flex justify-center space-x-4 mb-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <QrCode className="w-4 h-4 mr-2" />
                    QR Scan
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Trophy className="w-4 h-4 mr-2" />
                    Points
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    Leaderboard
                  </div>
                </div>
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors group-hover:bg-green-700">
                  Enter as Attendee
                </button>
              </div>
            </div>
          </Link>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-500">
            Secure, modern, and fully responsive event management platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
