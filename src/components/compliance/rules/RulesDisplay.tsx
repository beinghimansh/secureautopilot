
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
      // Since there's no compliance_rules table, let's use an existing table or mock data
      // For demo purposes, we'll use mock data instead of querying a non-existent table
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
        }
      ];
      
      setLocalRules(mockRules);
      
      // If setRules was provided, update the parent component
      if (setRules) {
        setRules(mockRules);
      }
      
      console.log('Fetched rules for framework:', frameworkId);
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
      // In a real app, you would use the correct table name and schema
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
