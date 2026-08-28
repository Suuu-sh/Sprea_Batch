# sprea-collectors

Compliance-first external buyback-source adapters for Sprea. This public repository contains only neutral collector/ingest boundaries; it does not contain Sprea matching, opportunity, paper-trading, model, credentials, or private data.

All reviewed targets are currently **disabled**. See [docs/compliance.md](docs/compliance.md). Setting an `ENABLE_*` variable cannot bypass the policy and fails safely.

```bash
npm ci
npm test
npm run build
cp .env.example .env
npm run collect
```

The scheduled workflow runs every six hours. Each collector is isolated: one failure is recorded without stopping the others. Only successful, non-empty results are sent through the neutral ingest client.
Compliance-first external collector adapters for Sprea
