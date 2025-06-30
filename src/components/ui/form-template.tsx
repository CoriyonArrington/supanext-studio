'use client';

import {
  Box,
  Heading,
  Text,
  VStack,
  Divider,
  type BoxProps,
} from '@chakra-ui/react';
import { Card } from './card'; // Assuming Card is at src/components/ui/card.tsx

interface FormTemplateProps extends BoxProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

// This component provides a consistent wrapper for all forms.
export function FormTemplate({
  title,
  description,
  children,
  ...props
}: FormTemplateProps) {
  return (
    <Card {...props}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading size="md">{title}</Heading>
          {description && (
            <Text mt={1} color="gray.500">
              {description}
            </Text>
          )}
        </Box>
        <Divider />
        {children}
      </VStack>
    </Card>
  );
}