
import React from 'react';
import { cn } from '@/lib/utils';

interface CircularProgressProps {
  value: number;
  label: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

const CircularProgress = ({ 
  value, 
  label, 
  size = 120, 
  strokeWidth = 8,
  className 
}: CircularProgressProps) => {
  // Determine color based on value
  const getColor = (value: number) => {
    if (value >= 80) return 'text-green-500';
    if (value >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const color = getColor(value);
  const percentage = Math.min(100, Math.max(0, value));
  const radius = (size / 2) - (strokeWidth / 2);
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative inline-flex items-center justify-center">
        <svg className={`w-${size/4} h-${size/4} transform -rotate-90`} viewBox={`0 0 ${size} ${size}`}>
          <circle
            className="text-gray-200"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size/2}
            cy={size/2}
          />
          <circle
            className={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size/2}
            cy={size/2}
          />
        </svg>
        <span className={`absolute text-2xl font-bold ${color}`}>{value}%</span>
      </div>
      <p className="mt-2 text-sm text-gray-600">{label}</p>
    </div>
  );
};

export default CircularProgress;
