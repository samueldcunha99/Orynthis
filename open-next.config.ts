import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * ISR cache is OFF, and it is costing real time: the live site returns
 * x-nextjs-cache: MISS on every request, so every page view re-renders and
 * re-calls Shopify. Measured TTFB swings between 210ms and 860ms.
 *
 * Turning it on is two lines — the r2IncrementalCache override here plus the
 * r2_buckets binding in wrangler.jsonc. What blocks it is the pre-warm step
 * that `deploy` runs first:
 *
 *   - the default path starts a local worker with a remote R2 binding and
 *     POSTs each cache entry through it. Every write hits its 60s timeout on
 *     this machine, and the upload behind it never runs.
 *   - `deploy --rclone` writes to the bucket directly and skips that proxy,
 *     but needs R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY and CF_ACCOUNT_ID —
 *     S3 credentials that only exist once someone makes them in the R2
 *     dashboard.
 *
 * ponytail: no ISR cache. Create the R2 S3 credentials, put them in
 * .env.local, then re-enable both lines and deploy with --rclone.
 */
export default defineCloudflareConfig({});
