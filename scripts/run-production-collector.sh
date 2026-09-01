#!/bin/zsh
set -a
source /Users/yota/Projects/Secrets/Sprea/collector.env
set +a
cd /Users/yota/Projects/Products/sprea-collectors
export PATH=/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin
exec /opt/homebrew/bin/npm run collect
