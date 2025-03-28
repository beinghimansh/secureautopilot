
import React, { useState } from 'react';
import RulesList from './RulesList';
import RuleDetails from './RuleDetails';

interface Rule {
  id: number;
  number: string;
  content: string;
  status?: 'compliant' | 'non_compliant' | 'in_progress' | 'not_applicable';
  notes?: string;
  documents?: any[];
}

interface RulesDisplayProps {
  frameworkId: string;
  rules: Rule[];
}

const RulesDisplay: React.FC<RulesDisplayProps> = ({ frameworkId, rules }) => {
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);

  const handleRuleClick = (rule: Rule) => {
    setSelectedRule(rule);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left sidebar - rules list */}
      <div className="lg:col-span-4">
        <RulesList 
          rules={rules} 
          selectedRuleId={selectedRule?.id || null} 
          onRuleClick={handleRuleClick}
        />
      </div>

      {/* Right content area - rule details */}
      <div className="lg:col-span-8">
        <RuleDetails selectedRule={selectedRule} />
      </div>
    </div>
  );
};

export default RulesDisplay;
