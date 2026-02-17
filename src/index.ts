/**
 * Tuteliq React Native SDK
 *
 * @packageDocumentation
 */

// Re-export everything from the core SDK
export {
  // Client
  TuteliqClient,
  type TuteliqOptions,

  // Input types
  type DetectBullyingInput,
  type DetectGroomingInput,
  type DetectUnsafeInput,
  type AnalyzeInput,
  type AnalyzeEmotionsInput,
  type GetActionPlanInput,
  type GenerateReportInput,

  // Result types
  type BullyingResult,
  type GroomingResult,
  type UnsafeResult,
  type AnalyzeResult,
  type EmotionsResult,
  type ActionPlanResult,
  type ReportResult,

  // Message types
  type GroomingMessage,
  type EmotionMessage,
  type ReportMessage,

  // Context type
  type ContextInput,

  // Enums
  Severity,
  GroomingRisk,
  RiskLevel,
  EmotionTrend,

  // Audience type
  type Audience,

  // Errors
  TuteliqError,
  AuthenticationError,
  RateLimitError,
  ValidationError,
  NotFoundError,
  ServerError,
  TimeoutError,
  NetworkError,

  // Account types (GDPR)
  type AccountDeletionResult,
  type AccountExportResult,

  // Consent types (GDPR)
  type ConsentType,
  type ConsentStatus,
  type RecordConsentInput,
  type ConsentRecord,
  type ConsentStatusResult,
  type ConsentActionResult,

  // Rectification types (GDPR)
  type RectifyDataInput,
  type RectifyDataResult,

  // Audit log types (GDPR)
  type AuditAction,
  type AuditLogEntry,
  type AuditLogsResult,
  type GetAuditLogsOptions,

  // Media types
  type AnalyzeVoiceInput,
  type VoiceAnalysisResult,
  type TranscriptionResult,
  type TranscriptionSegment,
  type AnalyzeImageInput,
  type ImageAnalysisResult,
  type VisionResult,

  // Webhook types
  type Webhook,
  type WebhookListResult,
  type CreateWebhookInput,
  type CreateWebhookResult,
  type UpdateWebhookInput,
  type UpdateWebhookResult,
  type DeleteWebhookResult,
  type TestWebhookResult,
  type RegenerateSecretResult,

  // Pricing types
  type PricingPlan,
  type PricingResult,
  type PricingDetailPlan,
  type PricingDetailsResult,

  // Usage types
  type UsageSummary,
  type UsageQuota,
  type UsageDay,
  type UsageHistoryResult,
  type UsageByToolResult,
  type UsageMonthlyResult,

  // Voice streaming types
  type VoiceStreamConfig,
  type VoiceStreamHandlers,
  type VoiceStreamSession,
  type VoiceReadyEvent,
  type VoiceTranscriptionEvent,
  type VoiceAlertEvent,
  type VoiceSessionSummaryEvent,
  type VoiceConfigUpdatedEvent,
  type VoiceErrorEvent,

  // Detection types
  type DetectionInput,
  type DetectionCategory,
  type DetectionEvidence,
  type AgeCalibration,
  type DetectionResult,
  type AnalyseMultiInput,
  type AnalyseMultiSummary,
  type AnalyseMultiResult,

  // Video types
  type VideoSafetyFinding,
  type AnalyzeVideoInput,
  type VideoAnalysisResult,

  // New enums
  Detection,
  Language,
  LanguageStatus,
  Tier,
  SUPPORTED_LANGUAGES,

  // Utilities
  type Usage,
} from '@tuteliq/sdk';

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
  useVoiceStream,
} from './hooks';
export type { AsyncState, UseAsyncResult, UseVoiceStreamOptions, UseVoiceStreamResult } from './hooks';
