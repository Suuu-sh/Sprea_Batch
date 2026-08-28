# sprea-collectors

Compliance-first external buyback-source adapters for Sprea. This public repository contains only neutral collector/ingest boundaries; it does not contain Sprea matching, opportunity, paper-trading, model, credentials, or private data.

買取1丁目と森森買取は、明示的な禁止が確認できない範囲で個人研究用に有効化しています。イオシスは公開規約に禁止条項があるため無効です。判断根拠と再確認日は [docs/compliance.md](docs/compliance.md) を参照してください。

```bash
npm ci
npm test
npm run build
cp .env.example .env
npm run collect
```

The scheduled workflow runs every six hours. It first obtains fresh in-stock JAN targets from Sprea's authenticated ingest API, then queries each enabled buyback site at a bounded rate. Each collector is isolated: one failure is recorded without stopping the others. Only successful, non-empty results are sent through the neutral ingest client.
Compliance-first external collector adapters for Sprea
