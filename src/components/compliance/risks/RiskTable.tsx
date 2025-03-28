
import React from 'react';
import Button from '@/components/common/Button';

interface Risk {
  id: string;
  title: string;
  description: string;
  likelihood: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  status: 'identified' | 'assessed' | 'mitigated' | 'accepted';
  created_at: string;
}

interface RiskTableProps {
  risks: Risk[];
}

const RiskTable: React.FC<RiskTableProps> = ({ risks }) => {
  const getRiskSeverity = (likelihood: string, impact: string): string => {
    if (likelihood === 'high' && impact === 'high') return 'Critical';
    if (likelihood === 'high' || impact === 'high') return 'High';
    if (likelihood === 'medium' || impact === 'medium') return 'Medium';
    return 'Low';
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'identified': return 'bg-blue-100 text-blue-800';
      case 'assessed': return 'bg-yellow-100 text-yellow-800';
      case 'mitigated': return 'bg-green-100 text-green-800';
      case 'accepted': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {risks.map((risk) => {
            const severity = getRiskSeverity(risk.likelihood, risk.impact);
            const severityClass = getSeverityColor(severity);
            const statusClass = getStatusColor(risk.status);
            
            return (
              <tr key={risk.id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{risk.title}</div>
                  <div className="text-sm text-gray-500">{risk.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${severityClass}`}>
                    {severity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}`}>
                    {risk.status.charAt(0).toUpperCase() + risk.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Button variant="ghost" size="sm">View</Button>
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RiskTable;
