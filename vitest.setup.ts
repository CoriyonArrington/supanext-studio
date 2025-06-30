// vitest.setup.ts

// FIXED: Add dummy environment variables for the test environment
process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://localhost:54321';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';


// ─── Polyfill JSDOM’s read-only focus ─────────────────────────────────
const realFocus = HTMLElement.prototype.focus
Object.defineProperty(HTMLElement.prototype, 'focus', {
  configurable: true,
  writable: true,
  value(this: HTMLElement, ...args: any[]) {
    return realFocus.apply(this, args)
  },
})

// ─── Testing-Library + Jest-DOM setup ───────────────────────────────────
import { expect, afterEach, vi } from 'vitest' // FIX: Import vi
import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'

// FIX: Mock the 'scrollTo' function for all tests
// This prevents errors in components that use it, like Chakra UI's Menu.
window.HTMLElement.prototype.scrollTo = vi.fn();

// now `matchers` is an object → extend works
expect.extend(matchers)

afterEach(() => {
  cleanup()
})