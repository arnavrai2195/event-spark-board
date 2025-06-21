
import React, { useState, useRef, useEffect } from 'react';
import { Camera, ArrowLeft, RotateCcw, Zap, Info } from 'lucide-react';

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
    <div className="pb-20">
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-gray-900">QR Scanner</h2>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div className="relative mb-6">
            {isScanning ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  className="w-full h-80 bg-gray-900 rounded-xl object-cover"
                  playsInline
                  muted
                />
                
                {/* QR Code Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-56 h-56 border-2 border-white rounded-xl relative">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-red-500 rounded-tl-xl"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-red-500 rounded-tr-xl"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-red-500 rounded-bl-xl"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-red-500 rounded-br-xl"></div>
                  </div>
                </div>

                {/* Instructions overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 rounded-xl p-3">
                  <p className="text-white text-center text-sm">Point camera at QR code</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-8 h-8 text-red-600" />
                  </div>
                  <p className="text-gray-600 font-medium">Ready to scan QR codes</p>
                  <p className="text-gray-500 text-sm">Camera preview will appear here</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center space-x-3">
            {!isScanning ? (
              <button
                onClick={startCamera}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:from-red-600 hover:to-orange-600 transition-all shadow-lg"
              >
                <Camera className="w-5 h-5 mr-2" />
                Start Scanning
              </button>
            ) : (
              <>
                <button
                  onClick={simulateScan}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Demo Scan
                </button>
                <button
                  onClick={stopCamera}
                  className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Stop
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Instructions Card */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">How to scan:</h4>
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
