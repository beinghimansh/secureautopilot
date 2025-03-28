
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/common/Card';
import Button from '@/components/common/Button';
import { CheckCircle, AlertCircle, Clock, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

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
  const [status, setStatus] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (selectedRule) {
      setStatus(selectedRule.status || 'non_compliant');
      setNotes(selectedRule.notes || '');
      setDocuments(selectedRule.documents || []);
    }
  }, [selectedRule]);

  const handleRuleClick = (rule: Rule) => {
    setSelectedRule(rule);
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      setSaving(true);
      
      // In a real application, this would be a call to your backend
      // For demo purposes, we're just simulating a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setStatus(newStatus);
      toast.success(`Status updated to ${newStatus.replace('_', ' ')}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotes = async () => {
    try {
      setSaving(true);
      
      // In a real application, this would be a call to your backend
      // For demo purposes, we're just simulating a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('Notes saved successfully');
    } catch (error) {
      console.error('Error saving notes:', error);
      toast.error('Failed to save notes');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left sidebar - rules list */}
      <div className="lg:col-span-4">
        <Card className="h-full">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">Rules & Requirements</h3>
            <div className="space-y-2">
              {rules.map((rule) => (
                <button
                  key={rule.id}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedRule?.id === rule.id
                      ? 'bg-blue-100 text-blue-800' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleRuleClick(rule)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{rule.number}</span>
                    {rule.status === 'compliant' && (
                      <CheckCircle size={18} className="text-green-600" />
                    )}
                    {rule.status === 'non_compliant' && (
                      <AlertCircle size={18} className="text-red-600" />
                    )}
                    {rule.status === 'in_progress' && (
                      <Clock size={18} className="text-yellow-600" />
                    )}
                  </div>
                  <p className="text-sm mt-1">{rule.content}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right content area - rule details */}
      <div className="lg:col-span-8">
        {selectedRule ? (
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">{selectedRule.number}</h2>
                <p>{selectedRule.content}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Compliance Status</h3>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={status === 'compliant' ? 'default' : 'outline'} 
                    onClick={() => handleStatusChange('compliant')}
                    leftIcon={<CheckCircle size={16} />}
                    size="sm"
                    isLoading={saving && status !== 'compliant'}
                  >
                    Compliant
                  </Button>
                  <Button 
                    variant={status === 'non_compliant' ? 'default' : 'outline'} 
                    onClick={() => handleStatusChange('non_compliant')}
                    leftIcon={<AlertCircle size={16} />}
                    size="sm"
                    isLoading={saving && status !== 'non_compliant'}
                  >
                    Non-Compliant
                  </Button>
                  <Button 
                    variant={status === 'in_progress' ? 'default' : 'outline'} 
                    onClick={() => handleStatusChange('in_progress')}
                    leftIcon={<Clock size={16} />}
                    size="sm"
                    isLoading={saving && status !== 'in_progress'}
                  >
                    In Progress
                  </Button>
                  <Button 
                    variant={status === 'not_applicable' ? 'default' : 'outline'} 
                    onClick={() => handleStatusChange('not_applicable')}
                    size="sm"
                    isLoading={saving && status !== 'not_applicable'}
                  >
                    Not Applicable
                  </Button>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Notes</h3>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                  placeholder="Add implementation notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <div className="flex justify-end mt-2">
                  <Button 
                    onClick={handleSaveNotes} 
                    size="sm"
                    isLoading={saving}
                  >
                    Save Notes
                  </Button>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium">Evidence Documents</h3>
                  <Button 
                    size="sm" 
                    variant="outline"
                    leftIcon={<FileText size={16} />}
                  >
                    Upload Document
                  </Button>
                </div>
                
                {documents.length === 0 ? (
                  <p className="text-gray-500 italic">No documents attached</p>
                ) : (
                  <div className="space-y-2">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center">
                          <FileText size={20} className="text-blue-600 mr-2" />
                          <div>
                            <p className="font-medium">{doc.title}</p>
                            <p className="text-xs text-gray-500">Added on {doc.date}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-50 rounded-xl p-8 text-center">
            <div>
              <h3 className="text-lg font-medium mb-2">Select a rule from the sidebar</h3>
              <p className="text-gray-600">Choose a rule to view and manage its compliance status</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RulesDisplay;
