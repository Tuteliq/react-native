/**
 * Tuteliq React Native SDK
 *
 * @packageDocumentation
 */

// Re-export everything from the core SDK: the client, enums, errors, helpers
// and every public type, so this package always matches the SDK it wraps.
export * from '@tuteliq/sdk';

// React Native specific exports
export { TuteliqProvider, useTuteliqClient } from './context';
export type { TuteliqProviderProps, TuteliqContextValue } from './context';

export {
  useDetectBullying,
  useDetectGrooming,
  useDetectUnsafe,
  useAnalyze,
  useAnalyzeEmotions,
  useGetActionPlan,
  useGenerateReport,
  useDeleteAccountData,
  useExportAccountData,
  useRecordConsent,
  useGetConsentStatus,
  useWithdrawConsent,
  useRectifyData,
  useGetAuditLogs,
  useLogBreach,
  useListBreaches,
  useGetBreach,
  useUpdateBreachStatus,
  useAnalyzeVoice,
  useAnalyzeImage,
  useListWebhooks,
  useCreateWebhook,
  useUpdateWebhook,
  useDeleteWebhook,
  useTestWebhook,
  useRegenerateWebhookSecret,
  useGetPricing,
  useGetPricingDetails,
  useGetUsageHistory,
  useGetUsageByTool,
  useGetUsageMonthly,
  useDetectSocialEngineering,
  useDetectAppFraud,
  useDetectRomanceScam,
  useDetectMuleRecruitment,
  useDetectGamblingHarm,
  useDetectCoerciveControl,
  useDetectVulnerabilityExploitation,
  useDetectRadicalisation,
  useAnalyseMulti,
  useAnalyzeVideo,
  useCreateVerificationSession,
  useGetVerificationSession,
  useCancelVerificationSession,
  useVerifyImageMatch,
  useListIncidents,
  useGetIncident,
  useGetIncidentsOverview,
  useGetIncidentTrends,
  useReviewIncident,
  useBatchReviewIncidents,
  useAnalyzeDocument,
  useDetectSyntheticText,
  useDetectSyntheticImage,
  useDetectSyntheticAudio,
  useDetectSyntheticVideo,
  useDetectDistressSignals,
  useDetectTFGBV,
  useBatch,
  useGetUsageSummary,
  useGetQuota,
  useVoiceStream,
} from './hooks';
export type {
  AsyncState,
  UseAsyncResult,
  UseVoiceStreamOptions,
  UseVoiceStreamResult,
  BatchAnalyzeInput,
  BatchAnalyzeResult,
} from './hooks';
