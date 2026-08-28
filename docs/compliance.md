# Compliance review

Reviewed on **2026-08-29 (JST)** for a private, personal research deployment. The operator's rule is to crawl only when no explicit applicable prohibition is found. `robots.txt`, published terms, authentication boundaries, and rate limits remain mandatory. Re-check before every enablement.

| Site | Official site | robots.txt observation | Terms observation | Decision |
|---|---|---|---|---|
| 買取1丁目 | https://www.1-chome.com/ | https://www.1-chome.com/robots.txt returns the site's Vite SPA HTML, not robots directives; no applicable disallow was found. | No explicit automated-access or personal internal-use prohibition was located. | **Enabled**: exact-JAN requests only, using the public JSON endpoint used by the first-party SPA, at most 1 request/second. |
| 森森買取 | https://www.morimori-kaitori.jp/ | https://www.morimori-kaitori.jp/robots.txt names `ClaudeBot` (delay 5), blocks `/search` and `/product/` only for `GPTBot`, and names `SERankingBacklinksBot` (delay 10). No rule applies to `SpreaResearchBot`. | Official privacy policy: https://www.morimori-kaitori.jp/privacy. No explicit automated-access or personal internal-use prohibition was located. | **Enabled**: exact-JAN search only, normal price only, 5 seconds between requests. |
| 買取商店 | https://www.kaitorishouten-co.jp/keitai | Direct retrieval of `robots.txt` returned HTTP 403 during review, so no permissive robots directive is assumed. | https://www.kaitorishouten-co.jp/terms?id=1 limits obtained information to personal private use and prohibits third-party redistribution without permission. | **Enabled only for the operator's private personal research deployment**: one public list request by default, identifiable user agent, no content redistribution. |
| イオシス買取 | https://k-tai-iosys.com/ | https://k-tai-iosys.com/robots.txt specifies `User-agent: *` and `Crawl-delay: 60`, with no disallow line. | Official terms: https://wp.k-tai-iosys.com/helps/site/terms.php. Article 9 prohibits commercial-purpose use; Article 23 prohibits unauthorized reproduction, republication, alteration, and secondary use. | **Disabled**: robots permits low-rate crawling but the terms do not permit this intended reuse. Obtain written/API permission. |

On 2026-08-29, an ordinary unauthenticated request to an Iosys product page returned an AWS WAF challenge (`202`, `x-amzn-waf-action: challenge`) with no HTML body. The collector stops on this response and does not attempt to bypass it.

## Enablement checklist

1. Record the exact applicable prohibition check and intended personal-use scope.
2. Re-fetch robots.txt for the exact host and path. Honor the strictest applicable delay (minimum 60 seconds where specified).
3. Add a bounded fixture-driven parser; never bypass authentication, bot controls, or rate limits.
4. Add source attribution and retention/deletion requirements from the permission.
5. Change a policy to enabled only in a reviewed pull request. Environment flags cannot override a disabled policy.

Enabled collectors acquire only bounded public product-list/search results and submit neutral observations. Missing JAN/model values are not guessed. Matching, profitability, scoring, and trading remain outside this public repository.
