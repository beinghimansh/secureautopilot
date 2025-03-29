
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Tree, TreeItemIndex, StaticTreeDataProvider } from 'react-complex-tree';
import 'react-complex-tree/lib/style-modern.css';
import StatusBadge from './components/StatusBadge';

// Define the structure for our tree item data
interface TreeItemData {
  title: string;
  status?: 'compliant' | 'non_compliant' | 'in_progress' | 'not_applicable';
  progress?: number;
  children?: TreeItemIndex[];
}

// Sample data structure for ISO 27001 controls
const isoControls: Record<string, TreeItemData> = {
  root: {
    title: 'ISO 27001 Controls',
    children: ['a5', 'a6', 'a7', 'a8', 'a9', 'a10', 'a11', 'a12', 'a13', 'a14', 'a15', 'a16', 'a17', 'a18'],
  },
  a5: {
    title: 'A.5 Information security policies',
    children: ['a5.1'],
    status: 'compliant',
    progress: 100
  },
  'a5.1': {
    title: 'A.5.1 Management direction for information security',
    children: ['a5.1.1', 'a5.1.2'],
    status: 'compliant',
    progress: 100
  },
  'a5.1.1': {
    title: 'A.5.1.1 Policies for information security',
    status: 'compliant',
    progress: 100
  },
  'a5.1.2': {
    title: 'A.5.1.2 Review of the policies for information security',
    status: 'compliant',
    progress: 100
  },
  a6: {
    title: 'A.6 Organization of information security',
    children: ['a6.1', 'a6.2'],
    status: 'in_progress',
    progress: 75
  },
  'a6.1': {
    title: 'A.6.1 Internal organization',
    children: ['a6.1.1', 'a6.1.2', 'a6.1.3', 'a6.1.4', 'a6.1.5'],
    status: 'in_progress',
    progress: 80
  },
  'a6.1.1': {
    title: 'A.6.1.1 Information security roles and responsibilities',
    status: 'compliant',
    progress: 100
  },
  'a6.1.2': {
    title: 'A.6.1.2 Segregation of duties',
    status: 'in_progress',
    progress: 60
  },
  'a6.1.3': {
    title: 'A.6.1.3 Contact with authorities',
    status: 'in_progress',
    progress: 70
  },
  'a6.1.4': {
    title: 'A.6.1.4 Contact with special interest groups',
    status: 'compliant',
    progress: 100
  },
  'a6.1.5': {
    title: 'A.6.1.5 Information security in project management',
    status: 'in_progress',
    progress: 40
  },
  'a6.2': {
    title: 'A.6.2 Mobile devices and teleworking',
    children: ['a6.2.1', 'a6.2.2'],
    status: 'non_compliant',
    progress: 30
  },
  'a6.2.1': {
    title: 'A.6.2.1 Mobile device policy',
    status: 'non_compliant',
    progress: 20
  },
  'a6.2.2': {
    title: 'A.6.2.2 Teleworking',
    status: 'in_progress',
    progress: 40
  },
  // Fix for the error: Use object for a7 instead of string
  a7: {
    title: 'A.7 Human resource security',
    children: [],
    status: 'not_applicable',
    progress: 0
  },
  a8: {
    title: 'A.8 Asset management',
    children: [],
    status: 'not_applicable',
    progress: 0
  },
  a9: {
    title: 'A.9 Access control',
    children: [],
    status: 'not_applicable',
    progress: 0
  },
  a10: {
    title: 'A.10 Cryptography',
    children: [],
    status: 'not_applicable',
    progress: 0
  },
  a11: {
    title: 'A.11 Physical and environmental security',
    children: [],
    status: 'not_applicable',
    progress: 0
  },
  a12: {
    title: 'A.12 Operations security',
    children: [],
    status: 'not_applicable',
    progress: 0
  },
  a13: {
    title: 'A.13 Communications security',
    children: [],
    status: 'not_applicable',
    progress: 0
  },
  a14: {
    title: 'A.14 System acquisition, development and maintenance',
    children: [],
    status: 'not_applicable',
    progress: 0
  },
  a15: {
    title: 'A.15 Supplier relationships',
    children: [],
    status: 'not_applicable',
    progress: 0
  },
  a16: {
    title: 'A.16 Information security incident management',
    children: [],
    status: 'not_applicable',
    progress: 0
  },
  a17: {
    title: 'A.17 Information security aspects of business continuity management',
    children: [],
    status: 'not_applicable',
    progress: 0
  },
  a18: {
    title: 'A.18 Compliance',
    children: [],
    status: 'not_applicable',
    progress: 0
  }
};

const IsoControlsTree = () => {
  const [expandedItems, setExpandedItems] = useState<TreeItemIndex[]>(['root']);
  const [selectedItems, setSelectedItems] = useState<TreeItemIndex[]>([]);
  
  // Create a data provider with our controls
  const dataProvider = new StaticTreeDataProvider(
    isoControls,
    (item, data) => data.children || []
  );

  // Render a custom tree item with status indicators
  const renderItemTitle = ({ title, status }: TreeItemData) => {
    return (
      <div className="flex items-center gap-2">
        <span>{title}</span>
        {status && <StatusBadge status={status} />}
      </div>
    );
  };

  // Render the arrow icon based on expanded state
  const renderItemArrow = ({ item, context }: { item: TreeItemIndex, context: any }) => {
    return context.isExpanded ? (
      <ChevronDown className="h-4 w-4 text-gray-500" />
    ) : (
      <ChevronRight className="h-4 w-4 text-gray-500" />
    );
  };

  return (
    <div className="border rounded-md p-4 bg-white">
      <h3 className="text-lg font-medium mb-4">ISO 27001 Controls</h3>
      <Tree
        treeId="iso-controls-tree"
        rootItem="root"
        items={isoControls}
        dataProvider={dataProvider}
        expandedItems={expandedItems}
        selectedItems={selectedItems}
        onExpandItem={(item) => setExpandedItems([...expandedItems, item])}
        onCollapseItem={(item) =>
          setExpandedItems(expandedItems.filter((expandedItem) => expandedItem !== item))
        }
        onSelectItems={(items) => setSelectedItems(items)}
        renderItemTitle={renderItemTitle}
        renderItemArrow={renderItemArrow}
      />
    </div>
  );
};

export default IsoControlsTree;
