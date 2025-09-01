'use client';

import { useEffect, useState } from 'react';
import { 
  generateMockROIMetrics,
  mockSponsors,
  generateMockSocialData,
  generateMockRacePerformance
} from '@/lib/mockData';
import { SponsorshipNavigation } from '@/components/sponsorship/SponsorshipNavigation';
import { ExportableReport } from '@/types/sponsorship';
import { 
  HiArrowDownTray,
  HiOutlineCalendar,
  HiOutlineUsers,
  HiOutlineEnvelope,
  HiOutlineCog,
  HiOutlineChartBar,
  HiOutlineEye,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlinePlusCircle
} from 'react-icons/hi2';
import { HiOutlineDocument } from 'react-icons/hi';

export default function SponsorReports() {
  const [reports, setReports] = useState<ExportableReport[]>([]);
  const [selectedSponsors, setSelectedSponsors] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [reportStats, setReportStats] = useState<any>({});

  useEffect(() => {
    // Generate mock reports
    const mockReports: ExportableReport[] = [
      {
        id: 'report-1',
        title: 'Monthly ROI Performance Report',
        dateRange: {
          start: new Date('2024-11-01'),
          end: new Date('2024-11-30')
        },
        sponsors: ['AutoZone', 'Valvoline', 'Mobil 1'],
        metrics: ['ROI', 'Exposure Time', 'Social Mentions', 'Brand Awareness'],
        format: 'pdf',
        frequency: 'monthly',
        recipients: ['sponsor.manager@autozone.com', 'marketing@valvoline.com'],
        lastGenerated: new Date('2024-11-30'),
        status: 'active'
      },
      {
        id: 'report-2',
        title: 'Weekly Social Media Sentiment',
        dateRange: {
          start: new Date('2024-12-01'),
          end: new Date('2024-12-07')
        },
        sponsors: ['All Sponsors'],
        metrics: ['Social Sentiment', 'Mention Volume', 'Engagement Rate'],
        format: 'excel',
        frequency: 'weekly',
        recipients: ['team@asdmotorsports.com'],
        lastGenerated: new Date('2024-12-07'),
        status: 'active'
      },
      {
        id: 'report-3',
        title: 'Race Day Performance Summary',
        dateRange: {
          start: new Date('2024-12-15'),
          end: new Date('2024-12-15')
        },
        sponsors: ['AutoZone', 'Goodyear'],
        metrics: ['Exposure Time', 'CV Detections', 'Media Value'],
        format: 'pdf',
        frequency: 'race-day',
        recipients: ['sarah.johnson@autozone.com', 'david.rodriguez@goodyear.com'],
        status: 'generating'
      },
      {
        id: 'report-4',
        title: 'Season End Comprehensive Report',
        dateRange: {
          start: new Date('2024-03-01'),
          end: new Date('2024-11-30')
        },
        sponsors: ['All Sponsors'],
        metrics: ['All Metrics'],
        format: 'pdf',
        frequency: 'one-time',
        recipients: ['management@asdmotorsports.com'],
        lastGenerated: new Date('2024-12-01'),
        status: 'active'
      },
      {
        id: 'report-5',
        title: 'Sponsor Acquisition Packet',
        dateRange: {
          start: new Date('2024-09-01'),
          end: new Date('2024-11-30')
        },
        sponsors: ['Top Performers'],
        metrics: ['ROI', 'Brand Awareness', 'Media Coverage'],
        format: 'pdf',
        frequency: 'one-time',
        recipients: ['prospects@asdmotorsports.com'],
        lastGenerated: new Date('2024-12-05'),
        status: 'inactive'
      }
    ];

    setReports(mockReports);

    // Calculate report statistics
    const roiMetrics = generateMockROIMetrics();
    const socialData = generateMockSocialData();
    const raceData = generateMockRacePerformance();

    setReportStats({
      totalReports: mockReports.length,
      activeReports: mockReports.filter(r => r.status === 'active').length,
      totalRecipients: new Set(mockReports.flatMap(r => r.recipients)).size,
      dataPoints: roiMetrics.length + socialData.length + raceData.length,
      lastUpdate: new Date()
    });

    // Initialize selections
    setSelectedSponsors([mockSponsors[0].id, mockSponsors[1].id]);
    setSelectedMetrics(['ROI', 'Exposure Time', 'Social Mentions']);
  }, []);

  const availableMetrics = [
    'ROI', 'Investment Value', 'Generated Value', 'Exposure Time', 
    'Social Mentions', 'Social Sentiment', 'Brand Awareness', 'Media Value',
    'CV Detections', 'Cost Per Impression', 'Engagement Rate', 'Race Performance'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'generating': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'inactive': return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return HiOutlineCheckCircle;
      case 'generating': return HiOutlineClock;
      case 'inactive': return HiOutlineXCircle;
      default: return HiOutlineClock;
    }
  };

  const generateReport = () => {
    // Mock report generation
    const newReport: ExportableReport = {
      id: `report-${Date.now()}`,
      title: 'Custom Performance Report',
      dateRange: {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        end: new Date()
      },
      sponsors: selectedSponsors.map(id => mockSponsors.find(s => s.id === id)?.name || id),
      metrics: selectedMetrics,
      format: 'pdf',
      frequency: 'one-time',
      recipients: ['user@asdmotorsports.com'],
      status: 'generating'
    };

    setReports(prev => [newReport, ...prev]);
    
    // Simulate report generation completion
    setTimeout(() => {
      setReports(prev => prev.map(r => 
        r.id === newReport.id 
          ? { ...r, status: 'active', lastGenerated: new Date() }
          : r
      ));
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Sponsor Reports & Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Generate comprehensive reports for sponsors with exportable data and insights
          </p>
        </div>
        
        {/* Navigation */}
        <SponsorshipNavigation />
      </div>

      {/* Report Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <HiOutlineDocument className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {reportStats.totalReports}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Reports
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <HiOutlineCheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {reportStats.activeReports}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Active Reports
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <HiOutlineUsers className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {reportStats.totalRecipients}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Recipients
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <HiOutlineChartBar className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {reportStats.dataPoints?.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Data Points
          </div>
        </div>
      </div>

      {/* Report Generation Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create New Report */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Generate New Report
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Sponsors
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {mockSponsors.map(sponsor => (
                  <label key={sponsor.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedSponsors.includes(sponsor.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedSponsors(prev => [...prev, sponsor.id]);
                        } else {
                          setSelectedSponsors(prev => prev.filter(id => id !== sponsor.id));
                        }
                      }}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {sponsor.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Metrics
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {availableMetrics.map(metric => (
                  <label key={metric} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedMetrics.includes(metric)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedMetrics(prev => [...prev, metric]);
                        } else {
                          setSelectedMetrics(prev => prev.filter(m => m !== metric));
                        }
                      }}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {metric}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={generateReport}
              disabled={selectedSponsors.length === 0 || selectedMetrics.length === 0}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <HiOutlinePlusCircle className="h-5 w-5" />
              <span>Generate Report</span>
            </button>
          </div>
        </div>

        {/* Quick Report Templates */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Quick Report Templates
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Monthly ROI Summary',
                description: 'Complete ROI analysis for all sponsors',
                metrics: ['ROI', 'Investment', 'Generated Value'],
                sponsors: 'All',
                color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
              },
              {
                title: 'Social Media Report',
                description: 'Sentiment and engagement analysis',
                metrics: ['Social Mentions', 'Sentiment', 'Engagement'],
                sponsors: 'All',
                color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-200'
              },
              {
                title: 'Race Performance',
                description: 'Performance correlation with exposure',
                metrics: ['Race Results', 'Exposure Time', 'Media Value'],
                sponsors: 'Primary',
                color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200'
              },
              {
                title: 'Sponsor Acquisition',
                description: 'Showcase package for prospects',
                metrics: ['ROI', 'Brand Awareness', 'Success Stories'],
                sponsors: 'Top Performers',
                color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-200'
              }
            ].map((template, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {template.title}
                  </h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${template.color}`}>
                    {template.sponsors}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {template.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {template.metrics.map((metric, mIndex) => (
                    <span key={mIndex} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded">
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Existing Reports */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
          Report Management
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Report Name
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Frequency
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Recipients
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Last Generated
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Status
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => {
                const StatusIcon = getStatusIcon(report.status);
                
                return (
                  <tr key={report.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-4 px-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {report.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {report.sponsors.slice(0, 2).join(', ')}
                          {report.sponsors.length > 2 && ` +${report.sponsors.length - 2} more`}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 capitalize">
                        {report.frequency.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <HiOutlineEnvelope className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {report.recipients.length}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-gray-600 dark:text-gray-400">
                      {report.lastGenerated ? report.lastGenerated.toLocaleDateString() : 'Never'}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button 
                          className="p-1 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                          title="Download Report"
                        >
                          <HiArrowDownTray className="h-4 w-4" />
                        </button>
                        <button 
                          className="p-1 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                          title="Edit Report"
                        >
                          <HiOutlineCog className="h-4 w-4" />
                        </button>
                        <button 
                          className="p-1 text-green-600 hover:text-green-800 transition-colors duration-200"
                          title="View Report"
                        >
                          <HiOutlineEye className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Report Usage Insights
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
              Most Requested Metrics
            </h4>
            <div className="space-y-2">
              {[
                { metric: 'ROI Analysis', count: 12, percentage: 85 },
                { metric: 'Exposure Time', count: 10, percentage: 70 },
                { metric: 'Social Sentiment', count: 8, percentage: 55 },
                { metric: 'Brand Awareness', count: 6, percentage: 40 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item.metric}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-600 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-8">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
              Report Formats
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">PDF</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">75%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Excel</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">20%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">CSV</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">5%</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
              Delivery Schedule
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Weekly</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">40%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Monthly</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">35%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Race Day</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">25%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}