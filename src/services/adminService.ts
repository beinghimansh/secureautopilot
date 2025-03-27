
import { supabase } from '@/integrations/supabase/client';
import { Organization, Profile, UserRole } from '@/types/database.types';

export async function createSuperAdmin(email: string, password: string, firstName: string, lastName: string) {
  try {
    // First, create the user via signup
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      }
    });

    if (authError) {
      throw authError;
    }

    if (!authData.user) {
      throw new Error('User creation failed');
    }

    // Then update the user's role to super_admin
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ 
        role: 'super_admin',
        organization_id: 'c0a80121-7ac0-4e3c-b9f5-d6c914a89939' // The admin org we created in the SQL
      })
      .eq('id', authData.user.id);

    if (updateError) {
      throw updateError;
    }

    return authData.user;
  } catch (error) {
    console.error('Error creating super admin:', error);
    throw error;
  }
}

export async function getOrganizations() {
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data as Organization[];
}

export async function createOrganization(organization: Partial<Organization>) {
  const { data, error } = await supabase
    .from('organizations')
    .insert([organization])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Organization;
}

export async function updateUserRole(userId: string, role: UserRole, organizationId: string | null = null) {
  const updateData: Partial<Profile> = { role };
  
  if (organizationId) {
    updateData.organization_id = organizationId;
  }

  const { error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('id', userId);

  if (error) {
    throw error;
  }

  return true;
}
