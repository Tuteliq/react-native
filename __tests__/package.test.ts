/**
 * @jest-environment node
 */
import { describe, it, expect, beforeAll, jest } from '@jest/globals';
import { execFileSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

const root = join(__dirname, '..');

function runNode(args: string[]): string {
  return execFileSync(process.execPath, args, { cwd: root, encoding: 'utf8' }).trim();
}

describe('built package', () => {
  beforeAll(() => {
    if (!existsSync(join(root, 'dist', 'index.js')) || !existsSync(join(root, 'dist', 'index.mjs'))) {
      throw new Error('dist/ is missing: run `npm run build` before the tests');
    }
  });

  it('loads with require() in Node', () => {
    const out = runNode([
      '-e',
      "const m = require('./dist/index.js'); console.log([typeof m.TuteliqClient, typeof m.TuteliqProvider, typeof m.useAnalyze].join(','))",
    ]);
    expect(out).toBe('function,function,function');
  });

  it('loads with import in Node', () => {
    const out = runNode([
      '--input-type=module',
      '-e',
      "const m = await import(new URL('./dist/index.mjs', 'file://' + process.cwd() + '/').href); console.log([typeof m.TuteliqClient, typeof m.TuteliqProvider, typeof m.useAnalyze].join(','))",
    ]);
    expect(out).toBe('function,function,function');
  });

  it('loads with require() in Jest', () => {
    const m = jest.requireActual<Record<string, unknown>>(join(root, 'dist', 'index.js'));
    expect(typeof m.TuteliqClient).toBe('function');
    expect(typeof m.useGetQuota).toBe('function');
  });
});
