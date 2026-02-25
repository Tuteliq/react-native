<p align="center">
  <img src="./assets/logo.png" alt="Tuteliq" width="200" />
</p>

<h1 align="center">Tuteliq React Native SDK</h1>

<p align="center">
  <strong>Official React Native SDK for the Tuteliq API</strong><br>
  AI-powered child safety analysis
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@tuteliq/react-native"><img src="https://img.shields.io/npm/v/@tuteliq/react-native.svg" alt="npm version"></a>
  <a href="https://github.com/Tuteliq/react-native/actions"><img src="https://img.shields.io/github/actions/workflow/status/Tuteliq/react-native/ci.yml" alt="build status"></a>
  <a href="https://github.com/Tuteliq/react-native/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Tuteliq/react-native.svg" alt="license"></a>
</p>

<p align="center">
  <a href="https://docs.tuteliq.ai">API Docs</a> •
  <a href="https://tuteliq.ai">Dashboard</a> •
  <a href="https://trust.tuteliq.ai">Trust</a> •
  <a href="https://discord.gg/7kbTeRYRXD">Discord</a>
</p>

---

## Installation

```bash
npm install @tuteliq/react-native
# or
yarn add @tuteliq/react-native
```

### Requirements

- React Native 0.70+
- React 17+

---

## Quick Start

### Setup Provider

Wrap your app with `TuteliqProvider`:

```tsx
import { TuteliqProvider } from '@tuteliq/react-native';

export default function App() {
  return (
    <TuteliqProvider apiKey="your-api-key">
      <YourApp />
    </TuteliqProvider>
  );
}
```

### Use Hooks

```tsx
import { useAnalyze, RiskLevel } from '@tuteliq/react-native';
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
import { TuteliqProvider } from '@tuteliq/react-native';

<TuteliqProvider
  apiKey="your-api-key"
  config={{
    timeout: 30000,      // Request timeout in ms
    maxRetries: 3,       // Retry attempts
    retryDelay: 1000,    // Initial retry delay in ms
  }}
>
  {children}
</TuteliqProvider>
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
import { useDetectBullying } from '@tuteliq/react-native';

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
import { useDetectGrooming, MessageRole } from '@tuteliq/react-native';

const { execute } = useDetectGrooming();

const result = await execute({
  messages: [
    { role: MessageRole.Adult, content: 'This is our secret' },
    { role: MessageRole.Child, content: 'Ok I wont tell' },
  ],
  childAge: 12,
});

// Per-message breakdown (optional, returned on conversation-aware endpoints)
result.message_analysis?.forEach(m => {
  console.log(`Message ${m.message_index}: risk=${m.risk_score}, flags=${m.flags}, summary=${m.summary}`);
});
```

#### useDetectUnsafe

```tsx
import { useDetectUnsafe } from '@tuteliq/react-native';

const { execute } = useDetectUnsafe();

const result = await execute({ text: 'Content to check' });
if (result.unsafe) {
  console.log('Categories:', result.categories);
}
```

#### useAnalyze

Quick analysis combining bullying and unsafe detection:

```tsx
import { useAnalyze, RiskLevel } from '@tuteliq/react-native';

const { execute } = useAnalyze();

const result = await execute({ text: 'Message to check' });
console.log('Risk Level:', result.riskLevel);
console.log('Risk Score:', result.riskScore);
console.log('Summary:', result.summary);
```

#### useAnalyzeEmotions

```tsx
import { useAnalyzeEmotions } from '@tuteliq/react-native';

const { execute } = useAnalyzeEmotions();

const result = await execute({ text: 'Im so stressed about everything' });
console.log('Emotions:', result.dominantEmotions);
console.log('Trend:', result.trend);
```

#### useGetActionPlan

```tsx
import { useGetActionPlan, Audience, Severity } from '@tuteliq/react-native';

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
import { useGenerateReport } from '@tuteliq/react-native';

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

### Voice Streaming

Real-time voice analysis with the `useVoiceStream` hook:

```tsx
import { useVoiceStream } from '@tuteliq/react-native';

function VoiceMonitor() {
  const { isConnected, start, stop, sendAudio } = useVoiceStream({
    config: { intervalSeconds: 10, analysisTypes: ['bullying', 'unsafe'] },
    handlers: {
      onReady: (e) => console.log('Session ready:', e.session_id),
      onTranscription: (e) => console.log('Text:', e.text),
      onAlert: (e) => console.log('Alert:', e.category, e.severity),
      onSessionSummary: (e) => console.log('Summary:', e.overall_risk),
    },
  });

  return (
    <Button
      title={isConnected ? 'Stop Monitoring' : 'Start Monitoring'}
      onPress={isConnected ? stop : start}
    />
  );
}
```

### Direct Client Access

For advanced use cases, access the client directly:

```tsx
import { useTuteliqClient } from '@tuteliq/react-native';

