// File: src/components/ui/calendly-widget.tsx
'use client';

import dynamic from 'next/dynamic';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { chakraThemeConfig } from '~/lib/theme'; // ← import your theme

interface CalendlyWidgetProps {
  /** e.g. "https://calendly.com/coriyonarrington/chat" */
  url: string;
}

// Dynamically load the Calendly React component on the client only
const InlineWidget = dynamic(
  () => import('react-calendly').then((mod) => mod.InlineWidget),
  { ssr: false }
);

export function CalendlyWidget({ url }: CalendlyWidgetProps) {
  // light / dark page BG
  const bgColor = useColorModeValue('#FFFFFF', '#1A202C');
  // light / dark text
  const textColor = useColorModeValue('#1A202C', '#FFFFFF');
  // your brand primary from chakraThemeConfig.colors.teal['500']
  const primaryColor = chakraThemeConfig.colors.teal['500'];

  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      boxShadow="lg"
      overflow="hidden"
      minH="700px" // stable height to avoid layout shifts
    >
      <InlineWidget
        url={url}
        pageSettings={{
          backgroundColor: bgColor,
          textColor,
          primaryColor,
          hideLandingPageDetails: true,
          hideGdprBanner: true,
        }}
        styles={{ height: '100%' }}
      />
    </Box>
  );
}