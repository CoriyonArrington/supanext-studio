// src/components/auth/sso-buttons.tsx
'use client';

import { Button, Icon, VStack } from '@chakra-ui/react';
import { FaApple, FaGoogle, FaMicrosoft } from '~/lib/icons';
import { ssoSignIn } from '~/lib/actions/sso.action';
import { useSearchParams } from 'next/navigation';

export function SSOButtons() {
  // Read the plan from the URL query parameters
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');

  const handleSignIn = async (provider: 'google' | 'azure' | 'apple') => {
    // Pass the plan to the server action
    await ssoSignIn(provider, plan);
  };

  return (
    <VStack spacing={4} w="full">
      <form action={() => handleSignIn('google')} style={{ width: '100%' }}>
        <Button
          type="submit"
          w="full"
          variant="outline"
          leftIcon={<Icon as={FaGoogle} />}
        >
          Continue with Google
        </Button>
      </form>
      <form action={() => handleSignIn('azure')} style={{ width: '100%' }}>
        <Button
          type="submit"
          w="full"
          variant="outline"
          leftIcon={<Icon as={FaMicrosoft} />}
        >
          Continue with Microsoft
        </Button>
      </form>
      <form action={() => handleSignIn('apple')} style={{ width: '100%' }}>
        <Button
          type="submit"
          w="full"
          variant="outline"
          leftIcon={<Icon as={FaApple} />}
        >
          Continue with Apple
        </Button>
      </form>
    </VStack>
  );
}