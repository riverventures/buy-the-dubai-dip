#!/bin/bash
# Fetch latest prices for Dubai Dip assets
# DFM stocks via Yahoo Finance API, ADX stocks via web search
# Run daily Sun-Thu at 11:00 AM Dubai time (1 hour after market open)

set -e

ASSETS_FILE="/Users/clawdbot/.openclaw/workspace/buy-the-dubai-dip/src/data/assets.ts"
PRICES_FILE="/tmp/dubai-dip-prices.json"

echo "Fetching DFM prices from Yahoo Finance..."

# Yahoo Finance tickers that work for DFM
declare -A YAHOO_TICKERS
YAHOO_TICKERS[EMAAR]="EMAAR.AE"
YAHOO_TICKERS[EMIRATESNBD]="EMIRATESNBD.AE"
YAHOO_TICKERS[EMAARDEV]="EMAARDEV.AE"
YAHOO_TICKERS[AIRARABIA]="AIRARABIA.AE"
YAHOO_TICKERS[SALIK]="SALIK.AE"
YAHOO_TICKERS[DIB]="DIB.AE"
YAHOO_TICKERS[UAE]="UAE"

echo "{" > "$PRICES_FILE"

for key in "${!YAHOO_TICKERS[@]}"; do
  ticker="${YAHOO_TICKERS[$key]}"
  price=$(curl -s -A "Mozilla/5.0" \
    "https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1d" \
    | python3 -c "
import sys,json
try:
    d=json.load(sys.stdin)
    r=d.get('chart',{}).get('result',[])
    if r: print(r[0]['meta']['regularMarketPrice'])
    else: print('')
except: print('')
" 2>/dev/null)
  
  if [ -n "$price" ] && [ "$price" != "" ]; then
    echo "  \"$key\": $price," >> "$PRICES_FILE"
    echo "  $key: $price"
  else
    echo "  WARN: Failed to fetch $key ($ticker)"
  fi
  sleep 0.5
done

echo "  \"_timestamp\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"" >> "$PRICES_FILE"
echo "}" >> "$PRICES_FILE"

echo ""
echo "Prices saved to $PRICES_FILE"
cat "$PRICES_FILE"
