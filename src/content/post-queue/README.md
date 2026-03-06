# Blog Queue

Put ready-to-publish markdown posts here.

Automation will publish **one file every 2 days** by moving the oldest file (lexicographic order) to:

- `src/content/post/`

Then it runs build and deploy sync (`dist -> release`).

## Naming recommendation

Use sortable names to control order, for example:

- `2026-03-08-topic-a-en.md`
- `2026-03-10-topic-b-en.md`

## Cron job

Installed at:

- `0 10 */2 * * /usr/bin/env bash /root/vhost/astrowind/scripts/publish-next-blog.sh`

Logs:

- `logs/publish-next-blog.log`
