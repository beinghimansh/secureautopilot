
import React, { useState, useEffect } from 'react';
import RulesList from './RulesList';
import RuleDetails from './RuleDetails';
import { getRulesByFramework, Rule } from './RulesData';

interface RulesDisplayProps {
  frameworkId: string;
}

const RulesDisplay: React.FC<RulesDisplayProps> = ({ frameworkId }) => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);

  useEffect(() => {
    // Fetch rules for the selected framework
    const frameworkRules = getRulesByFramework(frameworkId);
    setRules(frameworkRules);
    // Reset selected rule when framework changes
    setSelectedRule(null);
  }, [frameworkId]);

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
