# sprea-collectors

Compliance-first external buyback-source adapters for Sprea, built with TypeScript and Node.js 22. This public repository contains only HTTP acquisition, minimal parsing, and neutral Research API delivery. It does not contain Sprea matching, opportunities, paper trading, scores, D1 access, models, credentials, or private data.

通常Runnerは買取1丁目・森森買取・買取商店の3店舗を対象にします。イオシスは公開規約に禁止条項があるため通常実行対象外です。判断根拠と再確認日は [docs/compliance.md](docs/compliance.md) を参照してください。

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
src/collectors/{kaitori-1chome,morimori,kaitori-shouten,iosys}/
src/shared/
src/runner.ts
tests/fixtures/
.github/workflows/collect.yml
```

Collectors are disabled until their enable flag is explicitly configured. The Iosys implementation remains in the repository for future review, but the normal CLI and GitHub Actions registry cannot execute it.

## Dry run and delivery

Set `SPREA_DRY_RUN=true` to fetch, parse, normalize, and print provider counts and samples without calling Sprea. Payloads are sent in batches of at most 100 only when dry run is disabled. Manual GitHub Actions runs expose a dry-run checkbox; scheduled runs remain dry unless the repository variable `SPREA_DRY_RUN` is explicitly set to `false` after review.

買取1丁目 uses the public JSON endpoint used by its SPA, with bounded pagination. 森森買取 parses the current `table.price-list` search result structure. 買取商店 parses the public mobile-product list and uses the displayed new-item price without guessing unavailable model numbers. Iosys retains fixture/parser code only and is not registered for live execution. The implementation does not bypass authentication or access controls.

## Production schedule

The public provider sites currently time out from GitHub-hosted runner IP ranges. The production collector therefore runs on the owner Mac with a LaunchAgent at 03:00, 09:00, 15:00, and 21:00 JST. GitHub Actions remains available for manual diagnostics, type checking, tests, and builds.

Runtime credentials are stored outside the repository at `/Users/yota/Projects/Secrets/Sprea/collector.env`. The scheduled entry point is `scripts/run-production-collector.sh`.
