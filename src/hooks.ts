import { useState, useCallback, useEffect, useRef } from 'react';
import {
  DetectBullyingInput,
  BullyingResult,
  DetectGroomingInput,
  GroomingResult,
  DetectUnsafeInput,
  UnsafeResult,
  AnalyzeInput,
  AnalyzeResult,
  AnalyzeEmotionsInput,
  EmotionsResult,
  GetActionPlanInput,
  ActionPlanResult,
  GenerateReportInput,
  ReportResult,
  AccountDeletionResult,
  AccountExportResult,
  ConsentActionResult,
  ConsentStatusResult,
  ConsentType,
  RecordConsentInput,
  RectifyDataInput,
  RectifyDataResult,
  AuditLogsResult,
  GetAuditLogsOptions,
  LogBreachInput,
  LogBreachResult,
  BreachListResult,
  BreachResult,
  UpdateBreachInput,
  GetBreachesOptions,
  AnalyzeVoiceInput,
  VoiceAnalysisResult,
  AnalyzeImageInput,
  ImageAnalysisResult,
  WebhookListResult,
  CreateWebhookInput,
  CreateWebhookResult,
  UpdateWebhookInput,
  UpdateWebhookResult,
  DeleteWebhookResult,
  TestWebhookResult,
  RegenerateSecretResult,
  PricingResult,
  PricingDetailsResult,
  UsageHistoryResult,
  UsageByToolResult,
  UsageMonthlyResult,
  VoiceStreamConfig,
  VoiceStreamHandlers,
  VoiceStreamSession,
  DetectionInput,
  DetectionResult,
  AnalyseMultiInput,
  AnalyseMultiResult,
  AnalyzeVideoInput,
  VideoAnalysisResult,
  CreateVerificationSessionInput,
  VerificationSession,
  VerificationSessionResult,
  VerifyImageMatchInput,
  VerifyImageMatchResult,
  ListIncidentsInput,
  ListIncidentsResult,
  IncidentDetail,
  IncidentsOverviewInput,
  IncidentsOverview,
  IncidentTrendsInput,
  IncidentTrends,
  ReviewIncidentInput,
  ReviewIncidentResult,
  BatchReviewIncidentsInput,
  BatchReviewIncidentsResult,
  AnalyzeDocumentInput,
  DocumentAnalysisResult,
  DetectSyntheticTextInput,
  SyntheticTextResult,
  DetectSyntheticImageInput,
  SyntheticImageResult,
  DetectSyntheticAudioInput,
  SyntheticAudioResult,
  DetectSyntheticVideoInput,
  SyntheticVideoResult,
  DistressSignalsResult,
  TFGBVResult,
  UsageSummary,
  UsageQuota,
  TuteliqClient,
} from '@tuteliq/sdk';
import { useTuteliqClient } from './context';

/**
 * Input for {@link useBatch}: the items to analyze in one request.
 */
export type BatchAnalyzeInput = Parameters<TuteliqClient['batch']>[0];

/**
 * Result of {@link useBatch}: one result per item plus a summary.
 */
export type BatchAnalyzeResult = Awaited<ReturnType<TuteliqClient['batch']>>;

/**
 * State for async operations.
 */
export interface AsyncState<T> {
  /** The result data */
  data: T | null;
  /** Loading state */
  loading: boolean;
  /** Error if any */
  error: Error | null;
}

/**
 * Hook result type.
 */
export interface UseAsyncResult<T, I> extends AsyncState<T> {
  /** Execute the operation */
  execute: (input: I) => Promise<T>;
  /** Reset state */
  reset: () => void;
}

/**
 * Hook for bullying detection.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { data, loading, error, execute } = useDetectBullying();
 *
 *   const handleCheck = async () => {
 *     const result = await execute({ content: 'Message to check' });
 *     if (result.is_bullying) {
 *       console.log('Bullying detected!');
 *     }
 *   };
 * }
 * ```
 */
