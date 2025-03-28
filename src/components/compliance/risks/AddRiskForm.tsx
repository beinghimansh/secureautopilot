
import React from 'react';
import Button from '@/components/common/Button';

interface AddRiskFormProps {
  newRisk: {
    title: string;
    description: string;
    likelihood: string;
    impact: string;
  };
  setNewRisk: React.Dispatch<React.SetStateAction<{
    title: string;
    description: string;
    likelihood: string;
    impact: string;
  }>>;
  onCancel: () => void;
  onSubmit: () => void;
}

const AddRiskForm: React.FC<AddRiskFormProps> = ({ newRisk, setNewRisk, onCancel, onSubmit }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
      <h3 className="text-lg font-medium mb-4">Add New Risk</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Risk Title</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={newRisk.title}
            onChange={(e) => setNewRisk({ ...newRisk, title: e.target.value })}
            placeholder="E.g., Unauthorized Data Access"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md min-h-[80px]"
            value={newRisk.description}
            onChange={(e) => setNewRisk({ ...newRisk, description: e.target.value })}
            placeholder="Describe the risk in detail..."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Likelihood</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newRisk.likelihood}
              onChange={(e) => setNewRisk({ ...newRisk, likelihood: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Impact</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newRisk.impact}
              onChange={(e) => setNewRisk({ ...newRisk, impact: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button onClick={onSubmit}>
            Add Risk
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddRiskForm;
