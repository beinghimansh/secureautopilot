
# Data Models

This document provides a comprehensive overview of the data models used in the ComplyFlow platform. The platform uses a relational database (PostgreSQL via Supabase) with a well-defined schema to support all compliance management functions.

## Data Architecture Overview

The data architecture follows these key principles:

1. **Multi-tenant Design**: Data is segmented by organization
2. **Relational Structure**: Entities have clear relationships
3. **Row-Level Security**: Data access controlled at the row level
4. **Extensible Schema**: Designed for adding new compliance frameworks
5. **Historical Tracking**: Changes tracked through timestamps

![Data Schema](../assets/data-schema-diagram.png)

## Core Entities

### Organizations

The `organizations` table is the foundation of the multi-tenant architecture:

```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  logo_url TEXT,
  subscription_tier TEXT NOT NULL DEFAULT 'free',
  subscription_status TEXT NOT NULL DEFAULT 'active',
  subscription_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
```

Key relationships:
- One organization has many users (profiles)
- One organization has many compliance frameworks
- One organization has many policies

### User Profiles

The `profiles` table stores user information and organizational relationships:

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  organization_id UUID REFERENCES organizations,
  role user_role NOT NULL DEFAULT 'employee',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
```

User roles are defined as an enum:
```sql
CREATE TYPE user_role AS ENUM (
  'super_admin',
  'company_admin',
  'compliance_officer',
  'employee',
  'auditor'
);
```

### Compliance Frameworks

The `compliance_frameworks` table tracks which frameworks an organization is implementing:

```sql
CREATE TABLE compliance_frameworks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations,
  framework_type framework_type NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT true,
  progress INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
```

Framework types are defined as an enum:
```sql
CREATE TYPE framework_type AS ENUM (
  'iso27001',
  'soc2',
  'gdpr',
  'hipaa',
  'pci_dss'
);
```

### Policies

The `policies` table stores compliance policies:

```sql
CREATE TABLE policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations,
  framework_id UUID NOT NULL REFERENCES compliance_frameworks,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  version INTEGER NOT NULL DEFAULT 1,
  created_by UUID REFERENCES profiles,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
```

### Tasks

The `tasks` table tracks compliance-related tasks:

```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations,
  framework_id UUID REFERENCES compliance_frameworks,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  due_date TIMESTAMP WITH TIME ZONE,
  assigned_to UUID REFERENCES profiles,
  created_by UUID REFERENCES profiles,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
```

## AI-Generated Content Models

### Generated Policies

The `generated_policies` table stores AI-generated compliance policies:

```sql
CREATE TABLE generated_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations,
  created_by UUID REFERENCES profiles,
  framework_type TEXT NOT NULL,
  policy_content TEXT NOT NULL,
  risk_assessment TEXT,
  implementation_guide TEXT,
  gaps_analysis TEXT,
  ai_suggestions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## Voice Feature Models

### User Voice Preferences

The `user_voice_preferences` table stores user preferences for voice features:

```sql
CREATE TABLE user_voice_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles,
  preferred_voice_id TEXT NOT NULL,
  language TEXT DEFAULT 'en',
  playback_speed NUMERIC DEFAULT 1.0,
  auto_play BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
```

### Voice Summaries

The `voice_summaries` table stores generated voice summaries:

```sql
CREATE TABLE voice_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations,
  policy_id UUID REFERENCES policies,
  framework_id UUID REFERENCES compliance_frameworks,
  title TEXT NOT NULL,
  summary_text TEXT NOT NULL,
  audio_url TEXT,
  voice_id TEXT NOT NULL,
  language TEXT DEFAULT 'en',
  duration INTEGER,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
```

### Voice Training Sessions

The `voice_training_sessions` table stores voice training materials:

```sql
CREATE TABLE voice_training_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  audio_url TEXT,
  voice_id TEXT NOT NULL,
  language TEXT DEFAULT 'en',
  duration INTEGER,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
```

## Framework-Specific Models

### Company Profiles

The `company_profiles` table stores organization-specific details for compliance:

```sql
CREATE TABLE company_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations,
  created_by UUID REFERENCES profiles,
  name TEXT NOT NULL,
  industry TEXT NOT NULL,
  company_size TEXT NOT NULL,
  data_types TEXT NOT NULL,
  business_location TEXT,
  infrastructure_details TEXT,
  security_controls TEXT[],
  risk_appetite TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
```

### Framework Requirements

For each supported compliance framework, there are framework-specific requirements tables, such as:

```sql
CREATE TABLE soc2_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  control_number TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirement TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## Row-Level Security Policies

Row-Level Security (RLS) policies are used to enforce data access controls:

```sql
-- Example RLS policy for the policies table
CREATE POLICY "Users can view policies in their organization" 
  ON policies 
  FOR SELECT 
  USING (
    organization_id IN (
      SELECT organization_id FROM profiles WHERE id = auth.uid()
    )
  );
```

Similar policies are applied to all tables containing organization-specific data.

## Database Functions

Several database functions support the application logic:

```sql
-- Example function to check if a user is a super admin
CREATE OR REPLACE FUNCTION is_super_admin(user_id uuid)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = user_id AND role = 'super_admin'
  );
$$;
```

## Indexes and Performance Optimizations

Key indexes are created to optimize query performance:

```sql
-- Example indexes for the implementation_notes table
CREATE INDEX idx_implementation_notes_organization_id ON implementation_notes(organization_id);
CREATE INDEX idx_implementation_notes_requirement_id ON implementation_notes(requirement_id);
```

## Data Relationships Diagram

The full entity-relationship diagram can be found in the assets directory, showing all relationships between tables in the database schema.

This comprehensive data model provides the foundation for the ComplyFlow platform, supporting all compliance management functions while maintaining proper data isolation between organizations.
