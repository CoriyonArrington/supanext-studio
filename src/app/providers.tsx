// src/app/providers.tsx
'use client'

import {
  ChakraProvider,
  cookieStorageManagerSSR,
  extendTheme, // Import extendTheme here
  localStorageManager,
} from '@chakra-ui/react'
import { chakraThemeConfig } from '@/lib/theme' // Import the raw config object

// Call extendTheme safely inside the Client Component module
const theme = extendTheme(chakraThemeConfig)

export function Providers({
  children,
  cookies,
}: {
  children: React.ReactNode
  cookies?: string
}) {
  const colorModeManager =
    typeof cookies === 'string'
      ? cookieStorageManagerSSR(cookies)
      : localStorageManager

  return (
    <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  )
}