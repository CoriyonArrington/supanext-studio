// src/components/auth/auth-form.tsx
'use client';

import React from 'react';
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

interface AuthFormProps {
  title: string;
  description: string;
  formFields: React.ReactNode;
  submitButtonText: string;
  action: (formData: FormData) => void;
  footerContent: React.ReactNode;
  isPending: boolean;
  ssoProviders?: React.ReactNode;
}

export function AuthForm({
  title,
  description,
  formFields,
  submitButtonText,
  action,
  footerContent,
  isPending,
  ssoProviders,
}: AuthFormProps) {
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  return (
    // FIX: Removed the outer Stack component to simplify layout
    <Box w="full" maxW={{ base: 'sm', md: 'md' }} py={12}>
      <Stack spacing={2} textAlign="center" mb={8}>
        <Heading fontSize={{ base: '2xl', md: '3xl' }}>{title}</Heading>
        {description && <Text color={textColor}>{description}</Text>}
      </Stack>
      <Box
        rounded="lg"
        bg={cardBg}
        boxShadow="lg"
        p={{ base: 4, sm: 6, md: 8 }}
      >
        <Stack spacing={4}>
          <form action={action}>
            <Stack spacing={4}>
              {formFields}
              <Button
                type="submit"
                colorScheme="teal"
                mt={4}
                isLoading={isPending}
                disabled={isPending}
                size="lg"
              >
                {submitButtonText}
              </Button>
            </Stack>
          </form>

          {ssoProviders && (
            <>
              <HStack>
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="gray.500">
                  OR
                </Text>
                <Divider />
              </HStack>
              {ssoProviders}
            </>
          )}
        </Stack>
      </Box>
      <Text align="center" color={textColor} mt={8}>
        {footerContent}
      </Text>
    </Box>
  );
}