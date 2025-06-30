// src/app/(auth)/login/page.tsx
'use client';

import { Suspense, useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import NextLink from 'next/link';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link as ChakraLink,
  Text,
} from '@chakra-ui/react';
import { login } from '~/lib/actions/login.action';
import { AuthForm } from '~/components/auth/auth-form';
import { SSOButtons } from '~/components/auth/sso-buttons';

function LoginFormComponent() {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(
    searchParams.get('message')
  );

  const handleSubmit = (formData: FormData) => {
    setMessage(null);
    startTransition(async () => {
      const result = await login(formData);
      if (result?.message) {
        setMessage(result.message);
      }
    });
  };

  const loginFormFields = (
    <>
      <FormControl id="email" isRequired>
        <FormLabel>Email address</FormLabel>
        {/* FIX: Increased input size to large (48px) */}
        <Input type="email" name="email" placeholder="you@example.com" size="lg" />
      </FormControl>
      <FormControl id="password" isRequired>
        <Flex justify="space-between" align="center">
          <FormLabel mb="0">Password</FormLabel>
          <ChakraLink
            as={NextLink}
            href="/forgot-password"
            fontSize="sm"
            color="teal.500"
          >
            Forgot password?
          </ChakraLink>
        </Flex>
        {/* FIX: Increased input size to large (48px) */}
        <Input type="password" name="password" placeholder="••••••••" size="lg" />
      </FormControl>
      {message && (
        <Text textAlign="center" color="red.500" fontSize="sm" pt={2}>
          {message}
        </Text>
      )}
    </>
  );

  const footerContent = (
    <>
      Don&apos;t have an account?{' '}
      <ChakraLink as={NextLink} href="/sign-up" color="teal.500">
        Sign Up
      </ChakraLink>
    </>
  );

  return (
    <AuthForm
      // FIX: Updated title and description for a friendlier tone
      title="Welcome back"
      description="Please enter your credentials to sign in."
      formFields={loginFormFields}
      submitButtonText="Sign in"
      action={handleSubmit}
      footerContent={footerContent}
      isPending={isPending}
      ssoProviders={<SSOButtons />}
    />
  );
}

export default function LoginPage() {
  // NOTE: The parent Flex container was removed from here because the layout now handles it.
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginFormComponent />
    </Suspense>
  );
}