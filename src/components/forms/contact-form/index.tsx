'use client';

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  SimpleGrid,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});
  const toast = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    const result = await response.json();
    setIsSubmitting(false);

    if (response.ok) {
      toast({
        title: 'Message Sent!',
        description: "Thanks for reaching out. We'll get back to you shortly.",
        status: 'success',
        isClosable: true,
      });
      // Clear the form
      setName('');
      setEmail('');
      setMessage('');
    } else {
      // Handle Zod validation errors
      if (result.error) {
        setErrors(result.error);
      } else {
        toast({
          title: 'An error occurred.',
          description: 'Could not send message. Please try again later.',
          status: 'error',
          isClosable: true,
        });
      }
    }
  };

  return (
    <VStack as="form" w="full" spacing={4} pt={8} onSubmit={handleSubmit}>
      <SimpleGrid columns={{ base: 1, md: 2 }} w="full" spacing={4}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Name</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
          {errors.name && <FormErrorMessage>{errors.name[0]}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" />
          {errors.email && <FormErrorMessage>{errors.email[0]}</FormErrorMessage>}
        </FormControl>
      </SimpleGrid>
      <FormControl isInvalid={!!errors.message}>
        <FormLabel>Message</FormLabel>
        <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="How can we help?" />
        {errors.message && <FormErrorMessage>{errors.message[0]}</FormErrorMessage>}
      </FormControl>
      <Button
        type="submit"
        colorScheme="teal"
        size="lg"
        px={10}
        py={7}
        alignSelf="flex-end"
        isLoading={isSubmitting}
      >
        Send Message
      </Button>
    </VStack>
  );
}