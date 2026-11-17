import React from 'react';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { render, renderHook } from '@testing-library/react';
import { TuteliqClient, TuteliqOptions } from '@tuteliq/sdk';
import { TuteliqProvider, useTuteliqClient } from '../src/context';
import { createMockClient, createWrapper, MockClient } from './helpers';

jest.mock('@tuteliq/sdk', () => ({
  ...jest.requireActual<typeof import('@tuteliq/sdk')>('@tuteliq/sdk'),
  TuteliqClient: jest.fn(),
}));

const MockedClient = TuteliqClient as unknown as jest.Mock<(apiKey: string, options?: TuteliqOptions) => MockClient>;

describe('TuteliqProvider', () => {
  beforeEach(() => {
    MockedClient.mockReset();
    MockedClient.mockImplementation(() => createMockClient());
  });

  it('creates the client with the api key and the options prop', () => {
    const options = { timeout: 15000, retries: 2, retryDelay: 500 };
    renderHook(() => useTuteliqClient(), { wrapper: createWrapper(options) });

    expect(MockedClient).toHaveBeenCalledTimes(1);
    expect(MockedClient).toHaveBeenCalledWith('tq_test_key', options);
  });

  it('creates the client without options when none are given', () => {
    renderHook(() => useTuteliqClient(), { wrapper: createWrapper() });

    expect(MockedClient).toHaveBeenCalledWith('tq_test_key', undefined);
  });

  it('keeps one client across re-renders', () => {
    const { result, rerender } = renderHook(() => useTuteliqClient(), { wrapper: createWrapper() });
    const first = result.current.client;

    rerender();

    expect(MockedClient).toHaveBeenCalledTimes(1);
    expect(result.current.client).toBe(first);
    expect(result.current.isReady).toBe(true);
  });

  it('renders its children', () => {
    const { getByText } = render(
      <TuteliqProvider apiKey="tq_test_key">
        <span>child content</span>
      </TuteliqProvider>
    );

    expect(getByText('child content')).toBeTruthy();
  });

  it('makes useTuteliqClient throw outside the provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);

    expect(() => renderHook(() => useTuteliqClient())).toThrow(
      'useTuteliqClient must be used within a TuteliqProvider'
    );

    spy.mockRestore();
  });
});
