'use client';

import React from 'react';
import {
  Accordion as ChakraAccordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  type AccordionProps,
} from '@chakra-ui/react';

export interface AccordionItemData {
  title: React.ReactNode;
  content: React.ReactNode;
}

interface ReusableAccordionProps extends AccordionProps {
  items: AccordionItemData[];
}

export function Accordion({ items, ...props }: ReusableAccordionProps) {
  return (
    <ChakraAccordion allowToggle {...props}>
      {items.map((item, index) => (
        <AccordionItem key={index}>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                {item.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>{item.content}</AccordionPanel>
        </AccordionItem>
      ))}
    </ChakraAccordion>
  );
}