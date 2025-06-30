'use client';

import React from 'react';
import {
  Popover as ChakraPopover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  type PopoverProps,
} from '@chakra-ui/react';

// The props for our component
interface ReusablePopoverProps extends Omit<PopoverProps, 'children'> {
  // CORRECTED: Renamed 'trigger' to 'triggerElement' to avoid conflict
  triggerElement: React.ReactNode;
  header?: string;
  children: React.ReactNode;
}

export function Popover({
  triggerElement,
  header,
  children,
  ...props
}: ReusablePopoverProps) {
  return (
    <ChakraPopover {...props}>
      <PopoverTrigger>{triggerElement}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        {header && <PopoverHeader>{header}</PopoverHeader>}
        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </ChakraPopover>
  );
}