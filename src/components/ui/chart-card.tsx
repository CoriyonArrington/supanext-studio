'use client';

import React from 'react';
import { Box, Flex, Heading, type BoxProps } from '@chakra-ui/react';
import { Card } from './card';

interface ChartCardProps extends BoxProps {
  title: string;
  // Allows passing extra controls like buttons or dropdowns to the header
  headerControls?: React.ReactNode;
  children: React.ReactNode;
}

export function ChartCard({
  title,
  headerControls,
  children,
  ...props
}: ChartCardProps) {
  return (
    <Card {...props}>
      <Flex
        justify="space-between"
        align="center"
        mb={4}
        direction={{ base: 'column', md: 'row' }}
        gap={2}
      >
        <Heading size="md" fontFamily="var(--font-nunito-sans)">
          {title}
        </Heading>
        {headerControls && <Box>{headerControls}</Box>}
      </Flex>
      <Box>{children}</Box>
    </Card>
  );
}