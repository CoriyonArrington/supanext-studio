'use client';

import { HStack, Text, IconButton } from '@chakra-ui/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <HStack>
      <IconButton
        aria-label="Go to previous page"
        icon={<FaArrowLeft />}
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />
      <Text fontSize="sm" fontWeight="medium">
        Page {currentPage} of {totalPages}
      </Text>
      <IconButton
        aria-label="Go to next page"
        icon={<FaArrowRight />}
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </HStack>
  );
}