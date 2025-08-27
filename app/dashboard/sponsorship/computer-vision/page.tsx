'use client';

import { useEffect, useState } from 'react';
import { CVDetectionOverlay } from '@/components/sponsorship/CVDetectionOverlay';
import { LogoRecognitionResult } from '@/components/sponsorship/LogoRecognitionResult';
import { SponsorPlacementHeatmap } from '@/components/sponsorship/SponsorPlacementHeatmap';
import { 
  generateMockComputerVisionData,
  mockSponsors,
  generateLiveRaceStatus
} from '@/lib/mockData';
import { 
  ComputerVisionDetection, 
  Sponsor, 
  PlacementEffectiveness 
} from '@/types/sponsorship';
import { 
  HiOutlineEye,
  HiOutlineCpuChip,
  HiOutlineClock,
  HiOutlineSignal,
  HiOutlineCamera,
  HiOutlineChartBar
} from 'react-icons/hi2';

export default function ComputerVisionAnalytics() {
  const [detections, setDetections] = useState<ComputerVisionDetection[]>([]);
  const [isLive, setIsLive] = useState(false);
  const [placementData, setPlacementData] = useState<PlacementEffectiveness[]>([]);
  const [detectionStats, setDetectionStats] = useState({
    totalDetections: 0,
    averageConfidence: 0,
    totalExposureTime: 0,
    activeCameras: 4
  });

  useEffect(() => {
    const cvData = generateMockComputerVisionData();
    setDetections(cvData);
    
    const liveStatus = generateLiveRaceStatus();
    setIsLive(liveStatus.isLive);

    // Calculate detection statistics
    const totalDetections = cvData.length;
    const averageConfidence = cvData.reduce((sum, d) => sum + d.confidence, 0) / totalDetections;
    const totalExposureTime = cvData.reduce((sum, d) => sum + d.exposureDuration, 0);

    setDetectionStats({
      totalDetections,
      averageConfidence: Math.round(averageConfidence * 100),
      totalExposureTime: Math.round(totalExposureTime / 60), // Convert to minutes
      activeCameras: 4
    });

    // Generate placement effectiveness data
    const placementEffectiveness: PlacementEffectiveness[] = [
      {
        placement: 'car_hood',
        sponsor: 'AutoZone',
        effectiveness: 92,
        averageExposure: 145,
        costEfficiency: 2.34,
        x: 35,
        y: 25,
        width: 30,
        height: 20
      },
      {
        placement: 'car_side',
        sponsor: 'Valvoline',
        effectiveness: 88,
        averageExposure: 132,
        costEfficiency: 2.67,
        x: 10,
        y: 35,
        width: 25,
        height: 25
      },
      {
        placement: 'car_rear',
        sponsor: 'Mobil 1',
        effectiveness: 76,
        averageExposure: 98,
        costEfficiency: 3.12,
        x: 35,
        y: 55,
        width: 30,
        height: 15
      },
      {
        placement: 'suit',
        sponsor: 'Goodyear',
        effectiveness: 65,
        averageExposure: 67,
        costEfficiency: 4.23,
        x: 75,
        y: 30,
        width: 15,
        height: 35
      },
      {
        placement: 'helmet',
        sponsor: 'NAPA',
        effectiveness: 58,
        averageExposure: 45,
        costEfficiency: 5.67,
        x: 75,
        y: 15,
        width: 15,
        height: 12
      }
    ];
    setPlacementData(placementEffectiveness);
  }, []);

  // Get recent detections for each sponsor
  const getRecentDetections = () => {
    const recentDetections = mockSponsors.map(sponsor => {
      const sponsorDetections = detections.filter(d => d.sponsorId === sponsor.id);
      const avgConfidence = sponsorDetections.length > 0 
        ? sponsorDetections.reduce((sum, d) => sum + d.confidence, 0) / sponsorDetections.length
        : 0;
      const totalScreenTime = sponsorDetections.reduce((sum, d) => sum + d.exposureDuration, 0);
      const lastDetection = sponsorDetections.length > 0 
        ? new Date(Math.max(...sponsorDetections.map(d => d.timestamp.getTime())))
        : new Date();

      return {
        sponsor,
        confidence: avgConfidence,
        screenTime: totalScreenTime,
        detectionCount: sponsorDetections.length,
        lastSeen: lastDetection
      };
    }).sort((a, b) => b.confidence - a.confidence);

    return recentDetections;
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Computer Vision Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Real-time sponsor logo detection and exposure tracking using AI-powered computer vision
        </p>
      </div>

      {/* Detection Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <HiOutlineEye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {detectionStats.totalDetections.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Detections
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <HiOutlineSignal className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {detectionStats.averageConfidence}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Avg Confidence
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <HiOutlineClock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {detectionStats.totalExposureTime}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Minutes Tracked
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <HiOutlineCamera className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {detectionStats.activeCameras}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Active Cameras
          </div>
        </div>
      </div>

      {/* Live Video Feed with Detection Overlay */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Live Race Feed - Computer Vision Analysis
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <HiOutlineCpuChip className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                AI Processing: ACTIVE
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-600">
                {isLive ? 'LIVE' : 'REPLAY'}
              </span>
            </div>
          </div>
        </div>
        <CVDetectionOverlay 
          detections={detections} 
          sponsors={mockSponsors} 
          isLive={isLive}
        />
      </div>

      {/* Detection Results and Placement Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Logo Recognition Results */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <HiOutlineChartBar className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Real-time Detection Results
            </h3>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {getRecentDetections().map((detection, index) => (
              <LogoRecognitionResult
                key={detection.sponsor.id}
                sponsor={detection.sponsor}
                confidence={detection.confidence}
                screenTime={detection.screenTime}
                detectionCount={detection.detectionCount}
                lastSeen={detection.lastSeen}
              />
            ))}
          </div>
        </div>

        {/* Camera Feeds Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Camera Feeds
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Main Camera', status: 'active', detections: 12 },
              { name: 'Pit Camera', status: 'active', detections: 8 },
              { name: 'Helicopter', status: 'active', detections: 15 },
              { name: 'Trackside 1', status: 'inactive', detections: 0 }
            ].map((camera, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {camera.name}
                  </h4>
                  <div className={`w-2 h-2 rounded-full ${
                    camera.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                  }`} />
                </div>
                <div className="aspect-video bg-gray-200 dark:bg-gray-600 rounded mb-2 flex items-center justify-center">
                  <HiOutlineCamera className="h-8 w-8 text-gray-400" />
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {camera.detections} detections
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sponsor Placement Effectiveness */}
      <SponsorPlacementHeatmap data={placementData} />

      {/* Detection Timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Detection Timeline (Last Hour)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">
                  Time
                </th>
                <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">
                  Sponsor
                </th>
                <th className="text-center py-2 px-3 font-semibold text-gray-900 dark:text-white">
                  Confidence
                </th>
                <th className="text-center py-2 px-3 font-semibold text-gray-900 dark:text-white">
                  Duration
                </th>
                <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">
                  Camera
                </th>
                <th className="text-center py-2 px-3 font-semibold text-gray-900 dark:text-white">
                  Visibility
                </th>
              </tr>
            </thead>
            <tbody>
              {detections.slice(0, 10).map((detection, index) => {
                const sponsor = mockSponsors.find(s => s.id === detection.sponsorId);
                return (
                  <tr key={detection.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-3 px-3 text-gray-600 dark:text-gray-400">
                      {detection.timestamp.toLocaleTimeString()}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: sponsor?.color }}
                        />
                        <span className="text-gray-900 dark:text-white">
                          {sponsor?.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        detection.confidence >= 0.9 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        detection.confidence >= 0.8 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {Math.round(detection.confidence * 100)}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center text-gray-600 dark:text-gray-400">
                      {Math.round(detection.exposureDuration)}s
                    </td>
                    <td className="py-3 px-3 text-gray-600 dark:text-gray-400 capitalize">
                      {detection.videoSource.replace('_', ' ')}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        detection.visibility === 'high' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        detection.visibility === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {detection.visibility}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}