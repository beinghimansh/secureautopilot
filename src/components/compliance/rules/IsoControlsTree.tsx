
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Folder, File, ChevronRight, ChevronDown } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

export interface IsoControlsTreeProps {
  onSelectControl: (control: any) => void;
  selectedRuleId: number | null;
  frameworkId?: string;
}

interface TreeItem {
  id: string;
  title: string;
  type: 'category' | 'control';
  children?: TreeItem[];
  status?: string;
  expanded?: boolean;
  parent?: string;
  description?: string;
  requirement?: string;
}

const IsoControlsTree: React.FC<IsoControlsTreeProps> = ({ 
  onSelectControl, 
  selectedRuleId,
  frameworkId = 'iso27001'
}) => {
  const [treeData, setTreeData] = useState<TreeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    const fetchControls = async () => {
      setLoading(true);
      try {
        if (frameworkId === 'soc2') {
          // Fetch SOC2 requirements from the database
          const { data, error } = await supabase
            .from('soc2_requirements')
            .select('*')
            .order('control_number');
          
          if (error) throw error;
          
          if (data && data.length > 0) {
            // Transform data into tree structure
            const tempTreeData: TreeItem[] = [
              {
                id: 'cc',
                title: 'Common Criteria',
                type: 'category',
                expanded: true,
                children: []
              },
              {
                id: 'a',
                title: 'Availability',
                type: 'category',
                expanded: false,
                children: []
              },
              {
                id: 'c',
                title: 'Confidentiality',
                type: 'category',
                expanded: false,
                children: []
              }
            ];
            
            // Group controls by category
            data.forEach(item => {
              const control = {
                id: item.id,
                title: `${item.control_number}: ${item.title}`,
                type: 'control' as const,
                status: 'not_implemented',
                description: item.description,
                requirement: item.requirement
              };
              
              // Add to appropriate category
              if (item.control_number.startsWith('CC')) {
                tempTreeData[0].children?.push(control);
              } else if (item.control_number.startsWith('A')) {
                tempTreeData[1].children?.push(control);
              } else if (item.control_number.startsWith('C')) {
                tempTreeData[2].children?.push(control);
              }
            });
            
            setTreeData(tempTreeData);
            setExpandedItems({ cc: true });
          } else {
            // Fallback for SOC 2 controls if database is empty
            setTreeData(getSoc2FallbackTree());
            setExpandedItems({ cc: true });
          }
        } else {
          // Default ISO 27001 controls structure
          setTreeData(getIso27001Tree());
          setExpandedItems({ a5: true });
        }
      } catch (error) {
        console.error('Error fetching controls:', error);
        toast.error('Failed to load controls data');
        
        // Use fallback data
        if (frameworkId === 'soc2') {
          setTreeData(getSoc2FallbackTree());
        } else {
          setTreeData(getIso27001Tree());
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchControls();
  }, [frameworkId]);
  
  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };
  
  const renderTreeItems = (items: TreeItem[]) => {
    return items.map(item => (
      <div key={item.id} className="ml-1">
        {item.type === 'category' ? (
          <div className="mb-1">
            <button
              onClick={() => toggleExpand(item.id)}
              className="flex items-center w-full text-left py-1 px-2 hover:bg-gray-100 rounded"
            >
              {expandedItems[item.id] ? (
                <ChevronDown size={16} className="mr-1 text-gray-400" />
              ) : (
                <ChevronRight size={16} className="mr-1 text-gray-400" />
              )}
              <Folder size={16} className="mr-2 text-blue-500" />
              <span className="text-sm font-medium">{item.title}</span>
            </button>
            
            {expandedItems[item.id] && item.children && item.children.length > 0 && (
              <div className="ml-4 border-l border-gray-200 pl-2 mt-1">
                {renderTreeItems(item.children)}
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => onSelectControl(item)}
            className={`flex items-center w-full text-left py-1 px-2 rounded mb-1 text-sm ${
              selectedRuleId === parseInt(item.id) ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
            }`}
          >
            <File size={16} className="mr-2 text-gray-500" />
            <span>{item.title}</span>
            {item.status && (
              <span className={`ml-auto w-2 h-2 rounded-full ${getStatusColor(item.status)}`}></span>
            )}
          </button>
        )}
      </div>
    ));
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implemented':
      case 'compliant':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-yellow-500';
      case 'not_implemented':
      case 'non_compliant':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };
  
  // Fallback data functions
  const getIso27001Tree = (): TreeItem[] => {
    return [
      {
        id: 'a5',
        title: 'A.5 Information Security Policies',
        type: 'category',
        expanded: true,
        children: [
          { id: '1', title: 'A.5.1 Information security policies', type: 'control', status: 'implemented' },
          { id: '2', title: 'A.5.2 Review of the policies for information security', type: 'control', status: 'in_progress' }
        ]
      },
      {
        id: 'a6',
        title: 'A.6 Organization of Information Security',
        type: 'category',
        children: [
          { id: '3', title: 'A.6.1 Internal organization', type: 'control', status: 'not_implemented' },
          { id: '4', title: 'A.6.2 Mobile devices and teleworking', type: 'control', status: 'implemented' }
        ]
      },
      {
        id: 'a7',
        title: 'A.7 Human Resource Security',
        type: 'category',
        children: [
          { id: '5', title: 'A.7.1 Prior to employment', type: 'control', status: 'not_applicable' },
          { id: '6', title: 'A.7.2 During employment', type: 'control', status: 'implemented' }
        ]
      }
    ];
  };
  
  const getSoc2FallbackTree = (): TreeItem[] => {
    return [
      {
        id: 'cc',
        title: 'Common Criteria',
        type: 'category',
        expanded: true,
        children: [
          { id: '1', title: 'CC1.1: COSO Principle 1', type: 'control', status: 'not_implemented' },
          { id: '2', title: 'CC1.2: COSO Principle 2', type: 'control', status: 'in_progress' },
          { id: '3', title: 'CC2.1: Communication and Information', type: 'control', status: 'implemented' },
          { id: '4', title: 'CC3.1: Risk Assessment Process', type: 'control', status: 'not_implemented' }
        ]
      },
      {
        id: 'a',
        title: 'Availability',
        type: 'category',
        children: [
          { id: '5', title: 'A1.1: Availability Performance Objectives', type: 'control', status: 'not_implemented' },
          { id: '6', title: 'A1.2: Availability Recovery Plan', type: 'control', status: 'in_progress' }
        ]
      },
      {
        id: 'c',
        title: 'Confidentiality',
        type: 'category',
        children: [
          { id: '7', title: 'C1.1: Confidentiality Policies', type: 'control', status: 'not_implemented' },
          { id: '8', title: 'C1.2: Confidentiality of Inputs', type: 'control', status: 'not_implemented' }
        ]
      }
    ];
  };
  
  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow border border-gray-100 h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-100 h-full">
      <h3 className="font-semibold text-lg mb-4">
        {frameworkId === 'soc2' ? 'SOC 2 Controls' : 
         frameworkId === 'iso27001' ? 'ISO 27001 Controls' : 
         frameworkId === 'gdpr' ? 'GDPR Controls' :
         frameworkId === 'hipaa' ? 'HIPAA Controls' :
         'Compliance Controls'}
      </h3>
      <ScrollArea className="h-[calc(100vh-260px)]">
        <div className="pr-4">{renderTreeItems(treeData)}</div>
      </ScrollArea>
    </div>
  );
};

export default IsoControlsTree;
