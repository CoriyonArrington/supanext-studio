// src/app/(auth)/forgot-password/page.tsx
'use client';

import { useTransition, useState } from 'react';
import NextLink from 'next/link';
import {
  useToast,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  Link as ChakraLink,
  useColorModeValue,
} from '@chakra-ui/react';
import { requestPasswordReset } from '~/lib/actions/forgot-password.action';
import { AuthForm } from '~/components/auth/auth-form';

export default function ForgotPasswordPage() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const toast = useToast();
  const textColor = useColorModeValue('gray.600', 'gray.400');

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await requestPasswordReset(formData);
      if (result.success) {
        setSuccess(true);
      } else {
        toast({
          title: 'Error',
          description: result.message,
          status: 'error',
          isClosable: true,
        });
      }
    });
  };

  // If the form was submitted successfully, show a confirmation message
  if (success) {
    return (
      <Stack
        spacing={4}
        textAlign="center"
        w="full"
        maxW={{ base: 'sm', md: 'md' }}
      >
        <Heading fontSize="2xl">Check Your Email</Heading>
        <Text fontSize="lg" color={textColor}>
          If an account with that email exists, we&apos;ve sent instructions to reset your password.
        </Text>
        <ChakraLink
          as={NextLink}
          href="/login"
          color="teal.500"
          fontWeight="bold"
        >
          &larr; Back to Login
        </ChakraLink>
      </Stack>
    );
  }

  // Otherwise, show the form
  const forgotPasswordFields = (
    <FormControl id="email" isRequired>
      <FormLabel>Email address</FormLabel>
      {/* FIX: Increased input size to large (48px) */}
      <Input
        type="email"
        name="email"
        placeholder="you@example.com"
        size="lg"
      />
    </FormControl>
  );

  return (
    <AuthForm
      // FIX: Updated title and description for consistency
      title="Forgot Your Password?"
      description="No problem. Enter your email and we'll send you a reset link."
      formFields={forgotPasswordFields}
      submitButtonText="Send Reset Link"
      action={handleSubmit}
      footerContent={
        <ChakraLink as={NextLink} href="/login" color="teal.500">
          Back to Login
        </ChakraLink>
      }
      isPending={isPending}
    />
  );
}