import React, { createContext, useContext, useMemo, useRef } from 'react';
import { TuteliqClient, TuteliqOptions } from '@tuteliq/sdk';

/**
 * Props for TuteliqProvider.
 */
export interface TuteliqProviderProps {
  /** Your Tuteliq API key */
  apiKey: string;
  /** Optional configuration */
  options?: TuteliqOptions;
  /** React children */
  children: React.ReactNode;
}

/**
 * Context value type.
 */
export interface TuteliqContextValue {
  /** The Tuteliq client instance */
  client: TuteliqClient;
  /** Whether the client is ready */
  isReady: boolean;
}

const TuteliqContext = createContext<TuteliqContextValue | null>(null);

/**
 * Provider component for Tuteliq client.
 *
 * @example
 * ```tsx
 * import { TuteliqProvider } from '@tuteliq/react-native';
 *
 * function App() {
 *   return (
 *     <TuteliqProvider apiKey="your-api-key">
 *       <YourApp />
 *     </TuteliqProvider>
 *   );
 * }
 * ```
 */
export function TuteliqProvider({
  apiKey,
  options,
  children,
}: TuteliqProviderProps): React.JSX.Element {
  const clientRef = useRef<TuteliqClient | null>(null);

  // Create client only once
  if (!clientRef.current) {
    clientRef.current = new TuteliqClient(apiKey, options);
  }

  const value = useMemo<TuteliqContextValue>(
    () => ({
      client: clientRef.current!,
      isReady: true,
    }),
    []
  );

  return (
    <TuteliqContext.Provider value={value}>
      {children}
    </TuteliqContext.Provider>
  );
}

/**
 * Hook to access the Tuteliq client.
 *
 * @throws Error if used outside of TuteliqProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { client } = useTuteliqClient();
 *
 *   const checkMessage = async (text: string) => {
 *     const result = await client.analyze({ content: text });
 *     console.log(result.risk_level);
 *   };
 * }
 * ```
 */
export function useTuteliqClient(): TuteliqContextValue {
  const context = useContext(TuteliqContext);

  if (!context) {
    throw new Error('useTuteliqClient must be used within a TuteliqProvider');
  }

  return context;
}
