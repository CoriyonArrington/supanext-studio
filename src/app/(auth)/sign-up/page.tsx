// src/app/(auth)/sign-up/page.tsx
'use client';

import { Suspense } from 'react';
import NextLink from 'next/link';
import { Link as ChakraLink } from '@chakra-ui/react';
import { AuthForm } from '~/components/auth/auth-form';
import { SSOButtons } from '~/components/auth/sso-buttons';
import {
  ClientSignUpFormFields,
  useSignUpForm,
} from '~/components/auth/sign-up-form-fields';

// A new component to contain the logic, allowing use of hooks
function SignUpFormComponent() {
  const { isPending, handleSignUp } = useSignUpForm();

  const footerContent = (
    <>
      Already have an account?{' '}
      <ChakraLink as={NextLink} href="/login" color="teal.500">
        Log In
      </ChakraLink>
    </>
  );

  return (
    <AuthForm
      // FIX: Updated title and description for consistency
      title="Create your account"
      description="Start your journey with us today."
      formFields={<ClientSignUpFormFields />}
      submitButtonText="Create account"
      action={handleSignUp}
      footerContent={footerContent}
      isPending={isPending}
      ssoProviders={<SSOButtons />}
    />
  );
}

// Main page component
export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpFormComponent />
    </Suspense>
  );
}