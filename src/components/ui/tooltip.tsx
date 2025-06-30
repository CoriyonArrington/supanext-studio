'use client';

import { Tooltip as ChakraTooltip, type TooltipProps } from '@chakra-ui/react';
import React from 'react';

// This component is a simple pass-through to Chakra's Tooltip,
// but allows you to set project-wide defaults in one place.
export function Tooltip({ children, ...props }: TooltipProps) {
  return (
    <ChakraTooltip hasArrow placement="top" {...props}>
      {children}
    </ChakraTooltip>
  );
}