
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Check, Clock, AlertCircle } from 'lucide-react';

interface ControlItem {
  id: string;
  title: string;
  status?: 'implemented' | 'in_progress' | 'not_implemented';
  children?: ControlItem[];
}

const isoControlsData: ControlItem[] = [
  {
    id: "A.5",
    title: "Information Security Policies",
    status: "in_progress",
    children: [
      {
        id: "A.5.1",
        title: "Policies for information security",
        status: "implemented",
        children: [
          { id: "A.5.1.1", title: "Policies for information security", status: "implemented" },
          { id: "A.5.1.2", title: "Review of the policies for information security", status: "implemented" }
        ]
      }
    ]
  },
  {
    id: "A.6",
    title: "Organization of Information Security",
    status: "implemented",
    children: [
      {
        id: "A.6.1",
        title: "Internal organization",
        status: "implemented",
        children: [
          { id: "A.6.1.1", title: "Information security roles and responsibilities", status: "implemented" },
          { id: "A.6.1.2", title: "Segregation of duties", status: "implemented" },
          { id: "A.6.1.3", title: "Contact with authorities", status: "implemented" },
          { id: "A.6.1.4", title: "Contact with special interest groups", status: "implemented" },
          { id: "A.6.1.5", title: "Information security in project management", status: "implemented" }
        ]
      },
      {
        id: "A.6.2",
        title: "Mobile devices and teleworking",
        status: "implemented",
        children: [
          { id: "A.6.2.1", title: "Mobile device policy", status: "implemented" },
          { id: "A.6.2.2", title: "Teleworking", status: "implemented" }
        ]
      }
    ]
  },
  {
    id: "A.7",
    title: "Human Resource Security",
    status: "not_implemented",
    children: [
      {
        id: "A.7.1",
        title: "Prior to employment",
        status: "not_implemented",
        children: [
          { id: "A.7.1.1", title: "Screening", status: "not_implemented" },
          { id: "A.7.1.2", title: "Terms and conditions of employment", status: "not_implemented" }
        ]
      },
      {
        id: "A.7.2",
        title: "During employment",
        status: "not_implemented",
        children: [
          { id: "A.7.2.1", title: "Management responsibilities", status: "not_implemented" },
          { id: "A.7.2.2", title: "Information security awareness, education and training", status: "not_implemented" },
          { id: "A.7.2.3", title: "Disciplinary process", status: "not_implemented" }
        ]
      },
      {
        id: "A.7.3",
        title: "Termination and change of employment",
        status: "not_implemented",
        children: [
          { id: "A.7.3.1", title: "Termination or change of employment responsibilities", status: "not_implemented" }
        ]
      }
    ]
  },
  {
    id: "A.8",
    title: "Asset Management",
    status: "in_progress",
    children: [
      {
        id: "A.8.1",
        title: "Responsibility for assets",
        status: "in_progress",
        children: [
          { id: "A.8.1.1", title: "Inventory of assets", status: "in_progress" },
          { id: "A.8.1.2", title: "Ownership of assets", status: "in_progress" },
          { id: "A.8.1.3", title: "Acceptable use of assets", status: "in_progress" },
          { id: "A.8.1.4", title: "Return of assets", status: "not_implemented" }
        ]
      },
      {
        id: "A.8.2",
        title: "Information classification",
        status: "in_progress",
        children: [
          { id: "A.8.2.1", title: "Classification of information", status: "in_progress" },
          { id: "A.8.2.2", title: "Labelling of information", status: "not_implemented" },
          { id: "A.8.2.3", title: "Handling of assets", status: "not_implemented" }
        ]
      },
      {
        id: "A.8.3",
        title: "Media handling",
        status: "not_implemented",
        children: [
          { id: "A.8.3.1", title: "Management of removable media", status: "not_implemented" },
          { id: "A.8.3.2", title: "Disposal of media", status: "not_implemented" },
          { id: "A.8.3.3", title: "Physical media transfer", status: "not_implemented" }
        ]
      }
    ]
  },
  {
    id: "A.9",
    title: "Access Control",
    status: "implemented",
    children: [
      {
        id: "A.9.1",
        title: "Business requirements of access control",
        status: "implemented",
        children: [
          { id: "A.9.1.1", title: "Access control policy", status: "implemented" },
          { id: "A.9.1.2", title: "Access to networks and network services", status: "implemented" }
        ]
      }
    ]
  }
];

// Add more ISO 27001 controls following the same structure...

interface TreeNodeProps {
  item: ControlItem;
  level: number;
  onSelect: (item: ControlItem) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ item, level, onSelect }) => {
  const [expanded, setExpanded] = useState(level < 1);
  
  const hasChildren = item.children && item.children.length > 0;
  const paddingLeft = `${level * 20 + 8}px`;
  
  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'implemented':
        return <Check size={16} className="text-green-600" />;
      case 'in_progress':
        return <Clock size={16} className="text-yellow-600" />;
      case 'not_implemented':
        return <AlertCircle size={16} className="text-red-600" />;
      default:
        return null;
    }
  };
  
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'implemented':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'not_implemented':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div>
      <div 
        className={`flex items-center py-2 hover:bg-gray-50 cursor-pointer ${level === 0 ? 'border-t' : ''}`}
        onClick={() => {
          if (hasChildren) {
            setExpanded(!expanded);
          }
          onSelect(item);
        }}
      >
        <div style={{ paddingLeft }} className="flex items-center flex-1">
          {hasChildren ? (
            expanded ? 
              <ChevronDown size={16} className="mr-1 text-gray-500" /> : 
              <ChevronRight size={16} className="mr-1 text-gray-500" />
          ) : (
            <div className="w-4 mr-1"></div>
          )}
          
          <div className="flex items-center">
            <span className={`text-sm font-medium ${level === 0 ? 'text-blue-700' : 'text-gray-700'}`}>
              {item.id && `${item.id}: `}{item.title}
            </span>
          </div>
        </div>
        
        {item.status && (
          <div className="mr-4 flex items-center">
            {getStatusIcon(item.status)}
          </div>
        )}
      </div>
      
      {expanded && hasChildren && (
        <div className="ml-2">
          {item.children?.map((child) => (
            <TreeNode 
              key={child.id} 
              item={child} 
              level={level + 1} 
              onSelect={onSelect} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface IsoControlsTreeProps {
  onSelectControl: (control: ControlItem) => void;
}

const IsoControlsTree: React.FC<IsoControlsTreeProps> = ({ onSelectControl }) => {
  return (
    <div className="bg-white border rounded-md shadow-sm">
      <div className="p-4 border-b">
        <h3 className="font-medium text-lg">ISO 27001 Controls</h3>
        <p className="text-sm text-gray-600">Select a control to view details</p>
      </div>
      
      <div className="max-h-[600px] overflow-y-auto">
        {isoControlsData.map((item) => (
          <TreeNode 
            key={item.id} 
            item={item} 
            level={0} 
            onSelect={onSelectControl} 
          />
        ))}
      </div>
    </div>
  );
};

export default IsoControlsTree;
