
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface ImplementationEditorProps {
  isEditing: boolean;
  content: string;
  onChange: (content: string) => void;
}

const ImplementationEditor: React.FC<ImplementationEditorProps> = ({ 
  isEditing, 
  content, 
  onChange 
}) => {
  return isEditing ? (
    <Textarea
      className="w-full border border-gray-300 rounded px-3 py-2 min-h-[200px]"
      value={content || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Add implementation notes here..."
    />
  ) : (
    <div className="bg-gray-50 border border-gray-200 rounded p-3 min-h-[150px] whitespace-pre-wrap">
      {content || "No notes added yet."}
    </div>
  );
};

export default ImplementationEditor;
