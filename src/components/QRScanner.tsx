
import React, { useState, useRef, useEffect } from 'react';
import { Camera, ArrowLeft, RotateCcw, Zap } from 'lucide-react';

interface QRScannerProps {
  onScanSuccess: (qrData: string) => void;
  onBack: () => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onBack }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup camera stream on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      setError(null);
      setIsScanning(true);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      setError('Unable to access camera. Please ensure camera permissions are granted.');
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  // Simulate QR code detection (in real app, would use a QR code library)
  const simulateScan = () => {
    const mockQRData = `ACTIVITY_${Math.floor(Math.random() * 5) + 1}`;
    onScanSuccess(mockQRData);
    stopCamera();
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
        <h2 className="text-2xl font-bold text-gray-900">QR Code Scanner</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="text-center mb-6">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {isScanning ? 'Point camera at QR code' : 'Ready to scan QR codes'}
            </h3>
            <p className="text-gray-600">
              {isScanning 
                ? 'Hold your device steady and ensure the QR code is clearly visible'
                : 'Start your camera to scan activity QR codes and earn points'
              }
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div className="relative">
            {isScanning ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  className="w-full h-64 bg-gray-900 rounded-lg object-cover"
                  playsInline
                  muted
                />
                
                {/* QR Code Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-white rounded-lg relative">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-green-500 rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-green-500 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-green-500 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-green-500 rounded-br-lg"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Camera preview will appear here</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center space-x-4 mt-6">
            {!isScanning ? (
              <button
                onClick={startCamera}
                className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Camera className="w-5 h-5 mr-2" />
                Start Scanning
              </button>
            ) : (
              <>
                <button
                  onClick={simulateScan}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Demo Scan
                </button>
                <button
                  onClick={stopCamera}
                  className="flex items-center px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Stop Camera
                </button>
              </>
            )}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Instructions:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Point your camera at the QR code</li>
              <li>• Ensure good lighting for best results</li>
              <li>• Hold steady until the code is recognized</li>
              <li>• Each QR code can only be scanned once</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
