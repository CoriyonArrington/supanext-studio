'use client';

import {
  Box,
  Heading,
  VStack,
  Text,
  HStack,
  Input,
  Select,
  Button,
  InputGroup,
  InputLeftElement,
  Divider,
} from '@chakra-ui/react';
import { useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';

// Import all the UI components that remain in the starter
import { TabGroup } from '@/components/ui/tab-group';
import { Stepper } from '@/components/ui/stepper';
import { Slider } from '@/components/ui/slider';
import { SearchAndFilter } from '@/components/ui/search-and-filter';
import { NumberInputStepper } from '@/components/ui/number-input-stepper';
import { Accordion, type AccordionItemData } from '@/components/ui/accordion';
import { DataTable } from '@/components/ui/data-table';
import { Pagination } from '@/components/ui/pagination';
import { Breadcrumbs, type BreadcrumbItemData } from '@/components/ui/breadcrumbs';

// --- Mock Data for Showcase ---
const accordionItems: AccordionItemData[] = [
  { title: 'Section 1 title', content: <Text>Content for section 1.</Text> },
  { title: 'Section 2 title', content: <Text>Content for section 2.</Text> },
];

const tableHeaders = ['Name', 'Email', 'Role'];
const tableKeys = ['name', 'email', 'role'] as const;
const tableData = [
  { name: 'Emily Johnson', email: 'emily.j@example.com', role: 'Admin' },
  { name: 'Michael Chen', email: 'michael.c@example.com', role: 'User' },
  { name: 'Sarah Miller', email: 'sarah.m@example.com', role: 'User' },
];

const mockBreadcrumbData: BreadcrumbItemData[] = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Settings', href: '#', isCurrentPage: true },
];

export function AppComponentsShowcase() {
  const [activeStep, setActiveStep] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <Box as="section" id="app-components" w="full" py={16}>
      <Heading size="lg" mb={10}>
        Application Components
      </Heading>

      <VStack spacing={16} align="stretch">
        <Box>
          <Heading size="md" mb={4}>
            Data Display
          </Heading>
          <VStack spacing={8} align="stretch">
            <Box>
              <Text fontWeight="bold" mb={2}>
                Data Table
              </Text>
              <DataTable
                headers={tableHeaders}
                keys={tableKeys}
                data={tableData}
              />
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2}>
                Accordion
              </Text>
              <Accordion items={accordionItems} />
            </Box>
          </VStack>
        </Box>

        <Divider />

        <Box>
          <Heading size="md" mb={4}>
            Interactive Elements
          </Heading>
          <VStack spacing={8} align="stretch">
            <Box>
              <Text fontWeight="bold" mb={2}>
                Search & Filter Bar
              </Text>
              <SearchAndFilter>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                  </InputLeftElement>
                  <Input placeholder="Search..." />
                </InputGroup>
                <Select placeholder="Filter by status" />
                <Select placeholder="Filter by category" />
              </SearchAndFilter>
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2}>
                Pagination
              </Text>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2}>
                Breadcrumbs
              </Text>
              <Breadcrumbs items={mockBreadcrumbData} />
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2}>
                Progress Stepper
              </Text>
              <Stepper stepCount={4} activeStep={activeStep} mb={4} />
              <HStack>
                <Button
                  size="sm"
                  onClick={() => setActiveStep((s) => Math.max(s - 1, 0))}
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  onClick={() => setActiveStep((s) => Math.min(s + 1, 4))}
                >
                  Next
                </Button>
              </HStack>
            </Box>
             <Box>
              <Text fontWeight="bold" mb={2}>
                Tabs
              </Text>
              <TabGroup
                variant="soft-rounded"
                size="md"
                tabLabels={['My Account', 'Company', 'Team Members', 'Billing']}
              />
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2}>
                Slider
              </Text>
              <Slider
                label="Value"
                leftLabel="Low"
                rightLabel="High"
                defaultValue={3}
                min={0}
                max={10}
              />
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2}>
                Number Input Stepper
              </Text>
              <NumberInputStepper
                label="Quantity"
                defaultValue={1}
                min={1}
                max={20}
              />
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}