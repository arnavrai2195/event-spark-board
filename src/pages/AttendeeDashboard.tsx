
import React, { useState } from 'react';
import { QrCode, Trophy, User, Camera, CheckCircle, AlertCircle, Calendar, Users, Gift } from 'lucide-react';
import AttendeeHeader from '../components/AttendeeHeader';
import QRScanner from '../components/QRScanner';
import AttendeeLeaderboard from '../components/AttendeeLeaderboard';

const AttendeeDashboard = () => {
  const [activeView, setActiveView] = useState('home');
  const [userPoints, setUserPoints] = useState(1250);
  const [userRank, setUserRank] = useState(8);
  const [scanResult, setScanResult] = useState<{type: 'success' | 'error' | 'duplicate', message: string, points?: number} | null>(null);

  const userName = "John Doe";
  const userCompany = "TechCorp";

  const handleScanSuccess = (qrData: string) => {
    // Simulate different scan scenarios
    const scenarios = [
      { type: 'success' as const, message: 'QR Code scanned successfully!', points: 50 },
      { type: 'duplicate' as const, message: 'You have already scanned this QR code.' },
      { type: 'error' as const, message: 'Invalid QR code. Please try again.' }
    ];
    
    const result = scenarios[Math.floor(Math.random() * scenarios.length)];
    setScanResult(result);
    
    if (result.type === 'success' && result.points) {
      setUserPoints(prev => prev + result.points);
    }
    
    setTimeout(() => setScanResult(null), 4000);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return (
          <div className="space-y-4 pb-20">
            {/* Event Header */}
            <div className="bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-2xl p-6 text-white mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">Annual Education Summit 2025</h2>
                  <p className="text-orange-100">20 June 2025</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* User Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <Trophy className="w-8 h-8 text-blue-200" />
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Total</span>
                </div>
                <p className="text-2xl font-bold">{userPoints.toLocaleString()}</p>
                <p className="text-blue-100 text-sm">Points</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-8 h-8 text-green-200" />
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Rank</span>
                </div>
                <p className="text-2xl font-bold">#{userRank}</p>
                <p className="text-green-100 text-sm">Position</p>
              </div>
            </div>

            {/* Scan Result Alert */}
            {scanResult && (
              <div className={`rounded-xl p-4 flex items-center space-x-3 mb-4 ${
                scanResult.type === 'success' ? 'bg-green-50 border border-green-200' :
                scanResult.type === 'duplicate' ? 'bg-yellow-50 border border-yellow-200' :
                'bg-red-50 border border-red-200'
              }`}>
                {scanResult.type === 'success' && <CheckCircle className="w-6 h-6 text-green-600" />}
                {scanResult.type !== 'success' && <AlertCircle className="w-6 h-6 text-yellow-600" />}
                <div>
                  <p className={`font-medium ${
                    scanResult.type === 'success' ? 'text-green-800' :
                    scanResult.type === 'duplicate' ? 'text-yellow-800' :
                    'text-red-800'
                  }`}>
                    {scanResult.message}
                  </p>
                  {scanResult.points && (
                    <p className="text-green-700 text-sm">+{scanResult.points} points earned!</p>
                  )}
                </div>
              </div>
            )}

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setActiveView('scan')}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                  <QrCode className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Scan QR</h3>
                <p className="text-sm text-gray-600">Earn points by scanning</p>
              </button>

              <button
                onClick={() => setActiveView('leaderboard')}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-yellow-200 transition-colors">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Leaderboard</h3>
                <p className="text-sm text-gray-600">Check your ranking</p>
              </button>
            </div>

            {/* Additional Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Networking</h3>
                <p className="text-sm text-gray-600">Connect with attendees</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Gift className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Rewards</h3>
                <p className="text-sm text-gray-600">View prize details</p>
              </div>
            </div>
          </div>
        );
      
      case 'scan':
        return <QRScanner onScanSuccess={handleScanSuccess} onBack={() => setActiveView('home')} />;
      
      case 'leaderboard':
        return <AttendeeLeaderboard currentUser={userName} currentRank={userRank} onBack={() => setActiveView('home')} />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AttendeeHeader userName={userName} userPoints={userPoints} />
      
      <main className="px-4 py-6">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
        <div className="flex justify-around items-center">
          <button
            onClick={() => setActiveView('home')}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
              activeView === 'home' ? 'text-red-600 bg-red-50' : 'text-gray-600'
            }`}
          >
            <User className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Home</span>
          </button>
          
          <button
            onClick={() => setActiveView('scan')}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
              activeView === 'scan' ? 'text-red-600 bg-red-50' : 'text-gray-600'
            }`}
          >
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-1 shadow-lg">
              <QrCode className="w-6 h-6 text-white" />
            </div>
          </button>
          
          <button
            onClick={() => setActiveView('leaderboard')}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
              activeView === 'leaderboard' ? 'text-red-600 bg-red-50' : 'text-gray-600'
            }`}
          >
            <Trophy className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Ranking</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendeeDashboard;
