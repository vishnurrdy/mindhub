# Mind Hub

Mind Hub is a mental-wellness web application with an optional AI chat backend.

## Run locally

1. Install Node.js (LTS).
2. In this folder, run `npm install`.
3. Create a `.env` file in the project root (do not commit it):

   ```env
   OPENAI_API_KEY=your_actual_api_key
   OPENAI_MODEL=gpt-4o-mini
   PORT=3000
   ```

4. Start the backend with `npm start`.
5. Open `http://localhost:3000/ai-chat.html`.
6. In the chat UI, enable **Allow remote AI** and choose **Server proxy**.

The API key must stay on the server in `.env`; never put it in browser JavaScript or commit it to GitHub. AI responses require a valid provider key and internet access.

## AI chat documentation

See [`AI_CHAT_SETUP.md`](AI_CHAT_SETUP.md) for behavior and configuration details and [`README-backend.md`](README-backend.md) for the backend proxy notes.

## Important

The chatbot uses prompt-based wellness guidance with an existing AI model. This is not model fine-tuning or training a new model. It is a wellness support tool, not a substitute for a licensed clinician or emergency services.
