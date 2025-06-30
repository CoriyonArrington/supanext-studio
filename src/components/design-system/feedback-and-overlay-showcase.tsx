'use client';

import { Box, Heading, VStack, Text, Button } from '@chakra-ui/react';
import { Alert } from '@/components/ui/alert';
import { Tooltip } from '@/components/ui/tooltip';
import { Popover } from '@/components/ui/popover';

export function FeedbackAndOverlayShowcase() {
  return (
    <Box as="section" id="feedback-overlay" w="full" py={16}>
      <Heading size="lg" mb={10}>
        Feedback & Overlays
      </Heading>

      <VStack spacing={12} align="stretch">
        <Box>
          <Heading size="md" mb={4}>
            Alerts
          </Heading>
          <VStack spacing={4} align="stretch">
            <Alert status="success" title="Data saved successfully!" />
            <Alert status="info" title="A new update is available." />
            <Alert status="warning" title="Your session is about to expire." />
            <Alert status="error" title="Failed to connect to the server." />
          </VStack>
        </Box>

        <Box>
          <Heading size="md" mb={4}>
            Tooltips
          </Heading>
          <Tooltip label="This is a tooltip!">
            <Button>Hover over me</Button>
          </Tooltip>
        </Box>

        <Box>
          <Heading size="md" mb={4}>
            Popovers
          </Heading>
          <Popover
            // CORRECTED: Use the 'triggerElement' prop
            triggerElement={<Button>Click to see details</Button>}
            header="Details"
          >
            <Text>
              This popover contains more detailed information about an action
              or item.
            </Text>
          </Popover>
        </Box>
      </VStack>
    </Box>
  );
}