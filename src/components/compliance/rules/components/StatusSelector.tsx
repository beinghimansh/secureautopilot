
import React from 'react';
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  HelpCircle
} from 'lucide-react';
import { ComplianceRule } from '@/components/compliance/types/complianceTypes';

interface StatusSelectorProps {
  currentStatus: ComplianceRule['status'];
  onStatusChange: (status: ComplianceRule['status']) => void;
}

const StatusSelector: React.FC<StatusSelectorProps> = ({ 
  currentStatus, 
  onStatusChange 
}) => {
  return (
    <div className="grid grid-cols-2 gap-2 md:flex md:space-x-2">
      <button
        className={`px-3 py-2 rounded border ${currentStatus === 'compliant' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:bg-gray-50'} flex items-center`}
        onClick={() => onStatusChange('compliant')}
      >
        <CheckCircle size={16} className="text-green-600 mr-2" />
        <span>Compliant</span>
      </button>
      <button
        className={`px-3 py-2 rounded border ${currentStatus === 'in_progress' ? 'border-yellow-600 bg-yellow-50' : 'border-gray-200 hover:bg-gray-50'} flex items-center`}
        onClick={() => onStatusChange('in_progress')}
      >
        <Clock size={16} className="text-yellow-600 mr-2" />
        <span>In Progress</span>
      </button>
      <button
        className={`px-3 py-2 rounded border ${currentStatus === 'non_compliant' ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:bg-gray-50'} flex items-center`}
        onClick={() => onStatusChange('non_compliant')}
      >
        <AlertCircle size={16} className="text-red-600 mr-2" />
        <span>Non-Compliant</span>
      </button>
      <button
        className={`px-3 py-2 rounded border ${currentStatus === 'not_applicable' ? 'border-gray-600 bg-gray-50' : 'border-gray-200 hover:bg-gray-50'} flex items-center`}
        onClick={() => onStatusChange('not_applicable')}
      >
        <HelpCircle size={16} className="text-gray-600 mr-2" />
        <span>Not Applicable</span>
      </button>
    </div>
  );
};

export default StatusSelector;
