// tests/integration/update-supabase-types.integration.test.ts
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { execSync } from 'child_process';
import { existsSync, readFileSync, rmSync, mkdirSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';

const PROJECT_ROOT = process.cwd();
const scriptPath = resolve(PROJECT_ROOT, 'scripts/update-supabase-types.sh');
// This is the new, correct path for the generated types file.
const outputFilePath = resolve(PROJECT_ROOT, 'src', 'lib', 'database.types.ts');
const typesDirPath = dirname(outputFilePath);

describe('update-supabase-types.sh Integration Test', () => {
  let initialContent: string | null = null;
  let fileExistedInitially: boolean = false;

  // Before all tests, check if the types file already exists and save its content.
  beforeAll(() => { 
    fileExistedInitially = existsSync(outputFilePath);
    if (fileExistedInitially) {
      initialContent = readFileSync(outputFilePath, 'utf-8');
    }
    // Ensure the target directory (src/lib) exists
    if (!existsSync(typesDirPath)) {
      mkdirSync(typesDirPath, { recursive: true });
    }
  });

  // After all tests, restore the original file to avoid side effects.
  afterAll(() => { 
    if (fileExistedInitially && initialContent !== null) {
      writeFileSync(outputFilePath, initialContent, 'utf-8');
    }
  });

  // Before each individual test, delete the file to ensure the script creates it.
  beforeEach(() => {
      if (existsSync(outputFilePath)) {
          rmSync(outputFilePath);
      }
  });

  it('should run successfully and create a non-empty types file', () => {
    let scriptStderr = '';
    let executionError: Error | null = null;

    try {
      // Execute the script and capture its output
      execSync(`bash ${scriptPath}`, { cwd: PROJECT_ROOT, stdio: 'pipe', encoding: 'utf-8' });
    } catch (error: any) {
      executionError = error;
      scriptStderr = error.stderr?.toString() || '';
    }

    // Assert that the script ran without errors
    expect(executionError, `Script should execute without error. Stderr: ${scriptStderr}`).toBeNull();
    
    // Assert that the file was created at the correct new path
    expect(existsSync(outputFilePath), `${outputFilePath} should be created`).toBe(true);
    
    // Assert that the created file has content
    const content = readFileSync(outputFilePath, 'utf8');
    expect(content.length).toBeGreaterThan(100); 
    expect(content).toContain("export type Database");
  }, 120000); // Generous timeout for Supabase CLI to run
});