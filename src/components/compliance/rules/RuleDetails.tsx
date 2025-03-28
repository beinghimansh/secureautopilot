
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/common/Card';
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  HelpCircle, 
  Upload, 
  Edit, 
  FileText, 
  Save
} from 'lucide-react';
import Button from '@/components/common/Button';
import { toast } from 'sonner';

interface Rule {
  id: number;
  number: string;
  content: string;
  status?: 'compliant' | 'non_compliant' | 'in_progress' | 'not_applicable';
  notes?: string;
  documents?: any[];
  description?: string;
  requirement?: string;
}

interface RuleDetailsProps {
  selectedRule: Rule | null;
}

const RuleDetails: React.FC<RuleDetailsProps> = ({ selectedRule }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<Rule['status']>('in_progress');
  
  // Update local state when selected rule changes
  React.useEffect(() => {
    if (selectedRule) {
      setNotes(selectedRule.notes || '');
      setStatus(selectedRule.status || 'in_progress');
    }
  }, [selectedRule]);

  const handleStatusChange = (newStatus: Rule['status']) => {
    setStatus(newStatus);
  };

  const handleSave = () => {
    toast.success('Changes saved successfully');
    setIsEditing(false);
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'non_compliant':
        return <AlertCircle size={20} className="text-red-600" />;
      case 'in_progress':
        return <Clock size={20} className="text-yellow-600" />;
      case 'not_applicable':
        return <HelpCircle size={20} className="text-gray-600" />;
      default:
        return <HelpCircle size={20} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-100 text-green-800';
      case 'non_compliant':
        return 'bg-red-100 text-red-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'not_applicable':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'compliant':
        return 'Compliant';
      case 'non_compliant':
        return 'Non-Compliant';
      case 'in_progress':
        return 'In Progress';
      case 'not_applicable':
        return 'Not Applicable';
      default:
        return 'Not Started';
    }
  };

  if (!selectedRule) {
    return (
      <Card className="h-full">
        <CardContent className="flex flex-col h-full items-center justify-center p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <FileText size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Rule Selected</h3>
          <p className="text-gray-500 max-w-md">
            Select a rule from the list to view its details and manage its compliance status.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center mb-2">
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-2">
                {selectedRule.number}
              </span>
              <span className={`text-sm px-2 py-0.5 rounded flex items-center ${getStatusColor(status)}`}>
                {getStatusIcon(status)}
                <span className="ml-1">{getStatusText(status)}</span>
              </span>
            </div>
            <h2 className="text-xl font-semibold">{selectedRule.content}</h2>
          </div>
          <div>
            {isEditing ? (
              <Button 
                size="sm"
                leftIcon={<Save size={16} />}
                onClick={handleSave}
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

        {selectedRule.description && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
            <p className="text-gray-700">{selectedRule.description}</p>
          </div>
        )}

        {selectedRule.requirement && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Requirement</h3>
            <div className="bg-gray-50 rounded p-3 border border-gray-200 text-sm">
              {selectedRule.requirement}
            </div>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Compliance Status</h3>
          {isEditing ? (
            <div className="grid grid-cols-2 gap-2 md:flex md:space-x-2">
              <button
                className={`px-3 py-2 rounded border ${status === 'compliant' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:bg-gray-50'} flex items-center`}
                onClick={() => handleStatusChange('compliant')}
              >
                <CheckCircle size={16} className="text-green-600 mr-2" />
                <span>Compliant</span>
              </button>
              <button
                className={`px-3 py-2 rounded border ${status === 'in_progress' ? 'border-yellow-600 bg-yellow-50' : 'border-gray-200 hover:bg-gray-50'} flex items-center`}
                onClick={() => handleStatusChange('in_progress')}
              >
                <Clock size={16} className="text-yellow-600 mr-2" />
                <span>In Progress</span>
              </button>
              <button
                className={`px-3 py-2 rounded border ${status === 'non_compliant' ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:bg-gray-50'} flex items-center`}
                onClick={() => handleStatusChange('non_compliant')}
              >
                <AlertCircle size={16} className="text-red-600 mr-2" />
                <span>Non-Compliant</span>
              </button>
              <button
                className={`px-3 py-2 rounded border ${status === 'not_applicable' ? 'border-gray-600 bg-gray-50' : 'border-gray-200 hover:bg-gray-50'} flex items-center`}
                onClick={() => handleStatusChange('not_applicable')}
              >
                <HelpCircle size={16} className="text-gray-600 mr-2" />
                <span>Not Applicable</span>
              </button>
            </div>
          ) : (
            <div className={`inline-flex items-center px-3 py-2 rounded ${getStatusColor(status)}`}>
              {getStatusIcon(status)}
              <span className="ml-2">{getStatusText(status)}</span>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Notes</h3>
          {isEditing ? (
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2 min-h-[100px]"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add implementation notes here..."
            />
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded p-3 min-h-[80px]">
              {notes || "No notes added yet."}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Evidence Documents</h3>
          <div className="bg-gray-50 border border-gray-200 rounded p-4 text-center">
            <p className="text-sm text-gray-500 mb-3">Upload documents as evidence for this requirement</p>
            <Button 
              variant="outline" 
              size="sm"
              leftIcon={<Upload size={16} />}
              onClick={() => toast.info('Document upload feature coming soon')}
            >
              Upload Document
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RuleDetails;
