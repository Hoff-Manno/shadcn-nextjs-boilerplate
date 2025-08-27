'use client';

import { useEffect, useState } from 'react';
import { ComputerVisionDetection, Sponsor } from '@/types/sponsorship';
import { HiOutlinePlay, HiOutlinePause, HiOutlineEye } from 'react-icons/hi2';

interface CVDetectionOverlayProps {
  detections: ComputerVisionDetection[];
  sponsors: Sponsor[];
  isLive?: boolean;
}

interface ActiveDetection extends ComputerVisionDetection {
  sponsor: Sponsor;
}

export const CVDetectionOverlay = ({ 
  detections, 
  sponsors, 
  isLive = false 
}: CVDetectionOverlayProps) => {
  const [isPlaying, setIsPlaying] = useState(isLive);
  const [currentDetections, setCurrentDetections] = useState<ActiveDetection[]>([]);
  const [videoTime, setVideoTime] = useState(0);

  // Simulate video playback and detection updates
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setVideoTime(prev => prev + 1);
      
      // Simulate new detections every few seconds
      if (Math.random() > 0.7) {
        const randomDetections = detections
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 3) + 1)
          .map(detection => ({
            ...detection,
            sponsor: sponsors.find(s => s.id === detection.sponsorId)!,
            // Randomize position for simulation
            boundingBox: {
              x: Math.random() * 70 + 10,
              y: Math.random() * 70 + 10,
              width: Math.random() * 15 + 10,
              height: Math.random() * 10 + 8
            }
          }))
          .filter(d => d.sponsor);

        setCurrentDetections(randomDetections);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying, detections, sponsors]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-lg">
      {/* Mock Video Background */}
      <div className="relative w-full h-64 md:h-80 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center">
        {/* Simulated race car */}
        <div className="relative">
          <div className="w-32 h-16 bg-red-600 rounded-lg transform rotate-12 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-500 rounded-lg" />
            <div className="absolute top-2 left-2 w-6 h-3 bg-white rounded text-xs flex items-center justify-center text-black font-bold">
              23
            </div>
          </div>
          
          {/* Track environment indicators */}
          <div className="absolute -bottom-4 -left-8 w-48 h-2 bg-gray-600 rounded opacity-50" />
          <div className="absolute -bottom-6 -left-12 w-56 h-1 bg-gray-700 rounded opacity-30" />
        </div>

        {/* Detection Overlays */}
        {currentDetections.map((detection, index) => (
          <div
            key={`${detection.id}-${index}`}
            className="absolute border-2 border-green-400 bg-green-400 bg-opacity-10 animate-pulse"
            style={{
              left: `${detection.boundingBox.x}%`,
              top: `${detection.boundingBox.y}%`,
              width: `${detection.boundingBox.width}%`,
              height: `${detection.boundingBox.height}%`
            }}
          >
            <div className="absolute -top-8 left-0 bg-green-400 text-black text-xs px-2 py-1 rounded whitespace-nowrap font-semibold">
              {detection.sponsor.name} ({Math.round(detection.confidence * 100)}%)
            </div>
          </div>
        ))}

        {/* Live indicator */}
        {isLive && (
          <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span>LIVE</span>
          </div>
        )}

        {/* Camera info */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm">
          Main Camera • 1080p
        </div>

        {/* Detection count */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded">
          <HiOutlineEye className="h-4 w-4" />
          <span className="text-sm">{currentDetections.length} active</span>
        </div>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-all duration-200"
            >
              {isPlaying ? (
                <HiOutlinePause className="h-5 w-5 text-white" />
              ) : (
                <HiOutlinePlay className="h-5 w-5 text-white ml-1" />
              )}
            </button>
            <div className="text-white text-sm">
              {formatTime(videoTime)}
            </div>
          </div>

          {/* Detection Status */}
          <div className="flex items-center space-x-4">
            <div className="text-white text-sm">
              Detecting: {currentDetections.length > 0 ? currentDetections.map(d => d.sponsor.name).join(', ') : 'None'}
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm">CV Active</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 w-full bg-gray-600 rounded-full h-1">
          <div 
            className="bg-red-600 h-1 rounded-full transition-all duration-1000"
            style={{ width: `${(videoTime % 180) / 180 * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};