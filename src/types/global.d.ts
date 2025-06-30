// src/types/globals.d.ts
/// <reference types="@testing-library/jest-dom" />

declare module '@zag-js/focus-visible' {
  export function setupGlobalFocusEvents(): void;
  export function trackFocusVisible(): void;
}
