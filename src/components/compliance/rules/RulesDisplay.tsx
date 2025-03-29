
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getRulesByFramework } from './RulesData';
import RulesList from './components/RulesList';
import RuleDetailForm from './components/RuleDetailForm';

interface RulesDisplayProps {
  ruleId?: string | null;
  rules?: any[];
  setRules?: React.Dispatch<React.SetStateAction<any[]>>;
  frameworkId?: string;
}

const RulesDisplay: React.FC<RulesDisplayProps> = ({ 
  ruleId, 
  rules = [], 
  setRules = () => {}, 
  frameworkId 
}) => {
  const [selectedRule, setSelectedRule] = useState<any>(null);
  const [implementationNotes, setImplementationNotes] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [localRules, setLocalRules] = useState<any[]>([]);
  const [showRulesList, setShowRulesList] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (frameworkId) {
      fetchRulesForFramework(frameworkId);
    }
  }, [frameworkId]);

  useEffect(() => {
    if (rules.length > 0) {
      setLocalRules(rules);
    }
  }, [rules]);

  useEffect(() => {
    if (ruleId) {
      const rule = localRules.find(r => r.id === ruleId);
      if (rule) {
        setSelectedRule(rule);
        setImplementationNotes(rule?.notes || null);
        setShowRulesList(false);
      }
    }
  }, [ruleId, localRules]);

  const fetchRulesForFramework = async (frameworkId: string) => {
    try {
      // Use the imported function to get rules by framework
      const frameworkRules = getRulesByFramework(frameworkId);
      
      if (frameworkRules.length > 0) {
        setLocalRules(frameworkRules);
        
        // If setRules was provided, update the parent component
        if (setRules) {
          setRules(frameworkRules);
        }
        
        console.log('Fetched rules for framework:', frameworkId);
      } else {
        // Fallback to mock data if needed
        const mockRules = [
          {
            id: '1',
            control_id: 'A.1.1',
            title: 'Information Security Policy',
            description: 'A policy for information security should be defined and approved by management.',
            status: 'in_progress',
            notes: 'Working on drafting the initial policy document.'
          },
          {
            id: '2',
            control_id: 'A.1.2',
            title: 'Review of the Information Security Policy',
            description: 'The information security policy should be reviewed at planned intervals.',
            status: 'not_started',
            notes: ''
          },
          {
            id: '3',
            control_id: 'A.2.1',
            title: 'Asset Management',
            description: 'All assets should be clearly identified and an inventory of all important assets drawn up and maintained.',
            status: 'completed',
            notes: 'Asset inventory has been completed and documented.'
          }
        ];
        
        setLocalRules(mockRules);
        
        // If setRules was provided, update the parent component
        if (setRules) {
          setRules(mockRules);
        }
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('Failed to load compliance rules');
    }
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setImplementationNotes(e.target.value);
  };

  const handleStatusChange = (value: string) => {
    if (selectedRule) {
      setSelectedRule(prevRule => ({ ...prevRule, status: value }));
    }
  };

  const saveImplementationNotes = async () => {
    if (selectedRule && implementationNotes !== null) {
      setSaving(true);
      
      console.log('Saving notes for rule:', ruleId, 'Content:', implementationNotes, 'Status:', selectedRule.status);
      
      // For demo purposes, we'll simulate saving the data instead of using the actual database
      setTimeout(() => {
        // Update the rules data in state
        const updatedRules = localRules.map(rule => 
          rule.id === selectedRule.id 
            ? { ...rule, notes: implementationNotes, status: selectedRule.status } 
            : rule
        );
        
        setLocalRules(updatedRules);
        
        // If setRules was provided, update the parent component
        if (setRules) {
          setRules(updatedRules);
        }
        
        toast.success('Implementation notes saved successfully');
        setSaving(false);
      }, 1000);
    }
  };

  const backToRulesList = () => {
    setShowRulesList(true);
    setSelectedRule(null);
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const selectRule = (rule: any) => {
    setSelectedRule(rule);
    setImplementationNotes(rule.notes || null);
    setShowRulesList(false);
  };

  if (showRulesList || (!selectedRule && localRules.length > 0)) {
    return (
      <RulesList 
        rules={localRules} 
        expandedCategories={expandedCategories} 
        toggleCategory={toggleCategory}
        onSelectRule={selectRule}
      />
    );
  }

  if (!selectedRule) {
    return <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">Loading controls or no controls available for this framework.</div>;
  }

  return (
    <RuleDetailForm
      selectedRule={selectedRule}
      implementationNotes={implementationNotes}
      handleNotesChange={handleNotesChange}
      handleStatusChange={handleStatusChange}
      saveImplementationNotes={saveImplementationNotes}
      backToRulesList={backToRulesList}
      saving={saving}
    />
  );
};

export default RulesDisplay;
