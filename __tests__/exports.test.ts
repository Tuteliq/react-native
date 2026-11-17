import { describe, it, expect } from '@jest/globals';
import * as sdk from '@tuteliq/sdk';
import * as pkg from '../src';

const hookNames = [
  'useCreateVerificationSession',
  'useGetVerificationSession',
  'useCancelVerificationSession',
  'useVerifyImageMatch',
  'useListIncidents',
  'useGetIncident',
  'useGetIncidentsOverview',
  'useGetIncidentTrends',
  'useReviewIncident',
  'useBatchReviewIncidents',
  'useAnalyzeDocument',
  'useDetectSyntheticText',
  'useDetectSyntheticImage',
  'useDetectSyntheticAudio',
  'useDetectSyntheticVideo',
  'useDetectDistressSignals',
  'useDetectTFGBV',
  'useBatch',
  'useGetUsageSummary',
  'useGetQuota',
];

describe('package exports', () => {
  it('re-exports every runtime export of @tuteliq/sdk', () => {
    const missing = Object.keys(sdk).filter((name) => !(name in pkg));
    expect(missing).toEqual([]);
    for (const name of Object.keys(sdk)) {
      expect(pkg[name as keyof typeof pkg]).toBe(sdk[name as keyof typeof sdk]);
    }
  });

  it.each(hookNames)('exports %s', (name) => {
    expect(typeof pkg[name as keyof typeof pkg]).toBe('function');
  });

  it('exports the provider and the verification enums', () => {
    expect(typeof pkg.TuteliqProvider).toBe('function');
    expect(typeof pkg.useTuteliqClient).toBe('function');
    expect(pkg.VerificationMode.AGE).toBe('age');
    expect(pkg.ChipPolicy.REQUIRED).toBe('required');
    expect(pkg.VerificationSessionStatus.DOCUMENT_REQUIRED).toBe('document_required');
  });
});
