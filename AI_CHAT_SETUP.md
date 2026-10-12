# Mind Hub AI Chat: setup and behaviour

## What changed

The server proxy now adds a trusted Mind Hub wellness system prompt to every request. It guides the model to give practical, empathetic, non-diagnostic wellness support; protect privacy; avoid unsupported claims about app actions; and direct people in immediate danger to local emergency services and a trusted person. The API also validates roles and message lengths and limits the conversation context sent to the model.

This is **prompt-based configuration**, not model fine-tuning. The underlying hosted model is still provided by the configured AI provider.

## Enable server AI

1. Install Node.js (18 or later recommended).
2. In the project root, run `npm install`.
3. Create a `.env` file in the project root (do not commit it):

```env
OPENAI_API_KEY=your_server_side_key
OPENAI_MODEL=gpt-4o-mini
PORT=3000
```

4. Run `npm start` and open `http://localhost:3000/ai-chat.html`.
5. In the chat controls, check **Allow remote AI** and select **Server proxy**.

The browser sends messages to `POST /api/chat`; the server adds the trusted system prompt and calls the provider using the key stored in its environment. The API key should never be placed in source code or committed to Git.

## Modes

- **Local**: offline intent-based responses; no external API call.
- **Server proxy**: uses `OPENAI_API_KEY` on the server and the Mind Hub system prompt. Recommended for deployment.
- **OpenAI (direct)** and **Gemini (direct)**: existing browser-side options. API keys stored in `localStorage` are accessible to scripts running in that browser profile, so these modes are less suitable for production/shared devices. Prefer the server proxy.

## Production notes

Before public deployment, add per-user/IP rate limiting, origin-restricted CORS, abuse monitoring, and a privacy notice explaining that remote messages are sent to the selected AI provider. Do not treat the chatbot as a substitute for professional or emergency care.
