import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { act, renderHook, waitFor } from '@testing-library/react';
import { TuteliqClient } from '@tuteliq/sdk';
import * as hooks from '../src/hooks';
import { createMockClient, createWrapper, MockClient } from './helpers';

jest.mock('@tuteliq/sdk', () => ({
  ...jest.requireActual<typeof import('@tuteliq/sdk')>('@tuteliq/sdk'),
  TuteliqClient: jest.fn(),
}));

interface HookCase {
  /** Name of the hook exported from src/hooks */
  hook: string;
  /** Client method the hook must call */
  method: string;
  /** Arguments passed to execute() */
  args: unknown[];
  /** Arguments the client method must receive */
  calledWith: unknown[];
}

const review = {
  action: 'dismiss',
  reason_code: 'false_positive',
  moderator_external_id: 'mod_42',
};

const cases: HookCase[] = [
  // Existing hooks
  { hook: 'useDetectBullying', method: 'detectBullying', args: [{ content: 'see you at practice' }], calledWith: [{ content: 'see you at practice' }] },
  {
    hook: 'useDetectGrooming',
    method: 'detectGrooming',
    args: [{ messages: [{ role: 'child', content: 'hi' }], childAge: 12 }],
    calledWith: [{ messages: [{ role: 'child', content: 'hi' }], childAge: 12 }],
  },
  { hook: 'useAnalyze', method: 'analyze', args: [{ content: 'hello' }], calledWith: [{ content: 'hello' }] },
  {
    hook: 'useUpdateWebhook',
    method: 'updateWebhook',
    args: [{ webhookId: 'wh_1', input: { name: 'Alerts' } }],
    calledWith: ['wh_1', { name: 'Alerts' }],
  },
  { hook: 'useGetUsageMonthly', method: 'getUsageMonthly', args: [], calledWith: [] },

  // Verification sessions
  { hook: 'useCreateVerificationSession', method: 'createVerificationSession', args: [{ mode: 'age', auto_capture: true }], calledWith: [{ mode: 'age', auto_capture: true }] },
  { hook: 'useGetVerificationSession', method: 'getVerificationSession', args: ['sess_1'], calledWith: ['sess_1'] },
  { hook: 'useCancelVerificationSession', method: 'cancelVerificationSession', args: ['sess_1'], calledWith: ['sess_1'] },
  { hook: 'useVerifyImageMatch', method: 'verifyImageMatch', args: [{ image: 'aW1n', referenceImage: 'cmVm' }], calledWith: [{ image: 'aW1n', referenceImage: 'cmVm' }] },

  // Incidents
  { hook: 'useListIncidents', method: 'listIncidents', args: [{ status: 'new', limit: 20 }], calledWith: [{ status: 'new', limit: 20 }] },
  { hook: 'useListIncidents', method: 'listIncidents', args: [], calledWith: [undefined] },
  { hook: 'useGetIncident', method: 'getIncident', args: ['inc_1'], calledWith: ['inc_1'] },
  { hook: 'useGetIncidentsOverview', method: 'getIncidentsOverview', args: [{ from: '2026-11-01' }], calledWith: [{ from: '2026-11-01' }] },
  { hook: 'useGetIncidentTrends', method: 'getIncidentTrends', args: [{ bucket: 'day' }], calledWith: [{ bucket: 'day' }] },
  { hook: 'useReviewIncident', method: 'reviewIncident', args: [{ incidentId: 'inc_1', input: review }], calledWith: ['inc_1', review] },
  {
    hook: 'useBatchReviewIncidents',
    method: 'batchReviewIncidents',
    args: [{ ...review, incident_ids: ['inc_1', 'inc_2'] }],
    calledWith: [{ ...review, incident_ids: ['inc_1', 'inc_2'] }],
  },

  // Documents
  { hook: 'useAnalyzeDocument', method: 'analyzeDocument', args: [{ file: 'pdf', filename: 'notes.pdf' }], calledWith: [{ file: 'pdf', filename: 'notes.pdf' }] },

  // Synthetic content
  { hook: 'useDetectSyntheticText', method: 'detectSyntheticText', args: [{ content: 'essay' }], calledWith: [{ content: 'essay' }] },
  { hook: 'useDetectSyntheticImage', method: 'detectSyntheticImage', args: [{ file: 'img', filename: 'a.jpg' }], calledWith: [{ file: 'img', filename: 'a.jpg' }] },
  { hook: 'useDetectSyntheticAudio', method: 'detectSyntheticAudio', args: [{ file: 'aud', filename: 'a.wav' }], calledWith: [{ file: 'aud', filename: 'a.wav' }] },
  { hook: 'useDetectSyntheticVideo', method: 'detectSyntheticVideo', args: [{ file: 'vid', filename: 'a.mp4' }], calledWith: [{ file: 'vid', filename: 'a.mp4' }] },

  // Safety detections
  { hook: 'useDetectDistressSignals', method: 'detectDistressSignals', args: [{ content: 'rough week' }], calledWith: [{ content: 'rough week' }] },
  { hook: 'useDetectTFGBV', method: 'detectTFGBV', args: [{ content: 'message' }], calledWith: [{ content: 'message' }] },

  // Batch
  {
    hook: 'useBatch',
    method: 'batch',
    args: [{ items: [{ type: 'bullying', content: 'one' }] }],
    calledWith: [{ items: [{ type: 'bullying', content: 'one' }] }],
  },

  // Usage
  { hook: 'useGetUsageSummary', method: 'getUsageSummary', args: ['2026-11-01'], calledWith: ['2026-11-01'] },
  { hook: 'useGetQuota', method: 'getQuota', args: [], calledWith: [] },
];

