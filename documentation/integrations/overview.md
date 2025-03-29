
# Integration Details

ComplyFlow integrates with several external services to provide comprehensive compliance management capabilities. This document outlines the key integrations and how they're implemented.

## Overview of Integrations

The platform includes the following primary integrations:

1. **Supabase**: Core backend infrastructure
2. **OpenAI**: AI-powered policy generation and guidance
3. **ElevenLabs**: Text-to-speech for voice summaries and training
4. **Additional Services**: Authentication providers, cloud services monitoring, etc.

![Integration Architecture](../assets/integrations-diagram.png)

## Supabase Integration

### Implementation Details

Supabase serves as the primary backend infrastructure for ComplyFlow, providing:

1. **Authentication**: User management and authentication flows
2. **Database**: PostgreSQL database with Row-Level Security
3. **Storage**: File storage for compliance documents and audio files
4. **Edge Functions**: Serverless compute for secure API integrations
5. **Realtime**: Subscription-based updates for collaborative features

### Key Integration Points

- **Client Initialization**:
  ```typescript
  // src/integrations/supabase/client.ts
  export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    }
  });
  ```

- **Database Schema**: Structured tables for organizations, compliance frameworks, policies, tasks, etc.
- **Row-Level Security**: Enforces data access controls based on user roles and organization
- **Storage Buckets**: Dedicated buckets for voice summaries and training sessions
- **Edge Functions**: Secure server-side processing for AI and voice integrations

### Authentication Flow

1. User signs up/logs in via Supabase Auth
2. JWT token is stored and managed by Supabase client
3. Row-Level Security policies filter data based on user claims
4. User roles determine available features and access levels

## OpenAI Integration

### Implementation Details

OpenAI provides advanced language models for policy generation and AI guidance:

1. **Policy Generation**: Creates comprehensive compliance policies based on form inputs
2. **AI Guidance**: Provides expert-level compliance assistance and answers
3. **Content Summarization**: Extracts key points from compliance documents

### API Integration

- **Edge Function Implementation**:
  ```typescript
  // supabase/functions/generate-comprehensive-policy/index.ts
  const response = await openai.chat.completions.create({
    model: options?.model || "gpt-4o",
    messages: [
      { role: "system", content: "You are a compliance expert..." },
      { role: "user", content: comprehensivePrompt }
    ],
    max_tokens: options?.max_tokens || 8000,
    temperature: options?.temperature || 0.7
  });
  ```

- **Frontend Service**:
  ```typescript
  // src/services/openaiService.ts
  export const generateCompliancePolicy = async (
    prompt: string,
    formData: any,
    options: OpenAIRequestOptions = {}
  ) => {
    const { data, error } = await supabase.functions.invoke('generate-comprehensive-policy', {
      body: {
        prompt: enhancedPrompt,
        formData,
        options: {
          model: options.model || 'gpt-4o',
          temperature: options.temperature || 0.7,
          max_tokens: options.max_tokens || 16000,
          stream: options.stream || false
        }
      }
    });
    // Process and return response
  };
  ```

### Models Used

- **GPT-4o**: Primary model for comprehensive policy generation
- **GPT-4o-mini**: Used for faster, more cost-effective AI assistance

## ElevenLabs Integration

### Implementation Details

ElevenLabs provides text-to-speech capabilities for:

1. **Voice Summaries**: Converting compliance documents to audio
2. **Training Sessions**: Creating spoken training materials
3. **Accessibility Features**: Making content more accessible

### API Integration

- **Edge Function Implementation**:
  ```typescript
  // supabase/functions/text-to-speech/index.ts
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': ELEVENLABS_API_KEY,
    },
    body: JSON.stringify({
      text: text,
      model_id: ttsModel,
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      }
    }),
  });
  ```

- **Frontend Service**:
  ```typescript
  // src/services/voice/speech-synthesis.service.ts
  const response = await fetch('/api/text-to-speech', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      voiceId,
      model,
      language
    }),
  });
  ```

### Voice Selection

- The platform includes a predefined set of voice options
- Users can select preferred voices through voice settings
- Voice preferences are stored per user for consistent experience

## Security Considerations

### API Key Management

All third-party API keys are securely stored as Supabase secrets and accessed only through Edge Functions:

1. **Key Storage**: API keys stored in Supabase Edge Function secrets
2. **Server-side Processing**: API requests made server-side to prevent client exposure
3. **Rate Limiting**: Implemented to prevent abuse of external services

### Data Processing Pipeline

1. **Client Request**: Frontend sends request to Supabase Edge Function
2. **Secret Access**: Edge Function accesses API keys securely
3. **External API Call**: Edge Function calls third-party API
4. **Response Processing**: Results processed and returned to client
5. **Data Storage**: Results stored in database when needed

## Future Integrations

The platform is designed for extensibility with planned integrations including:

1. **Cloud Provider Monitoring**: AWS, GCP, Azure security compliance
2. **DevOps Tool Integration**: GitHub, GitLab, CI/CD pipelines
3. **Communication Tools**: Slack, Microsoft Teams notifications
4. **Project Management**: Jira, Asana task synchronization
5. **Payment Processing**: Stripe for subscription management

Each integration follows the same secure architecture, utilizing Edge Functions for API key protection and server-side processing.
