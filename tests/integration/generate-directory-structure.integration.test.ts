// tests/integration/generate-directory-structure.integration.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execSync } from 'child_process';
import { existsSync, readFileSync, rmSync, mkdirSync } from 'fs';
import { resolve } from 'path';

const PROJECT_ROOT = process.cwd();
const scriptPath = resolve(PROJECT_ROOT, 'scripts/generate-directory-structure.sh');
const reportsDir = resolve(PROJECT_ROOT, 'reports');
const mdOutputFilePath = resolve(reportsDir, 'project-directory-tree.md');

const isTreeCommandAvailable = () => {
  try {
    execSync('command -v tree', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
};
const treeAvailable = isTreeCommandAvailable();

describe('generate-directory-structure.sh Integration Test', () => {
  // Run the script once before all tests in this block
  beforeAll(() => {
    if (!existsSync(reportsDir)) {
      mkdirSync(reportsDir, { recursive: true });
    } else {
      if (existsSync(mdOutputFilePath)) rmSync(mdOutputFilePath);
    }
    execSync(`bash ${scriptPath}`, { cwd: PROJECT_ROOT, stdio: 'pipe' });
  }, 30000);

  // Clean up the created file after all tests are done
  afterAll(() => {
    if (existsSync(mdOutputFilePath)) rmSync(mdOutputFilePath);
  });

  it('should create the project-directory-tree.md file', () => {
    expect(existsSync(mdOutputFilePath), `Markdown file was not created at ${mdOutputFilePath}`).toBe(true);
  });

  // Conditionally run this test only if the 'tree' command exists on the system
  if (treeAvailable) {
    it('project-directory-tree.md should contain the title and tree output', () => {
      const content = readFileSync(mdOutputFilePath, 'utf8');
      expect(content.length, 'Markdown file should not be empty').toBeGreaterThan(0);
      expect(content).toContain('# Project Directory Structure');
      expect(content).toContain('```'); // Check for the code block that 'tree' output is wrapped in
    });
  } else {
    // If 'tree' is not available, we can't test the content, but this test serves as a notification.
    it.skip('skipped: cannot verify tree content because "tree" command is not available', () => {});
  }
});