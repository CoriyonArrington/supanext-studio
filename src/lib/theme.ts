// src/lib/theme.ts

export const chakraThemeConfig = {
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  // ... (colors, fonts, radii, shadows, and styles objects remain the same) ...
  colors: {
    teal: {
      '50': '#e6f7f2',
      '100': '#c1e9d9',
      '200': '#9adbc1',
      '300': '#74cdaa',
      '400': '#4dbf92',
      '500': '#2AB07A',
      '600': '#228d62',
      '700': '#196a49',
      '800': '#114731',
      '900': '#082418',
    },
    brand: {
      primary: '#2AB07A',
      secondary: '#4A69E2',
      destructive: '#E5484D',
      accent: '#F8F9FA',
      background: '#FFFFFF',
      foreground: '#111827',
      card: '#F3F4F6',
      muted: '#6B7280',
      border: '#E5E7EB',
      input: '#D1D5DB',
      ring: '#2AB07A',
      'chart-1': '#DC6C6C',
      'chart-2': '#319795',
      'chart-3': '#805AD5',
      'chart-4': '#D69E2E',
      'chart-5': '#DD6B20',
    },
  },
  fonts: {
    heading: 'var(--font-montserrat)',
    body: 'var(--font-nunito-sans)',
  },
  radii: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    outline: '0 0 0 3px var(--chakra-colors-teal-500)',
  },
  styles: {
    global: (props: { colorMode: 'light' | 'dark' }) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'black' : 'gray.50',
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
        fontFamily: 'var(--font-nunito-sans)',
      },
      'h1, h2, h3, h4, h5, h6': {
        fontFamily: 'var(--font-montserrat)',
      },
      'a:focus-visible': {
        boxShadow: 'outline',
        outline: 'none',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        minWidth: '10rem',
        minHeight: '2.75rem',
      },
      // By removing the `variants` object, we allow the default Chakra styles to apply,
      // which correctly handle the hover state for all color schemes.
    },
    Input: {
      defaultProps: {
        focusBorderColor: 'teal.500',
      },
    },
    Textarea: {
      defaultProps: {
        focusBorderColor: 'teal.500',
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: 'var(--font-montserrat)',
      },
    },
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: 'none',
          color: 'teal.600',
        },
      },
    },
  },
} as const;