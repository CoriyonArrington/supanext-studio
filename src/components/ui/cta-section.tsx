'use client';

import {
  Button,
  Heading,
  Stack,
  Text,
  VStack,
  type BoxProps,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { Section } from '@/components/ui/section';

interface CtaSectionProps extends BoxProps {
  title: string;
  subtitle: string;
  primaryActionText: string;
  primaryActionLink: string;
  secondaryActionText: string;
  secondaryActionLink: string;
}

export function CtaSection({
  title,
  subtitle,
  primaryActionText,
  primaryActionLink,
  secondaryActionText,
  secondaryActionLink,
  ...rest
}: CtaSectionProps) {
  const defaultBg = useColorModeValue('gray.800', 'gray.900');
  
  return (
    <Section py={{ base: 20, md: 28 }} bg={defaultBg} color="white" {...rest}>
      <VStack spacing={6} textAlign="center" maxW="2xl" mx="auto">
        <Heading size={{ base: 'xl', md: '2xl' }}>{title}</Heading>
        <Text fontSize={{ base: 'lg', md: 'xl' }} opacity={0.9}>
          {subtitle}
        </Text>
        <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} pt={4}>
          <Button 
            as={NextLink} 
            href={primaryActionLink} 
            colorScheme="teal" 
            variant="solid" 
            size="lg" 
            px={8} 
            py={7}
          >
            {primaryActionText}
          </Button>
          <Button 
            as={NextLink} 
            href={secondaryActionLink} 
            variant="outline" 
            colorScheme="white" 
            size="lg" 
            px={8} 
            py={7}
            // FIX: Invert colors on hover for high contrast and accessibility
            _hover={{ bg: 'white', color: 'gray.800', textDecoration: 'none' }}
            _focusVisible={{ 
              outline: '2px solid',
              outlineColor: 'white',
              outlineOffset: '2px',
            }}
          >
            {secondaryActionText}
          </Button>
        </Stack>
      </VStack>
    </Section>
  );
}