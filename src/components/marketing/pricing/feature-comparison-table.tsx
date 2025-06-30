// src/components/marketing/pricing/feature-comparison-table.tsx
'use client';

import {
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

// Type definitions copied from the pricing page for component props
interface FeatureComparison {
  name: string;
  hobby: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

interface FeatureCategory {
  name: string;
  features: FeatureComparison[];
}

interface FeatureComparisonTableProps {
  categories: FeatureCategory[];
}

export function FeatureComparisonTable({
  categories,
}: FeatureComparisonTableProps) {
  const renderCheckmark = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? <Icon as={FiCheckCircle} color="green.500" /> : '—';
    }
    return value;
  };

  return (
    <TableContainer
      bg="white"
      // FIX: Combined the two _dark props into a single object.
      _dark={{ bg: 'gray.700', borderColor: 'gray.600' }}
      boxShadow="md"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="lg"
    >
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Feature</Th>
            <Th>Hobby</Th>
            <Th>Pro</Th>
            <Th>Enterprise</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories.map((category) => (
            <React.Fragment key={category.name}>
              <Tr>
                <Th colSpan={4} bg="gray.50" _dark={{ bg: 'gray.800' }}>
                  {category.name}
                </Th>
              </Tr>
              {category.features.map((feature) => (
                <Tr key={feature.name}>
                  <Td>{feature.name}</Td>
                  <Td>{renderCheckmark(feature.hobby)}</Td>
                  <Td>{renderCheckmark(feature.pro)}</Td>
                  <Td>{renderCheckmark(feature.enterprise)}</Td>
                </Tr>
              ))}
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}