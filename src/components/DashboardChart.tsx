"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "@/context/ThemeContext";

interface DashboardChartProps {
  data?: any[];
}

export default function DashboardChart({ data = [] }: DashboardChartProps) {
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';
  const gridColor = isDark ? "#334155" : "#e9ecef";
  const textColor = isDark ? "#94a3b8" : "#6c757d";

  if (!data || data.length === 0) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300, color: textColor }}>No data available</div>;
  }

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorMastery" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#007bff" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#007bff" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#28a745" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#28a745" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: textColor, fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: textColor, fontSize: 12 }} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDark ? '#1e293b' : '#fff', 
              borderColor: isDark ? '#334155' : '#dee2e6',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            itemStyle={{ color: isDark ? '#f8fafc' : '#212529' }}
          />
          <Area 
            type="monotone" 
            dataKey="mastery" 
            stroke="#007bff" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorMastery)" 
            name="Mastery"
          />
          <Area 
            type="monotone" 
            dataKey="engagement" 
            stroke="#28a745" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorEngagement)" 
            name="Engagement"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
