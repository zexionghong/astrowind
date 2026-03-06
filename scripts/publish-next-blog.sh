#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="/root/vhost/astrowind"
POST_DIR="$PROJECT_DIR/src/content/post"
QUEUE_DIR="$PROJECT_DIR/src/content/post-queue"
LOG_DIR="$PROJECT_DIR/logs"
LOCK_FILE="/tmp/ipflex_publish_next_blog.lock"

mkdir -p "$QUEUE_DIR" "$LOG_DIR"

exec 9>"$LOCK_FILE"
if ! flock -n 9; then
  echo "[$(date '+%F %T')] Another publish job is running, exit." >> "$LOG_DIR/publish-next-blog.log"
  exit 0
fi

next_file="$(find "$QUEUE_DIR" -maxdepth 1 -type f -name '*.md' | sort | head -n 1 || true)"
if [[ -z "$next_file" ]]; then
  echo "[$(date '+%F %T')] Queue empty, nothing to publish." >> "$LOG_DIR/publish-next-blog.log"
  exit 0
fi

basename_file="$(basename "$next_file")"

echo "[$(date '+%F %T')] Publishing $basename_file" >> "$LOG_DIR/publish-next-blog.log"
mv "$next_file" "$POST_DIR/$basename_file"

cd "$PROJECT_DIR"
if npm run -s build >> "$LOG_DIR/publish-next-blog.log" 2>&1; then
  rsync -a --delete dist/ release/ >> "$LOG_DIR/publish-next-blog.log" 2>&1
  echo "[$(date '+%F %T')] Published $basename_file successfully." >> "$LOG_DIR/publish-next-blog.log"
else
  echo "[$(date '+%F %T')] Build failed, rolling back $basename_file to queue." >> "$LOG_DIR/publish-next-blog.log"
  mv "$POST_DIR/$basename_file" "$QUEUE_DIR/$basename_file"
  exit 1
fi
