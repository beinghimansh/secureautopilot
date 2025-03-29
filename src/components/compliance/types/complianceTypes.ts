
export interface Soc2Requirement {
  id: string;
  control_number: string;
  title: string;
  description: string;
  requirement?: string;
}

export interface ImplementationNote {
  id?: string;
  requirement_id?: string;
  content?: string;
  status?: 'compliant' | 'non_compliant' | 'in_progress' | 'not_applicable';
  updated_at?: string;
}

export interface ComplianceRule {
  id: number | string;
  number: string;
  content: string;
  status?: 'compliant' | 'non_compliant' | 'in_progress' | 'not_applicable';
  notes?: string;
  description?: string;
  requirement?: string;
}

export interface TreeItem {
  id: string;
  title: string;
  type: 'category' | 'control';
  children?: TreeItem[];
  status?: string;
  expanded?: boolean;
  parent?: string;
  description?: string;
  requirement?: string;
  number?: string;
}

// Added interface for SOC2 Control Clause
export interface Soc2ControlClause {
  id: number;
  number: string;
  content: string;
  description: string;
  requirement: string;
  status?: 'compliant' | 'non_compliant' | 'in_progress' | 'not_applicable';
}

// Define detailed SOC2 control categories
export interface Soc2DetailedControlClause {
  id: number;
  number: string;
  content: string;
  description: string;
  requirement: string;
  status?: 'compliant' | 'non_compliant' | 'in_progress' | 'not_applicable';
  clauses?: Soc2DetailedControlClause[];
}
