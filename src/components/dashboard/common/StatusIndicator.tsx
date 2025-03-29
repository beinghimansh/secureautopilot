
import React from 'react';
import { cn } from '@/lib/utils';

export type StatusType = 'Healthy' | 'Warning' | 'Critical' | 'Active' | 'Inactive' | 'Pending';

interface StatusIndicatorProps {
  status: StatusType;
  className?: string;
}

export const getStatusColor = (status: StatusType) => {
  switch (status) {
    case 'Healthy':
    case 'Active':
      return 'bg-green-100 text-green-800';
    case 'Warning':
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Critical':
    case 'Inactive':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getBarColor = (status: StatusType) => {
  switch (status) {
    case 'Healthy':
    case 'Active':
      return 'bg-green-500';
    case 'Warning':
    case 'Pending':
      return 'bg-yellow-500';
    case 'Critical':
    case 'Inactive':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const StatusIndicator = ({ status, className }: StatusIndicatorProps) => {
  return (
    <span className={cn(`text-xs px-2 py-1 rounded-full ${getStatusColor(status)}`, className)}>
      {status}
    </span>
  );
};

export default StatusIndicator;
