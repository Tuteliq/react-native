import { useState, useCallback } from 'react';
import {
  SafeNestClient,
  DetectBullyingInput,
  DetectBullyingResult,
  DetectGroomingInput,
  DetectGroomingResult,
  DetectUnsafeInput,
  DetectUnsafeResult,
  AnalyzeInput,
  AnalyzeResult,
  AnalyzeEmotionsInput,
  AnalyzeEmotionsResult,
  GetActionPlanInput,
  ActionPlanResult,
  GenerateReportInput,
  ReportResult,
} from '@safenest/sdk';
import { useSafeNestClient } from './context';

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
 *     const result = await execute({ text: 'Message to check' });
 *     if (result.isBullying) {
 *       console.log('Bullying detected!');
 *     }
 *   };
 * }
 * ```
 */
export function useDetectBullying(): UseAsyncResult<DetectBullyingResult, DetectBullyingInput> {
  const { client } = useSafeNestClient();
  const [state, setState] = useState<AsyncState<DetectBullyingResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: DetectBullyingInput): Promise<DetectBullyingResult> => {
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
export function useDetectGrooming(): UseAsyncResult<DetectGroomingResult, DetectGroomingInput> {
  const { client } = useSafeNestClient();
  const [state, setState] = useState<AsyncState<DetectGroomingResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: DetectGroomingInput): Promise<DetectGroomingResult> => {
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
export function useDetectUnsafe(): UseAsyncResult<DetectUnsafeResult, DetectUnsafeInput> {
  const { client } = useSafeNestClient();
  const [state, setState] = useState<AsyncState<DetectUnsafeResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: DetectUnsafeInput): Promise<DetectUnsafeResult> => {
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
 *     const result = await execute({ text: message });
 *     if (result.riskLevel === 'critical') {
 *       Alert.alert('Message blocked', result.summary);
 *       return;
 *     }
 *     // Send message...
 *   };
 * }
 * ```
 */
export function useAnalyze(): UseAsyncResult<AnalyzeResult, AnalyzeInput> {
  const { client } = useSafeNestClient();
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
export function useAnalyzeEmotions(): UseAsyncResult<AnalyzeEmotionsResult, AnalyzeEmotionsInput> {
  const { client } = useSafeNestClient();
  const [state, setState] = useState<AsyncState<AnalyzeEmotionsResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (input: AnalyzeEmotionsInput): Promise<AnalyzeEmotionsResult> => {
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
  const { client } = useSafeNestClient();
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
  const { client } = useSafeNestClient();
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
