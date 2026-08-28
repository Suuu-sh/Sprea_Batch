# Compliance review

Reviewed on **2026-08-28 (JST)**. `robots.txt` is a crawl-control signal, not permission to copy, republish, or commercially reuse content. A site remains disabled unless both its crawl rules and terms/API permission are clear. Re-check before every enablement.

| Site | Official site | robots.txt observation | Terms observation | Decision |
|---|---|---|---|---|
| 買取1丁目 | https://www.1-chome.com/ | https://www.1-chome.com/robots.txt returned the site's Vite SPA HTML, not valid robots directives | No official site-wide terms or API permission granting automated collection/reuse was located. The official site tells users to check the website price before applying. | **Disabled**: crawl permission and reuse terms are unclear. Obtain written/API permission. |
| 森森買取 | https://www.morimori-kaitori.jp/ | https://www.morimori-kaitori.jp/robots.txt names `ClaudeBot` (delay 5), blocks `/search` and `/product/` only for `GPTBot`, and names `SERankingBacklinksBot` (delay 10). It has no `User-agent: *` rule and grants no reuse rights. | Official privacy policy: https://www.morimori-kaitori.jp/privacy. No official site terms or API permission granting automated price collection/reuse was located. | **Disabled**: absence of a wildcard prohibition is not affirmative permission. Obtain written/API permission. |
| イオシス買取 | https://k-tai-iosys.com/ | https://k-tai-iosys.com/robots.txt specifies `User-agent: *` and `Crawl-delay: 60`, with no disallow line. | Official terms: https://wp.k-tai-iosys.com/helps/site/terms.php. Article 9 prohibits commercial-purpose use; Article 23 prohibits unauthorized reproduction, republication, alteration, and secondary use. | **Disabled**: robots permits low-rate crawling but the terms do not permit this intended reuse. Obtain written/API permission. |

## Enablement checklist

1. Record written permission or official API terms and the permitted purposes/data fields.
2. Re-fetch robots.txt for the exact host and path. Honor the strictest applicable delay (minimum 60 seconds where specified).
3. Add a bounded fixture-driven parser; never bypass authentication, bot controls, or rate limits.
4. Add source attribution and retention/deletion requirements from the permission.
5. Change a policy to enabled only in a reviewed pull request. Environment flags cannot override a disabled policy.

No price page collector is implemented while all three decisions are disabled. The runner and ingest boundary are intentionally present so an approved source can be added without placing Sprea's product, opportunity, or trading logic in this repository.
