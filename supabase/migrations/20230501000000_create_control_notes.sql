
-- Create a table to store control notes
CREATE TABLE IF NOT EXISTS control_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  control_id TEXT NOT NULL,
  framework_id TEXT NOT NULL,
  notes TEXT,
  organization_id UUID REFERENCES organizations(id),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create a table to store control status
CREATE TABLE IF NOT EXISTS control_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  control_id TEXT NOT NULL,
  framework_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'not_implemented',
  organization_id UUID REFERENCES organizations(id),
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create a table to store evidence documents
CREATE TABLE IF NOT EXISTS evidence_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  control_id TEXT NOT NULL,
  framework_id TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  file_size INTEGER,
  organization_id UUID REFERENCES organizations(id),
  uploaded_by UUID REFERENCES auth.users(id),
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create a table to store control to-dos
CREATE TABLE IF NOT EXISTS control_todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  control_id TEXT NOT NULL,
  framework_id TEXT NOT NULL,
  description TEXT NOT NULL,
  assigned_to UUID REFERENCES auth.users(id),
  set_by UUID REFERENCES auth.users(id),
  status TEXT NOT NULL DEFAULT 'open',
  due_date TIMESTAMPTZ,
  organization_id UUID REFERENCES organizations(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create row level security policies
ALTER TABLE control_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE control_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE control_todos ENABLE ROW LEVEL SECURITY;

-- Create policies for organization members to access their organization's data
CREATE POLICY "Organization members can view their organization's control notes"
ON control_notes FOR SELECT
TO authenticated
USING (organization_id = (SELECT organization_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Organization members can insert their organization's control notes"
ON control_notes FOR INSERT
TO authenticated
WITH CHECK (organization_id = (SELECT organization_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Organization members can update their organization's control notes"
ON control_notes FOR UPDATE
TO authenticated
USING (organization_id = (SELECT organization_id FROM profiles WHERE id = auth.uid()));

-- Similar policies for other tables
CREATE POLICY "Organization members can view their organization's control status"
ON control_status FOR SELECT
TO authenticated
USING (organization_id = (SELECT organization_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Organization members can view their organization's evidence documents"
ON evidence_documents FOR SELECT
TO authenticated
USING (organization_id = (SELECT organization_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Organization members can view their organization's control todos"
ON control_todos FOR SELECT
TO authenticated
USING (organization_id = (SELECT organization_id FROM profiles WHERE id = auth.uid()));
