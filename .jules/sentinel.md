## 2024-06-24 - [Remove Hardcoded API Key Injection]
**Vulnerability:** The Gemini API key was being hardcoded into the client bundle via Vite's `define` property (with base64 "security theater").
**Learning:** `process.env.GEMINI_API_KEY` was injected directly into the frontend, causing a potential security hazard, specifically by relying on non-standard environment loading mechanisms rather than standard Vite `import.meta.env`.
**Prevention:** Always use `import.meta.env` with `envPrefix` configurations for frontend environment variables, and avoid exposing API keys on the frontend wherever possible.
