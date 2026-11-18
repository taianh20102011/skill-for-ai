---
name: gradio-ai-client
description: Query, automate, and orchestrate any Hugging Face Space or Gradio web app programmatically using gradio_client (Python) and @gradio/client (Node.js).
---

# Gradio AI Client: Programmatic Cloud Model Bridge (`gradio_client`)

This skill governs the programmatic integration of **Gradio Client** (both Python `gradio_client` and Node.js `@gradio/client`), allowing AI coding agents to interact with thousands of open-source machine learning models hosted on Hugging Face Spaces or local Gradio servers without local GPU constraints.

---

## 1. Quick Integration

### Python (`pip install gradio_client`)
```python
from gradio_client import Client, handle_file

# Connect to any public or private Hugging Face Space
client = Client("JeffreyXiang/TRELLIS")

# View available API endpoints and schemas
client.view_api()

# Call prediction endpoint
result = client.predict(
    image=handle_file("input.png"),
    api_name="/generate"
)
```

### Node.js / TypeScript (`@gradio/client` or Native HTTP)
```javascript
import { Client } from "@gradio/client";

const app = await Client.connect("Tencent/Hunyuan3D-2");
const result = await app.predict("/generation", [
  "A medieval knight helmet with gold filigree", // prompt
  null,                                          // image
  42                                             // seed
]);
```

---

## 2. Zero-Dependency Native Fetch Bridge (Pure Node.js)

When `@gradio/client` or Python is unavailable, query Gradio's standard SSE/REST endpoints directly:

```javascript
async function callGradioApi(spaceUrl, apiName, payload) {
  const endpoint = `${spaceUrl.replace(/\/$/, '')}/gradio_api/call${apiName}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: payload })
  });
  const { event_id } = await response.json();
  
  // Stream or poll event result
  const eventRes = await fetch(`${spaceUrl.replace(/\/$/, '')}/gradio_api/call${apiName}/${event_id}`);
  const eventText = await eventRes.text();
  return eventText;
}
```

---

## 3. Best Practices
1. **Always Inspect API First**: Call `client.view_api()` or fetch `/config` to get exact input parameters, default values, and data types.
2. **File Handling**: Use `handle_file()` (Python) or base64 data URLs / public URLs (Node.js) for image/audio/video arguments.
3. **Handle Timeouts Gracefully**: High-resolution 3D generation can take 20–60 seconds; configure network request timeouts to at least 120,000ms.
