'use client';

import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  useDisclosure,
  SlideFade,
  ScaleFade,
  Collapse,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';

export function AnimationsMotionShowcase() {
  const {
    isOpen: isSlideOpen,
    onToggle: onSlideToggle,
  } = useDisclosure({ defaultIsOpen: true });
  const {
    isOpen: isScaleOpen,
    onToggle: onScaleToggle,
  } = useDisclosure({ defaultIsOpen: true });
  const {
    isOpen: isCollapseOpen,
    onToggle: onCollapseToggle,
  } = useDisclosure({ defaultIsOpen: true });

  const boxBg = useColorModeValue('teal.100', 'teal.800');
  const textColor = useColorModeValue('gray.600', 'gray.500');

  return (
    <Box as="section" id="animations" w="full" py={16}>
      <Heading size="lg" mb={4}>
        Animations & Motion
      </Heading>
      <Text color={textColor} mb={10}>
        Subtle transitions and animations provide visual feedback and guide the
        user&apos;s attention. Chakra UI provides several components for this.
      </Text>

      <VStack spacing={10} align="stretch">
        {/* SlideFade Example */}
        <Box>
          <Heading size="sm" mb={2}>
            SlideFade
          </Heading>
          <Text fontSize="sm" color={textColor} mb={4}>
            Slides and fades an element into view.
          </Text>
          <Button onClick={onSlideToggle} mb={4}>
            Toggle SlideFade
          </Button>
          <SlideFade in={isSlideOpen} offsetY="20px">
            <Box p="40px" color="white" bg={boxBg} rounded="md" shadow="md">
              <Text>Sliding and Fading In</Text>
            </Box>
          </SlideFade>
        </Box>

        <Divider />

        {/* ScaleFade Example */}
        <Box>
          <Heading size="sm" mb={2}>
            ScaleFade
          </Heading>
          <Text fontSize="sm" color={textColor} mb={4}>
            Scales and fades an element into view.
          </Text>
          <Button onClick={onScaleToggle} mb={4}>
            Toggle ScaleFade
          </Button>
          <ScaleFade initialScale={0.9} in={isScaleOpen}>
            <Box p="40px" color="white" bg={boxBg} rounded="md" shadow="md">
              <Text>Scaling and Fading In</Text>
            </Box>
          </ScaleFade>
        </Box>

        <Divider />

        {/* Collapse Example */}
        <Box>
          <Heading size="sm" mb={2}>
            Collapse
          </Heading>
          <Text fontSize="sm" color={textColor} mb={4}>
            Expands or collapses an element vertically.
          </Text>
          <Button onClick={onCollapseToggle} mb={4}>
            Toggle Collapse
          </Button>
          <Collapse in={isCollapseOpen}>
            <Box p="40px" color="white" bg={boxBg} rounded="md" shadow="md">
              <Text>This content is collapsible.</Text>
            </Box>
          </Collapse>
        </Box>
      </VStack>
    </Box>
  );
}