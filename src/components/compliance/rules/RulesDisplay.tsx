
import React, { useState } from 'react';
import IsoControlsTree from './IsoControlsTree';
import { Card, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/ui/badge';
import Button from '@/components/common/Button';
import { Edit, Plus, Upload, Download, Clock, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface RuleDetail {
  id: string;
  title: string;
  description: string;
  status: 'implemented' | 'in_progress' | 'not_implemented';
}

interface RulesDisplayProps {
  frameworkId: string;
}

const RulesDisplay: React.FC<RulesDisplayProps> = ({ frameworkId }) => {
  const [selectedControl, setSelectedControl] = useState<any>(null);
  const [notes, setNotes] = useState<string>('');
  
  const handleControlSelect = (control: any) => {
    setSelectedControl(control);
    // In a real app, you would fetch notes from the database
    setNotes('');
  };
  
  const handleSaveNotes = async () => {
    if (!selectedControl) return;
    
    try {
      // In a real application, you would save to the database here
      const { data, error } = await supabase
        .from('control_notes')
        .upsert({
          control_id: selectedControl.id,
          framework_id: frameworkId,
          notes: notes,
          updated_at: new Date().toISOString()
        })
        .select();
        
      if (error) {
        throw error;
      }
      
      toast.success('Notes saved successfully!');
    } catch (error) {
      console.error('Error saving notes:', error);
      toast.error('Failed to save notes. Please try again.');
    }
  };
  
  const handleAddTodo = () => {
    if (!selectedControl) return;
    toast.success('To-do added successfully!');
  };
  
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'implemented':
        return (
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
              <Check size={14} className="text-green-600" />
            </div>
            <span className="font-medium text-green-700">Implemented</span>
          </div>
        );
      case 'in_progress':
        return (
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
              <Clock size={14} className="text-yellow-600" />
            </div>
            <span className="font-medium text-yellow-700">In Progress</span>
          </div>
        );
      case 'not_implemented':
        return (
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-2">
              <AlertCircle size={14} className="text-red-600" />
            </div>
            <span className="font-medium text-red-700">Not Implemented</span>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 md:col-span-4">
        <IsoControlsTree onSelectControl={handleControlSelect} />
      </div>
      
      <div className="col-span-12 md:col-span-8">
        {selectedControl ? (
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-semibold">{selectedControl.id}</h2>
                    <Badge variant="outline" className="ml-2">{selectedControl.id.split('.')[0]}</Badge>
                  </div>
                  <h3 className="text-lg font-medium mb-2">{selectedControl.title}</h3>
                </div>
                <Button
                  leftIcon={<Edit size={16} />}
                  variant="outline"
                  size="sm"
                >
                  Edit
                </Button>
              </div>
              
              <div className="grid gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-2">Description</h4>
                  <p className="text-gray-700">
                    {selectedControl.description || 
                      `Responsibility for assets, information classification, and media handling. This control ensures proper management of organizational assets throughout their lifecycle.`}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Compliance Status</h4>
                  <div className="bg-gray-50 p-3 rounded-md">
                    {getStatusDisplay(selectedControl.status || 'not_implemented')}
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium">Notes</h4>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleSaveNotes}
                    >
                      Save Notes
                    </Button>
                  </div>
                  <textarea
                    className="w-full border rounded-md p-3 min-h-[100px]"
                    placeholder="Add implementation notes here..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium">Evidence Documents</h4>
                    <Button 
                      leftIcon={<Upload size={14} />} 
                      variant="outline" 
                      size="sm"
                    >
                      Upload
                    </Button>
                  </div>
                  <div className="border rounded-md p-4 text-center text-gray-500">
                    No documents added yet.
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium">To-dos</h4>
                    <Button 
                      leftIcon={<Plus size={14} />} 
                      variant="outline" 
                      size="sm"
                      onClick={handleAddTodo}
                    >
                      Add
                    </Button>
                  </div>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-left text-sm text-gray-500 border-b">
                        <th className="font-medium p-2">Description</th>
                        <th className="font-medium p-2">Assigned to</th>
                        <th className="font-medium p-2">Set by</th>
                        <th className="font-medium p-2">Status</th>
                        <th className="font-medium p-2">Due</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-center text-gray-500">
                        <td colSpan={5} className="py-4">No to-dos added yet.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="py-8">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Select a control from the list</h3>
                <p className="text-gray-500">Click on a control to view details and add implementation notes</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RulesDisplay;
