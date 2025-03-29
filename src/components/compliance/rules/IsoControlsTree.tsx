
import React from 'react';

export interface IsoControlsTreeProps {
  onSelectControl: (control: any) => void;
  selectedRuleId: number | null;
}

const IsoControlsTree: React.FC<IsoControlsTreeProps> = ({ onSelectControl, selectedRuleId }) => {
  // Simplified dummy tree for now
  const controls = [
    { id: 'A.5.1', title: 'Information security policies', status: 'implemented' },
    { id: 'A.5.2', title: 'Review of the policies for information security', status: 'in_progress' },
    { id: 'A.6.1', title: 'Internal organization', status: 'not_implemented' },
    { id: 'A.6.2', title: 'Mobile devices and teleworking', status: 'implemented' },
    { id: 'A.7.1', title: 'Prior to employment', status: 'not_applicable' },
    { id: 'A.7.2', title: 'During employment', status: 'implemented' },
  ];
  
  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
      <h3 className="font-semibold text-lg mb-4">ISO 27001 Controls</h3>
      <div className="space-y-1">
        {controls.map((control) => {
          const controlIdNum = parseInt(control.id.replace(/\D/g, '')) || 0;
          const isSelected = selectedRuleId === controlIdNum;
          
          return (
            <div 
              key={control.id}
              onClick={() => onSelectControl(control)}
              className={`p-2 rounded cursor-pointer flex items-center ${
                isSelected ? 'bg-primary text-white' : 'hover:bg-gray-100'
              }`}
            >
              <div className={`w-2 h-2 rounded-full mr-2 ${
                control.status === 'implemented' ? 'bg-green-500' :
                control.status === 'in_progress' ? 'bg-yellow-500' :
                control.status === 'not_implemented' ? 'bg-red-500' : 'bg-gray-400'
              }`}></div>
              <span>{control.id} - {control.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IsoControlsTree;
