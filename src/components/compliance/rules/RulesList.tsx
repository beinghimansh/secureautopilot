
import React from 'react';
import { Card, CardContent } from '@/components/common/Card';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface Rule {
  id: number;
  number: string;
  content: string;
  status?: 'compliant' | 'non_compliant' | 'in_progress' | 'not_applicable';
}

interface RulesListProps {
  rules: Rule[];
  selectedRuleId: number | null;
  onRuleClick: (rule: Rule) => void;
}

const RulesList: React.FC<RulesListProps> = ({ rules, selectedRuleId, onRuleClick }) => {
  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <h3 className="text-lg font-medium mb-4">Rules & Requirements</h3>
        <div className="space-y-2">
          {rules.map((rule) => (
            <button
              key={rule.id}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedRuleId === rule.id
                  ? 'bg-blue-100 text-blue-800' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => onRuleClick(rule)}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{rule.number}</span>
                {rule.status === 'compliant' && (
                  <CheckCircle size={18} className="text-green-600" />
                )}
                {rule.status === 'non_compliant' && (
                  <AlertCircle size={18} className="text-red-600" />
                )}
                {rule.status === 'in_progress' && (
                  <Clock size={18} className="text-yellow-600" />
                )}
              </div>
              <p className="text-sm mt-1">{rule.content}</p>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RulesList;
