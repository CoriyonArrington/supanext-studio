'use client';

import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  type BreadcrumbProps,
} from '@chakra-ui/react';
import NextLink from 'next/link';

export interface BreadcrumbItemData {
  label: string;
  href: string;
  isCurrentPage?: boolean;
}

interface BreadcrumbsProps extends BreadcrumbProps {
  items: BreadcrumbItemData[];
}

export function Breadcrumbs({ items, ...props }: BreadcrumbsProps) {
  return (
    <ChakraBreadcrumb {...props}>
      {items.map((item, index) => (
        <BreadcrumbItem key={index}>
          {item.isCurrentPage ? (
            // For the current page, render as non-interactive, bolded text.
            <Text as="span" color="inherit" fontWeight="bold">
              {item.label}
            </Text>
          ) : (
            // Otherwise, render a fully functional Next.js link.
            <BreadcrumbLink as={NextLink} href={item.href}>
              {item.label}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      ))}
    </ChakraBreadcrumb>
  );
}