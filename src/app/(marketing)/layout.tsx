// src/app/(marketing)/layout.tsx
import { Box, Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { createClient } from '~/lib/supabase/server';
import Header from '@/components/navigation/header';
import { Footer } from '@/components/navigation/footer';

export default async function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user?.id ?? '')
    .single();

  return (
    <Flex direction="column" minHeight="100vh">
      <Header initialUser={user} initialRole={profile?.role ?? null} />
      {/* FIX: Removed all explicit padding. Spacing is now controlled by individual pages. */}
      <Box as="main" flex="1">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
}