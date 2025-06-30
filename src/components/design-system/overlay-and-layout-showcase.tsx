'use client';

import { Box, Heading, VStack, Text, Button, useDisclosure } from '@chakra-ui/react';
import { Hero } from '@/components/ui/hero';
import { Modal } from '@/components/ui/modal';
import { Drawer } from '@/components/ui/drawer';
import NextLink from 'next/link';

export function OverlayAndLayoutShowcase() {
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();

  return (
    <Box as="section" id="overlay-layout" w="full" py={16}>
      <Heading size="lg" mb={10}>Overlay & Layout Patterns</Heading>
      <VStack spacing={16} align="stretch">
        <Box>
          <Heading size="md" mb={4}>Hero</Heading>
          <Hero
            title="Lost diary cards. Disconnected care."
            subtitle="Our DBT App Platform brings therapists and clients together — create diary cards, track your progress, and chat securely."
            actions={<Button as={NextLink} href="/sign-up" colorScheme="teal" size="lg">Get Started for Free</Button>}
          />
        </Box>
        <Box>
          <Heading size="md" mb={4}>Modal</Heading>
          <Button onClick={onModalOpen}>Open Modal</Button>
          <Modal isOpen={isModalOpen} onClose={onModalClose} title="Example Modal" footer={<Button colorScheme="teal" onClick={onModalClose}>Close</Button>}>
            <Text>This is the body content of the modal.</Text>
          </Modal>
        </Box>
        <Box>
          <Heading size="md" mb={4}>Drawer</Heading>
          <Button onClick={onDrawerOpen}>Open Drawer</Button>
          <Drawer isOpen={isDrawerOpen} onClose={onDrawerClose} title="Example Drawer" placement="right">
            <Text>This is the body content of the drawer.</Text>
          </Drawer>
        </Box>
      </VStack>
    </Box>
  );
}