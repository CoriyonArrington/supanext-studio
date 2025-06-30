// src/components/auth/sign-up-form-fields.tsx
'use client';

import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link as ChakraLink,
  useToast,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { signUp } from '~/lib/actions/signup.action';

// This component contains the form fields for email/password sign-up
export function ClientSignUpFormFields() {
  const [agreesToPrivacy, setAgreesToPrivacy] = useState(false);
  const [agreesToTerms, setAgreesToTerms] = useState(false);

  return (
    <>
      <FormControl id="email" isRequired>
        <FormLabel>Email address</FormLabel>
        <Input type="email" name="email" placeholder="you@example.com" size="lg" />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name="password"
          placeholder="At least 8 characters"
          size="lg"
        />
      </FormControl>
      <Stack spacing={4} pt={2}>
        <Checkbox
          name="agreesToPrivacy"
          isChecked={agreesToPrivacy}
          onChange={(e) => setAgreesToPrivacy(e.target.checked)}
        >
          I agree to the{' '}
          <ChakraLink as={NextLink} href="/privacy-policy" color="teal.500" isExternal>
            Privacy Policy
          </ChakraLink>
        </Checkbox>
        <Checkbox
          name="agreesToTerms"
          isChecked={agreesToTerms}
          onChange={(e) => setAgreesToTerms(e.target.checked)}
        >
          I agree to the{' '}
          <ChakraLink as={NextLink} href="/terms-of-use" color="teal.500" isExternal>
            Terms of Use
          </ChakraLink>
        </Checkbox>
      </Stack>
    </>
  );
}

// This custom hook contains the submission logic
export function useSignUpForm() {
  const [isPending, startTransition] = useTransition();
  const toast = useToast();
  const searchParams = useSearchParams();
  
  const handleSignUp = (formData: FormData) => {
    if (!formData.get('agreesToPrivacy') || !formData.get('agreesToTerms')) {
      toast({
        title: 'Agreement Required',
        description: 'You must agree to the Privacy Policy and Terms of Use.',
        status: 'warning',
        isClosable: true,
      });
      return;
    }

    // FIX: Get the plan from the URL and add it to the form data
    const plan = searchParams.get('plan');
    if (plan) {
      formData.append('plan', plan);
    }
    
    startTransition(async () => {
      const result = await signUp(formData);
      if (result.success) {
        toast({
          title: 'Account created!',
          description: result.message,
          status: 'success',
          isClosable: true,
        });
      } else {
        toast({
          title: 'Sign-up Error',
          description: result.message,
          status: 'error',
          isClosable: true,
        });
      }
    });
  };

  return { isPending, handleSignUp };
}