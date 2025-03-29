
import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface RuleItemProps {
  rule: any;
  onClick: () => void;
}

const RuleItem: React.FC<RuleItemProps> = ({ rule, onClick }) => {
  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'non_compliant':
        return <XCircle size={16} className="text-red-600" />;
      case 'in_progress':
        return <Clock size={16} className="text-yellow-600" />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
            {rule.number || rule.control_id}
          </span>
          <span className="font-medium text-sm">{rule.content || rule.title}</span>
        </div>
        <span className="flex items-center">
          {getStatusIcon(rule.status)}
          <span className="ml-2 text-xs px-2 py-1 rounded-full bg-gray-100">
            {rule.status || 'not_started'}
          </span>
        </span>
      </div>
    </div>
  );
};

export default RuleItem;
