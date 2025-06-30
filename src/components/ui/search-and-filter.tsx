'use client';

import { Wrap, type WrapProps } from '@chakra-ui/react';
import { Card } from './card';

interface SearchAndFilterProps extends WrapProps {
  children: React.ReactNode;
}

export function SearchAndFilter({ children, ...props }: SearchAndFilterProps) {
  return (
    <Card>
      <Wrap spacing={4} align="center" {...props}>
        {children}
      </Wrap>
    </Card>
  );
}