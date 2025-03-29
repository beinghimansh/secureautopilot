import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Folder, File, ChevronRight, ChevronDown } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { TreeItem } from '@/components/compliance/types/complianceTypes';
import TreeView from 'react-treeview';
import 'react-treeview/react-treeview.css';

export interface IsoControlsTreeProps {
  onSelectControl: (control: any) => void;
  selectedRuleId: number | null;
  frameworkId?: string;
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
              const control: TreeItem = {
                id: item.id,
                title: `${item.control_number}: ${item.title}`,
                type: 'control',
                status: 'not_implemented',
                description: item.description,
                requirement: item.requirement,
                number: item.control_number
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
            const fallbackData = getSoc2FallbackTree();
            setTreeData(fallbackData);
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
  
  // Tree rendering with react-treeview
  const renderTreeWithLibrary = (items: TreeItem[]) => {
    return items.map(item => {
      if (item.type === 'category' && item.children && item.children.length > 0) {
        const isExpanded = expandedItems[item.id] || false;
        const label = (
          <div 
            className="flex items-center py-1 cursor-pointer"
            onClick={() => toggleExpand(item.id)}
          >
            <Folder size={16} className="mr-2 text-blue-500" />
            <span className="text-sm font-medium">{item.title}</span>
          </div>
        );
        
        return (
          <TreeView 
            key={item.id} 
            nodeLabel={label} 
            defaultCollapsed={!isExpanded}
            itemClassName="my-1"
            treeViewClassName="ml-2 border-l border-gray-200 pl-2"
          >
            {renderTreeWithLibrary(item.children)}
          </TreeView>
        );
      } else {
        return (
          <div 
            key={item.id}
            className={`flex items-center w-full text-left py-1 px-2 rounded mb-1 text-sm cursor-pointer ${
              selectedRuleId === parseInt(item.id.toString()) ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
            }`}
            onClick={() => onSelectControl(item)}
          >
            <File size={16} className="mr-2 text-gray-500" />
            <span>{item.title}</span>
            {item.status && (
              <span className={`ml-auto w-2.5 h-2.5 rounded-full ${getStatusColor(item.status)}`}></span>
            )}
          </div>
        );
      }
    });
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
          { 
            id: '1', 
            title: 'A.5.1 Information security policies', 
            type: 'control', 
            status: 'implemented' 
          },
          { 
            id: '2', 
            title: 'A.5.2 Review of the policies for information security', 
            type: 'control', 
            status: 'in_progress' 
          }
        ]
      },
      {
        id: 'a6',
        title: 'A.6 Organization of Information Security',
        type: 'category',
        children: [
          { 
            id: '3', 
            title: 'A.6.1 Internal organization', 
            type: 'control', 
            status: 'not_implemented' 
          },
          { 
            id: '4', 
            title: 'A.6.2 Mobile devices and teleworking', 
            type: 'control', 
            status: 'implemented' 
          }
        ]
      },
      {
        id: 'a7',
        title: 'A.7 Human Resource Security',
        type: 'category',
        children: [
          { 
            id: '5', 
            title: 'A.7.1 Prior to employment', 
            type: 'control', 
            status: 'not_applicable' 
          },
          { 
            id: '6', 
            title: 'A.7.2 During employment', 
            type: 'control', 
            status: 'implemented' 
          }
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
          { 
            id: '1', 
            title: 'CC1.1: COSO Principle 1: Demonstrates Commitment to Integrity and Ethical Values', 
            type: 'control', 
            status: 'not_implemented', 
            number: 'CC1.1', 
            description: 'The entity demonstrates a commitment to integrity and ethical values.', 
            requirement: 'Organization should establish a code of conduct that defines ethical expectations and acceptable workplace behavior.' 
          },
          { 
            id: '2', 
            title: 'CC1.2: Board Independence and Oversight', 
            type: 'control', 
            status: 'in_progress', 
            number: 'CC1.2', 
            description: 'The board of directors demonstrates independence from management and exercises oversight of the development and performance of internal control.', 
            requirement: 'Board of directors should include members who are independent from management and provide oversight of the system.' 
          },
          { 
            id: '3', 
            title: 'CC2.1: Communication and Information', 
            type: 'control', 
            status: 'implemented', 
            number: 'CC2.1', 
            description: 'The entity obtains or generates and uses relevant, quality information to support the functioning of internal control.', 
            requirement: 'Organization should implement processes to identify information requirements needed for control objectives.' 
          },
          { 
            id: '4', 
            title: 'CC3.1: Risk Assessment Process', 
            type: 'control', 
            status: 'not_implemented', 
            number: 'CC3.1', 
            description: 'The entity specifies objectives with sufficient clarity to enable the identification and assessment of risks relating to objectives.', 
            requirement: 'Organization should establish formal risk assessment processes and document specific control objectives.' 
          },
          { 
            id: '5', 
            title: 'CC4.1: Control Activities Design', 
            type: 'control', 
            status: 'in_progress', 
            number: 'CC4.1', 
            description: 'The entity selects and develops control activities that contribute to the mitigation of risks to the achievement of objectives to acceptable levels.', 
            requirement: 'Organization should implement appropriate controls to mitigate identified risks to acceptable levels.' 
          },
          { 
            id: '6', 
            title: 'CC5.1: Logical Access Controls', 
            type: 'control', 
            status: 'not_implemented', 
            number: 'CC5.1', 
            description: 'The entity selects and develops control activities over technology to support the achievement of objectives.', 
            requirement: 'Organization should implement logical access security measures to protect against unauthorized access to systems.' 
          },
          { 
            id: '7', 
            title: 'CC6.1: Security Policy', 
            type: 'control', 
            status: 'implemented', 
            number: 'CC6.1', 
            description: 'The entity implements logical access security software, infrastructure, and architectures over protected information assets to protect them from security events.', 
            requirement: 'Organization should establish formal security policies to protect information assets.' 
          },
          { 
            id: '8', 
            title: 'CC7.1: Incident Response', 
            type: 'control', 
            status: 'in_progress', 
            number: 'CC7.1', 
            description: 'The entity selects and develops control activities to identify and respond to security breaches and other incidents in a timely manner.', 
            requirement: 'Organization should establish incident response procedures to identify, respond to, and mitigate security incidents.' 
          },
          { 
            id: '9', 
            title: 'CC8.1: Change Management', 
            type: 'control', 
            status: 'not_implemented', 
            number: 'CC8.1', 
            description: 'The entity authorizes, designs, develops or acquires, configures, documents, tests, approves, and implements changes to infrastructure, data, software, and procedures to meet its objectives.', 
            requirement: 'Organization should implement formal change management processes for all system changes.' 
          },
          { 
            id: '10', 
            title: 'CC9.1: Risk Mitigation Activities', 
            type: 'control', 
            status: 'implemented', 
            number: 'CC9.1', 
            description: 'The entity identifies, selects, and develops risk mitigation activities for risks arising from potential business disruptions.', 
            requirement: 'Organization should implement business continuity and disaster recovery plans to mitigate business disruption risks.' 
          }
        ]
      },
      {
        id: 'a',
        title: 'Availability',
        type: 'category',
        children: [
          { 
            id: '11', 
            title: 'A1.1: Availability Performance Objectives', 
            type: 'control', 
            status: 'not_implemented', 
            number: 'A1.1', 
            description: 'The entity maintains, monitors, and evaluates current processing capacity and use of system components to manage capacity demand and to enable the implementation of additional capacity to help meet availability commitments and requirements.', 
            requirement: 'Organization should define and monitor performance metrics for system availability.' 
          },
          { 
            id: '12', 
            title: 'A1.2: Availability Recovery Plan', 
            type: 'control', 
            status: 'in_progress', 
            number: 'A1.2', 
            description: 'The entity authorizes, designs, develops or acquires, implements, operates, approves, maintains, and monitors environmental protections, software, data backup processes, and recovery infrastructure to meet its availability commitments and requirements.', 
            requirement: 'Organization should implement and test backup and recovery procedures for critical systems and data.' 
          }
        ]
      },
      {
        id: 'c',
        title: 'Confidentiality',
        type: 'category',
        children: [
          { 
            id: '13', 
            title: 'C1.1: Confidentiality Policies', 
            type: 'control', 
            status: 'not_implemented', 
            number: 'C1.1', 
            description: 'The entity identifies and maintains confidential information to meet the entity\'s confidentiality commitments and requirements.', 
            requirement: 'Organization should establish policies for identifying and protecting confidential information.' 
          },
          { 
            id: '14', 
            title: 'C1.2: Confidentiality of Inputs', 
            type: 'control', 
            status: 'not_implemented', 
            number: 'C1.2', 
            description: 'The entity disposes of confidential information to meet the entity\'s confidentiality commitments and requirements.', 
            requirement: 'Organization should implement secure disposal procedures for confidential information when no longer needed.' 
          }
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
        <div className="pr-4">
          {renderTreeWithLibrary(treeData)}
        </div>
      </ScrollArea>
    </div>
  );
};

export default IsoControlsTree;
