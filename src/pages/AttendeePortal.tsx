
import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor } from 'lucide-react';
import AttendeeLogin from './AttendeeLogin';
import AttendeeDashboard from './AttendeeDashboard';

const AttendeePortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];
      const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword));
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Show mobile restriction message for desktop users
  if (!isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Smartphone className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Mobile Only Access</h1>
            <p className="text-gray-600 mb-6">
              The attendee portal is designed exclusively for mobile devices. Please access this page from your smartphone or tablet.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-6">
              <Monitor className="w-4 h-4" />
              <span>Desktop detected - Access denied</span>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>For Admin Access:</strong> Visit the admin portal from any device
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mobile view - show login or dashboard
  return (
    <div className="min-h-screen">
      {isLoggedIn ? (
        <AttendeeDashboard />
      ) : (
        <AttendeeLogin onLogin={handleLogin} />
      )}
    </div>
  );
};

export default AttendeePortal;
