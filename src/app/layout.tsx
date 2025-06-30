// src/app/layout.tsx

import { ColorModeScript, Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { montserrat, nunito_sans } from '~/lib/fonts';
import { chakraThemeConfig } from '~/lib/theme';
import { Providers } from './providers';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';

// FIX: Updated metadata with the new project name
export const metadata = {
  title: 'SupaNext Studio | The Next.js SaaS Starter Kit',
  description: 'A feature-rich starter kit to build and launch your next great idea.',
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const fontClasses = [montserrat.variable, nunito_sans.variable].join(' ');
  const cookieStore = await cookies();

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={fontClasses}>
        <ColorModeScript
          initialColorMode={chakraThemeConfig.config.initialColorMode}
        />
        <Providers cookies={cookieStore.toString()}>
          <Flex direction="column" minHeight="100vh">
            {children}
          </Flex>
        </Providers>
        <Analytics />
        <SpeedInsights />
        <Script id="maze-snippet" strategy="afterInteractive">
          {`
            (function (m, a, z, e) {
              var s, t;
              try {
                t = m.sessionStorage.getItem('maze-us');
              } catch (err) {}

              if (!t) {
                t = new Date().getTime();
                try {
                  m.sessionStorage.setItem('maze-us', t);
                } catch (err) {}
              }

              s = a.createElement('script');
              s.src = z + '?apiKey=' + e;
              s.async = true;
              a.getElementsByTagName('head')[0].appendChild(s);
              m.mazeUniversalSnippetApiKey = e;
            })(window, document, 'https://snippet.maze.co/maze-universal-loader.js', '07d12561-316d-4634-a561-6baf4fb6f207');
          `}
        </Script>
        <Script
          id="senja-snippet"
          src="https://static.senja.io/dist/platform.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}