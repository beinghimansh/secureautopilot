
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from 'lucide-react';

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
      setSelectedRule(rule);
      setImplementationNotes(rule?.notes || null);
    }
  }, [ruleId, localRules]);

  const fetchRulesForFramework = async (frameworkId: string) => {
    try {
      const { data, error } = await supabase
        .from('compliance_rules')
        .select('*')
        .eq('framework_id', frameworkId);

      if (error) {
        console.error('Error fetching rules:', error);
        toast.error('Failed to load compliance rules');
      } else if (data) {
        setLocalRules(data);
        // If setRules was provided, update the parent component
        if (setRules) {
          setRules(data);
        }
      }
    } catch (error) {
      console.error('Unexpected error:', error);
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
      
      // Correctly structure the upsert call without the invalid 'returning' option
      const { data, error } = await supabase
        .from('implementation_notes')
        .upsert(
          {
            requirement_id: selectedRule.id,
            content: implementationNotes,
            status: selectedRule.status,
            updated_at: new Date().toISOString()
          },
          { 
            onConflict: 'requirement_id'
          }
        );

      if (error) {
        console.error('Error saving notes:', error);
        toast.error('Failed to save implementation notes');
      } else {
        console.log('Saved notes successfully:', data);
        toast.success('Implementation notes saved successfully');
        
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
      }
      
      setSaving(false);
    }
  };

  if (!selectedRule && localRules.length > 0) {
    return (
      <div className="p-4">
        <h3 className="text-lg font-medium mb-4">Select a control to view details</h3>
        <div className="space-y-2">
          {localRules.map(rule => (
            <div 
              key={rule.id}
              className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                setSelectedRule(rule);
                setImplementationNotes(rule.notes || null);
              }}
            >
              <p className="font-medium">{rule.control_id} - {rule.title}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!selectedRule) {
    return <div className="p-4">Loading controls or no controls available for this framework.</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="text-lg font-semibold">
          {selectedRule.control_id} - {selectedRule.title}
        </h3>
        <p className="text-gray-600">{selectedRule.description}</p>
      </div>

      <div>
        <Label htmlFor="implementation-notes">Implementation Notes</Label>
        <Textarea
          id="implementation-notes"
          placeholder="Enter implementation notes..."
          value={implementationNotes || ''}
          onChange={handleNotesChange}
          className="mt-2"
        />
      </div>

      <div>
        <Label>Status</Label>
        <Select value={selectedRule.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="mt-2 w-[180px]">
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Not Started">Not Started</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Not Applicable">Not Applicable</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={saveImplementationNotes} disabled={saving}>
        {saving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          'Save Notes'
        )}
      </Button>
    </div>
  );
};

export default RulesDisplay;