function MyComponent() {
  const { client } = useTuteliqClient();

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
} from '@tuteliq/react-native';

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
import { TuteliqProvider, useAnalyze, RiskLevel } from '@tuteliq/react-native';

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
    <TuteliqProvider apiKey={process.env.TUTELIQ_API_KEY!}>
      <ChatScreen />
    </TuteliqProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'flex-end' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 8 },
  status: { marginTop: 10, color: '#666', fontSize: 12 },
});
```

---

## Best Practices

### Message Batching

The **bullying** and **unsafe content** methods analyze a single `text` field per request. If your app receives messages one at a time, concatenate a **sliding window of recent messages** into one string before calling the API. Single words or short fragments lack context for accurate detection and can be exploited to bypass safety filters.

```typescript
// Bad — each message analyzed in isolation, easily evaded
for (const msg of messages) {
  await client.detectBullying({ text: msg });
}

// Good — recent messages analyzed together
const window = recentMessages.slice(-10).join(' ');
await client.detectBullying({ text: window });
```

The **grooming** method already accepts a `messages[]` array and analyzes the full conversation in context.

### PII Redaction

Enable `PII_REDACTION_ENABLED=true` on your Tuteliq API to automatically strip emails, phone numbers, URLs, social handles, IPs, and other PII from detection summaries and webhook payloads. The original text is still analyzed in full — only stored outputs are scrubbed.

---

## Support

- **API Docs**: [docs.tuteliq.ai](https://docs.tuteliq.ai)
- **Discord**: [discord.gg/7kbTeRYRXD](https://discord.gg/7kbTeRYRXD)
- **Email**: support@tuteliq.ai
- **Issues**: [GitHub Issues](https://github.com/Tuteliq/react-native/issues)

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

## Get Certified — Free

Tuteliq offers a **free certification program** for anyone who wants to deepen their understanding of online child safety. Complete a track, pass the quiz, and earn your official Tuteliq certificate — verified and shareable.

**Three tracks available:**

| Track | Who it's for | Duration |
|-------|-------------|----------|
| **Parents & Caregivers** | Parents, guardians, grandparents, teachers, coaches | ~90 min |
| **Young People (10–16)** | Young people who want to learn to spot manipulation | ~60 min |
| **Companies & Platforms** | Product managers, trust & safety teams, CTOs, compliance officers | ~120 min |

**Start here →** [tuteliq.ai/certify](https://tuteliq.ai/certify)

- 100% Free — no login required
- Verifiable certificate on completion
- Covers grooming recognition, sextortion, cyberbullying, regulatory obligations (KOSA, EU DSA), and more

---

## The Mission: Why This Matters

Before you decide to contribute or sponsor, read these numbers. They are not projections. They are not estimates from a pitch deck. They are verified statistics from the University of Edinburgh, UNICEF, NCMEC, and Interpol.

- **302 million** children are victims of online sexual exploitation and abuse every year. That is **10 children every second**. *(Childlight / University of Edinburgh, 2024)*
- **1 in 8** children globally have been victims of non-consensual sexual imagery in the past year. *(Childlight, 2024)*
- **370 million** girls and women alive today experienced rape or sexual assault in childhood. An estimated **240–310 million** boys and men experienced the same. *(UNICEF, 2024)*
- **29.2 million** incidents of suspected child sexual exploitation were reported to NCMEC's CyberTipline in 2024 alone — containing **62.9 million files** (images, videos). *(NCMEC, 2025)*
- **546,000** reports of online enticement (adults grooming children) in 2024 — a **192% increase** from the year before. *(NCMEC, 2025)*
- **1,325% increase** in AI-generated child sexual abuse material reports between 2023 and 2024. The technology that should protect children is being weaponized against them. *(NCMEC, 2025)*
- **100 sextortion reports per day** to NCMEC. Since 2021, at least **36 teenage boys** have taken their own lives because they were victimized by sextortion. *(NCMEC, 2025)*
- **84%** of reports resolve outside the United States. This is not an American problem. This is a **global emergency**. *(NCMEC, 2025)*

End-to-end encryption is making platforms blind. In 2024, platforms reported **7 million fewer incidents** than the year before — not because abuse stopped, but because they can no longer see it. The tools that catch known images are failing. The systems that rely on human moderators are overwhelmed. The technology to detect behavior — grooming patterns, escalation, manipulation — in real-time text conversations **exists right now**. It is running at [api.tuteliq.ai](https://api.tuteliq.ai).

The question is not whether this technology is possible. The question is whether we build the company to put it everywhere it needs to be.

**Every second we wait, another child is harmed.**

We have the technology. We need the support.

If this mission matters to you, consider [sponsoring our open-source work](https://github.com/sponsors/Tuteliq) so we can keep building the tools that protect children — and keep them free and accessible for everyone.

---

<p align="center">
  <sub>Built with care for child safety by the <a href="https://tuteliq.ai">Tuteliq</a> team</sub>
</p>
