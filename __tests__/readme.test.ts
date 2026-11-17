/**
 * @jest-environment node
 */
import { describe, it, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import { join } from 'path';
import ts from 'typescript';

const root = join(__dirname, '..');

/** Every ```tsx block in the README, in order. */
function readmeSnippets(): string[] {
  const readme = readFileSync(join(root, 'README.md'), 'utf8');
  return [...readme.matchAll(/```tsx\n([\s\S]*?)```/g)].map((m) => m[1]);
}

/** Type-checks the snippets as modules that import the package from src/. */
function typecheck(snippets: string[]): string[] {
  const files = new Map<string, string>();
  snippets.forEach((code, i) => files.set(join(root, '__readme__', `snippet-${i}.tsx`), code));
  // Snippets may import a sibling component; give them a stub.
  files.set(join(root, '__readme__', 'ChatInput.tsx'), 'export function ChatInput() { return null; }\n');

  const options: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.ReactJSX,
    lib: ['lib.es2020.d.ts', 'lib.dom.d.ts'],
    types: ['node'],
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    noEmit: true,
    paths: { '@tuteliq/react-native': [join(root, 'src', 'index.ts')] },
  };

  const host = ts.createCompilerHost(options);
  const { getSourceFile, fileExists, readFile, directoryExists } = host;
  const virtualDir = join(root, '__readme__');
  host.fileExists = (name) => files.has(name) || fileExists(name);
  host.directoryExists = (name) => name === virtualDir || (directoryExists?.(name) ?? true);
  host.readFile = (name) => files.get(name) ?? readFile(name);
  host.getSourceFile = (name, version, ...rest) => {
    const virtual = files.get(name);
    return virtual !== undefined
      ? ts.createSourceFile(name, virtual, version, true, ts.ScriptKind.TSX)
      : getSourceFile(name, version, ...rest);
  };

  const program = ts.createProgram([...files.keys()], options, host);
  return ts.getPreEmitDiagnostics(program).map((d) => {
    const message = ts.flattenDiagnosticMessageText(d.messageText, '\n');
    if (!d.file || d.start === undefined) return message;
    const { line } = d.file.getLineAndCharacterOfPosition(d.start);
    return `${d.file.fileName.replace(root + '/', '')}:${line + 1} ${message}`;
  });
}

describe('README', () => {
  it('has tsx examples', () => {
    expect(readmeSnippets().length).toBeGreaterThan(10);
  });

  it('every tsx example compiles against the package', () => {
    expect(typecheck(readmeSnippets())).toEqual([]);
  });

  it('documents no retired API', () => {
    const readme = readFileSync(join(root, 'README.md'), 'utf8');
    for (const retired of ['useVerifyAge', 'useVerifyIdentity', 'MessageRole', 'Audience.', 'maxRetries', 'riskLevel', 'isBullying']) {
      expect(readme).not.toContain(retired);
    }
  });
});
