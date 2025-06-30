// src/app/(auth)/update-password/page.tsx
'use client';

import { useTransition } from 'react';
import {
  useToast,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { updatePassword } from '~/lib/actions/update-password.action';
import { AuthForm } from '~/components/auth/auth-form';

export default function UpdatePasswordPage() {
  const [isPending, startTransition] = useTransition();
  const toast = useToast();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await updatePassword(formData);
      if (result.success) {
        toast({
          title: 'Password Updated',
          description: 'Your password has been updated successfully.',
          status: 'success',
          isClosable: true,
        });
        // On success, redirect to the main dashboard
        window.location.assign('/dashboard');
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

  const updatePasswordFields = (
    <FormControl id="password" isRequired>
      <FormLabel>New Password</FormLabel>
      {/* FIX: Increased input size to large (48px) */}
      <Input type="password" name="password" placeholder="••••••••" size="lg" />
    </FormControl>
  );

  return (
    <AuthForm
      // FIX: Updated title and description for consistency
      title="Update Your Password"
      description="Please enter and confirm your new password below."
      formFields={updatePasswordFields}
      submitButtonText="Save New Password"
      action={handleSubmit}
      footerContent={<></>} // No footer content needed
      isPending={isPending}
    />
  );
}