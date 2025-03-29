
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RulesList from '@/components/compliance/rules/RulesList';
import RuleDetails from '@/components/compliance/rules/RuleDetails';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Rule {
  id: number;
  number: string;
  content: string;
  status?: 'compliant' | 'non_compliant' | 'in_progress' | 'not_applicable';
}

interface Notes {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const RulesDisplay = () => {
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [implementationNotes, setImplementationNotes] = useState<string>('');
  const [rules, setRules] = useState<Rule[]>([]);
  const { frameworkId } = useParams();
  
  useEffect(() => {
    // Fetch rules data based on frameworkId
    // This could come from an API or static data
    const rulesData = require('@/components/compliance/rules/RulesData').getFrameworkRules(frameworkId);
    setRules(rulesData);
  }, [frameworkId]);

  // Fetch implementation notes for the selected rule from database
  useEffect(() => {
    if (selectedRule?.id) {
      const fetchNotes = async () => {
        try {
          // Check if the control_notes table exists in the database schema
          // and fetch the notes for the selected rule
          const { data, error } = await supabase
            .from('control_implementation_notes')
            .select('*')
            .eq('control_id', selectedRule.id.toString())
            .single();

          if (error) {
            console.error('Error fetching notes:', error);
            return;
          }

          if (data) {
            setImplementationNotes(data.content || '');
          } else {
            setImplementationNotes('');
          }
        } catch (err) {
          console.error('Error fetching implementation notes:', err);
        }
      };

      fetchNotes();
    }
  }, [selectedRule]);

  const handleSaveNotes = async () => {
    if (!selectedRule) return;

    try {
      const { data, error } = await supabase
        .from('control_implementation_notes')
        .upsert(
          { 
            control_id: selectedRule.id.toString(),
            content: implementationNotes,
            updated_at: new Date().toISOString()
          },
          { onConflict: 'control_id' }
        );

      if (error) {
        toast.error('Failed to save notes');
        console.error('Error saving notes:', error);
        return;
      }

      toast.success('Implementation notes saved successfully');
    } catch (err) {
      toast.error('An error occurred while saving');
      console.error('Error saving implementation notes:', err);
    }
  };

  const handleRuleClick = (rule: Rule) => {
    setSelectedRule(rule);
  };

  const handleNotesChange = (content: string) => {
    setImplementationNotes(content);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <div className="md:col-span-1">
        <RulesList 
          rules={rules} 
          selectedRuleId={selectedRule?.id || null} 
          onRuleClick={handleRuleClick} 
        />
      </div>
      <div className="md:col-span-2">
        {selectedRule ? (
          <RuleDetails 
            rule={selectedRule} 
            implementationNotes={implementationNotes}
            onNotesChange={handleNotesChange}
            onSaveNotes={handleSaveNotes}
          />
        ) : (
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100 h-full flex items-center justify-center">
            <p className="text-gray-500 text-center">Select a requirement to view details and manage implementation</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RulesDisplay;
