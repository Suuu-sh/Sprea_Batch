# sprea-collectors

Compliance-first external buyback-source adapters for Sprea, built with TypeScript and Node.js 22. This public repository contains only HTTP acquisition, minimal parsing, and neutral Research API delivery. It does not contain Sprea matching, opportunities, paper trading, scores, D1 access, models, credentials, or private data.

買取1丁目と森森買取は、明示的な禁止が確認できない範囲で個人研究用に有効化しています。イオシスは公開規約に禁止条項があるため無効です。判断根拠と再確認日は [docs/compliance.md](docs/compliance.md) を参照してください。

```bash
npm ci
npm run typecheck
npm run lint
npm test
npm run build
cp .env.example .env
npm run collect
```

The scheduled workflow runs every two hours and can also be started manually. Each enabled collector is isolated: one failure is recorded without stopping the others. Tests use saved HTML fixtures and never require live sites. Only successful, non-empty results are sent to `POST /api/ingest/buyback-quotes`.

## Layout

```text
src/collectors/{kaitori-1chome,morimori,iosys}/
src/shared/
src/runner.ts
tests/fixtures/
.github/workflows/collect.yml
```

Collectors are disabled until their URL and enable flag are explicitly configured. The Iosys skeleton remains disabled under the current compliance decision.

## Dry run and delivery

Set `SPREA_DRY_RUN=true` to fetch, parse, normalize, and print provider counts and samples without calling Sprea. Payloads are sent in batches of at most 100 only when dry run is disabled. Manual GitHub Actions runs expose a dry-run checkbox; scheduled runs remain dry unless the repository variable `SPREA_DRY_RUN` is explicitly set to `false` after review.

買取1丁目 uses the public JSON endpoint used by its SPA, with bounded pagination. 森森買取 parses the current `table.price-list` search result structure. Iosys has a completed fixture parser and registered collector class, but live execution and production delivery remain blocked by the documented terms and current AWS WAF challenge. The implementation does not bypass access controls.
