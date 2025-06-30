'use client';

import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  ModalBody,
  ModalFooter,
  Select, // 1. Import the Select component
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { usePathname } from 'next/navigation';
import { Modal } from '~/components/ui/modal';
import { submitFeedback } from '~/lib/actions/feedback.action';

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialState = {
  success: false,
  message: '',
};

// Data for the emoji reactions
const ratings = [
  { value: 1, emoji: '😠', label: 'Angry' },
  { value: 2, emoji: '😟', label: 'Sad' },
  { value: 3, emoji: '😐', label: 'Neutral' },
  { value: 4, emoji: '😊', label: 'Happy' },
  { value: 5, emoji: '😄', label: 'Excited' },
];

// A dedicated component for the submit button to access useFormStatus
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" colorScheme="teal" isLoading={pending}>
      Submit
    </Button>
  );
}

/**
 * An enhanced modal form for collecting and submitting user feedback with an emoji rating.
 */
export function FeedbackForm({ isOpen, onClose }: FeedbackFormProps) {
  const [state, formAction] = useActionState(submitFeedback, initialState);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const toast = useToast();
  const pathname = usePathname();
  const subtextColor = useColorModeValue('gray.600', 'gray.400');

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Success' : 'Error',
        description: state.message,
        status: state.success ? 'success' : 'error',
        isClosable: true,
      });
      if (state.success) {
        setSelectedRating(null); // Reset state on successful submission
        onClose();
      }
    }
  }, [state, toast, onClose]);

  // Reset local state when the modal is closed
  const handleClose = () => {
    setSelectedRating(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Give feedback"
      size={{ base: 'full', sm: 'md', md: 'lg' }}
    >
      <form action={formAction}>
        <ModalBody p={{ base: 4, sm: 6 }}>
          <VStack spacing={4} align="stretch">
            <Text color={subtextColor}>
              We&apos;d love to hear what went well or how we can improve the
              product experience.
            </Text>

            {/* Emoji Rating Section */}
            <HStack justify="center" spacing={{ base: 2, md: 4 }} py={2}>
              {ratings.map((rating) => (
                <IconButton
                  key={rating.value}
                  aria-label={rating.label}
                  icon={<Text fontSize="2xl">{rating.emoji}</Text>}
                  variant={selectedRating === rating.value ? 'solid' : 'ghost'}
                  colorScheme={selectedRating === rating.value ? 'teal' : 'gray'}
                  isRound
                  size="lg"
                  onClick={() => setSelectedRating(rating.value)}
                />
              ))}
            </HStack>
            
            {/* 2. Add the new Select input for feedback type */}
            <FormControl>
              <FormLabel htmlFor="type">Feedback Type</FormLabel>
              <Select id="type" name="type" defaultValue="general">
                <option value="general">General Feedback</option>
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
                <option value="praise">Praise / Compliment</option>
              </Select>
            </FormControl>

            <FormControl isInvalid={!state.success && !!state.message}>
              <FormLabel htmlFor="feedback" srOnly>
                Your feedback
              </FormLabel>
              <Textarea
                id="feedback"
                name="feedback"
                placeholder="Your feedback..."
                required
                minH="120px"
              />
              {/* Hidden inputs to pass along rating and path */}
              <input type="hidden" name="path" value={pathname} />
              {selectedRating && (
                <input type="hidden" name="rating" value={selectedRating} />
              )}
              {!state.success && state.message && (
                <FormErrorMessage>{state.message}</FormErrorMessage>
              )}
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            <SubmitButton />
          </ButtonGroup>
        </ModalFooter>
      </form>
    </Modal>
  );
}