
export type UserRole = 'super_admin' | 'company_admin' | 'compliance_officer' | 'employee' | 'auditor';

export type FrameworkType = 'iso27001' | 'soc2' | 'gdpr' | 'hipaa' | 'pci_dss';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  created_at: string;
  updated_at: string;
  subscription_tier: string;
  subscription_status: string;
  subscription_expires_at?: string;
}

export interface Profile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  organization_id?: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ComplianceFramework {
  id: string;
  organization_id: string;
  framework_type: FrameworkType;
  enabled: boolean;
  progress: number;
  created_at: string;
  updated_at: string;
}

export interface Policy {
  id: string;
  organization_id: string;
  framework_id: string;
  title: string;
  content: string;
  status: string;
  version: number;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  organization_id: string;
  framework_id?: string;
  title: string;
  description?: string;
  status: string;
  due_date?: string;
  assigned_to?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  control_id?: string;
  clause_id?: string;
}

export interface Integration {
  id: string;
  organization_id: string;
  provider: string;
  config: Record<string, any>;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface Audit {
  id: string;
  organization_id: string;
  framework_id?: string;
  title: string;
  description?: string;
  status: string;
  start_date: string;
  end_date?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface AuditFinding {
  id: string;
  audit_id: string;
  organization_id: string;
  severity: string;
  description: string;
  remediation?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// New interfaces for compliance controls and clauses
export interface ComplianceClause {
  id: string;
  organization_id: string;
  framework_id: string;
  clause_number: string;
  title: string;
  description: string;
  parent_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ComplianceControl {
  id: string;
  organization_id: string;
  framework_id: string;
  clause_id: string;
  control_number: string;
  title: string;
  description: string;
  implementation_status: 'not_implemented' | 'in_progress' | 'implemented' | 'not_applicable';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ComplianceDocument {
  id: string;
  organization_id: string;
  framework_id: string;
  control_id?: string;
  clause_id?: string;
  title: string;
  file_url: string;
  file_type: string;
  version: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface ComplianceRequirement {
  id: string;
  control_id?: string;
  clause_id?: string;
  organization_id: string;
  framework_id: string;
  description: string;
  status: 'open' | 'in_progress' | 'completed' | 'not_applicable';
  created_at: string;
  updated_at: string;
}
