import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line,
  PieChart, Pie, Cell
} from 'recharts';

interface ChartData {
  type: 'chart';
  chartType: 'radar' | 'bar' | 'line' | 'pie';
  title: string;
  labels: string[];
  data: number[];
  description?: string;
}

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export const ChartRenderer: React.FC<{ chartData: ChartData }> = ({ chartData }) => {
  const formattedData = chartData.labels.map((label, index) => ({
    name: label,
    value: chartData.data[index],
  }));

  const renderChart = () => {
    switch (chartData.chartType) {
      case 'radar':
        return (
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={formattedData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar
              name={chartData.title}
              dataKey="value"
              stroke="#4f46e5"
              fill="#4f46e5"
              fillOpacity={0.6}
            />
          </RadarChart>
        );
      case 'bar':
        return (
          <BarChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      case 'line':
        return (
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} />
          </LineChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={formattedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="my-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
      <h4 className="text-sm font-bold text-slate-800 mb-4 text-center">{chartData.title}</h4>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart() as React.ReactElement}
        </ResponsiveContainer>
      </div>
      {chartData.description && (
        <p className="mt-4 text-xs text-slate-500 italic text-center">{chartData.description}</p>
      )}
    </div>
  );
};
