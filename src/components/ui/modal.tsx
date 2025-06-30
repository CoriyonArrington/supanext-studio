'use client';

import React from 'react';
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  type ModalProps,
} from '@chakra-ui/react';

interface ReusableModalProps extends Omit<ModalProps, 'children'> {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal({
  title,
  children,
  footer,
  ...props
}: ReusableModalProps) {
  return (
    <ChakraModal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </ChakraModal>
  );
}