'use client';

import React from 'react';
import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  type DrawerProps,
} from '@chakra-ui/react';

interface ReusableDrawerProps extends Omit<DrawerProps, 'children'> {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Drawer({
  title,
  children,
  footer,
  ...props
}: ReusableDrawerProps) {
  return (
    <ChakraDrawer {...props}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{title}</DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
        {footer && <DrawerFooter>{footer}</DrawerFooter>}
      </DrawerContent>
    </ChakraDrawer>
  );
}