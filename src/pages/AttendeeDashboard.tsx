
import React, { useState } from 'react';
import { QrCode, Trophy, User, Camera, CheckCircle, AlertCircle } from 'lucide-react';
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
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xl">
                    {userName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Welcome, {userName}!</h2>
                  <p className="text-gray-600">{userCompany}</p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Points</p>
                    <p className="text-3xl font-bold">{userPoints.toLocaleString()}</p>
                  </div>
                  <Trophy className="w-12 h-12 text-blue-200" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Current Rank</p>
                    <p className="text-3xl font-bold">#{userRank}</p>
                  </div>
                  <User className="w-12 h-12 text-green-200" />
                </div>
              </div>
            </div>

            {/* Scan Result Alert */}
            {scanResult && (
              <div className={`rounded-lg p-4 flex items-center space-x-3 ${
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

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setActiveView('scan')}
                className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-500 hover:bg-blue-50 transition-all text-center group"
              >
                <QrCode className="w-12 h-12 text-gray-400 group-hover:text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Scan QR Code</h3>
                <p className="text-gray-600">Scan activity QR codes to earn points</p>
              </button>

              <button
                onClick={() => setActiveView('leaderboard')}
                className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-green-500 hover:bg-green-50 transition-all text-center group"
              >
                <Trophy className="w-12 h-12 text-gray-400 group-hover:text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">View Leaderboard</h3>
                <p className="text-gray-600">See your ranking and competitors</p>
              </button>
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
      
      {/* Mobile Navigation */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveView('home')}
            className={`flex-1 py-2 px-4 rounded-lg text-center font-medium transition-colors ${
              activeView === 'home' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveView('scan')}
            className={`flex-1 py-2 px-4 rounded-lg text-center font-medium transition-colors ${
              activeView === 'scan' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Scan
          </button>
          <button
            onClick={() => setActiveView('leaderboard')}
            className={`flex-1 py-2 px-4 rounded-lg text-center font-medium transition-colors ${
              activeView === 'leaderboard' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Leaderboard
          </button>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default AttendeeDashboard;
