// src/components/ui/data-table.tsx
'use client';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  type TableProps,
} from '@chakra-ui/react';

interface DataTableProps<T> extends TableProps {
  headers: string[];
  keys: readonly (keyof T)[];
  data: T[];
  // Add an optional custom body renderer
  body?: React.ReactNode;
}

export function DataTable<T extends Record<string, unknown>>({
  headers,
  keys,
  data,
  body, // Use the new prop
  ...props
}: DataTableProps<T>) {
  return (
    <TableContainer borderWidth="1px" borderRadius="md">
      <Table variant="simple" {...props}>
        <Thead>
          <Tr>
            {headers.map((header) => (
              <Th key={header}>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {/* If a custom body is provided, render it. Otherwise, render the default rows. */}
          {body ||
            data.map((row, rowIndex) => (
              <Tr key={rowIndex}>
                {keys.map((key) => (
                  <Td key={String(key)}>{String(row[key] ?? '')}</Td>
                ))}
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}