'use client';

import {
  Box,
  Heading,
  VStack,
  Text,
  Button,
  useToast,
  Wrap,
  Tag,
  Icon,
  HStack,
  Link as ChakraLink,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import type { User } from '@supabase/supabase-js';
import { FaCheckCircle, FaUserCircle } from 'react-icons/fa';

import Header from '@/components/navigation/header';
import { Footer } from '@/components/navigation/footer';
import { Card } from '@/components/ui/card';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { FormTemplate } from '@/components/ui/form-template';
import { ListComponent, type ListItemData } from '@/components/ui/list';

// NOTE: All imports for the deleted form components have been removed.

export function CustomProjectComponentsShowcase() {
  const toast = useToast();

  const showToast = (status: 'info' | 'success' | 'warning' | 'error') => {
    toast({
      title: `${status.charAt(0).toUpperCase() + status.slice(1)} Toast`,
      description: 'This is a sample toast notification.',
      status: status,
      isClosable: true,
    });
  };

  const mockUser: User = {
    id: '12345-abcde',
    email: 'hey.coriyonarrington@gmail.com',
    app_metadata: { provider: 'email' },
    user_metadata: { name: 'Coriyon Arrington' },
    aud: 'authenticated',
    created_at: new Date().toISOString(),
    confirmed_at: new Date().toISOString(),
    email_confirmed_at: new Date().toISOString(),
    phone: '',
    last_sign_in_at: new Date().toISOString(),
    role: 'authenticated',
    updated_at: new Date().toISOString(),
  };

  const mockListData: ListItemData[] = [
    { id: '1', primaryText: 'Kingsley Cortes', icon: FaUserCircle },
    { id: '2', primaryText: 'Princeton Lee', icon: FaUserCircle },
  ];

  return (
    <Box as="section" id="custom-components" w="full" py={16}>
      <Heading size="lg" mb={10}>
        Custom Project Components
      </Heading>

      <VStack spacing={16} align="stretch">
        <Box>
          <Heading size="md" mb={4}>
            Navigation & Auth
          </Heading>
          <Card>
            <VStack spacing={6} align="stretch">
              <Box>
                <Text fontWeight="bold" mb={2}>
                  Header (Logged Out)
                </Text>
                <Header initialUser={null} initialRole={null} />
              </Box>
              <Box>
                <Text fontWeight="bold" mb={2}>
                  Header (Logged In)
                </Text>
                <Header initialUser={mockUser} initialRole="therapist" />
              </Box>
              <HStack>
                <Text fontWeight="bold">ThemeSwitcher:</Text>
                <ThemeSwitcher />
              </HStack>
            </VStack>
          </Card>
        </Box>

        <Box>
          <Heading size="md" mb={4}>
            UI Primitives
          </Heading>
          <VStack spacing={8} align="stretch">
            <Box>
              <Text fontWeight="bold" mb={2}>
                List Component
              </Text>
              <ListComponent items={mockListData} />
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2}>
                Form Template
              </Text>
              <FormTemplate
                title="Example Form"
                description="This showcases the form container."
              >
                <VStack spacing={4}>
                  <FormControl>
                    <FormLabel>Sample Field</FormLabel>
                    <Input placeholder="Enter some data" />
                  </FormControl>
                  <Button alignSelf="flex-end" colorScheme="teal">
                    Submit
                  </Button>
                </VStack>
              </FormTemplate>
            </Box>
          </VStack>
        </Box>

        {/* FIX: The entire "Form Components" section that was here has been removed, 
            as its functionality is now covered by `auth-form-showcase.tsx`. 
        */}

        <Box>
          <Heading size="md" mb={4}>
            Card Components
          </Heading>
          <VStack spacing={6} align="stretch">
            <Card>
              <Text fontWeight="bold" mb={2}>
                Unified PostCard
              </Text>
              <VStack align="stretch" spacing={4}>
                <Box h="200px" bg="gray.200" borderRadius="md" />
                <Heading size="md">Example Card Title</Heading>
                <Text color="gray.600">
                  This is an example description for the unified card component.
                </Text>
                <Wrap>
                  <Tag>UX Design</Tag>
                  <Tag>Strategy</Tag>
                </Wrap>
                <ChakraLink
                  as={NextLink}
                  href="#"
                  color="teal.500"
                  fontWeight="bold"
                >
                  Learn More &rarr;
                </ChakraLink>
              </VStack>
            </Card>
            <Card>
              <Text fontWeight="bold" mb={2}>
                FeatureCard
              </Text>
              <HStack spacing={4}>
                <Icon as={FaCheckCircle} w={6} h={6} color="green.500" />
                <Box>
                  <Heading size="sm">Example Feature Title</Heading>
                  <Text fontSize="sm" color="gray.600">
                    A short and punchy description of the feature or concept.
                  </Text>
                </Box>
              </HStack>
            </Card>
          </VStack>
        </Box>

        <Box>
          <Heading size="md" mb={4}>
            Utility Components
          </Heading>
          <Card>
            <Text fontWeight="bold" mb={2}>
              Toaster (Toast Utility)
            </Text>
            <Wrap spacing={4} mt={4}>
              <Button onClick={() => showToast('info')}>Show Info Toast</Button>
              <Button colorScheme="green" onClick={() => showToast('success')}>
                Show Success Toast
              </Button>
              <Button colorScheme="red" onClick={() => showToast('error')}>
                Show Error Toast
              </Button>
              <Button
                colorScheme="orange"
                onClick={() => showToast('warning')}
              >
                Show Warning Toast
              </Button>
            </Wrap>
          </Card>
        </Box>

        <Box>
          <Heading size="md" mb={4}>
            SiteFooter
          </Heading>
          <Footer />
        </Box>
      </VStack>
    </Box>
  );
}