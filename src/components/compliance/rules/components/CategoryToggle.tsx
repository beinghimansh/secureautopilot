
import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CategoryToggleProps {
  id: string;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  itemsCount: number;
  label?: string;
}

const CategoryToggle: React.FC<CategoryToggleProps> = ({ 
  id, 
  isExpanded, 
  onToggle, 
  itemsCount,
  label = "Sub-controls"
}) => {
  return (
    <button
      onClick={() => onToggle(id)}
      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 mb-2"
    >
      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      <span className="ml-1">{label} ({itemsCount})</span>
    </button>
  );
};

export default CategoryToggle;
