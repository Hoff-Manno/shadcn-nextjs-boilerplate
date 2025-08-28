'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface SponsorshipChartsProps {
  exposureData?: any[];
  sentimentData?: any[];
  roiData?: any[];
  type: 'exposure' | 'sentiment' | 'roi' | 'placement';
}

export const SponsorshipCharts = ({ 
  exposureData = [], 
  sentimentData = [], 
  roiData = [],
  type 
}: SponsorshipChartsProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Sponsorship Exposure Timeline Chart
  const exposureTimelineConfig: ApexOptions = {
    chart: {
      type: 'area',
      height: 350,
      zoom: { enabled: false },
      animations: { enabled: true },
      toolbar: { show: false }
    },
    dataLabels: { enabled: false },
    stroke: { 
      curve: 'smooth', 
      width: 2 
    },
    xaxis: {
      type: 'category',
      categories: exposureData.map(d => d.name),
      labels: {
        style: {
          colors: '#6B7280'
        }
      }
    },
    yaxis: {
      title: { 
        text: 'Exposure Time (minutes)',
        style: { color: '#6B7280' }
      },
      labels: {
        style: {
          colors: '#6B7280'
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3
      }
    },
    colors: ['#DC2626', '#F59E0B', '#EF4444', '#3B82F6', '#10B981', '#8B5CF6'],
    legend: {
      position: 'top',
      labels: {
        colors: '#6B7280'
      }
    },
    grid: {
      borderColor: '#E5E7EB'
    },
    tooltip: {
      theme: 'light'
    }
  };

  // Sentiment Analysis Radar Chart
  const sentimentRadarConfig: ApexOptions = {
    chart: {
      type: 'radar',
      height: 350,
      toolbar: { show: false }
    },
    plotOptions: {
      radar: {
        size: 140,
        polygons: {
          strokeColors: '#e9e9e9',
          fill: { 
            colors: ['#f8f8f8', '#fff'] 
          }
        }
      }
    },
    xaxis: {
      categories: ['Twitter/X', 'Instagram', 'Facebook', 'TikTok', 'YouTube'],
      labels: {
        style: {
          colors: '#6B7280'
        }
      }
    },
    yaxis: { 
      show: false 
    },
    markers: { 
      size: 4, 
      colors: ['#DC2626'] 
    },
    colors: ['#DC2626'],
    legend: {
      labels: {
        colors: '#6B7280'
      }
    }
  };

  // ROI Comparison Bar Chart
  const roiComparisonConfig: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
        dataLabels: { 
          position: 'top' 
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val}%`,
      style: {
        colors: ['#1F2937']
      }
    },
    xaxis: {
      categories: roiData.map(d => d.name),
      title: { 
        text: 'ROI Percentage',
        style: { color: '#6B7280' }
      },
      labels: {
        style: {
          colors: '#6B7280'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6B7280'
        }
      }
    },
    colors: ['#10B981'],
    grid: {
      borderColor: '#E5E7EB'
    },
    tooltip: {
      theme: 'light'
    }
  };

  // Social Media Sentiment Stacked Area Chart
  const sentimentTrendConfig: ApexOptions = {
    chart: {
      type: 'area',
      height: 350,
      stacked: true,
      toolbar: { show: false }
    },
    dataLabels: { enabled: false },
    stroke: { 
      curve: 'smooth',
      width: 2
    },
    xaxis: {
      type: 'category',
      categories: sentimentData.map(d => d.name),
      labels: {
        style: {
          colors: '#6B7280'
        }
      }
    },
    yaxis: {
      title: { 
        text: 'Number of Mentions',
        style: { color: '#6B7280' }
      },
      labels: {
        style: {
          colors: '#6B7280'
        }
      }
    },
    fill: {
      opacity: 0.8
    },
    colors: ['#10B981', '#F59E0B', '#EF4444'],
    legend: {
      position: 'top',
      labels: {
        colors: '#6B7280'
      }
    },
    grid: {
      borderColor: '#E5E7EB'
    }
  };

  if (!isClient) {
    return (
      <div className="w-full h-80 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading chart...</div>
      </div>
    );
  }

  const renderChart = () => {
    switch (type) {
      case 'exposure':
        const exposureSeries = ['AutoZone', 'Valvoline', 'Mobil 1', 'Goodyear', 'NAPA', 'Lucas Oil'].map(sponsor => ({
          name: sponsor,
          data: exposureData.map(d => d[sponsor] || 0)
        }));

        return (
          <Chart
            options={exposureTimelineConfig}
            series={exposureSeries}
            type="area"
            height={350}
          />
        );

      case 'sentiment':
        const sentimentSeries = [
          {
            name: 'Positive',
            data: sentimentData.map(d => d.positive || 0)
          },
          {
            name: 'Neutral', 
            data: sentimentData.map(d => d.neutral || 0)
          },
          {
            name: 'Negative',
            data: sentimentData.map(d => d.negative || 0)
          }
        ];

        return type === 'sentiment' ? (
          <Chart
            options={sentimentTrendConfig}
            series={sentimentSeries}
            type="area"
            height={350}
          />
        ) : (
          <Chart
            options={sentimentRadarConfig}
            series={[{
              name: 'Sentiment Score',
              data: [85, 90, 75, 88, 82] // Mock sentiment scores for each platform
            }]}
            type="radar"
            height={350}
          />
        );

      case 'roi':
        const roiSeries = [{
          name: 'ROI Percentage',
          data: [340, 280, 220, 195, 155, 125] // Mock ROI data
        }];

        return (
          <Chart
            options={roiComparisonConfig}
            series={roiSeries}
            type="bar"
            height={350}
          />
        );

      default:
        return <div>Chart type not supported</div>;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      {renderChart()}
    </div>
  );
};