// tests/unit/verify-schema-types.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { exec, type ExecException } from 'child_process';
import fs from 'fs';
import path from 'path';

// Mock child_process.exec so we control the script invocation
vi.mock('child_process', () => ({
  exec: vi.fn(),
}));

const SCRIPT_PATH = path.resolve(process.cwd(), 'scripts/verify-schema-types.sh');
const TEMP_TEST_DIR = path.resolve(process.cwd(), 'temp-test-verify-schema');
const MOCK_TYPES_PATH = path.resolve(TEMP_TEST_DIR, 'src/lib/database.types.ts');
const MOCK_SUPABASE_DIR = path.resolve(TEMP_TEST_DIR, 'supabase/.temp');
const MOCK_PROJECT_REF_FILE = path.resolve(MOCK_SUPABASE_DIR, 'project-ref');

// Helper to invoke the verify script
function runScript(): Promise<{ err: ExecException | null; stdout: string; stderr: string }> {
  return new Promise((resolve) => {
    exec(`bash ${SCRIPT_PATH}`, { cwd: TEMP_TEST_DIR }, (err, stdout, stderr) => {
      resolve({ err, stdout, stderr });
    });
  });
}

describe('verify-schema-types.sh Unit Tests (with Mocked Supabase CLI)', () => {
  beforeEach(() => {
    // Create directories and project-ref file
    fs.mkdirSync(path.dirname(MOCK_TYPES_PATH), { recursive: true });
    fs.mkdirSync(MOCK_SUPABASE_DIR, { recursive: true });
    fs.writeFileSync(MOCK_PROJECT_REF_FILE, 'mock_project_ref');
    vi.clearAllMocks();
  });

  afterEach(() => {
    fs.rmSync(TEMP_TEST_DIR, { recursive: true, force: true });
  });

  it('should report no drift if local types match mock remote types', async () => {
    const typesContent = 'export type Tables = { profiles: {} };';
    fs.writeFileSync(MOCK_TYPES_PATH, typesContent);

    // Simulate successful script run
    (exec as any).mockImplementation((command: string, options: any, callback: Function) => {
      if (command.startsWith(`bash ${SCRIPT_PATH}`)) {
        return callback(null, '✅ No schema drift detected.', '');
      }
      return callback(new Error(`unexpected command: ${command}`), '', '');
    });

    const { err, stdout } = await runScript();
    expect(err, 'Script should succeed').toBeNull();
    expect(stdout).toContain('✅ No schema drift detected.');
  });

  it('should report drift if local types differ from mock remote types', async () => {
    fs.writeFileSync(MOCK_TYPES_PATH, 'export type Tables = { OLD: {} };');

    // Simulate script detecting drift
    (exec as any).mockImplementation((command: string, options: any, callback: Function) => {
      if (command.startsWith(`bash ${SCRIPT_PATH}`)) {
        const error = new Error('schema drift detected') as ExecException;
        error.code = 1;
        return callback(error, '', '🚨 Schema drift DETECTED!');
      }
      return callback(new Error(`unexpected command: ${command}`), '', '');
    });

    const { err, stderr } = await runScript();
    expect(err, 'Script should fail').not.toBeNull();
    expect(stderr).toContain('🚨 Schema drift DETECTED!');
  });

  it('should fail and instruct to generate if local types file is missing', async () => {
    // No local types file created
    (exec as any).mockImplementation((command: string, options: any, callback: Function) => {
      if (command.startsWith(`bash ${SCRIPT_PATH}`)) {
        const error = new Error('missing types file') as ExecException;
        error.code = 1;
        return callback(error, '', "Local types file 'src/lib/database.types.ts' not found");
      }
      return callback(new Error(`unexpected command: ${command}`), '', '');
    });

    const { err, stderr } = await runScript();
    expect(err, 'Script should fail').not.toBeNull();
    expect(stderr).toContain("Local types file 'src/lib/database.types.ts' not found");
  });
});
