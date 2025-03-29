
import React from 'react';
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  HelpCircle
} from 'lucide-react';
import { ComplianceRule } from '@/components/compliance/types/complianceTypes';

interface StatusBadgeProps {
  status?: ComplianceRule['status'];
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const getStatusIcon = (status?: string, iconSize: number = 20) => {
  switch (status) {
    case 'compliant':
      return <CheckCircle size={iconSize} className="text-green-600" />;
    case 'non_compliant':
      return <AlertCircle size={iconSize} className="text-red-600" />;
    case 'in_progress':
      return <Clock size={iconSize} className="text-yellow-600" />;
    case 'not_applicable':
      return <HelpCircle size={iconSize} className="text-gray-600" />;
    default:
      return <HelpCircle size={iconSize} className="text-gray-600" />;
  }
};

const getStatusColor = (status?: string) => {
  switch (status) {
    case 'compliant':
      return 'bg-green-100 text-green-800';
    case 'non_compliant':
      return 'bg-red-100 text-red-800';
    case 'in_progress':
      return 'bg-yellow-100 text-yellow-800';
    case 'not_applicable':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status?: string) => {
  switch (status) {
    case 'compliant':
      return 'Compliant';
    case 'non_compliant':
      return 'Non-Compliant';
    case 'in_progress':
      return 'In Progress';
    case 'not_applicable':
      return 'Not Applicable';
    default:
      return 'Not Started';
  }
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  showText = true,
  size = 'md'
}) => {
  const iconSize = size === 'sm' ? 16 : size === 'md' ? 20 : 24;

  return (
    <div className={`inline-flex items-center px-2 py-0.5 rounded ${getStatusColor(status)}`}>
      {getStatusIcon(status, iconSize)}
      {showText && <span className="ml-1">{getStatusText(status)}</span>}
    </div>
  );
};

export { getStatusText, getStatusColor, getStatusIcon };
export default StatusBadge;