type AnyHookResult = {
  data: unknown;
  loading: boolean;
  error: Error | null;
  execute: (...args: unknown[]) => Promise<unknown>;
  reset: () => void;
};

function renderNamedHook(name: string) {
  const hook = (hooks as unknown as Record<string, () => AnyHookResult>)[name];
  if (typeof hook !== 'function') throw new Error(`${name} is not exported from src/hooks`);
  return renderHook(() => hook(), { wrapper: createWrapper() });
}

describe('hooks', () => {
  let client: MockClient;

  beforeEach(() => {
    client = createMockClient();
    (TuteliqClient as unknown as jest.Mock<() => MockClient>).mockImplementation(() => client);
  });

  describe.each(cases)('$hook -> client.$method', ({ hook, method, args, calledWith }) => {
    it('starts idle', () => {
      const { result } = renderNamedHook(hook);

      expect(result.current.data).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('calls the client and stores the result', async () => {
      const response = { ok: true, method };
      let resolve: (value: unknown) => void = () => undefined;
      client[method].mockReturnValue(new Promise((r) => { resolve = r; }));
      const { result } = renderNamedHook(hook);

      let pending: Promise<unknown> = Promise.resolve();
      act(() => {
        pending = result.current.execute(...args);
      });
      await waitFor(() => expect(result.current.loading).toBe(true));

      await act(async () => {
        resolve(response);
        await pending;
      });

      expect(client[method]).toHaveBeenCalledTimes(1);
      expect(client[method].mock.calls[0]).toEqual(calledWith);
      expect(result.current.data).toEqual(response);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('stores and rethrows a failure', async () => {
      client[method].mockRejectedValue(new Error('request failed'));
      const { result } = renderNamedHook(hook);

      await act(async () => {
        await expect(result.current.execute(...args)).rejects.toThrow('request failed');
      });

      expect(result.current.data).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.error?.message).toBe('request failed');
    });

    it('resets its state', async () => {
      client[method].mockResolvedValue({ ok: true });
      const { result } = renderNamedHook(hook);

      await act(async () => {
        await result.current.execute(...args);
      });
      act(() => result.current.reset());

      expect(result.current.data).toBeNull();
      expect(result.current.error).toBeNull();
    });
  });

  it('wraps a non-Error rejection in an Error', async () => {
    client.analyze.mockRejectedValue('plain failure');
    const { result } = renderNamedHook('useAnalyze');

    await act(async () => {
      await expect(result.current.execute({ content: 'x' })).rejects.toThrow('plain failure');
    });

    expect(result.current.error).toBeInstanceOf(Error);
  });
});
