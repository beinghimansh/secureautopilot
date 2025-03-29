
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/common/Card';
import { Edit, Save, Download } from 'lucide-react';
import Button from '@/components/common/Button';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { ComplianceRule } from '@/components/compliance/types/complianceTypes';

// Import component parts
import StatusBadge from './components/StatusBadge';
import StatusSelector from './components/StatusSelector';
import EmptyRuleState from './components/EmptyRuleState';
import EvidenceUploader from './components/EvidenceUploader';
import ImplementationEditor from './components/ImplementationEditor';

interface RuleDetailsProps {
  rule: ComplianceRule;
  implementationNotes: string;
  onNotesChange: (content: string) => void;
  onSaveNotes: () => Promise<void>;
}

const RuleDetails: React.FC<RuleDetailsProps> = ({ 
  rule, 
  implementationNotes, 
  onNotesChange, 
  onSaveNotes 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState<ComplianceRule['status']>(rule?.status || 'in_progress');
  const [isSaving, setIsSaving] = useState(false);
  
  // Update local state when selected rule changes
  useEffect(() => {
    if (rule) {
      setStatus(rule.status || 'in_progress');
    }
  }, [rule]);

  const handleStatusChange = async (newStatus: ComplianceRule['status']) => {
    setStatus(newStatus);
    
    // Update status in database if it's connected
    try {
      const { error } = await supabase
        .from('implementation_notes')
        .update({ status: newStatus })
        .eq('requirement_id', rule.id.toString());
        
      if (error) throw error;
    } catch (error) {
      console.error('Error updating status:', error);
      // Don't show error toast since the status will still be updated locally
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveNotes();
      toast.success('Changes saved successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to save changes');
      console.error('Error saving notes:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!rule) {
    return <EmptyRuleState />;
  }

  return (
    <Card className="h-full">
      <CardContent className="p-0">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center mb-2">
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-2">
                  {rule.number}
                </span>
                <StatusBadge status={status} />
              </div>
              <h2 className="text-xl font-semibold">{rule.content}</h2>
            </div>
            <div>
              {isEditing ? (
                <Button 
                  size="sm"
                  leftIcon={<Save size={16} />}
                  onClick={handleSave}
                  isLoading={isSaving}
                >
                  Save
                </Button>
              ) : (
                <Button 
                  size="sm" 
                  variant="outline"
                  leftIcon={<Edit size={16} />}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              )}
            </div>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-350px)]">
          <div className="p-6">
            {rule.description && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                <p className="text-gray-700">{rule.description}</p>
              </div>
            )}

            {rule.requirement && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Requirement</h3>
                <div className="bg-gray-50 rounded p-3 border border-gray-200 text-sm">
                  {rule.requirement}
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Compliance Status</h3>
              {isEditing ? (
                <StatusSelector 
                  currentStatus={status} 
                  onStatusChange={handleStatusChange} 
                />
              ) : (
                <StatusBadge status={status} />
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Implementation Notes</h3>
              <ImplementationEditor 
                isEditing={isEditing}
                content={implementationNotes}
                onChange={onNotesChange}
              />
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Evidence Documents</h3>
              <EvidenceUploader />
            </div>
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end items-center">
          <Button 
            variant="outline" 
            size="sm"
            leftIcon={<Download size={16} />}
            onClick={() => toast.info('Export feature coming soon')}
            className="mr-2"
          >
            Export Notes
          </Button>
          
          {!isEditing && (
            <Button 
              size="sm"
              leftIcon={<Edit size={16} />}
              onClick={() => setIsEditing(true)}
            >
              Edit Notes
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RuleDetails;
