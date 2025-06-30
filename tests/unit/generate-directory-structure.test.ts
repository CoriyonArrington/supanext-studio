// tests/unit/generate-directory-structure.test.ts
import { statSync, existsSync, rmSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { test, expect, describe, beforeAll, afterAll } from 'vitest';
import { execSync } from 'child_process';

const PROJECT_ROOT = process.cwd();
const scriptPath = resolve(PROJECT_ROOT, 'scripts/generate-directory-structure.sh');
const reportsDir = resolve(PROJECT_ROOT, 'reports');
const mdOutputFilePath = resolve(reportsDir, 'project-directory-tree.md');

describe('generate-directory-structure.sh Unit Tests', () => {
  beforeAll(() => {
    // Ensure the reports directory exists and is clean for the test
    if (!existsSync(reportsDir)) {
      mkdirSync(reportsDir, { recursive: true });
    }
    if (existsSync(mdOutputFilePath)) {
      rmSync(mdOutputFilePath);
    }
  });

  test('script file exists and is executable', () => {
    expect(existsSync(scriptPath), 'Script file should exist').toBe(true);
    const stats = statSync(scriptPath);
    expect(stats.mode & 0o111, 'Script should have execute permissions').toBeTruthy();
  });

  describe('Script Execution', () => {
    let scriptOutput: string;
    let executionError: Error | null = null;

    beforeAll(() => {
      try {
        scriptOutput = execSync(`bash ${scriptPath}`, {
          cwd: PROJECT_ROOT,
          encoding: 'utf-8',
        });
      } catch (error: any) {
        executionError = error;
        scriptOutput = error.stdout || '';
        console.error("Error executing script in beforeAll:", error.stderr || '');
      }
    });

    test('script executes without throwing an unhandled error', () => {
      expect(executionError, `Script should execute successfully.`).toBeNull();
    });

    test('script indicates it is generating the tree', () => {
      expect(scriptOutput).toContain('Generating project directory tree...');
    });
  });
});