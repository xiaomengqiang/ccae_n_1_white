#!/bin/bash
set -euo pipefail

DEMO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEMO_URL='http://127.0.0.1:8765/preview/index.page.html'
PREVIEW_PROFILE="$(mktemp -d "${TMPDIR:-/tmp/}ccae-chrome-preview.XXXXXX")"

if ! /usr/bin/curl -fsS --max-time 3 "$DEMO_URL" -o /dev/null; then
  cd "$DEMO_ROOT"
  nohup /usr/bin/python3 -m http.server 8765 --bind 127.0.0.1 \
    > /tmp/ccae-preview-server.log 2>&1 < /dev/null &
  for attempt in {1..30}; do
    if /usr/bin/curl -fsS --max-time 1 "$DEMO_URL" -o /dev/null; then break; fi
    sleep 0.2
  done
fi

/usr/bin/curl -fsS --max-time 3 "$DEMO_URL" -o /dev/null
printf '打开完整 Demo（独立 Chrome 预览窗口，启用 WebGL / Metal）。\n日志目录：%s\n' "$PREVIEW_PROFILE"
printf '%s\n' "$PREVIEW_PROFILE" > /tmp/ccae-chrome-preview-profile.txt
/usr/bin/open -na 'Google Chrome' --args \
  --user-data-dir="$PREVIEW_PROFILE" \
  --no-first-run --no-default-browser-check \
  --use-gl=angle --use-angle=metal \
  --enable-logging --log-file="$PREVIEW_PROFILE/chrome_debug.log" \
  "$DEMO_URL"
