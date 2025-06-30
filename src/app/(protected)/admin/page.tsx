// src/app/(protected)/admin/page.tsx
import { createClient } from '~/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Heading, Text, VStack } from '@chakra-ui/react';
import { DataTable } from '~/components/ui/data-table';
import { Card } from '~/components/ui/card';

export default async function AdminPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user!.id)
    .single();

  // Second layer of protection: redirect if not an admin
  if (profile?.role !== 'admin') {
    redirect('/dashboard');
  }

  // Fetch all users for the admin table
  const { data: users } = await supabase.from('profiles').select('id, full_name, role');

  return (
    <VStack spacing={8} align="stretch">
      <Heading as="h1" size="lg">
        Admin Dashboard
      </Heading>
      <Card>
        <VStack align="stretch" spacing={4}>
            <Heading size="md">All Users</Heading>
            <Text>This table displays all users in the database.</Text>
            <DataTable
                headers={['Full Name', 'Role', 'User ID']}
                keys={['full_name', 'role', 'id']}
                data={users || []}
            />
        </VStack>
      </Card>
    </VStack>
  );
}