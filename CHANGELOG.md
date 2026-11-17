# Changelog

All notable changes to `@tuteliq/react-native` are documented here.

## [3.0.0] - Unreleased

Brings the React Native SDK up to date with the Tuteliq API and `@tuteliq/sdk` 3.2.

### Breaking changes

- **Requires `@tuteliq/sdk` 3.2 or later.** Every type this package exposes now comes from SDK 3.x. See the [`@tuteliq/sdk` 3.0.0 changelog](https://github.com/Tuteliq/node/blob/main/CHANGELOG.md) for the type changes that can stop existing TypeScript code from compiling. 3.2.0 also fixes `require('@tuteliq/react-native')` in Node and Jest, which failed with SDK 3.1.0.
- **Everything `@tuteliq/sdk` exports is re-exported.** The package used to re-export a hand-picked subset; it now re-exports the whole SDK surface (client, enums, errors, helpers and types), so names that existed in the SDK but not here are now available.

### Added

- Hooks for verification sessions: `useCreateVerificationSession`, `useGetVerificationSession`, `useCancelVerificationSession`, plus `useVerifyImageMatch`.
- Hooks for incidents: `useListIncidents`, `useGetIncident`, `useGetIncidentsOverview`, `useGetIncidentTrends`, `useReviewIncident`, `useBatchReviewIncidents`.
- `useAnalyzeDocument`, `useDetectSyntheticText`, `useDetectSyntheticImage`, `useDetectSyntheticAudio`, `useDetectSyntheticVideo`, `useDetectDistressSignals`, `useDetectTFGBV`, `useBatch`, `useGetUsageSummary` and `useGetQuota`.
- `BatchAnalyzeInput` and `BatchAnalyzeResult` types for `useBatch`.
- A test suite, run in CI and before publishing.

### Fixed

- The README documented APIs that do not exist. Every example is rewritten against the real API and is now compiled by the test suite.
- The supported languages list now names all 32 languages.

### Migrating from 2.x

- **Inputs:** text goes in `content`, not `text`: `execute({ content: message })`.
- **Results use the API's snake_case fields:** `result.risk_level`, `result.risk_score`, `result.is_bullying`, `result.bullying_type`, `result.dominant_emotions`. Branch on `result.recommended_action` (or `isActionable(result.recommended_action)`).
- **Tracking fields** are `external_id`, `customer_id` and `metadata`.
- **Provider options** go in the `options` prop, and the retry count is `retries`: `<TuteliqProvider apiKey={key} options={{ timeout: 30000, retries: 3 }}>`.
- **Grooming roles and action plan audiences are plain strings:** `{ role: 'adult', content }`, `audience: 'child'`. There is no `MessageRole` enum, and `Audience` is a type, not an object.
- **Verification is session based.** There is no `useVerifyAge` or `useVerifyIdentity`; create a session with `useCreateVerificationSession({ mode: VerificationMode.AGE })`, open `session.url`, then read the outcome with `useGetVerificationSession` or the `verification.completed` webhook.
