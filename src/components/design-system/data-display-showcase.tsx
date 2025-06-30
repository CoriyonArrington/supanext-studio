'use client';

import { Box, Heading, VStack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Accordion, type AccordionItemData } from '@/components/ui/accordion';
import { DataTable } from '@/components/ui/data-table';
import { Pagination } from '@/components/ui/pagination';

// Mock Data for the showcase
const accordionItems: AccordionItemData[] = [
  {
    title: 'Section 1 title',
    content: <Text>Content for the first section.</Text>,
  },
  {
    title: 'Section 2 title',
    content: <Text>Content for the second section.</Text>,
  },
];

const tableHeaders = ['Name', 'Email', 'Role'];
// Add 'as const' to infer a specific tuple type instead of string[]
const tableKeys = ['name', 'email', 'role'] as const;
const tableData = [
  { name: 'Emily Johnson', email: 'emily.j@example.com', role: 'Client' },
  { name: 'Michael Chen', email: 'michael.c@example.com', role: 'Client' },
  { name: 'Dr. Sarah Miller', email: 'sarah.m@example.com', role: 'Therapist' },
];

export function DataDisplayShowcase() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <Box as="section" id="data-display" w="full" py={16}>
      <Heading size="lg" mb={10}>
        Data Display Patterns
      </Heading>

      <VStack spacing={12} align="stretch">
        <Box>
          <Heading size="md" mb={4}>
            Accordion
          </Heading>
          <Accordion items={accordionItems} />
        </Box>

        <Box>
          <Heading size="md" mb={4}>
            Data Table
          </Heading>
          <DataTable
            headers={tableHeaders}
            keys={tableKeys}
            data={tableData}
          />
        </Box>

        <Box>
          <Heading size="md" mb={4}>
            Pagination
          </Heading>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Box>
      </VStack>
    </Box>
  );
}