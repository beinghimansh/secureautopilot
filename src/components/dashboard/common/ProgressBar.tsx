
import React from 'react';
import { cn } from '@/lib/utils';
import { StatusType, getBarColor } from './StatusIndicator';

interface ProgressBarProps {
  value: number;
  status?: StatusType;
  className?: string;
  barClassName?: string;
}

const ProgressBar = ({ 
  value, 
  status = 'Healthy', 
  className, 
  barClassName 
}: ProgressBarProps) => {
  const percentage = Math.min(100, Math.max(0, value));
  const barColor = status ? getBarColor(status) : 'bg-primary';
  
  return (
    <div className={cn("w-full bg-gray-200 rounded-full h-2", className)}>
      <div 
        className={cn(`${barColor} h-2 rounded-full`, barClassName)} 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
