
import React, { useState, useEffect, useMemo } from 'react';
import { Tree, StaticTreeDataProvider, TreeItemIndex, TreeItem, TreeItemRenderContext } from 'react-complex-tree';
import 'react-complex-tree/lib/style-modern.css';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronDown } from 'lucide-react';

// Define interface for the tree item data
interface TreeItemData {
  index: string;
  data: {
    title: string;
    status?: 'compliant' | 'non_compliant' | 'in_progress' | 'not_applicable';
    progress?: number;
  };
  children: string[];
  canMove?: boolean;
  isFolder?: boolean;
}

interface IsoControlsTreeProps {
  frameworkData: any;
  selectedControl: string | null;
  onSelectControl: (controlId: string) => void;
}

const IsoControlsTree: React.FC<IsoControlsTreeProps> = ({
  frameworkData,
  selectedControl,
  onSelectControl
}) => {
  const [focusedItem, setFocusedItem] = useState<TreeItemIndex | null>(null);
  const [expandedItems, setExpandedItems] = useState<TreeItemIndex[]>([]);
  const [selectedItems, setSelectedItems] = useState<TreeItemIndex[]>([]);

  // Build tree items from framework data
  const treeItems = useMemo(() => {
    if (!frameworkData || !frameworkData.controls) {
      return {};
    }

    const items: Record<string, TreeItemData> = {
      root: {
        index: 'root',
        data: {
          title: frameworkData.name || 'Framework Controls',
        },
        children: [],
        isFolder: true,
      },
    };

    // Group controls by domain if applicable
    const domains: Record<string, any> = {};
    
    frameworkData.controls.forEach((control: any) => {
      const domainId = control.domain || 'uncategorized';
      
      if (!domains[domainId]) {
        domains[domainId] = {
          id: domainId,
          name: control.domainName || domainId,
          controls: []
        };
      }
      
      domains[domainId].controls.push(control);
    });

    // Add domains as first-level items
    Object.keys(domains).forEach((domainId) => {
      const domain = domains[domainId];
      const domainItemId = `domain-${domainId}`;
      
      items[domainItemId] = {
        index: domainItemId,
        data: {
          title: domain.name,
        },
        children: [],
        isFolder: true,
      };
      
      items.root.children.push(domainItemId);
      
      // Add controls within each domain
      domain.controls.forEach((control: any) => {
        const controlId = control.id;
        
        items[controlId] = {
          index: controlId,
          data: {
            title: `${control.id}: ${control.title}`,
            status: control.status,
            progress: control.progress || 0
          },
          children: [],
        };
        
        items[domainItemId].children.push(controlId);
      });
    });

    return items;
  }, [frameworkData]);

  const dataProvider = useMemo(() => 
    new StaticTreeDataProvider(treeItems, (item, data) => ({ ...item, data })),
  [treeItems]);

  useEffect(() => {
    // Expand root item by default
    setExpandedItems(['root']);
    
    // Set selected control if provided
    if (selectedControl) {
      setSelectedItems([selectedControl]);
    }
  }, [selectedControl]);

  const handleItemSelect = (items: TreeItemIndex[]) => {
    if (items.length > 0) {
      const selectedId = items[0].toString();
      
      // Only select items that are actual controls (not folders)
      if (selectedId !== 'root' && !selectedId.startsWith('domain-')) {
        setSelectedItems(items);
        onSelectControl(selectedId);
      }
    }
  };

  if (!frameworkData || !treeItems.root) {
    return <div>Loading controls...</div>;
  }

  return (
    <div className="border rounded-md overflow-hidden bg-white">
      <Tree
        treeId="iso-controls"
        rootItem="root"
        items={treeItems}
        dataProvider={dataProvider}
        selectedItems={selectedItems}
        focusedItem={focusedItem}
        expandedItems={expandedItems}
        onFocusItem={setFocusedItem}
        onExpandItem={(item) => setExpandedItems([...expandedItems, item])}
        onCollapseItem={(item) => 
          setExpandedItems(expandedItems.filter(expandedItem => expandedItem !== item))
        }
        onSelectItems={handleItemSelect}
        renderItemTitle={({ title, item }) => {
          const treeItem = treeItems[item.index as string];
          const status = treeItem?.data?.status;
          const progress = treeItem?.data?.progress;

          return (
            <div className="flex items-center gap-2">
              <span>{title}</span>
              
              {status && (
                <Badge className={`ml-2 ${
                  status === 'compliant' ? 'bg-green-100 text-green-800' :
                  status === 'non_compliant' ? 'bg-red-100 text-red-800' :
                  status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {status.replace('_', ' ')}
                </Badge>
              )}
              
              {progress !== undefined && progress > 0 && (
                <div className="w-16 ml-auto mr-2">
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </div>
          );
        }}
        renderItemArrow={({ item, context }) => {
          return item.isFolder ? (
            context.isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )
          ) : null;
        }}
      />
    </div>
  );
};

export default IsoControlsTree;
