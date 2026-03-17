# Buy the Dubai Dip — Project Spec

## Purpose
Showcase discounted UAE equities/assets during the Iran-UAE conflict period. Target audience: crypto-native investors. Future goal: tokenized purchasing on Solana.

## Phase 1: Landing Site (MVP)

### Core Features
1. **Email signup / waitlist** — Register interest for when tokenized assets go live on Solana
2. **Asset table (above the fold)** — Dense, compact rows showing:
   - Asset name / ticker
   - Current price
   - Sparkline price chart (single-row height)
   - Drawdown since March 1, 2026
   - COVID drawdown comparison
   - Click to expand → P/E ratio, balance sheet summary, revenue growth, detailed chart
3. **UAE Resilience section** — Curated articles with highlighted quotes:
   - Semaphore: "How About Them Emiratis"
   - WSJ: "In Defense of Dubai"
   - ~3-5 more articles
4. **Disclaimer banner** — "Tokenized purchasing is not yet available. Register to be notified."

### Design Philosophy
- **Dark theme**, high information density
- Argus landing page aesthetic: minimal padding, data-forward
- NOT generic AI-generated frontend — unique, sharp, dense
- Bloomberg terminal vibes meets crypto

### Technical
- Next.js 14+ (App Router, TypeScript)
- Tailwind CSS
- Hosted on Vercel
- UAE flag favicon 🇦🇪
- SEO: meta tags, OG images, structured data
- Mobile responsive

### Assets to Track
UAE-listed equities and key businesses:
- **Property/Dev:** Emaar, DAMAC, Aldar, RAK Properties
- **Banks:** FAB, Emirates NBD, ADCB, Mashreq, DIB
- **Airlines:** Emirates (if listed/proxy), Air Arabia, flydubai (proxy)
- **Infrastructure:** Salik (road tolls), DP World, ADNOC
- **Diversified:** IHC, Multiply Group

### Data Sources (TBD)
- ADX / DFM market data APIs
- Yahoo Finance / Google Finance as fallback
- Manual data entry for MVP if needed

## Phase 2 (Future)
- Solana tokenization integration
- On-chain purchasing
- Wallet connect
- Portfolio tracking
