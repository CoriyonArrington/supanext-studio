'use client';

import React from 'react';
import {
  Box,
  Link as ChakraLink,
  VStack,
  List,
  ListItem,
  useColorModeValue,
  Heading,
  Text,
  Container,
  Divider,
} from '@chakra-ui/react';

// --- Import All Showcase Components ---
import { ColorSystemShowcase } from '@/components/design-system/color-system-showcase';
import { TypographyShowcase } from '@/components/design-system/typography-showcase';
import { SpacingShowcase } from '@/components/design-system/spacing-showcase';
import { BorderRadiusShowcase } from '@/components/design-system/border-radius-showcase';
import { ShadowsShowcase } from '@/components/design-system/shadows-showcase';
import { BreakpointsShowcase } from '@/components/design-system/breakpoints-showcase';
import { AnimationsMotionShowcase } from '@/components/design-system/animations-motion-showcase';
import { IconographyShowcase } from '@/components/design-system/iconography-showcase';
import { LayoutPrimitivesShowcase } from '@/components/design-system/layout-primitives-showcase';
import { OverlayAndLayoutShowcase } from '@/components/design-system/overlay-and-layout-showcase';
import { FeedbackAndOverlayShowcase } from '@/components/design-system/feedback-and-overlay-showcase';
import { ChakraComponentsShowcase } from '@/components/design-system/chakra-components-showcase';
import { AppComponentsShowcase } from '@/components/design-system/app-components-showcase';
import { AuthFormShowcase } from '@/components/design-system/auth-form-showcase';

// --- Define Navigation ---
const sections = [
  { id: 'colors', title: 'Color System' },
  { id: 'typography', title: 'Typography' },
  { id: 'spacing', title: 'Spacing & Layout' },
  { id: 'borderradius', title: 'Border Radius' },
  { id: 'shadows', title: 'Shadows' },
  { id: 'breakpoints', title: 'Breakpoints' },
  { id: 'iconography', title: 'Iconography' },
  { id: 'animations', title: 'Animations & Motion' },
  { id: 'layout-primitives', title: 'Layout Primitives' },
  { id: 'overlay-layout', title: 'Overlay & Layout Patterns' },
  { id: 'feedback-overlay', title: 'Feedback & Overlays' },
  { id: 'components', title: 'Base Chakra Components' },
  { id: 'charts', title: 'Charts & Visualizations' }, // 2. Add to navigation
  { id: 'app-components', title: 'Application Components' },
  { id: 'auth-forms', title: 'Authentication Forms' },
];

export default function DesignSystemPage() {
  const listItemHoverBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Container maxW="container.lg" py={{ base: 10, md: 16 }}>
      <Box as="header" mb={12} textAlign="center">
        <Heading as="h1" size="2xl" mb={4}>
          Design System
        </Heading>
        <Text fontSize="xl" color="gray.500">
          A visual guide to the project&apos;s tokens, components, and brand
          standards.
        </Text>
      </Box>

      <Box as="nav" mb={16} p={4} borderWidth="1px" borderRadius="lg">
        <Heading as="h4" size="md" mb={3}>
          On This Page
        </Heading>
        <List>
          {sections.map((section) => (
            <ListItem
              key={section.id}
              _hover={{ bg: listItemHoverBg }}
              py={1}
              px={2}
              borderRadius="md"
            >
              <ChakraLink
                href={`#${section.id}`}
                _hover={{ textDecoration: 'none' }}
                fontWeight="medium"
              >
                {section.title}
              </ChakraLink>
            </ListItem>
          ))}
        </List>
      </Box>

      <VStack
        alignItems="stretch"
        spacing={0}
        divider={<Divider my={8} />}
      >
        <ColorSystemShowcase />
        <TypographyShowcase />
        <SpacingShowcase />
        <BorderRadiusShowcase />
        <ShadowsShowcase />
        <BreakpointsShowcase />
        <IconographyShowcase />
        <AnimationsMotionShowcase />
        <LayoutPrimitivesShowcase />
        <OverlayAndLayoutShowcase />
        <FeedbackAndOverlayShowcase />
        <ChakraComponentsShowcase />
        <AppComponentsShowcase />
        <AuthFormShowcase />
      </VStack>
    </Container>
  );
}