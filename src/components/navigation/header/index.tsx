// src/components/header/index.tsx
'use client';

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link as ChakraLink,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import type { User } from '@supabase/supabase-js';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '~/lib/supabase/client';
import { ThemeSwitcher } from '~/components/ui/theme-switcher';
import { logout } from '~/lib/actions/logout.action';
import { HamburgerIcon } from '@chakra-ui/icons';
import { UserMenu } from './user-menu';

type HeaderProps = {
  initialUser: User | null;
  initialRole: string | null;
};

const MarketingLinks = ({ onClose }: { onClose?: () => void }) => (
  <>
    <Button as={NextLink} href="/pricing" variant="ghost" size="sm" onClick={onClose}>Pricing</Button>
    <Button as={NextLink} href="/showcase" variant="ghost" size="sm" onClick={onClose}>Showcase</Button>
    <Button as={NextLink} href="/faqs" variant="ghost" size="sm" onClick={onClose}>FAQs</Button>
    <Button as={NextLink} href="/contact" variant="ghost" size="sm" onClick={onClose}>Contact</Button>
  </>
);

const AppLinks = ({ role, onClose }: { role: string | null; onClose?: () => void }) => {
  return (
    <>
      <Button as={NextLink} href="/dashboard" variant="ghost" size="sm" onClick={onClose}>Dashboard</Button>
      {role === 'admin' && (
        <Button as={NextLink} href="/admin" variant="ghost" size="sm" onClick={onClose}>Admin</Button>
      )}
      <Button as={NextLink} href="/account" variant="ghost" size="sm" onClick={onClose}>Account</Button>
    </>
  );
};


export default function Header({ initialUser, initialRole }: HeaderProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(initialUser);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const headerBg = useColorModeValue('whiteAlpha.800', 'blackAlpha.700');
  const defaultBorderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 10); };
    window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll); };
  }, []);

  useEffect(() => { setUser(initialUser); }, [initialUser]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (['SIGNED_IN', 'SIGNED_OUT', 'USER_UPDATED'].includes(event)) {
        router.refresh();
      }
    });
    return () => { subscription.unsubscribe(); };
  }, [router]);
  
  const mainNav = user ? <AppLinks role={initialRole} /> : <MarketingLinks />;
  const mobileMainNav = user ? <AppLinks role={initialRole} onClose={onClose} /> : <MarketingLinks onClose={onClose} />;
  // FIX: Removed the unused 'dashboardPath' variable
  const homePath = user ? (initialRole === 'admin' ? '/admin' : '/dashboard') : '/';

  return (
    <>
      <Flex as="header" position="fixed" top="0" w="full" p={4} align="center" justify="space-between" bg={isScrolled ? headerBg : 'transparent'} backdropFilter={isScrolled ? 'saturate(180%) blur(5px)' : 'none'} borderBottom="1px solid" borderColor={isScrolled ? defaultBorderColor : 'transparent'} transition="background-color 0.3s, border-color 0.3s, box-shadow 0.3s" zIndex="sticky" boxShadow={isScrolled ? 'sm' : 'none'}>
        <HStack spacing={8}>
          <ChakraLink as={NextLink} href={homePath} _hover={{ textDecoration: 'none' }}>
            <Heading size="md">SupaNext Studio</Heading>
          </ChakraLink>
          <HStack as="nav" spacing={2} display={{ base: 'none', md: 'flex' }}>{mainNav}</HStack>
        </HStack>
        <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
          <ThemeSwitcher />
          {user ? (
            <UserMenu user={user} />
          ) : (
            <>
              <Button as={NextLink} href="/login" size="sm" variant="ghost">Log In</Button>
              <Button as={NextLink} href="/sign-up" size="sm" colorScheme="teal">Sign Up</Button>
            </>
          )}
        </HStack>
        <HStack display={{ base: 'flex', md: 'none' }}>
          <ThemeSwitcher />
          <IconButton aria-label="Open menu" icon={<HamburgerIcon />} onClick={onOpen} />
        </HStack>
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack as="nav" spacing={4} align="flex-start">
              {mobileMainNav}
              {user ? (
                <form action={logout} style={{ width: '100%' }}><Button type="submit" w="full" variant="outline" onClick={onClose}>Log Out</Button></form>
              ) : (
                <VStack w="full" align="stretch" spacing={4} borderTopWidth="1px" pt={6} mt={4}>
                  <Button w="full" as={NextLink} href="/login" variant="ghost" onClick={onClose}>Log In</Button>
                  <Button w="full" as={NextLink} href="/sign-up" colorScheme="teal" onClick={onClose}>Sign Up</Button>
                </VStack>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}