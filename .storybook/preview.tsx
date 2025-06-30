// .storybook/preview.tsx
import React from 'react';
import type { Preview } from '@storybook/react';

// Import the providers and files from your project
import { ChakraProvider } from '@chakra-ui/react';
import { montserrat, nunito_sans } from '../src/lib/fonts';
import chakraTheme from '../src/lib/theme';
import '../src/app/globals.css';

// This decorator applies your custom fonts globally in Storybook
const withFonts = (Story: React.FC) => (
  <div className={`${montserrat.variable} ${nunito_sans.variable}`}>
    <Story />
  </div>
);

// This decorator provides the Chakra UI context with your custom theme
const withChakra = (Story: React.FC) => (
  <ChakraProvider theme={chakraTheme}>
    <Story />
  </ChakraProvider>
);

const preview: Preview = {
  // Decorators are now simpler: fonts are outermost, Chakra is innermost
  decorators: [withFonts, withChakra],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;