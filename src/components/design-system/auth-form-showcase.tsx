'use client';

import {
  Box,
  Heading,
  VStack,
  Card,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Link as ChakraLink,
  Text, // FIX: Added the missing 'Text' component import
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { AuthForm } from '@/components/auth/auth-form';

const mockAction = () => {
  // Mock action for design system showcase
};

export function AuthFormShowcase() {
  // Example for a Login Form configuration
  const loginFormFields = (
    <>
      <FormControl id="ds-email-login" isRequired>
        <FormLabel>Email address</FormLabel>
        <Input type="email" name="email" placeholder="you@example.com" />
      </FormControl>
      <FormControl id="ds-password-login" isRequired>
        <Flex justify="space-between" align="center">
          <FormLabel mb="0">Password</FormLabel>
          <ChakraLink as={NextLink} href="#" fontSize="sm" color="teal.500">
            Forgot password?
          </ChakraLink>
        </Flex>
        <Input type="password" name="password" placeholder="••••••••" />
      </FormControl>
    </>
  );

  const loginFooter = (
    <>
      Don&apos;t have an account?{' '}
      <ChakraLink as={NextLink} href="#" color="teal.500">
        Sign Up
      </ChakraLink>
    </>
  );

  // Example for a simple Sign-up Form configuration
  const signupFormFields = (
    <>
      <FormControl id="ds-email-signup" isRequired>
        <FormLabel>Email address</FormLabel>
        <Input type="email" name="email" placeholder="you@example.com" />
      </FormControl>
      <FormControl id="ds-password-signup" isRequired>
        <FormLabel>Password</FormLabel>
        <Input type="password" name="password" placeholder="At least 8 characters" />
      </FormControl>
    </>
  );

  const signupFooter = (
    <>
      Already have an account?{' '}
      <ChakraLink as={NextLink} href="#" color="teal.500">
        Log In
      </ChakraLink>
    </>
  );

  return (
    <Box as="section" id="auth-forms" w="full" py={16}>
      <Heading size="lg" mb={10}>Authentication Forms</Heading>
      <Text mb={6}>The application now uses a single, reusable `AuthForm` component. Below are two examples of how it can be configured.</Text>
      <VStack spacing={8} align="stretch">
        <Card p={0} overflow="hidden">
            <AuthForm
                title="Sign in to your account"
                description=""
                formFields={loginFormFields}
                submitButtonText="Sign In"
                action={mockAction}
                footerContent={loginFooter}
                isPending={false}
             />
        </Card>
        <Card p={0} overflow="hidden">
            <AuthForm
                title="Create an Account"
                description="to begin your journey"
                formFields={signupFormFields}
                submitButtonText="Create Account"
                action={mockAction}
                footerContent={signupFooter}
                isPending={false}
             />
        </Card>
      </VStack>
    </Box>
  );
}