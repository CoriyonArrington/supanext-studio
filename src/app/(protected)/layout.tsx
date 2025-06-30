// src/app/(protected)/layout.tsx
import { Box, Container, Flex } from '@chakra-ui/react';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { createClient } from '~/lib/supabase/server';
import Header from '@/components/navigation/header';
import { Footer } from '@/components/navigation/footer';

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  return (
    <Flex direction="column" minHeight="100vh">
      <Header initialUser={user} initialRole={profile?.role ?? null} />
      {/* FIX: Removed all explicit padding. Spacing is now controlled by individual pages. */}
      <Box as="main" flex="1">
        <Container maxW="container.xl" py={{ base: 10, md: 12 }}>
          {children}
        </Container>
      </Box>
      <Footer />
    </Flex>
  );
}