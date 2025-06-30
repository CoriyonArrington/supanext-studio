// src/components/marketing/contact/contact-modal.tsx
'use client';

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { ContactForm } from '@/components/forms/contact-form';

export function ContactModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant="outline" colorScheme="teal" onClick={onOpen}>
        Send a Message Directly
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send a Message</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ContactForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}