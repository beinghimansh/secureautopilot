
import React from 'react';
import { ChevronLeft, Save, Loader2 } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RuleDetailFormProps {
  selectedRule: any;
  implementationNotes: string | null;
  handleNotesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleStatusChange: (value: string) => void;
  saveImplementationNotes: () => Promise<void>;
  backToRulesList: () => void;
  saving: boolean;
}

const RuleDetailForm: React.FC<RuleDetailFormProps> = ({
  selectedRule,
  implementationNotes,
  handleNotesChange,
  handleStatusChange,
  saveImplementationNotes,
  backToRulesList,
  saving
}) => {
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

export default RuleDetailForm;
