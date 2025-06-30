// src/components/ui/section.tsx
'use client';

import React from 'react';
import { Box, Container, type BoxProps } from '@chakra-ui/react';

interface SectionProps extends BoxProps {
  children: React.ReactNode;
  containerMaxWidth?: string;
}

export function Section({
  children,
  containerMaxWidth = 'container.lg',
  ...rest
}: SectionProps) {
  // FIX: All default padding has been removed from this component.
  // It will now only respect the padding props passed to it on each page.
  return (
    <Box as="section" {...rest}>
      <Container maxW={containerMaxWidth} h="full">
        {children}
      </Container>
    </Box>
  );
}