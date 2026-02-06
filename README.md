<p align="center">
  <img src="./assets/logo.png" alt="SafeNest" width="200" />
</p>

<h1 align="center">SafeNest React Native SDK</h1>

<p align="center">
  <strong>Official React Native SDK for the SafeNest API</strong><br>
  AI-powered child safety analysis
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@safenest/react-native"><img src="https://img.shields.io/npm/v/@safenest/react-native.svg" alt="npm version"></a>
  <a href="https://github.com/SafeNestSDK/react-native/actions"><img src="https://img.shields.io/github/actions/workflow/status/SafeNestSDK/react-native/ci.yml" alt="build status"></a>
  <a href="https://github.com/SafeNestSDK/react-native/blob/main/LICENSE"><img src="https://img.shields.io/github/license/SafeNestSDK/react-native.svg" alt="license"></a>
</p>

<p align="center">
  <a href="https://api.safenest.dev/docs">API Docs</a> •
  <a href="https://safenest.app">Dashboard</a> •
  <a href="https://discord.gg/7kbTeRYRXD">Discord</a>
</p>

---

## Installation

```bash
npm install @safenest/react-native
# or
yarn add @safenest/react-native
```

### Requirements

- React Native 0.70+
- React 17+

---

## Quick Start

### Setup Provider

Wrap your app with `SafeNestProvider`:

```tsx
import { SafeNestProvider } from '@safenest/react-native';

export default function App() {
  return (
    <SafeNestProvider apiKey="your-api-key">
      <YourApp />
    </SafeNestProvider>
  );
}
```

### Use Hooks

```tsx
import { useAnalyze, RiskLevel } from '@safenest/react-native';
import { Alert } from 'react-native';

function ChatInput() {
  const { execute, loading } = useAnalyze();
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    const result = await execute({ text: message });

    if (result.riskLevel !== RiskLevel.Safe) {
      Alert.alert('Warning', result.summary);
      return;
    }

    // Send message...
  };

  return (
    <View>
      <TextInput value={message} onChangeText={setMessage} />
      <Button title="Send" onPress={handleSend} disabled={loading} />
    </View>
  );
}
```

---

## API Reference

### Provider

```tsx
import { SafeNestProvider } from '@safenest/react-native';

<SafeNestProvider
  apiKey="your-api-key"
  config={{
    timeout: 30000,      // Request timeout in ms
    maxRetries: 3,       // Retry attempts
    retryDelay: 1000,    // Initial retry delay in ms
  }}
>
  {children}
</SafeNestProvider>
```

### Hooks

All hooks return:
- `data` - The result (null until executed)
- `loading` - Loading state
- `error` - Error if any
- `execute(input)` - Function to execute the operation
- `reset()` - Reset state

#### useDetectBullying

```tsx
import { useDetectBullying } from '@safenest/react-native';

function MyComponent() {
  const { data, loading, error, execute } = useDetectBullying();

  const check = async () => {
    const result = await execute({ text: 'Message to check' });
    if (result.isBullying) {
      console.log('Severity:', result.severity);
      console.log('Types:', result.bullyingType);
    }
  };
}
```

#### useDetectGrooming

```tsx
import { useDetectGrooming, MessageRole } from '@safenest/react-native';

const { execute } = useDetectGrooming();

const result = await execute({
  messages: [
    { role: MessageRole.Adult, content: 'This is our secret' },
    { role: MessageRole.Child, content: 'Ok I wont tell' },
  ],
  childAge: 12,
});
```

#### useDetectUnsafe

```tsx
import { useDetectUnsafe } from '@safenest/react-native';

const { execute } = useDetectUnsafe();

const result = await execute({ text: 'Content to check' });
if (result.unsafe) {
  console.log('Categories:', result.categories);
}
```

#### useAnalyze

Quick analysis combining bullying and unsafe detection:

```tsx
import { useAnalyze, RiskLevel } from '@safenest/react-native';

const { execute } = useAnalyze();

const result = await execute({ text: 'Message to check' });
console.log('Risk Level:', result.riskLevel);
console.log('Risk Score:', result.riskScore);
console.log('Summary:', result.summary);
```

#### useAnalyzeEmotions

