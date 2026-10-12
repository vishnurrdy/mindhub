Mind Hub - Minimal AI Chat Backend

This folder contains a minimal Node.js Express backend that proxies chat requests to the OpenAI Chat Completions API.

Files added:

- `server.js` - small Express app exposing POST `/api/chat`.
- `package.json` - dependencies and scripts.
- `.env.example` - example environment variables.

Setup

1. Copy `.env.example` to `.env` and set `OPENAI_API_KEY`.
2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

The server listens on `http://localhost:3000` by default and exposes:

- `POST /api/chat` — body: `{ messages: [{role: 'user'|'assistant'|'system', text: '...'}] }`.
  - Returns `{ reply: '...' }` with the assistant reply.

Security

- Do not commit your `.env` with `OPENAI_API_KEY` into source control.
- For production use, implement authentication, rate limiting and input sanitization.

Frontend integration

- Update `js/ai-chat.js` to POST to `/api/chat` with the conversation when user sends a message (the code can fallback to local replies if the server fails).


## Mind Hub assistant behaviour

The server adds a trusted, wellness-focused system prompt to each `/api/chat` request. It sets expectations for supportive, practical, non-diagnostic answers and crisis-safe guidance. This is prompt-based behaviour configuration, not fine-tuning. See [`AI_CHAT_SETUP.md`](AI_CHAT_SETUP.md) for setup and deployment guidance.

The endpoint accepts only `user` and `assistant` messages from the browser, truncates each message to 4,000 characters, and forwards at most the latest 16 messages. The provider key remains server-side in `OPENAI_API_KEY`.
