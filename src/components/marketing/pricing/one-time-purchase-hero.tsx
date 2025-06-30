// src/components/marketing/pricing/one-time-purchase-hero.tsx
'use client';

import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { FaStar } from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';
// FIX: Import the new guest checkout action
import { createGuestCheckoutSession } from '~/lib/actions/billing.action';

// --- Type Definitions ---
interface OneTimeFeature {
  name: string;
  description: string;
}

interface OneTimePlan {
  headline: string;
  subheadline: string;
  description: string;
  price: string;
  original_price?: string;
  cta_text: string;
  stripePriceId: string;
  features: OneTimeFeature[];
}

interface OneTimePurchaseHeroProps {
  plan: OneTimePlan;
}

export function OneTimePurchaseHero({ plan }: OneTimePurchaseHeroProps) {
  // FIX: Add transition and router hooks for the one-click checkout
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const toast = useToast();

  const handlePurchaseClick = () => {
    startTransition(async () => {
      const result = await createGuestCheckoutSession(plan.stripePriceId);
      if (result.error) {
        toast({
          title: 'Error',
          description: result.error,
          status: 'error',
          isClosable: true,
        });
      } else if (result.url) {
        router.push(result.url);
      }
    });
  };

  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="center">
      {/* Left Column: Headline and Social Proof */}
      <VStack
        align={{ base: 'center', lg: 'flex-start' }}
        spacing={6}
        textAlign={{ base: 'center', lg: 'left' }}
      >
        <Heading as="h1" size={{ base: '2xl', md: '3xl' }}>
          {plan.headline}
        </Heading>
        <Text
          fontSize={{ base: '2xl', md: '3xl' }}
          color="teal.500"
          fontWeight="bold"
        >
          {plan.subheadline}
        </Text>
        <Text fontSize="lg" color="gray.500" _dark={{ color: 'gray.400' }} maxW="md">
          {plan.description}
        </Text>
        <HStack>
          <AvatarGroup size="sm" max={5}>
            <Avatar name="User One" src="https://randomuser.me/api/portraits/women/4.jpg" />
            <Avatar name="User Two" src="https://randomuser.me/api/portraits/men/44.jpg" />
            <Avatar name="User Three" src="https://randomuser.me/api/portraits/women/31.jpg" />
          </AvatarGroup>
          <VStack spacing={0} align="flex-start">
            <HStack spacing={0.5}>
              {[...Array(5)].map((_, i) => (
                <Icon key={i} as={FaStar} color="orange.400" />
              ))}
            </HStack>
            <Text fontSize="sm" color="gray.500" fontWeight="medium">
              Trusted by 700+ developers
            </Text>
          </VStack>
        </HStack>
      </VStack>

      {/* Right Column: Featured Pricing Card for One-Time Plan */}
      <Box
        p={8}
        bg="white"
        _dark={{ bg: 'gray.800' }}
        borderRadius="xl"
        boxShadow="2xl"
        border="2px"
        borderColor="teal.500"
      >
        <VStack spacing={6}>
          <Text fontWeight="bold" fontSize="lg">
            Lifetime access
          </Text>
          <HStack align="baseline">
            {plan.original_price && (
              <Text as="s" fontSize="2xl" color="gray.500">
                ${plan.original_price}
              </Text>
            )}
            <Text fontSize="5xl" fontWeight="bold">
              ${plan.price}
            </Text>
          </HStack>
          <Stack spacing={4} w="full">
            {plan?.features?.map((feature) => (
              <HStack key={feature.name}>
                <Icon as={FiCheckCircle} color="teal.500" />
                <VStack align="flex-start" spacing={0}>
                  <Text fontWeight="medium">{feature.name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {feature.description}
                  </Text>
                </VStack>
              </HStack>
            ))}
          </Stack>
          <Button
            colorScheme="teal"
            size="lg"
            w="full"
            onClick={handlePurchaseClick}
            // FIX: Add loading state to the button
            isLoading={isPending}
          >
            {plan.cta_text}
          </Button>
        </VStack>
      </Box>
    </SimpleGrid>
  );
}