```tsx
import { useAnalyzeEmotions } from '@safenest/react-native';

const { execute } = useAnalyzeEmotions();

const result = await execute({ text: 'Im so stressed about everything' });
console.log('Emotions:', result.dominantEmotions);
console.log('Trend:', result.trend);
```

#### useGetActionPlan

```tsx
import { useGetActionPlan, Audience, Severity } from '@safenest/react-native';

const { execute } = useGetActionPlan();

const plan = await execute({
  situation: 'Someone is spreading rumors about me',
  childAge: 12,
  audience: Audience.Child,
  severity: Severity.Medium,
});
console.log('Steps:', plan.steps);
```

#### useGenerateReport

```tsx
import { useGenerateReport } from '@safenest/react-native';

const { execute } = useGenerateReport();

const report = await execute({
  messages: [
    { sender: 'user1', content: 'Threatening message' },
    { sender: 'child', content: 'Please stop' },
  ],
  childAge: 14,
});
console.log('Summary:', report.summary);
```

### Direct Client Access

For advanced use cases, access the client directly:

```tsx
import { useSafeNestClient } from '@safenest/react-native';

function MyComponent() {
  const { client } = useSafeNestClient();

  const customAnalysis = async () => {
    const result = await client.detectBullying({
      text: 'Message',
      externalId: 'msg_123',
      metadata: { userId: 'user_456' },
    });
    return result;
  };
}
```

---

## Tracking Fields

All methods support `externalId` and `metadata` for request correlation:

```tsx
const result = await execute({
  text: 'Message to check',
  externalId: 'msg_12345',
  metadata: { userId: 'usr_abc', sessionId: 'sess_xyz' },
});

// Echoed back in response
console.log(result.externalId);  // "msg_12345"
console.log(result.metadata);    // { userId: "usr_abc", ... }
```

---

## Error Handling

```tsx
import {
  useAnalyze,
  AuthenticationError,
  RateLimitError,
  ValidationError,
} from '@safenest/react-native';

function MyComponent() {
  const { execute, error } = useAnalyze();

  const handleCheck = async () => {
    try {
      const result = await execute({ text: 'test' });
    } catch (err) {
      if (err instanceof AuthenticationError) {
        console.log('Invalid API key');
      } else if (err instanceof RateLimitError) {
        console.log('Too many requests');
      } else if (err instanceof ValidationError) {
        console.log('Invalid input:', err.details);
      }
    }
  };

  // Or use the error state
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
}
```

---

## Complete Example

```tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { SafeNestProvider, useAnalyze, RiskLevel } from '@safenest/react-native';

function ChatScreen() {
  const [message, setMessage] = useState('');
  const { execute, loading, data } = useAnalyze();

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      const result = await execute({ text: message });

      if (result.riskLevel === RiskLevel.Critical || result.riskLevel === RiskLevel.High) {
        Alert.alert(
          'Message Blocked',
          result.summary,
          [{ text: 'OK', onPress: () => setMessage('') }]
        );
        return;
      }

      // Safe to send
      console.log('Sending message:', message);
      setMessage('');
    } catch (error) {
      Alert.alert('Error', 'Failed to check message');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message..."
        editable={!loading}
      />
      <Button title={loading ? 'Checking...' : 'Send'} onPress={handleSend} disabled={loading} />
      {data && (
        <Text style={styles.status}>
          Last check: {data.riskLevel} (score: {data.riskScore.toFixed(2)})
        </Text>
      )}
    </View>
  );
}

export default function App() {
  return (
    <SafeNestProvider apiKey={process.env.SAFENEST_API_KEY!}>
      <ChatScreen />
    </SafeNestProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'flex-end' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 8 },
  status: { marginTop: 10, color: '#666', fontSize: 12 },
});
```

---

## Support

- **API Docs**: [api.safenest.dev/docs](https://api.safenest.dev/docs)
- **Discord**: [discord.gg/7kbTeRYRXD](https://discord.gg/7kbTeRYRXD)
- **Email**: support@safenest.dev
- **Issues**: [GitHub Issues](https://github.com/SafeNestSDK/react-native/issues)

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

<p align="center">
  <sub>Built with care for child safety by the <a href="https://safenest.dev">SafeNest</a> team</sub>
</p>
