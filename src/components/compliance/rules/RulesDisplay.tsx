
import React, { useState, useEffect } from 'react';
import RulesList from '@/components/compliance/rules/RulesList';
import RuleDetails from '@/components/compliance/rules/RuleDetails';
import IsoControlsTree from '@/components/compliance/rules/IsoControlsTree';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ComplianceRule } from '@/components/compliance/types/complianceTypes';
import { Rule } from '@/components/compliance/rules/RulesData';

interface RulesDisplayProps {
  frameworkId: string;
}

const RulesDisplay: React.FC<RulesDisplayProps> = ({ frameworkId }) => {
  const [selectedRule, setSelectedRule] = useState<ComplianceRule | null>(null);
  const [implementationNotes, setImplementationNotes] = useState<string>('');
  const [rules, setRules] = useState<Rule[]>([]);
  const [isTreeView, setIsTreeView] = useState<boolean>(
    frameworkId === 'iso27001' || frameworkId === 'soc2'
  );
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    const fetchRules = async () => {
      try {
        // If SOC2, try to get data from the database first
        if (frameworkId === 'soc2') {
          const { data, error } = await supabase
            .from('soc2_requirements')
            .select('*')
            .order('control_number');
            
          if (error) throw error;
          
          if (data && data.length > 0) {
            const formattedRules = data.map(item => ({
              id: Number(item.id), // Convert to number to match Rule type
              number: item.control_number,
              content: item.title,
              description: item.description,
              requirement: item.requirement,
              status: 'in_progress' as const
            }));
            
            setRules(formattedRules);
            return;
          }
        }
        
        // Fallback to hardcoded data if needed
        const rulesData = require('@/components/compliance/rules/RulesData').getFrameworkRules(frameworkId);
        setRules(rulesData);
      } catch (error) {
        console.error("Error loading rules data:", error);
        toast.error("Failed to load requirements data");
        setRules([]);
      }
    };
    
    fetchRules();
    setIsTreeView(frameworkId === 'iso27001' || frameworkId === 'soc2');
  }, [frameworkId]);

  useEffect(() => {
    if (selectedRule?.id) {
      const fetchNotes = async () => {
        try {
          const ruleId = typeof selectedRule.id === 'string' ? selectedRule.id : selectedRule.id.toString();
          
          const { data, error } = await supabase
            .from('implementation_notes')
            .select('*')
            .eq('requirement_id', ruleId)
            .maybeSingle();

          if (error && error.code !== 'PGRST116') {
            console.error('Error fetching notes:', error);
            toast.error("Failed to load implementation notes");
          }

          if (data) {
            console.log('Notes found:', data);
            setImplementationNotes(data.content || '');
            
            // Update status if available
            if (data.status && selectedRule) {
              setSelectedRule(prev => {
                if (!prev) return prev;
                return { ...prev, status: data.status as any };
              });
            }
          } else {
            // Try fallback to old control_id field for backward compatibility
            const { data: oldData, error: oldError } = await supabase
              .from('control_implementation_notes')
              .select('*')
              .eq('control_id', ruleId)
              .maybeSingle();
              
            if (!oldError && oldData) {
              console.log('Old notes found:', oldData);
              setImplementationNotes(oldData.content || '');
            } else {
              console.log('No notes found for rule:', ruleId);
              setImplementationNotes('');
            }
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

    setIsSaving(true);
    try {
      const ruleId = typeof selectedRule.id === 'string' ? selectedRule.id : selectedRule.id.toString();
      
      console.log('Saving notes for rule:', ruleId, 'Content:', implementationNotes, 'Status:', selectedRule.status);
      
      // First try updating
      const { data, error } = await supabase
        .from('implementation_notes')
        .upsert(
          { 
            requirement_id: ruleId,
            content: implementationNotes,
            status: selectedRule.status || 'in_progress',
            updated_at: new Date().toISOString()
          },
          { 
            onConflict: 'requirement_id',
            returning: 'minimal' 
          }
        );

      if (error) {
        console.error('Error saving notes:', error);
        toast.error('Failed to save notes: ' + error.message);
        return;
      }

      console.log('Notes saved successfully');
      toast.success('Implementation notes saved successfully');
    } catch (err: any) {
      console.error('Error saving implementation notes:', err);
      toast.error('An error occurred while saving: ' + (err.message || 'Unknown error'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleRuleClick = (rule: Rule) => {
    // Convert Rule to ComplianceRule
    const complianceRule: ComplianceRule = {
      id: rule.id,
      number: rule.number,
      content: rule.content,
      status: rule.status,
      description: rule.description,
      requirement: rule.requirement
    };
    setSelectedRule(complianceRule);
  };

  const handleNotesChange = (content: string) => {
    setImplementationNotes(content);
  };

  const handleControlSelect = (control: any) => {
    // Ensure ID is properly converted
    const ruleId = typeof control.id === 'string' && !isNaN(Number(control.id)) 
      ? Number(control.id) 
      : control.id;
    
    const rule: ComplianceRule = {
      id: ruleId,
      number: control.number || control.id.toString(),
      content: control.title,
      status: control.status === 'implemented' ? 'compliant' : 
              control.status === 'in_progress' ? 'in_progress' : 
              control.status === 'not_implemented' ? 'non_compliant' : 'not_applicable',
      description: control.description,
      requirement: control.requirement
    };
    
    setSelectedRule(rule);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 overflow-auto">
        {isTreeView ? (
          <IsoControlsTree 
            onSelectControl={handleControlSelect}
            selectedRuleId={selectedRule?.id ? 
              (typeof selectedRule.id === 'string' ? Number(selectedRule.id) : selectedRule.id) 
              : null}
            frameworkId={frameworkId}
          />
        ) : (
          <RulesList 
            rules={rules} 
            selectedRuleId={selectedRule?.id ? 
              (typeof selectedRule.id === 'string' ? Number(selectedRule.id) : selectedRule.id) 
              : null} 
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
            isSaving={isSaving}
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
