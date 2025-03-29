
import React, { useState, useEffect, useMemo } from 'react';
import { Tree } from 'react-complex-tree';
import 'react-complex-tree/lib/style-modern.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ComplianceRule } from '@/components/compliance/types/complianceTypes';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface IsoControlsTreeProps {
  onSelectControl: (control: any) => void;
  selectedRuleId: number | null;
  frameworkId: string;
}

// Define the structure for ISO control tree items
interface TreeItem {
  id: string;
  children?: string[];
  data: {
    title: string;
    control?: any;
    isSection?: boolean;
  };
}

const IsoControlsTree: React.FC<IsoControlsTreeProps> = ({
  onSelectControl,
  selectedRuleId,
  frameworkId
}) => {
  const [treeData, setTreeData] = useState<{ [key: string]: TreeItem }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const treeId = 'iso-controls-tree';

  useEffect(() => {
    // Transform the data into a format suitable for the tree component
    const fetchAndFormatControls = async () => {
      setIsLoading(true);
      try {
        let controls = [];
        
        // Get standard ISO controls data
        const isoData = require('@/components/compliance/rules/iso27001.json');
        
        if (frameworkId === 'soc2') {
          // Try to get SOC2 data from database
          const { data, error } = await supabase
            .from('soc2_requirements')
            .select('*')
            .order('control_number');
            
          if (error) throw error;
          
          if (data && data.length > 0) {
            controls = data.map((item: any) => ({
              id: item.id,
              number: item.control_number,
              title: item.title,
              description: item.description,
              requirement: item.requirement,
              status: 'in_progress'
            }));
          } else {
            // Fallback to hardcoded SOC2 data if needed
            const soc2Data = require('@/components/compliance/rules/soc2.json');
            controls = soc2Data;
          }
        } else if (frameworkId === 'iso27001') {
          controls = isoData;
        } else {
          // Fallback to empty array for other frameworks
          controls = [];
        }
        
        // Convert controls to tree structure
        const items: { [key: string]: TreeItem } = {
          root: {
            id: 'root',
            children: [],
            data: {
              title: frameworkId === 'soc2' ? 'SOC 2 Controls' : 'ISO 27001 Controls',
              isSection: true
            }
          }
        };
        
        // Group by major sections (for ISO) or categories (for SOC2)
        if (frameworkId === 'iso27001') {
          // Group ISO controls by their main section (e.g., A.5, A.6)
          const sections: { [key: string]: string[] } = {};
          
          controls.forEach((control: any) => {
            const sectionId = control.number.split('.')[0]; // e.g., "A.5" from "A.5.1.1"
            if (!sections[sectionId]) {
              sections[sectionId] = [];
            }
            
            const controlId = `control-${control.id}`;
            sections[sectionId].push(controlId);
            
            items[controlId] = {
              id: controlId,
              data: {
                title: `${control.number} ${control.title}`,
                control: control
              }
            };
          });
          
          // Create section items
          Object.keys(sections).forEach(sectionId => {
            const sectionItemId = `section-${sectionId}`;
            items[sectionItemId] = {
              id: sectionItemId,
              children: sections[sectionId],
              data: {
                title: getSectionTitle(sectionId),
                isSection: true
              }
            };
            
            items.root.children!.push(sectionItemId);
          });
        } else if (frameworkId === 'soc2') {
          // For SOC2, group by TSC categories (Common Criteria, Availability, etc.)
          const categories: { [key: string]: string[] } = {
            'CC': [],
            'A': [],
            'C': [],
            'PI': [],
            'P': []
          };
          
          controls.forEach((control: any) => {
            // Extract prefix (CC, A, C, PI, P) from control number
            const prefix = control.number.split('.')[0];
            const controlId = `control-${control.id}`;
            
            if (categories[prefix]) {
              categories[prefix].push(controlId);
            } else {
              categories['CC'].push(controlId);
            }
            
            items[controlId] = {
              id: controlId,
              data: {
                title: `${control.number} ${control.title}`,
                control: control
              }
            };
          });
          
          // Map category codes to full names
          const categoryNames: { [key: string]: string } = {
            'CC': 'Common Criteria',
            'A': 'Availability',
            'C': 'Confidentiality',
            'PI': 'Processing Integrity',
            'P': 'Privacy'
          };
          
          // Create category items
          Object.keys(categories).forEach(categoryId => {
            if (categories[categoryId].length > 0) {
              const categoryItemId = `category-${categoryId}`;
              items[categoryItemId] = {
                id: categoryItemId,
                children: categories[categoryId],
                data: {
                  title: categoryNames[categoryId] || categoryId,
                  isSection: true
                }
              };
              
              items.root.children!.push(categoryItemId);
            }
          });
        }
        
        setTreeData(items);
        
        // Auto-expand the root and main sections
        setExpandedItems(['root', ...Object.keys(items).filter(id => id.startsWith('section-') || id.startsWith('category-'))]);
        
      } catch (error) {
        console.error('Error loading controls:', error);
        toast.error('Failed to load control data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAndFormatControls();
  }, [frameworkId]);

  // Get ISO section titles
  const getSectionTitle = (sectionId: string): string => {
    const sectionTitles: { [key: string]: string } = {
      'A.5': 'Information Security Policies',
      'A.6': 'Organization of Information Security',
      'A.7': 'Human Resource Security',
      'A.8': 'Asset Management',
      'A.9': 'Access Control',
      'A.10': 'Cryptography',
      'A.11': 'Physical and Environmental Security',
      'A.12': 'Operations Security',
      'A.13': 'Communications Security',
      'A.14': 'System Acquisition, Development, Maintenance',
      'A.15': 'Supplier Relationships',
      'A.16': 'Information Security Incident Management',
      'A.17': 'Business Continuity Management',
      'A.18': 'Compliance'
    };
    
    return sectionTitles[sectionId] || sectionId;
  };

  // Customize the tree rendering
  const renderers = useMemo(() => {
    return {
      renderItemTitle: ({ title, isSection, depth }: any) => (
        <div className={`tree-item-title ${isSection ? 'font-semibold' : ''}`}>
          {title}
        </div>
      ),
      renderItemArrow: ({ item, context }: any) => {
        // Only render arrows for items with children
        if (!item.children || item.children.length === 0) return null;
        
        return (
          <div className={`arrow ${context.isExpanded ? 'expanded' : ''}`}>
            {context.isExpanded ? '▼' : '►'}
          </div>
        );
      }
    };
  }, []);

  const handleSelectItem = (items: string[]) => {
    if (items.length > 0) {
      const selectedId = items[0];
      if (selectedId.startsWith('control-')) {
        const control = treeData[selectedId]?.data.control;
        if (control) {
          onSelectControl(control);
        }
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <DndProvider backend={HTML5Backend}>
        <div className="p-2 bg-gray-50 border-b border-gray-200">
          <h3 className="font-medium">
            {frameworkId === 'soc2' ? 'SOC 2 Controls' : 'ISO 27001 Controls'}
          </h3>
        </div>
        <div className="max-h-[calc(100vh-250px)] overflow-auto p-2">
          {Object.keys(treeData).length > 0 && (
            <Tree
              treeId={treeId}
              data={treeData}
              rootItem="root"
              defaultInteractionMode="click"
              renderItem={({ item, depth, children, title, context, arrow }) => (
                <div className={`tree-item ${context.isSelected ? 'bg-blue-100' : ''} p-1 flex items-center`}>
                  {arrow}
                  <div className="ml-1">
                    {renderers.renderItemTitle({
                      title: item.data.title,
                      isSection: item.data.isSection,
                      depth
                    })}
                  </div>
                  {children}
                </div>
              )}
              renderItemArrow={({ item, context }) => renderers.renderItemArrow({ item, context })}
              renderItemTitle={({ title, item }) => 
                renderers.renderItemTitle({
                  title,
                  isSection: item.data.isSection,
                  depth: 0
                })
              }
              expandedItems={expandedItems}
              onExpandItem={(itemId) => setExpandedItems([...expandedItems, itemId])}
              onCollapseItem={(itemId) => 
                setExpandedItems(expandedItems.filter(id => id !== itemId))
              }
              selectedItems={selectedRuleId ? [`control-${selectedRuleId}`] : []}
              onSelectItems={handleSelectItem}
            />
          )}
        </div>
      </DndProvider>
    </div>
  );
};

export default IsoControlsTree;
