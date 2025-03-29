
import React from 'react';
import RuleItem from './RuleItem';
import ClausesList from './ClausesList';

interface RulesListProps {
  rules: any[];
  expandedCategories: Record<string, boolean>;
  toggleCategory: (categoryId: string) => void;
  onSelectRule: (rule: any) => void;
}

const RulesList: React.FC<RulesListProps> = ({ 
  rules, 
  expandedCategories, 
  toggleCategory, 
  onSelectRule 
}) => {
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-lg font-medium mb-4">Select a control to view details</h3>
      <div className="space-y-2">
        {rules.map(rule => (
          <div key={rule.id} className="mb-4">
            <RuleItem rule={rule} onClick={() => onSelectRule(rule)} />
            <ClausesList 
              rule={rule} 
              expandedCategories={expandedCategories}
              toggleCategory={toggleCategory}
              onSelectRule={onSelectRule}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RulesList;
