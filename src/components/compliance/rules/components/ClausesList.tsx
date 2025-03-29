
import React from 'react';
import RuleItem from './RuleItem';
import CategoryToggle from './CategoryToggle';

interface ClausesListProps {
  rule: any;
  expandedCategories: Record<string, boolean>;
  toggleCategory: (categoryId: string) => void;
  onSelectRule: (rule: any) => void;
}

const ClausesList: React.FC<ClausesListProps> = ({ 
  rule, 
  expandedCategories, 
  toggleCategory, 
  onSelectRule 
}) => {
  if (!rule.clauses || rule.clauses.length === 0) return null;

  const isExpanded = expandedCategories[String(rule.id)];
  
  return (
    <div className="ml-4 mt-2">
      <CategoryToggle
        id={String(rule.id)}
        isExpanded={isExpanded}
        onToggle={toggleCategory}
        itemsCount={rule.clauses.length}
      />
      
      {isExpanded && (
        <div className="space-y-2 pl-4 border-l-2 border-gray-200">
          {rule.clauses.map((clause: any) => (
            <RuleItem 
              key={clause.id} 
              rule={clause} 
              onClick={() => onSelectRule(clause)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClausesList;
