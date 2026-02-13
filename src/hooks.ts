import { useState, useCallback } from 'react';
import {
  TuteliqClient,
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
} from '@tuteliq/sdk';
import { useTuteliqClient } from './context';

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
 * Hook for account data deletion (GDPR Article 17 — Right to Erasure).
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
 * Hook for account data export (GDPR Article 20 — Right to Data Portability).
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
