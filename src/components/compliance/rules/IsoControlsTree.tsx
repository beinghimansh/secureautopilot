
import React, { useState } from 'react';
import { Tree, TreeItem, TreeItemIndex, StaticTreeDataProvider } from 'react-complex-tree';
import 'react-complex-tree/lib/style-modern.css';
import { Shield, ChevronRight, ChevronDown } from 'lucide-react';

// Remove incorrect imports causing build errors
// import { MultiBackend, getBackendOptions } from 'react-complex-tree';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import { DndProvider } from 'react-dnd';

interface IsoControlsTreeProps {
  controls: any[];
  onSelectControl: (control: any) => void;
  selectedControlId: string | null;
}

// Simplified tree item interface
interface TreeItemData {
  index: TreeItemIndex;
  isFolder?: boolean;
  children?: TreeItemIndex[];
  data: any;
}

const IsoControlsTree: React.FC<IsoControlsTreeProps> = ({
  controls,
  onSelectControl,
  selectedControlId
}) => {
  const treeId = 'iso-controls-tree';
  const [focusedItem, setFocusedItem] = useState<TreeItemIndex | null>(null);
  const [expandedItems, setExpandedItems] = useState<TreeItemIndex[]>([]);
  const [selectedItems, setSelectedItems] = useState<TreeItemIndex[]>(
    selectedControlId ? [selectedControlId] : []
  );

  // Transform the controls into a tree structure
  const buildTreeItems = (controls: any[]): { [key: string]: TreeItemData } => {
    const items: { [key: string]: TreeItemData } = {
      root: {
        index: 'root',
        isFolder: true,
        children: [],
        data: { title: 'ISO Controls' }
      }
    };

    // First level: Control families (e.g., A.5, A.6)
    const families: { [key: string]: string[] } = {};

    controls.forEach(control => {
      const controlId = control.id;
      const familyMatch = controlId.match(/^([A-Z]\.\d+)/);
      
      if (familyMatch) {
        const familyId = familyMatch[1];
        if (!families[familyId]) {
          families[familyId] = [];
        }
        families[familyId].push(controlId);
      }
    });

    // Build the tree
    Object.keys(families).forEach(familyId => {
      items[familyId] = {
        index: familyId,
        isFolder: true,
        children: families[familyId],
        data: { title: `${familyId} Controls` }
      };

      (items.root.children as string[]).push(familyId);
    });

    // Add individual controls
    controls.forEach(control => {
      items[control.id] = {
        index: control.id,
        data: { 
          title: `${control.id} ${control.title}`,
          control 
        }
      };
    });

    return items;
  };

  const treeItems = buildTreeItems(controls);
  const dataProvider = new StaticTreeDataProvider(treeItems);

  const handleSelectItems = (items: TreeItemIndex[]) => {
    setSelectedItems(items);
    if (items.length > 0) {
      const selectedId = items[0] as string;
      const selectedControl = treeItems[selectedId]?.data?.control;
      if (selectedControl) {
        onSelectControl(selectedControl);
      }
    }
  };

  // Simplified drag and drop handlers (no longer using react-dnd)
  const canDrag = () => false;
  const canDropAt = () => false;

  return (
    <div className="h-full overflow-y-auto border rounded-md bg-white">
      <div className="p-3 border-b bg-gray-50">
        <h3 className="font-medium flex items-center">
          <Shield className="mr-2 h-4 w-4" />
          ISO 27001 Controls
        </h3>
      </div>
      <div className="p-2">
        <Tree
          treeId={treeId}
          rootItem="root"
          treeItems={treeItems}
          dataProvider={dataProvider}
          selectedItems={selectedItems}
          onSelectItems={handleSelectItems}
          expandedItems={expandedItems}
          onExpandItem={(item) => setExpandedItems([...expandedItems, item])}
          onCollapseItem={(item) =>
            setExpandedItems(expandedItems.filter((expandedItem) => expandedItem !== item))
          }
          renderItemArrow={({ item, context }) =>
            item.isFolder ? (
              context.isExpanded ? (
                <ChevronDown className="h-4 w-4 mr-1" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-1" />
              )
            ) : null
          }
          renderItemTitle={({ title }) => (
            <span className="ml-1 text-sm">{title}</span>
          )}
        />
      </div>
    </div>
  );
};

export default IsoControlsTree;
