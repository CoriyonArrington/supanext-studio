// tests/integration/verify-schema-types.integration.test.ts
import { describe, it, expect, beforeAll } from 'vitest';
import { execSync } from 'child_process';
import { resolve } from 'path';

// Paths
const PROJECT_ROOT = process.cwd();
const scriptPath = resolve(PROJECT_ROOT, 'scripts', 'verify-schema-types.sh');

describe('verify-schema-types.sh Integration Test', () => {

  // Always regenerate local types before verifying, to guarantee "no drift"
  beforeAll(() => {
    const updateScriptPath = resolve(PROJECT_ROOT, 'scripts', 'update-supabase-types.sh');
    console.log(`🔄 Running update script to ensure local types are up-to-date for the test.`);
    execSync(`bash ${updateScriptPath}`, {
      cwd: PROJECT_ROOT,
      stdio: 'pipe',
    });
  }, 60000); // allow up to 60s for Supabase CLI + network latency

  it('should run successfully and report no drift when local types are up-to-date', () => {
    let scriptOutput = '';
    let executionError: Error | null = null;

    try {
      scriptOutput = execSync(`bash ${scriptPath}`, {
        cwd: PROJECT_ROOT,
        encoding: 'utf-8',
        stdio: 'pipe',
      });
    } catch (error: any) {
      executionError = error;
      console.error(
        "verify-schema-types.sh script FAILED in integration test. Stderr:",
        error.stderr?.toString()
      );
    }

    // It should exit cleanly
    expect(
      executionError,
      "Script should execute without error when types are in sync"
    ).toBeNull();

    // And should confirm no drift
    expect(scriptOutput).toContain("✅ No schema drift detected.");
  }, 120000); // generous timeout for both update and verify
});
