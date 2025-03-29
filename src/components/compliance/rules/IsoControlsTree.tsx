
import React, { useState } from 'react';
import { 
  Tree, 
  UncontrolledTreeEnvironment,
  StaticTreeDataProvider,
  TreeItem,
  TreeItemIndex,
} from 'react-complex-tree';
import 'react-complex-tree/lib/style.css';
import { ChevronDown, ChevronRight } from 'lucide-react';
import StatusBadge from './components/StatusBadge';

// Define types for our tree items
interface TreeItemData {
  title: string;
  status?: 'compliant' | 'non_compliant' | 'in_progress' | 'not_applicable';
  progress?: number;
  children?: string[];
}

// Sample ISO 27001 controls tree structure (simplified for demo)
const isoControlsData: Record<string, TreeItemData> = {
  root: {
    title: 'ISO 27001 Controls',
    children: ['section5', 'section6', 'section7', 'section8']
  },
  section5: {
    title: 'Section 5: Information Security Policies',
    children: ['control5_1']
  },
  control5_1: {
    title: 'Control 5.1: Management direction for information security',
    status: 'compliant',
    progress: 100,
    children: ['control5.1.1', 'control5.1.2']
  },
  'control5.1.1': {
    title: 'Control 5.1.1: Policies for information security',
    status: 'compliant',
    progress: 100
  },
  'control5.1.2': {
    title: 'Control 5.1.2: Review of the policies for information security',
    status: 'in_progress',
    progress: 75
  },
  section6: {
    title: 'Section 6: Organization of Information Security',
    children: ['control6.1', 'control6.2']
  },
  'control6.1': {
    title: 'Control 6.1: Internal organization',
    status: 'in_progress',
    progress: 60,
    children: ['control6.1.1', 'control6.1.2']
  },
  'control6.1.1': {
    title: 'Control 6.1.1: Information security roles and responsibilities',
    status: 'compliant',
    progress: 100
  },
  'control6.1.2': {
    title: 'Control 6.1.2: Segregation of duties',
    status: 'non_compliant',
    progress: 20
  },
  'control6.2': {
    title: 'Control 6.2: Mobile devices and teleworking',
    status: 'not_applicable',
    progress: 0
  },
  section7: {
    title: 'Section 7: Human Resource Security',
    children: ['control7.1']
  },
  'control7.1': {
    title: 'Control 7.1: Prior to employment',
    status: 'in_progress',
    progress: 50
  },
  section8: {
    title: 'Section 8: Asset Management',
    children: ['control8.1']
  },
  'control8.1': {
    title: 'Control 8.1: Responsibility for assets',
    status: 'non_compliant',
    progress: 15
  }
};

// Create tree items that react-complex-tree expects
const createTreeItemsFromData = (data: Record<string, TreeItemData>): Record<TreeItemIndex, TreeItem<TreeItemData>> => {
  const treeItems: Record<TreeItemIndex, TreeItem<TreeItemData>> = {};
  
  Object.entries(data).forEach(([key, value]) => {
    treeItems[key] = {
      index: key as TreeItemIndex,
      data: value,
      children: value.children || [],
      isFolder: (value.children && value.children.length > 0) ? true : false
    };
  });
  
  return treeItems;
};

const IsoControlsTree = () => {
  const [expandedItems, setExpandedItems] = useState<TreeItemIndex[]>(['root']);
  const [selectedItems, setSelectedItems] = useState<TreeItemIndex[]>([]);
  
  // Create tree items from our data
  const treeItems = createTreeItemsFromData(isoControlsData);
  
  // Create data provider with correct configuration
  const dataProvider = new StaticTreeDataProvider(
    treeItems, 
    (item, newName) => ({ ...item, data: { ...item.data, title: newName } })
  );
  
  return (
    <div className="mb-6 border rounded-md overflow-auto">
      <div className="p-4 border-b bg-gray-50">
        <h3 className="font-medium">ISO 27001 Controls Tree</h3>
        <p className="text-sm text-gray-500">Browse compliance requirements structure</p>
      </div>
      
      <div className="p-4">
        <UncontrolledTreeEnvironment
          dataProvider={dataProvider}
          getItemTitle={item => item.data.title}
          viewState={{
            ['tree-1']: {
              expandedItems,
              selectedItems
            }
          }}
          onExpandItem={(item) => {
            setExpandedItems([...expandedItems, item.index]);
          }}
          onCollapseItem={(item) => {
            setExpandedItems(expandedItems.filter(expandedItemIndex => expandedItemIndex !== item.index));
          }}
          onSelectItems={(items) => {
            setSelectedItems(items);
          }}
          canSearch={true}
          canDragAndDrop={false}
          canDropOnFolder={false}
          canReorderItems={false}
          renderItemArrow={({ item, context }) => {
            if (treeItems[item.index]?.children && treeItems[item.index]?.children.length === 0) {
              return null;
            }
            
            return context.isExpanded ? (
              <ChevronDown size={16} className="mr-1 text-gray-400" />
            ) : (
              <ChevronRight size={16} className="mr-1 text-gray-400" />
            );
          }}
          renderItemTitle={({ item, title }) => {
            const itemData = treeItems[item.index]?.data;
            return (
              <div className="flex items-center">
                <span className="mr-2">{title}</span>
                {itemData?.status && <StatusBadge status={itemData.status} />}
              </div>
            );
          }}
        >
          <Tree treeId="tree-1" rootItem="root" />
        </UncontrolledTreeEnvironment>
      </div>
    </div>
  );
};

export default IsoControlsTree;