export function useDetectBullying(): UseAsyncResult<BullyingResult, DetectBullyingInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<BullyingResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: DetectBullyingInput): Promise<BullyingResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.detectBullying(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for grooming detection.
 */
export function useDetectGrooming(): UseAsyncResult<GroomingResult, DetectGroomingInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<GroomingResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: DetectGroomingInput): Promise<GroomingResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.detectGrooming(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for unsafe content detection.
 */
export function useDetectUnsafe(): UseAsyncResult<UnsafeResult, DetectUnsafeInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<UnsafeResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: DetectUnsafeInput): Promise<UnsafeResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.detectUnsafe(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for quick analysis.
 *
 * @example
 * ```tsx
 * function ChatInput() {
 *   const { execute, loading } = useAnalyze();
 *   const [message, setMessage] = useState('');
 *
 *   const handleSend = async () => {
 *     const result = await execute({ content: message });
 *     if (result.risk_level === 'critical') {
 *       Alert.alert('Message blocked', result.summary);
 *       return;
 *     }
 *     // Send message...
 *   };
 * }
 * ```
 */
export function useAnalyze(): UseAsyncResult<AnalyzeResult, AnalyzeInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<AnalyzeResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: AnalyzeInput): Promise<AnalyzeResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.analyze(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for emotion analysis.
 */
export function useAnalyzeEmotions(): UseAsyncResult<EmotionsResult, AnalyzeEmotionsInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<EmotionsResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: AnalyzeEmotionsInput): Promise<EmotionsResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.analyzeEmotions(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for action plan generation.
 */
export function useGetActionPlan(): UseAsyncResult<ActionPlanResult, GetActionPlanInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<ActionPlanResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: GetActionPlanInput): Promise<ActionPlanResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.getActionPlan(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for incident report generation.
 */
export function useGenerateReport(): UseAsyncResult<ReportResult, GenerateReportInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<ReportResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: GenerateReportInput): Promise<ReportResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.generateReport(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for account data deletion (GDPR Article 17, Right to Erasure).
 */
export function useDeleteAccountData(): Omit<UseAsyncResult<AccountDeletionResult, void>, 'execute'> & { execute: () => Promise<AccountDeletionResult> } {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<AccountDeletionResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (): Promise<AccountDeletionResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.deleteAccountData();
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for account data export (GDPR Article 20, Right to Data Portability).
 */
export function useExportAccountData(): Omit<UseAsyncResult<AccountExportResult, void>, 'execute'> & { execute: () => Promise<AccountExportResult> } {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<AccountExportResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (): Promise<AccountExportResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.exportAccountData();
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for recording consent (GDPR Article 7).
 */
export function useRecordConsent(): UseAsyncResult<ConsentActionResult, RecordConsentInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<ConsentActionResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: RecordConsentInput): Promise<ConsentActionResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.recordConsent(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for getting consent status (GDPR Article 7).
 */
export function useGetConsentStatus(): UseAsyncResult<ConsentStatusResult, ConsentType | undefined> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<ConsentStatusResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (type?: ConsentType): Promise<ConsentStatusResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.getConsentStatus(type);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for withdrawing consent (GDPR Article 7.3).
 */
export function useWithdrawConsent(): UseAsyncResult<ConsentActionResult, ConsentType> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<ConsentActionResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (type: ConsentType): Promise<ConsentActionResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.withdrawConsent(type);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for data rectification (GDPR Article 16).
 */
export function useRectifyData(): UseAsyncResult<RectifyDataResult, RectifyDataInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<RectifyDataResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: RectifyDataInput): Promise<RectifyDataResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.rectifyData(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for getting audit logs (GDPR Article 15).
 */
export function useGetAuditLogs(): UseAsyncResult<AuditLogsResult, GetAuditLogsOptions | undefined> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<AuditLogsResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (options?: GetAuditLogsOptions): Promise<AuditLogsResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.getAuditLogs(options);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for logging a data breach (GDPR Article 33/34).
 */
export function useLogBreach(): UseAsyncResult<LogBreachResult, LogBreachInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<LogBreachResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: LogBreachInput): Promise<LogBreachResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.logBreach(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for listing breaches (GDPR Article 33/34).
 */
export function useListBreaches(): UseAsyncResult<BreachListResult, GetBreachesOptions | undefined> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<BreachListResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (options?: GetBreachesOptions): Promise<BreachListResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.listBreaches(options);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for getting a single breach (GDPR Article 33/34).
 */
export function useGetBreach(): UseAsyncResult<BreachResult, string> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<BreachResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (id: string): Promise<BreachResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.getBreach(id);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for updating a breach's status (GDPR Article 33/34).
 */
export function useUpdateBreachStatus(): UseAsyncResult<BreachResult, { id: string; input: UpdateBreachInput }> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<BreachResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (params: { id: string; input: UpdateBreachInput }): Promise<BreachResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.updateBreachStatus(params.id, params.input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

// =============================================================================
// Media Analysis Hooks
// =============================================================================

/**
 * Hook for voice/audio analysis.
 *
 * @example
 * ```tsx
 * function VoiceChecker() {
 *   const { data, loading, error, execute } = useAnalyzeVoice();
 *
 *   const handleAnalyze = async (file: File) => {
 *     const result = await execute({ file, filename: file.name, analysisType: 'all' });
 *     console.log('Risk score:', result.overall_risk_score);
 *   };
 * }
 * ```
 */
export function useAnalyzeVoice(): UseAsyncResult<VoiceAnalysisResult, AnalyzeVoiceInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<VoiceAnalysisResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: AnalyzeVoiceInput): Promise<VoiceAnalysisResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.analyzeVoice(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for image analysis.
 *
 * @example
 * ```tsx
 * function ImageChecker() {
 *   const { data, loading, error, execute } = useAnalyzeImage();
 *
 *   const handleAnalyze = async (file: File) => {
 *     const result = await execute({ file, filename: file.name, analysisType: 'all' });
 *     console.log('Risk score:', result.overall_risk_score);
 *   };
 * }
 * ```
 */
export function useAnalyzeImage(): UseAsyncResult<ImageAnalysisResult, AnalyzeImageInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<ImageAnalysisResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: AnalyzeImageInput): Promise<ImageAnalysisResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.analyzeImage(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

// =============================================================================
// Webhook Hooks
// =============================================================================

/**
 * Hook for listing webhooks.
 */
export function useListWebhooks(): Omit<UseAsyncResult<WebhookListResult, void>, 'execute'> & { execute: () => Promise<WebhookListResult> } {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<WebhookListResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (): Promise<WebhookListResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.listWebhooks();
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for creating a webhook.
 */
export function useCreateWebhook(): UseAsyncResult<CreateWebhookResult, CreateWebhookInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<CreateWebhookResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: CreateWebhookInput): Promise<CreateWebhookResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.createWebhook(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for updating a webhook.
 */
export function useUpdateWebhook(): UseAsyncResult<UpdateWebhookResult, { webhookId: string; input: UpdateWebhookInput }> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<UpdateWebhookResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (params: { webhookId: string; input: UpdateWebhookInput }): Promise<UpdateWebhookResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.updateWebhook(params.webhookId, params.input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for deleting a webhook.
 */
export function useDeleteWebhook(): UseAsyncResult<DeleteWebhookResult, string> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<DeleteWebhookResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (webhookId: string): Promise<DeleteWebhookResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.deleteWebhook(webhookId);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for testing a webhook.
 */
export function useTestWebhook(): UseAsyncResult<TestWebhookResult, string> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<TestWebhookResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (webhookId: string): Promise<TestWebhookResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.testWebhook(webhookId);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for regenerating a webhook's signing secret.
 */
export function useRegenerateWebhookSecret(): UseAsyncResult<RegenerateSecretResult, string> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<RegenerateSecretResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (webhookId: string): Promise<RegenerateSecretResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.regenerateWebhookSecret(webhookId);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

// =============================================================================
// Pricing Hooks
// =============================================================================

/**
 * Hook for getting public pricing plans.
 */
export function useGetPricing(): Omit<UseAsyncResult<PricingResult, void>, 'execute'> & { execute: () => Promise<PricingResult> } {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<PricingResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (): Promise<PricingResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.getPricing();
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for getting detailed pricing plans (requires authentication).
 */
export function useGetPricingDetails(): Omit<UseAsyncResult<PricingDetailsResult, void>, 'execute'> & { execute: () => Promise<PricingDetailsResult> } {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<PricingDetailsResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (): Promise<PricingDetailsResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.getPricingDetails();
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

// =============================================================================
// Usage Hooks
// =============================================================================

/**
 * Hook for getting usage history.
 *
 * @example
 * ```tsx
 * function UsageChart() {
 *   const { data, loading, execute } = useGetUsageHistory();
 *
 *   useEffect(() => {
 *     execute(14); // last 14 days
 *   }, []);
 * }
 * ```
 */
export function useGetUsageHistory(): UseAsyncResult<UsageHistoryResult, number | undefined> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<UsageHistoryResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (days?: number): Promise<UsageHistoryResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.getUsageHistory(days);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for getting usage broken down by tool/endpoint.
 *
 * @example
 * ```tsx
 * function ToolUsage() {
 *   const { data, loading, execute } = useGetUsageByTool();
 *
 *   useEffect(() => {
 *     execute(); // today's usage
 *   }, []);
 * }
 * ```
 */
export function useGetUsageByTool(): UseAsyncResult<UsageByToolResult, string | undefined> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<UsageByToolResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (date?: string): Promise<UsageByToolResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.getUsageByTool(date);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for getting monthly usage summary with upgrade recommendations.
 */
export function useGetUsageMonthly(): Omit<UseAsyncResult<UsageMonthlyResult, void>, 'execute'> & { execute: () => Promise<UsageMonthlyResult> } {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<UsageMonthlyResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (): Promise<UsageMonthlyResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.getUsageMonthly();
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

// =============================================================================
// Fraud Detection Hooks
// =============================================================================

/**
 * Hook for social engineering detection.
 */
export function useDetectSocialEngineering(): UseAsyncResult<DetectionResult, DetectionInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<DetectionResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: DetectionInput): Promise<DetectionResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.detectSocialEngineering(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for app fraud detection.
 */
export function useDetectAppFraud(): UseAsyncResult<DetectionResult, DetectionInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<DetectionResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: DetectionInput): Promise<DetectionResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.detectAppFraud(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for romance scam detection.
 */
export function useDetectRomanceScam(): UseAsyncResult<DetectionResult, DetectionInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<DetectionResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: DetectionInput): Promise<DetectionResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.detectRomanceScam(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for mule recruitment detection.
 */
export function useDetectMuleRecruitment(): UseAsyncResult<DetectionResult, DetectionInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<DetectionResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: DetectionInput): Promise<DetectionResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.detectMuleRecruitment(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

// =============================================================================
// Safety Extended Hooks
// =============================================================================

/**
 * Hook for gambling harm detection.
 */
export function useDetectGamblingHarm(): UseAsyncResult<DetectionResult, DetectionInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<DetectionResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: DetectionInput): Promise<DetectionResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.detectGamblingHarm(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for coercive control detection.
 */
export function useDetectCoerciveControl(): UseAsyncResult<DetectionResult, DetectionInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<DetectionResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: DetectionInput): Promise<DetectionResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.detectCoerciveControl(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for vulnerability exploitation detection.
 */
export function useDetectVulnerabilityExploitation(): UseAsyncResult<DetectionResult, DetectionInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<DetectionResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: DetectionInput): Promise<DetectionResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.detectVulnerabilityExploitation(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for radicalisation detection.
 */
export function useDetectRadicalisation(): UseAsyncResult<DetectionResult, DetectionInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<DetectionResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: DetectionInput): Promise<DetectionResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.detectRadicalisation(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

// =============================================================================
// Multi-Endpoint Analysis Hook
// =============================================================================

/**
 * Hook for multi-endpoint analysis.
 *
 * @example
 * ```tsx
 * function MultiCheck() {
 *   const { data, loading, error, execute } = useAnalyseMulti();
 *
 *   const handleCheck = async () => {
 *     const result = await execute({
 *       content: 'Message to check',
 *       endpoints: ['bullying', 'grooming', 'unsafe'],
 *     });
 *     console.log('Summary:', result.summary);
 *   };
 * }
 * ```
 */
export function useAnalyseMulti(): UseAsyncResult<AnalyseMultiResult, AnalyseMultiInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<AnalyseMultiResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: AnalyseMultiInput): Promise<AnalyseMultiResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.analyseMulti(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

// =============================================================================
// Video Analysis Hook
// =============================================================================

/**
 * Hook for video analysis.
 *
 * @example
 * ```tsx
 * function VideoChecker() {
 *   const { data, loading, error, execute } = useAnalyzeVideo();
 *
 *   const handleAnalyze = async (url: string) => {
 *     const result = await execute({ url });
 *     console.log('Findings:', result.findings);
 *   };
 * }
 * ```
 */
export function useAnalyzeVideo(): UseAsyncResult<VideoAnalysisResult, AnalyzeVideoInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<VideoAnalysisResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: AnalyzeVideoInput): Promise<VideoAnalysisResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.analyzeVideo(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

// =============================================================================
// Verification Session Hooks
// =============================================================================

/**
 * Hook for creating an age or identity verification session.
 *
 * @example
 * ```tsx
 * function VerifyAge() {
 *   const { execute, loading } = useCreateVerificationSession();
 *
 *   const handleStart = async () => {
 *     const session = await execute({ mode: VerificationMode.AGE });
 *     await Linking.openURL(session.url);
 *   };
 * }
 * ```
 */
export function useCreateVerificationSession(): UseAsyncResult<VerificationSession, CreateVerificationSessionInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<VerificationSession>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: CreateVerificationSessionInput): Promise<VerificationSession> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.createVerificationSession(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for reading the status and outcome of a verification session.
 */
export function useGetVerificationSession(): UseAsyncResult<VerificationSessionResult, string> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<VerificationSessionResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (sessionId: string): Promise<VerificationSessionResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.getVerificationSession(sessionId);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for cancelling a verification session.
 */
export function useCancelVerificationSession(): UseAsyncResult<void, string> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<void>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (sessionId: string): Promise<void> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.cancelVerificationSession(sessionId);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for comparing a face image against a reference image.
 */
export function useVerifyImageMatch(): UseAsyncResult<VerifyImageMatchResult, VerifyImageMatchInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<VerifyImageMatchResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: VerifyImageMatchInput): Promise<VerifyImageMatchResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.verifyImageMatch(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

// =============================================================================
// Incident Hooks
// =============================================================================

/**
 * Hook for listing incidents, newest first, with optional filters.
 */
export function useListIncidents(): UseAsyncResult<ListIncidentsResult, ListIncidentsInput | undefined> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<ListIncidentsResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input?: ListIncidentsInput): Promise<ListIncidentsResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.listIncidents(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for getting a single incident.
 */
export function useGetIncident(): UseAsyncResult<IncidentDetail, string> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<IncidentDetail>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (incidentId: string): Promise<IncidentDetail> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.getIncident(incidentId);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for getting incident counts over a date range.
 */
export function useGetIncidentsOverview(): UseAsyncResult<IncidentsOverview, IncidentsOverviewInput | undefined> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<IncidentsOverview>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input?: IncidentsOverviewInput): Promise<IncidentsOverview> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.getIncidentsOverview(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for getting incident counts bucketed over time.
 */
export function useGetIncidentTrends(): UseAsyncResult<IncidentTrends, IncidentTrendsInput | undefined> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<IncidentTrends>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input?: IncidentTrendsInput): Promise<IncidentTrends> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.getIncidentTrends(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for submitting a moderator review of an incident.
 */
export function useReviewIncident(): UseAsyncResult<ReviewIncidentResult, { incidentId: string; input: ReviewIncidentInput }> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<ReviewIncidentResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (params: { incidentId: string; input: ReviewIncidentInput }): Promise<ReviewIncidentResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.reviewIncident(params.incidentId, params.input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for applying one moderator review to several incidents.
 */
export function useBatchReviewIncidents(): UseAsyncResult<BatchReviewIncidentsResult, BatchReviewIncidentsInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<BatchReviewIncidentsResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: BatchReviewIncidentsInput): Promise<BatchReviewIncidentsResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.batchReviewIncidents(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

// =============================================================================
// Document Analysis Hook
// =============================================================================

/**
 * Hook for analyzing a document (PDF) page by page.
 */
export function useAnalyzeDocument(): UseAsyncResult<DocumentAnalysisResult, AnalyzeDocumentInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<DocumentAnalysisResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: AnalyzeDocumentInput): Promise<DocumentAnalysisResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.analyzeDocument(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

// =============================================================================
// Synthetic Content Hooks
// =============================================================================

/**
 * Hook for detecting AI-generated text.
 */
export function useDetectSyntheticText(): UseAsyncResult<SyntheticTextResult, DetectSyntheticTextInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<SyntheticTextResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: DetectSyntheticTextInput): Promise<SyntheticTextResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.detectSyntheticText(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for detecting AI-generated or manipulated images.
 */
export function useDetectSyntheticImage(): UseAsyncResult<SyntheticImageResult, DetectSyntheticImageInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<SyntheticImageResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: DetectSyntheticImageInput): Promise<SyntheticImageResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.detectSyntheticImage(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for detecting AI-generated or cloned audio.
 */
export function useDetectSyntheticAudio(): UseAsyncResult<SyntheticAudioResult, DetectSyntheticAudioInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<SyntheticAudioResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: DetectSyntheticAudioInput): Promise<SyntheticAudioResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.detectSyntheticAudio(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for detecting AI-generated or manipulated video.
 */
export function useDetectSyntheticVideo(): UseAsyncResult<SyntheticVideoResult, DetectSyntheticVideoInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<SyntheticVideoResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: DetectSyntheticVideoInput): Promise<SyntheticVideoResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.detectSyntheticVideo(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

// =============================================================================
// Safety Detection Hooks
// =============================================================================

/**
 * Hook for distress signal detection.
 */
export function useDetectDistressSignals(): UseAsyncResult<DistressSignalsResult, DetectionInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<DistressSignalsResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: DetectionInput): Promise<DistressSignalsResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.detectDistressSignals(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for technology-facilitated gender-based violence detection.
 */
export function useDetectTFGBV(): UseAsyncResult<TFGBVResult, DetectionInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<TFGBVResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: DetectionInput): Promise<TFGBVResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.detectTFGBV(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

// =============================================================================
// Batch Analysis Hook
// =============================================================================

/**
 * Hook for analyzing up to 50 items in one request.
 */
export function useBatch(): UseAsyncResult<BatchAnalyzeResult, BatchAnalyzeInput> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<BatchAnalyzeResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: BatchAnalyzeInput): Promise<BatchAnalyzeResult> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.batch(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

// =============================================================================
// Usage Summary and Quota Hooks
// =============================================================================

/**
 * Hook for getting the usage summary for a day (defaults to today).
 */
export function useGetUsageSummary(): UseAsyncResult<UsageSummary, string | undefined> {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<UsageSummary>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (date?: string): Promise<UsageSummary> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.getUsageSummary(date);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

/**
 * Hook for getting the current rate limit quota.
 */
export function useGetQuota(): Omit<UseAsyncResult<UsageQuota, void>, 'execute'> & { execute: () => Promise<UsageQuota> } {
  const { client } = useTuteliqClient();
  const [state, setState] = useState<AsyncState<UsageQuota>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (): Promise<UsageQuota> => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.getQuota();
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [client]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

// =============================================================================
// Voice Streaming Hook
// =============================================================================

/**
 * Hook for real-time voice streaming analysis.
 *
 * @example
 * ```tsx
 * function VoiceMonitor() {
 *   const { session, isConnected, start, stop, sendAudio } = useVoiceStream({
 *     config: { intervalSeconds: 10, analysisTypes: ['bullying', 'unsafe'] },
 *     handlers: {
 *       onTranscription: (e) => console.log('Text:', e.text),
 *       onAlert: (e) => console.log('Alert:', e.category),
 *     },
 *   });
 *
 *   return (
 *     <Button title={isConnected ? 'Stop' : 'Start'} onPress={isConnected ? stop : start} />
 *   );
 * }
 * ```
 */
export interface UseVoiceStreamOptions {
  config?: VoiceStreamConfig;
  handlers?: VoiceStreamHandlers;
}

export interface UseVoiceStreamResult {
  /** The underlying voice stream session */
  session: VoiceStreamSession | null;
  /** Whether the stream is currently connected */
  isConnected: boolean;
  /** Start the voice stream connection */
  start: () => void;
  /** Stop the voice stream and close the connection */
  stop: () => void;
  /** Send raw audio data to the stream */
  sendAudio: (data: Buffer | Uint8Array) => void;
}

export function useVoiceStream(options?: UseVoiceStreamOptions): UseVoiceStreamResult {
  const { client } = useTuteliqClient();
  const [isConnected, setIsConnected] = useState(false);
  const sessionRef = useRef<VoiceStreamSession | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (sessionRef.current?.isActive) {
        sessionRef.current.close();
      }
    };
  }, []);

  const start = useCallback(() => {
    if (sessionRef.current?.isActive) return;

    const wrappedHandlers: VoiceStreamHandlers = {
      ...options?.handlers,
      onReady: (event) => {
        setIsConnected(true);
        options?.handlers?.onReady?.(event);
      },
      onClose: (code, reason) => {
        setIsConnected(false);
        sessionRef.current = null;
        options?.handlers?.onClose?.(code, reason);
      },
    };

    sessionRef.current = client.voiceStream(options?.config, wrappedHandlers);
  }, [client, options?.config, options?.handlers]);

  const stop = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
      setIsConnected(false);
    }
  }, []);

  const sendAudio = useCallback((data: Buffer | Uint8Array) => {
    if (!sessionRef.current?.isActive) {
      throw new Error('Voice stream is not connected');
    }
    sessionRef.current.sendAudio(data);
  }, []);

  return {
    session: sessionRef.current,
    isConnected,
    start,
    stop,
    sendAudio,
  };
}
