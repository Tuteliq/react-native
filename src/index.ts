/**
 * SafeNest React Native SDK
 *
 * @packageDocumentation
 */

// Re-export everything from the core SDK
export {
  // Client
  SafeNestClient,
  type SafeNestConfig,

  // Input types
  type DetectBullyingInput,
  type DetectGroomingInput,
  type DetectUnsafeInput,
  type AnalyzeInput,
  type AnalyzeEmotionsInput,
  type GetActionPlanInput,
  type GenerateReportInput,

  // Result types
  type DetectBullyingResult,
  type DetectGroomingResult,
  type DetectUnsafeResult,
  type AnalyzeResult,
  type AnalyzeEmotionsResult,
  type ActionPlanResult,
  type ReportResult,

  // Message types
  type GroomingMessage,
  type EmotionMessage,
  type ReportMessage,

  // Enums
  Severity,
  GroomingRisk,
  RiskLevel,
  EmotionTrend,
  Audience,
  MessageRole,

  // Errors
  SafeNestError,
  AuthenticationError,
  RateLimitError,
  ValidationError,
  NotFoundError,
  ServerError,
  TimeoutError,
  NetworkError,

  // Utilities
  type AnalysisContext,
  type Usage,
  type TrackingFields,
} from '@safenest/sdk';

// React Native specific exports
export { SafeNestProvider, useSafeNestClient } from './context';
export type { SafeNestProviderProps, SafeNestContextValue } from './context';

export {
  useDetectBullying,
  useDetectGrooming,
  useDetectUnsafe,
  useAnalyze,
  useAnalyzeEmotions,
  useGetActionPlan,
  useGenerateReport,
} from './hooks';
export type { AsyncState, UseAsyncResult } from './hooks';
