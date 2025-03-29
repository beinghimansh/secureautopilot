
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Save, ArrowLeft, ChevronLeft, ChevronDown, ChevronRight, XCircle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { getRulesByFramework } from './RulesData';

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

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'non_compliant':
        return <XCircle size={16} className="text-red-600" />;
      case 'in_progress':
        return <Clock size={16} className="text-yellow-600" />;
      default:
        return null;
    }
  };

  const renderClausesList = (rule: any) => {
    if (!rule.clauses || rule.clauses.length === 0) return null;

    const isExpanded = expandedCategories[String(rule.id)];
    
    return (
      <div className="ml-4 mt-2">
        <button
          onClick={() => toggleCategory(String(rule.id))}
          className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 mb-2"
        >
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          <span className="ml-1">Sub-controls ({rule.clauses.length})</span>
        </button>
        
        {isExpanded && (
          <div className="space-y-2 pl-4 border-l-2 border-gray-200">
            {rule.clauses.map((clause: any) => (
              <div 
                key={clause.id}
                className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => {
                  setSelectedRule(clause);
                  setImplementationNotes(clause.notes || null);
                  setShowRulesList(false);
                }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
                      {clause.number}
                    </span>
                    <span className="font-medium text-sm">{clause.content}</span>
                  </div>
                  <span className="flex items-center">
                    {getStatusIcon(clause.status)}
                    <span className="ml-2 text-xs px-2 py-1 rounded-full bg-gray-100">
                      {clause.status || 'not_started'}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (showRulesList || (!selectedRule && localRules.length > 0)) {
    return (
      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium mb-4">Select a control to view details</h3>
        <div className="space-y-2">
          {localRules.map(rule => (
            <div key={rule.id} className="mb-4">
              <div 
                className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => {
                  setSelectedRule(rule);
                  setImplementationNotes(rule.notes || null);
                  setShowRulesList(false);
                }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
                      {rule.number || rule.control_id}
                    </span>
                    <span className="font-medium">{rule.content || rule.title}</span>
                  </div>
                  <span className="flex items-center">
                    {getStatusIcon(rule.status)}
                    <span className="ml-2 text-xs px-2 py-1 rounded-full bg-gray-100">
                      {rule.status || 'not_started'}
                    </span>
                  </span>
                </div>
              </div>
              {rule.clauses && rule.clauses.length > 0 && renderClausesList(rule)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!selectedRule) {
    return <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">Loading controls or no controls available for this framework.</div>;
  }

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6 space-y-6">
        <div>
          <button
            onClick={backToRulesList}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mb-3"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to all controls
          </button>
          
          <div className="flex justify-between items-start">
            <div>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
                {selectedRule.control_id}
              </span>
              <h3 className="text-xl font-semibold">
                {selectedRule.title}
              </h3>
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs ${
              selectedRule.status === 'completed' ? 'bg-green-500 text-white' :
              selectedRule.status === 'in_progress' ? 'bg-blue-500 text-white' :
              'bg-gray-500 text-white'
            }`}>
              {selectedRule.status}
            </span>
          </div>
          <p className="text-gray-600 mt-2">{selectedRule.description}</p>
        </div>

        <div>
          <Label htmlFor="status" className="block mb-2">Status</Label>
          <Select value={selectedRule.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="not_started">Not Started</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="not_applicable">Not Applicable</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="implementation-notes" className="block mb-2">Implementation Notes</Label>
          <Textarea
            id="implementation-notes"
            placeholder="Enter implementation notes..."
            value={implementationNotes || ''}
            onChange={handleNotesChange}
            className="min-h-[200px] resize-y"
          />
        </div>
      </CardContent>
      
      <CardFooter className="px-6 py-4 bg-gray-50 border-t flex justify-end">
        <Button 
          onClick={saveImplementationNotes} 
          disabled={saving}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white"
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Notes
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RulesDisplay;
