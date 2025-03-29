
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RulesList from '@/components/compliance/rules/RulesList';
import RuleDetails from '@/components/compliance/rules/RuleDetails';
import IsoControlsTree from '@/components/compliance/rules/IsoControlsTree';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Rule {
  id: number;
  number: string;
  content: string;
  status?: 'compliant' | 'non_compliant' | 'in_progress' | 'not_applicable';
}

interface RulesDisplayProps {
  frameworkId: string;
}

const RulesDisplay: React.FC<RulesDisplayProps> = ({ frameworkId }) => {
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [implementationNotes, setImplementationNotes] = useState<string>('');
  const [rules, setRules] = useState<Rule[]>([]);
  const [isTreeView, setIsTreeView] = useState<boolean>(frameworkId === 'iso27001');
  
  useEffect(() => {
    // Fetch rules data based on frameworkId
    const fetchRules = async () => {
      try {
        // This could come from an API or static data
        const rulesData = require('@/components/compliance/rules/RulesData').getFrameworkRules(frameworkId);
        setRules(rulesData);
      } catch (error) {
        console.error("Error loading rules data:", error);
        toast.error("Failed to load requirements data");
        setRules([]);
      }
    };
    
    fetchRules();
    setIsTreeView(frameworkId === 'iso27001');
  }, [frameworkId]);

  // Fetch implementation notes for the selected rule from database
  useEffect(() => {
    if (selectedRule?.id) {
      const fetchNotes = async () => {
        try {
          // Check if notes exist for the control
          const { data, error } = await supabase
            .from('control_implementation_notes')
            .select('*')
            .eq('control_id', selectedRule.id.toString())
            .maybeSingle();

          if (error && error.code !== 'PGRST116') { // PGRST116 is "No rows returned" error
            console.error('Error fetching notes:', error);
            toast.error("Failed to load implementation notes");
          }

          if (data) {
            setImplementationNotes(data.content || '');
          } else {
            setImplementationNotes('');
          }
        } catch (err) {
          console.error('Error fetching implementation notes:', err);
          toast.error("An error occurred while loading notes");
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

  const handleControlSelect = (control: any) => {
    // Convert the tree control item to a rule format
    const rule: Rule = {
      id: parseInt(control.id.replace(/\D/g, '')) || Math.floor(Math.random() * 1000), // Extract numbers or use random
      number: control.id,
      content: control.title,
      status: control.status === 'implemented' ? 'compliant' : 
             control.status === 'in_progress' ? 'in_progress' : 
             control.status === 'not_implemented' ? 'non_compliant' : 'not_applicable'
    };
    
    setSelectedRule(rule);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <div className="md:col-span-1 overflow-auto">
        {isTreeView ? (
          <IsoControlsTree 
            onSelectControl={handleControlSelect}
          />
        ) : (
          <RulesList 
            rules={rules} 
            selectedRuleId={selectedRule?.id || null} 
            onRuleClick={handleRuleClick} 
          />
        )}
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
            <p className="text-gray-500 text-center">Select a requirement from the {isTreeView ? 'tree' : 'list'} to view details and manage implementation</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RulesDisplay;
