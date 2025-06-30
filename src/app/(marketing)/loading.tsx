// src/app/(marketing)/loading.tsx
'use client';

import {
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Section } from '~/components/ui/section';

/**
 * A skeleton loader for the marketing homepage.
 * This component is automatically rendered by Next.js's App Router
 * via a Suspense Boundary while the page's content is loading.
 */
export default function MarketingLoading() {
  const startColor = useColorModeValue('gray.100', 'gray.800');
  const endColor = useColorModeValue('gray.400', 'gray.600');
  const skeletonProps = { startColor, endColor };

  return (
    <VStack spacing={0} align="stretch">
      {/* Skeleton for the Hero Section */}
      <Section>
        <VStack spacing={6} textAlign="center" py={10}>
          <SkeletonText
            {...skeletonProps}
            noOfLines={2}
            spacing="4"
            skeletonHeight="8"
            w="70%"
          />
          <SkeletonText {...skeletonProps} noOfLines={3} w="50%" mt={4} />
          <Skeleton {...skeletonProps} height="52px" width="240px" mt={4} />
        </VStack>
      </Section>

      {/* Skeleton for the Feature Grid Section */}
      <Section bg="gray.50" _dark={{ bg: 'gray.800' }}>
        <VStack spacing={12}>
          <SkeletonText {...skeletonProps} noOfLines={2} spacing="4" w="60%" />
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
            <VStack spacing={4}>
              <SkeletonCircle {...skeletonProps} size="12" />
              <SkeletonText {...skeletonProps} noOfLines={3} w="full" />
            </VStack>
            <VStack spacing={4}>
              <SkeletonCircle {...skeletonProps} size="12" />
              <SkeletonText {...skeletonProps} noOfLines={3} w="full" />
            </VStack>
            <VStack spacing={4}>
              <SkeletonCircle {...skeletonProps} size="12" />
              <SkeletonText {...skeletonProps} noOfLines={3} w="full" />
            </VStack>
          </SimpleGrid>
        </VStack>
      </Section>

      {/* Skeleton for the Testimonials Section */}
      <Section>
        <VStack spacing={12}>
          <SkeletonText {...skeletonProps} noOfLines={2} spacing="4" w="50%" />
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
            <Skeleton {...skeletonProps} height="200px" borderRadius="lg" />
            <Skeleton {...skeletonProps} height="200px" borderRadius="lg" />
            <Skeleton {...skeletonProps} height="200px" borderRadius="lg" />
          </SimpleGrid>
        </VStack>
      </Section>

      {/* Skeleton for the CTA Section */}
      <Section bg="gray.800" _dark={{ bg: 'gray.900' }}>
        <VStack spacing={6}>
          <SkeletonText
            {...skeletonProps}
            noOfLines={2}
            spacing="4"
            w="60%"
            isLoaded={false}
            startColor="gray.600"
            endColor="gray.800"
          />
          <Skeleton
            {...skeletonProps}
            height="52px"
            width="240px"
            mt={4}
            startColor="gray.600"
            endColor="gray.800"
          />
        </VStack>
      </Section>
    </VStack>
  );
}