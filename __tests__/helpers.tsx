import React from 'react';
import { jest } from '@jest/globals';
import { TuteliqProvider } from '../src/context';
import type { TuteliqOptions } from '@tuteliq/sdk';

type ClientMethod = jest.Mock<(...args: unknown[]) => Promise<unknown>>;

/** A stand-in client: any method read from it is a jest mock, created on first use. */
export type MockClient = Record<string, ClientMethod>;

export function createMockClient(): MockClient {
  const methods: MockClient = {};
  return new Proxy(methods, {
    get: (target, name: string) => {
      if (!target[name]) target[name] = jest.fn<(...args: unknown[]) => Promise<unknown>>();
      return target[name];
    },
  });
}

export function createWrapper(options?: TuteliqOptions) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <TuteliqProvider apiKey="tq_test_key" options={options}>
        {children}
      </TuteliqProvider>
    );
  };
}
