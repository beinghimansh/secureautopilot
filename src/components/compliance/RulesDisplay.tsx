
import React, { useState } from 'react';
import { Card, CardContent } from '../common/Card';
import { FadeIn } from '../common/Transitions';
import Button from '../common/Button';
import { CheckCircle, Circle, Clock, Upload, Save, Plus, Eye, Download } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface Rule {
  id: number;
  content: string;
  number?: string;
  subrules?: {
    id: string;
    content: string;
    number?: string;
  }[];
}

interface RulesDisplayProps {
  rules: Rule[];
  title?: string;
  selectedRule?: string;
}

const RulesDisplay: React.FC<RulesDisplayProps> = ({ 
  rules, 
  title = "Rules",
  selectedRule = null 
}) => {
  const [implementationStatus, setImplementationStatus] = useState<string>('not_implemented');
  const [notes, setNotes] = useState<string>('');
  const [documents, setDocuments] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [showAddDocument, setShowAddDocument] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newDocument, setNewDocument] = useState({ title: '', file: null });
  const [newTask, setNewTask] = useState({ description: '', assignedTo: '', dueDate: '' });
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showViewDocument, setShowViewDocument] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  
  const currentRule = selectedRule 
    ? rules.find(rule => rule.number === selectedRule) || 
      rules.find(rule => rule.subrules?.some(subrule => subrule.number === selectedRule))
    : null;

  // Changed this function to async
  const handleStatusChange = async (status: string) => {
    setImplementationStatus(status);
    toast.success(`Status updated to ${status.replace('_', ' ')}`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleSaveNotes = async () => {
    setSaving(true);
    
    try {
      // Simulate API call - in a real app, this would save to database
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsEditingNotes(false);
      toast.success('Notes saved successfully');
    } catch (error) {
      console.error('Error saving notes:', error);
      toast.error('Failed to save notes');
    } finally {
      setSaving(false);
    }
  };

  const handleAddDocument = async () => {
    if (!newDocument.title || !newDocument.file) {
      toast.error('Please provide both title and file');
      return;
    }

    try {
      // Simulate upload - in a real app, this would upload to storage
      setSaving(true);
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setDocuments([...documents, {
        id: Date.now().toString(),
        title: newDocument.title,
        file_name: newDocument.file.name,
        uploaded_at: new Date().toISOString(),
        url: URL.createObjectURL(newDocument.file)
      }]);
      
      setNewDocument({ title: '', file: null });
      setShowAddDocument(false);
      toast.success('Document uploaded successfully');
      setSaving(false);
    } catch (error) {
      console.error('Error uploading document:', error);
      toast.error('Failed to upload document');
      setSaving(false);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.description) {
      toast.error('Please provide a task description');
      return;
    }
    
    try {
      setSaving(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setTasks([...tasks, {
        id: Date.now().toString(),
        description: newTask.description,
        assignedTo: newTask.assignedTo || 'Unassigned',
        dueDate: newTask.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'open'
      }]);
      
      setNewTask({ description: '', assignedTo: '', dueDate: '' });
      setShowAddTask(false);
      toast.success('Task added successfully');
      setSaving(false);
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to add task');
      setSaving(false);
    }
  };
  
  const handleViewDocument = (document: any) => {
    setSelectedDocument(document);
    setShowViewDocument(true);
  };
  
  const handleCompleteTask = async (taskId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status: 'completed' } : task
      ));
      toast.success('Task marked as completed');
    } catch (error) {
      console.error('Error completing task:', error);
      toast.error('Failed to update task');
    }
  };

  const renderRuleContent = () => {
    if (!currentRule) return null;

    return (
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          {currentRule.number}: {currentRule.content}
        </h2>
        <p className="text-gray-600">
          {currentRule.content}
        </p>
      </div>
    );
  };

  const renderImplementationStatus = () => {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Implementation Status</h3>
        <div className="flex flex-wrap gap-3">
          <Button
            variant={implementationStatus === 'not_implemented' ? 'default' : 'outline'}
            onClick={() => handleStatusChange('not_implemented')}
            size="sm"
            leftIcon={<Circle size={18} className="text-red-500" />}
          >
            Not Implemented
          </Button>
          <Button
            variant={implementationStatus === 'in_progress' ? 'default' : 'outline'}
            onClick={() => handleStatusChange('in_progress')}
            size="sm"
            leftIcon={<Clock size={18} className="text-yellow-500" />}
          >
            In Progress
          </Button>
          <Button
            variant={implementationStatus === 'implemented' ? 'default' : 'outline'}
            onClick={() => handleStatusChange('implemented')}
            size="sm"
            leftIcon={<CheckCircle size={18} className="text-green-500" />}
          >
            Implemented
          </Button>
          <Button
            variant={implementationStatus === 'not_applicable' ? 'default' : 'outline'}
            onClick={() => handleStatusChange('not_applicable')}
            size="sm"
          >
            Not Applicable
          </Button>
        </div>
      </div>
    );
  };

  const renderNotesSection = () => {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Notes</h3>
        {isEditingNotes ? (
          <>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add implementation notes..."
              className="min-h-[120px] mb-2"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditingNotes(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                leftIcon={<Save size={16} />}
                onClick={handleSaveNotes}
                isLoading={saving}
              >
                Save Notes
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="bg-gray-50 p-4 rounded-md mb-3 min-h-[120px]">
              {notes ? notes : <span className="text-gray-400">No notes added yet</span>}
            </div>
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditingNotes(true)}
              >
                Edit Notes
              </Button>
            </div>
          </>
        )}
      </div>
    );
  };

  const renderDocumentsSection = () => {
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Documents</h3>
          <Button
            size="sm"
            variant="outline"
            leftIcon={<Upload size={16} />}
            onClick={() => setShowAddDocument(true)}
          >
            Add Document
          </Button>
        </div>

        {showAddDocument && (
          <div className="p-4 bg-gray-50 rounded-md mb-4">
            <h4 className="font-medium mb-3">Upload Document</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Document Title</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter document title"
                  value={newDocument.title}
                  onChange={(e) => setNewDocument({ ...newDocument, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">File</label>
                <input
                  type="file"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setNewDocument({ ...newDocument, file: e.target.files[0] });
                    }
                  }}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowAddDocument(false)}
                >
                  Cancel
                </Button>
                <Button size="sm" onClick={handleAddDocument} isLoading={saving}>
                  Upload
                </Button>
              </div>
            </div>
          </div>
        )}

        {documents.length === 0 ? (
          <p className="text-gray-500 italic">No documents attached</p>
        ) : (
          <div className="space-y-2">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <div className="text-blue-600 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">{doc.title}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(doc.uploaded_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm" 
                    variant="outline"
                    leftIcon={<Eye size={16} />}
                    onClick={() => handleViewDocument(doc)}
                  >
                    View
                  </Button>
                  <Button
                    size="sm" 
                    variant="outline"
                    leftIcon={<Download size={16} />}
                  >
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <Dialog open={showViewDocument} onOpenChange={setShowViewDocument}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedDocument?.title}</DialogTitle>
            </DialogHeader>
            <div className="p-2">
              {selectedDocument?.url && (
                <iframe 
                  src={selectedDocument.url} 
                  className="w-full h-[500px] border rounded"
                ></iframe>
              )}
            </div>
            <DialogFooter>
              <Button onClick={() => setShowViewDocument(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  const renderTasksSection = () => {
    return (
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">To-dos</h3>
          <Button
            size="sm"
            variant="outline"
            leftIcon={<Plus size={16} />}
            onClick={() => setShowAddTask(true)}
          >
            Add Task
          </Button>
        </div>

        {showAddTask && (
          <div className="p-4 bg-gray-50 rounded-md mb-4">
            <h4 className="font-medium mb-3">Add Task</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Description</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Task description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Assigned To</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="e.g., John Doe"
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Due Date</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowAddTask(false)}
                >
                  Cancel
                </Button>
                <Button size="sm" onClick={handleAddTask} isLoading={saving}>
                  Add Task
                </Button>
              </div>
            </div>
          </div>
        )}

        {tasks.length === 0 ? (
          <p className="text-gray-500 italic">No tasks assigned</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned to</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td className="px-4 py-3 whitespace-nowrap">{task.description}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{task.assignedTo}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        task.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {task.status === 'completed' ? 'Completed' : 'Open'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{task.dueDate}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex gap-2">
                        {task.status !== 'completed' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleCompleteTask(task.id)}
                          >
                            Complete
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          Details
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  if (currentRule || selectedRule) {
    return (
      <FadeIn>
        <Card className="h-full">
          <CardContent className="p-6">
            {renderRuleContent()}
            {renderImplementationStatus()}
            {renderNotesSection()}
            {renderDocumentsSection()}
            {renderTasksSection()}
          </CardContent>
        </Card>
      </FadeIn>
    );
  }

  return (
    <FadeIn>
      <Card className="h-full">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-6">{title}</h2>
          <ol className="list-decimal pl-6 space-y-4">
            {rules.map((rule) => (
              <li key={rule.id} className="text-gray-800">
                <p className="mb-2">{rule.content}</p>
                {rule.subrules && rule.subrules.length > 0 && (
                  <ol className="list-[lower-alpha] pl-6 space-y-2 mt-2">
                    {rule.subrules.map((subrule) => (
                      <li key={subrule.id} className="text-gray-700 mb-2">
                        {subrule.content}
                      </li>
                    ))}
                  </ol>
                )}
              </li>
            ))}
          </ol>
          <div className="mt-6 text-center">
            <Button variant="ghost" size="sm">
              Show all
            </Button>
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  );
};

export default RulesDisplay;
