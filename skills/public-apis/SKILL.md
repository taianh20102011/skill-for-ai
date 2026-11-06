---
name: public-apis
description: Curated directory and integration recipes for 1500+ free public REST and GraphQL APIs from public-apis/public-apis (Finance, Crypto, Weather, Geolocation, Media, AI, Sports, News). Use when building dashboards, demo applications, realistic prototypes, or needing external free data sources without payment or tedious API keys. Includes type-safe fetching with Zod and caching best practices.
---

# Public APIs (1500+ Free Data Endpoints)

Reference and integration guide based on [public-apis/public-apis](https://github.com/public-apis/public-apis).

## 1. Top Verified Free API Categories

### A. Finance & Cryptocurrency
* **CoinGecko**: `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd` (Crypto rates, no auth).
* **ExchangeRate-API**: `https://open.er-api.com/v6/latest/USD` (Global currency exchange rates, free tier, no auth).
* **Binance Public**: `https://api.binance.com/api/v3/ticker/24hr` (Live market ticker data, WebSocket & REST).

### B. Weather & Geolocation
* **Open-Meteo**: `https://api.open-meteo.com/v1/forecast?latitude=10.8231&longitude=106.6297&current_weather=true` (Detailed weather & hourly forecast, 100% free, no API key).
* **IPinfo / ipapi**: `https://ipapi.co/json/` (IP geolocation, city, coordinates, ISP).
* **Nominatim (OpenStreetMap)**: `https://nominatim.openstreetmap.org/search?q=Hanoi&format=json` (Geocoding & address search).

### C. Media, Content & Knowledge
* **TMDb (The Movie Database)**: High quality movie & TV metadata.
* **OpenAlex**: Scholarly research papers & citations.
* **REST Countries**: `https://restcountries.com/v3.1/all` (Comprehensive country facts, currencies, flags).
* **Unsplash Source**: Royalty-free photographic images.

---

## 2. Production Integration Recipe: Type-Safe Client Fetching with Zod

```typescript
import { z } from "zod";

const CryptoRateSchema = z.object({
  bitcoin: z.object({ usd: z.number() }),
  ethereum: z.object({ usd: z.number() }),
});

export async function fetchLiveCryptoRates() {
  const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd", {
    next: { revalidate: 60 }, // Cache 60 seconds
  });
  if (!res.ok) throw new Error(`Failed to fetch crypto rates: ${res.statusText}`);
  const data = await res.json();
  return CryptoRateSchema.parse(data);
}
```

---

## 3. Best Practices
1. **Never Call Directly from Client on Uncached Loops**: Add local caching (Next.js `revalidate`, `stale-while-revalidate`, or memory map).
2. **Handle CORS Gracefully**: If an API lacks CORS headers, proxy the request via a lightweight Next.js route handler (`/api/proxy?endpoint=...`).
3. **Graceful Fallback**: Always maintain mock fallback data so UI never crashes if a third-party API has downtime.
