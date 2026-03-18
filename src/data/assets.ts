export interface BalanceSheetKPI {
  label: string
  value: string
  rating: 'good' | 'neutral' | 'poor'
  tooltip: string
}

export interface Asset {
  name: string
  ticker: string
  sector: string
  exchange: 'ADX' | 'DFM' | 'NASDAQ'
  currency: 'AED' | 'USD'
  fiatUrl: string
  currentPrice: number
  preMarch1Price: number
  drawdownPct: number
  covidDrawdownPct: number
  sparklineData: number[]
  pe: number
  marketCapB: number
  revenueGrowthPct: number
  revenueGrowthPeriod: string
  balanceSheetHighlights: BalanceSheetKPI[]
}

// AED to USD exchange rate (March 2026)
export const AED_TO_USD = 0.2723

export function formatUSD(aed: number): string {
  const usd = aed * AED_TO_USD
  if (usd >= 1000) return `$${(usd).toFixed(0)}`
  if (usd >= 100) return `$${usd.toFixed(1)}`
  if (usd >= 1) return `$${usd.toFixed(2)}`
  return `$${usd.toFixed(2)}`
}

export function formatUSDbn(aedB: number): string {
  const usdB = aedB * AED_TO_USD
  return `$${usdB.toFixed(1)}B`
}

export function formatMarketCap(marketCapB: number, currency: 'AED' | 'USD'): string {
  if (currency === 'USD') {
    if (marketCapB < 1) return `$${(marketCapB * 1000).toFixed(0)}M`
    return `$${marketCapB.toFixed(1)}B`
  }
  return `${marketCapB.toFixed(1)}B`
}

// All sectors used across assets
export const ALL_SECTORS = ['All', 'Real Estate', 'Banking', 'Infrastructure', 'Logistics', 'Energy', 'Conglomerate', 'Aviation', 'Investment', 'ETF'] as const

// Realistic sparkline data: ~35 data points from Jan 1 2026 to Mar 18 2026
// Each asset has unique price action. Pre-March shows normal trading, post-March shows crisis decline.
// Final point matches currentPrice.
export const assets: Asset[] = [
  {
    name: 'iShares MSCI UAE ETF',
    ticker: 'UAE',
    sector: 'ETF',
    exchange: 'NASDAQ',
    currency: 'USD',
    fiatUrl: 'https://www.ishares.com/us/products/264275/ishares-msci-uae-capped-etf',
    currentPrice: 17.76,
    preMarch1Price: 19.10,
    drawdownPct: -7.0,
    covidDrawdownPct: -38.5,
    sparklineData: [
      18.40, 18.55, 18.70, 18.80, 18.85, 18.95, 19.00, 18.95, 19.05, 19.10,
      19.08, 19.00, 19.05, 19.10, 19.05, 19.00, 19.08, 19.10,
      18.60, 18.20, 17.85, 17.50, 17.80, 17.90, 17.65, 17.45, 17.60, 17.70,
      17.55, 17.80, 17.72, 17.68, 17.78, 17.75, 17.76
    ],
    pe: 8.2,
    marketCapB: 0.04,
    revenueGrowthPct: 0,
    revenueGrowthPeriod: 'N/A (ETF)',
    balanceSheetHighlights: [
      { label: 'AUM', value: '$39M', rating: 'neutral', tooltip: 'Small fund by global ETF standards. Low AUM means wider spreads and less liquidity vs large-cap ETFs, but adequate for retail positions.' },
      { label: 'Expense Ratio', value: '0.59%', rating: 'neutral', tooltip: 'Higher than broad market ETFs (SPY: 0.09%) but typical for single-country emerging market exposure. Comparable to EWZ (Brazil): 0.58%.' },
      { label: 'Div Yield', value: '3.8%', rating: 'good', tooltip: 'Attractive yield reflecting high-dividend UAE equities (banks + real estate). Above S&P 500 yield (~1.3%) and most EM ETFs (~2.5%).' },
    ],
  },
  {
    name: 'Emaar Properties',
    ticker: 'EMAAR',
    sector: 'Real Estate',
    exchange: 'DFM',
    currency: 'AED',
    fiatUrl: 'https://www.dfm.ae/the-exchange/market-information/company/EMAAR/trading/trading-summary',
    currentPrice: 11.45,
    preMarch1Price: 15.00,
    drawdownPct: -23.7,
    covidDrawdownPct: -62.1,
    sparklineData: [
      12.60, 12.80, 13.10, 13.40, 13.70, 14.00, 14.30, 14.50, 14.70, 14.85,
      14.90, 14.95, 15.00, 14.95, 14.90, 14.85, 14.95, 15.00,
      14.20, 13.50, 12.80, 12.30, 12.10, 12.00, 11.85, 11.70, 11.60, 11.55,
      11.50, 11.48, 11.46, 11.45, 11.45, 11.45, 11.45
    ],
    pe: 5.8,
    marketCapB: 94.0,
    revenueGrowthPct: 18.4,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Net debt/equity', value: '0.32', rating: 'neutral', tooltip: 'Moderate leverage. Below 0.30 is strong for UAE real estate (Aldar: 0.41, DAMAC: 0.18). Comfortable given Emaar\'s AED 12.1B cash reserves.' },
      { label: 'Cash', value: 'AED 12.1B', rating: 'good', tooltip: 'Substantial cash pile. Largest cash position among UAE developers (DAMAC: AED 5.8B, Aldar: AED 8.2B). Covers 2+ years of debt obligations.' },
      { label: 'ROE', value: '16.2%', rating: 'good', tooltip: 'Strong returns on equity. Above 15% is excellent for UAE real estate (DAMAC: 22.4%, Aldar: 12.8%). Top-quartile performer in the sector.' },
    ],
  },
  {
    name: 'DAMAC Properties',
    ticker: 'DAMAC',
    sector: 'Real Estate',
    exchange: 'DFM',
    currency: 'AED',
    fiatUrl: 'https://www.dfm.ae/the-exchange/market-information/company/DAMAC/trading/trading-summary',
    currentPrice: 1.40,
    preMarch1Price: 2.10,
    drawdownPct: -33.3,
    covidDrawdownPct: -71.3,
    sparklineData: [
      1.85, 1.88, 1.92, 1.96, 2.00, 2.04, 2.08, 2.10, 2.08, 2.10,
      2.12, 2.10, 2.08, 2.10, 2.06, 2.08, 2.10, 2.10,
      1.92, 1.78, 1.65, 1.55, 1.50, 1.48, 1.46, 1.44, 1.43,
      1.42, 1.41, 1.41, 1.40, 1.40, 1.40, 1.40
    ],
    pe: 4.2,
    marketCapB: 10.0,
    revenueGrowthPct: 42.1,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Net debt/equity', value: '0.18', rating: 'good', tooltip: 'Very low leverage. Best debt ratio among UAE developers (Emaar: 0.32, Aldar: 0.41). Near net-cash position provides crisis resilience.' },
      { label: 'Cash', value: 'AED 5.8B', rating: 'good', tooltip: 'Healthy cash buffer. Strong relative to AED 10B market cap. Covers all near-term maturities with room for opportunistic acquisitions.' },
      { label: 'ROE', value: '22.4%', rating: 'good', tooltip: 'Sector-leading returns. Highest ROE among UAE developers (Emaar: 16.2%, Aldar: 12.8%, Emaar Dev: 28.1%). Reflects capital-light project model.' },
    ],
  },
  {
    name: 'Emirates NBD',
    ticker: 'EMIRATESNBD',
    sector: 'Banking',
    exchange: 'DFM',
    currency: 'AED',
    fiatUrl: 'https://www.dfm.ae/the-exchange/market-information/company/EMIRATESNBD/trading/trading-summary',
    currentPrice: 26.50,
    preMarch1Price: 35.00,
    drawdownPct: -24.3,
    covidDrawdownPct: -42.1,
    sparklineData: [
      30.00, 30.50, 31.20, 31.80, 32.40, 33.00, 33.60, 34.20, 34.80, 35.50,
      36.00, 36.50, 37.00, 37.40, 37.20, 36.80, 36.00, 35.00,
      33.00, 31.50, 30.00, 29.00, 28.50, 28.20, 27.80, 27.40, 27.20,
      27.00, 26.85, 26.70, 26.60, 26.55, 26.52, 26.50
    ],
    pe: 6.2,
    marketCapB: 75.0,
    revenueGrowthPct: 15.8,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Tier 1 ratio', value: '16.1%', rating: 'good', tooltip: 'Best-capitalized UAE bank. Well above peers (FAB: 14.2%, ADCB: 13.8%, DIB: 13.5%). Massive buffer above 10.5% CBUAE minimum.' },
      { label: 'NPL ratio', value: '3.1%', rating: 'neutral', tooltip: 'Moderate non-performing loans. 3-4% is average for UAE banks (FAB: 2.8%, ADCB: 3.4%). Manageable but watch for crisis impact on retail book.' },
      { label: 'ROA', value: '2.1%', rating: 'good', tooltip: 'Top ROA in UAE banking. Beats FAB (1.8%) and ADCB (1.6%). Driven by scale advantages as largest bank by assets in the UAE.' },
    ],
  },
  {
    name: 'Emaar Development',
    ticker: 'EMAARDEV',
    sector: 'Real Estate',
    exchange: 'DFM',
    currency: 'AED',
    fiatUrl: 'https://www.dfm.ae/the-exchange/market-information/company/EMAARDEV/trading/trading-summary',
    currentPrice: 13.30,
    preMarch1Price: 20.70,
    drawdownPct: -35.7,
    covidDrawdownPct: -67.4,
    sparklineData: [
      15.00, 15.40, 15.90, 16.40, 16.90, 17.40, 17.90, 18.40, 18.90, 19.30,
      19.70, 20.00, 20.30, 20.50, 20.70, 20.60, 20.40, 20.70,
      19.00, 17.50, 16.20, 15.40, 14.80, 14.40, 14.10, 13.85, 13.70,
      13.60, 13.50, 13.42, 13.36, 13.32, 13.30, 13.30
    ],
    pe: 4.5,
    marketCapB: 53.0,
    revenueGrowthPct: 28.9,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Emaar subsidiary', value: '', rating: 'neutral', tooltip: 'Development arm of Emaar Properties. Benefits from Emaar brand and land bank access. Parent owns ~80% — alignment of interests but limited free float.' },
      { label: 'Record backlog', value: 'AED 72B', rating: 'good', tooltip: 'Massive revenue visibility. AED 72B backlog provides 3+ years of revenue at current run rate. Largest backlog among UAE developers — de-risks near-term earnings.' },
      { label: 'ROE', value: '28.1%', rating: 'good', tooltip: 'Highest ROE in UAE real estate. Beats parent Emaar (16.2%), DAMAC (22.4%), and Aldar (12.8%). Capital-light model as subsidiary drives exceptional returns.' },
    ],
  },
  {
    name: 'Aldar Properties',
    ticker: 'ALDAR',
    sector: 'Real Estate',
    exchange: 'ADX',
    currency: 'AED',
    fiatUrl: 'https://www.adx.ae/main-market/company-profile/overview?symbols=ALDAR',
    currentPrice: 7.42,
    preMarch1Price: 8.68,
    drawdownPct: -14.5,
    covidDrawdownPct: -45.6,
    sparklineData: [
      7.90, 8.00, 8.10, 8.20, 8.30, 8.40, 8.50, 8.55, 8.60, 8.65,
      8.68, 8.65, 8.60, 8.68, 8.65, 8.62, 8.66, 8.68,
      8.35, 8.05, 7.80, 7.65, 7.58, 7.55, 7.52, 7.50, 7.48,
      7.46, 7.45, 7.44, 7.43, 7.42, 7.42, 7.42
    ],
    pe: 9.1,
    marketCapB: 35.0,
    revenueGrowthPct: 24.7,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Net debt/equity', value: '0.41', rating: 'neutral', tooltip: 'Higher leverage than peers but manageable. Above Emaar (0.32) and DAMAC (0.18). Reflects aggressive acquisition strategy including Ras Al Khaimah expansion.' },
      { label: 'Cash', value: 'AED 8.2B', rating: 'good', tooltip: 'Strong liquidity. Second-largest cash position among UAE developers after Emaar (AED 12.1B). Backed by Abu Dhabi government ownership.' },
      { label: 'ROE', value: '12.8%', rating: 'neutral', tooltip: 'Decent but trails peers. Below Emaar (16.2%) and DAMAC (22.4%). Diluted by recurring income portfolio which trades growth for stability.' },
    ],
  },
  {
    name: 'ADNOC Distribution',
    ticker: 'ADNOCDIST',
    sector: 'Energy',
    exchange: 'ADX',
    currency: 'AED',
    fiatUrl: 'https://www.adx.ae/main-market/company-profile/overview?symbols=ADNOCDIST',
    currentPrice: 3.55,
    preMarch1Price: 4.10,
    drawdownPct: -13.4,
    covidDrawdownPct: -31.5,
    sparklineData: [
      3.80, 3.85, 3.88, 3.92, 3.95, 3.98, 4.02, 4.05, 4.08, 4.10,
      4.08, 4.05, 4.08, 4.10, 4.06, 4.04, 4.08, 4.10,
      3.95, 3.82, 3.72, 3.65, 3.60, 3.62, 3.58, 3.56, 3.55,
      3.55, 3.54, 3.55, 3.55, 3.55, 3.55, 3.55
    ],
    pe: 15.2,
    marketCapB: 40.0,
    revenueGrowthPct: 6.4,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: '450+ stations UAE', value: '', rating: 'neutral', tooltip: 'Dominant fuel retail network. Largest station count in UAE with ~70% market share. Expanding into EV charging and convenience retail for diversification.' },
      { label: 'Div yield', value: '6.1%', rating: 'good', tooltip: 'Highest dividend yield in this universe. Above Salik (5.8%). ADNOC parent guarantees minimum dividend — strong income play during volatility.' },
      { label: 'Expanding KSA', value: '', rating: 'neutral', tooltip: 'Saudi expansion is a growth catalyst. Targeting 60+ stations in KSA by 2027. New market adds optionality but requires upfront capex investment.' },
    ],
  },
  {
    name: 'First Abu Dhabi Bank',
    ticker: 'FAB',
    sector: 'Banking',
    exchange: 'ADX',
    currency: 'AED',
    fiatUrl: 'https://www.adx.ae/main-market/company-profile/overview?symbols=FAB',
    currentPrice: 39.30,
    preMarch1Price: 45.00,
    drawdownPct: -12.7,
    covidDrawdownPct: -38.4,
    sparklineData: [
      40.50, 41.00, 41.50, 42.00, 42.50, 43.00, 43.50, 44.00, 44.30, 44.60,
      44.80, 45.00, 44.80, 44.50, 44.20, 44.50, 44.80, 45.00,
      43.50, 42.00, 41.00, 40.30, 40.00, 39.80, 39.70, 39.60, 39.55,
      39.50, 39.45, 39.40, 39.35, 39.32, 39.30, 39.30
    ],
    pe: 8.4,
    marketCapB: 192.0,
    revenueGrowthPct: 12.3,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Tier 1 ratio', value: '14.2%', rating: 'good', tooltip: 'Well-capitalized. Above 14% is strong for UAE banks (ENBD: 16.1%, ADCB: 13.8%, DIB: 13.5%). Exceeds CBUAE minimum of 10.5%.' },
      { label: 'NPL ratio', value: '2.8%', rating: 'good', tooltip: 'Best asset quality among UAE banks. Below 3% is strong (ENBD: 3.1%, ADCB: 3.4%). Reflects conservative underwriting and blue-chip corporate book.' },
      { label: 'ROA', value: '1.8%', rating: 'good', tooltip: 'Strong profitability. Among the best ROA in UAE banking (ENBD: 2.1%, ADCB: 1.6%). Consistent performer across cycles.' },
    ],
  },
  {
    name: 'ADCB',
    ticker: 'ADCB',
    sector: 'Banking',
    exchange: 'ADX',
    currency: 'AED',
    fiatUrl: 'https://www.adx.ae/main-market/company-profile/overview?symbols=ADCB',
    currentPrice: 11.80,
    preMarch1Price: 12.32,
    drawdownPct: -4.2,
    covidDrawdownPct: -44.8,
    sparklineData: [
      11.50, 11.60, 11.70, 11.80, 11.90, 12.00, 12.10, 12.15, 12.20, 12.25,
      12.30, 12.32, 12.28, 12.30, 12.32, 12.28, 12.30, 12.32,
      12.20, 12.10, 12.00, 11.92, 11.88, 11.85, 11.83, 11.82, 11.81,
      11.80, 11.80, 11.80, 11.80, 11.80, 11.80, 11.80
    ],
    pe: 7.1,
    marketCapB: 80.0,
    revenueGrowthPct: 9.6,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Tier 1 ratio', value: '13.8%', rating: 'neutral', tooltip: 'Adequate capital. Slightly below peers (FAB: 14.2%, ENBD: 16.1%) but comfortably above 10.5% CBUAE minimum. Post-merger integration still optimizing.' },
      { label: 'NPL ratio', value: '3.4%', rating: 'neutral', tooltip: 'Slightly elevated NPLs. Highest among top-3 UAE banks (FAB: 2.8%, ENBD: 3.1%). Legacy Union National Bank portfolio still being cleaned up.' },
      { label: 'ROA', value: '1.6%', rating: 'good', tooltip: 'Solid profitability. Slightly below FAB (1.8%) and ENBD (2.1%) but improving trend post-merger. Above 1.5% is good for a diversified UAE bank.' },
    ],
  },
  {
    name: 'Air Arabia',
    ticker: 'AIRARABIA',
    sector: 'Aviation',
    exchange: 'DFM',
    currency: 'AED',
    fiatUrl: 'https://www.dfm.ae/the-exchange/market-information/company/AIRARABIA/trading/trading-summary',
    currentPrice: 4.31,
    preMarch1Price: 5.50,
    drawdownPct: -21.6,
    covidDrawdownPct: -55.2,
    sparklineData: [
      5.00, 5.08, 5.15, 5.20, 5.25, 5.30, 5.35, 5.40, 5.44, 5.48,
      5.50, 5.48, 5.45, 5.50, 5.48, 5.42, 5.48, 5.50,
      5.20, 4.95, 4.72, 4.55, 4.48, 4.45, 4.42, 4.40, 4.38,
      4.36, 4.35, 4.33, 4.32, 4.31, 4.31, 4.31
    ],
    pe: 7.5,
    marketCapB: 19.0,
    revenueGrowthPct: 22.8,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'MENA low-cost leader', value: '', rating: 'neutral', tooltip: 'Only profitable LCC in the MENA region. Cost per seat-km 40% below legacy carriers. Structural moat in price-sensitive travel segment.' },
      { label: 'Fleet', value: '70+ aircraft', rating: 'neutral', tooltip: 'Young fleet with average age ~6 years. Fuel-efficient A320neo family reduces operating costs. Order book for 120+ aircraft secures growth runway.' },
      { label: 'Net cash position', value: '', rating: 'good', tooltip: 'Rare for an airline — zero net debt. Survived COVID without government bailout. Financial strength is a competitive advantage when peers are leveraged.' },
    ],
  },
  {
    name: 'Salik',
    ticker: 'SALIK',
    sector: 'Infrastructure',
    exchange: 'DFM',
    currency: 'AED',
    fiatUrl: 'https://www.dfm.ae/the-exchange/market-information/company/SALIK/trading/trading-summary',
    currentPrice: 5.28,
    preMarch1Price: 5.90,
    drawdownPct: -10.5,
    covidDrawdownPct: -25.0,
    sparklineData: [
      5.50, 5.55, 5.60, 5.65, 5.70, 5.75, 5.78, 5.82, 5.85, 5.88,
      5.90, 5.88, 5.85, 5.90, 5.88, 5.84, 5.88, 5.90,
      5.70, 5.55, 5.42, 5.35, 5.32, 5.35, 5.30, 5.28, 5.30,
      5.28, 5.28, 5.28, 5.28, 5.28, 5.28, 5.28
    ],
    pe: 18.5,
    marketCapB: 38.0,
    revenueGrowthPct: 8.2,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Monopoly toll operator', value: '', rating: 'neutral', tooltip: 'Exclusive operator of Dubai\'s toll gate system. No competition risk — regulated monopoly with guaranteed traffic from 8 toll gates across Dubai.' },
      { label: 'Div yield', value: '5.8%', rating: 'good', tooltip: 'Attractive yield. Among best in UAE equities (ADNOC Dist: 6.1% is higher but has competition risk). Sustainable payout backed by predictable toll revenue.' },
      { label: 'Zero competition risk', value: '', rating: 'neutral', tooltip: 'Government-granted exclusivity. Dubai traffic grew 4.2% in 2025 — structural tailwind as population grows. Revenue is essentially GDP-linked.' },
    ],
  },
  {
    name: 'Dubai Islamic Bank',
    ticker: 'DIB',
    sector: 'Banking',
    exchange: 'DFM',
    currency: 'AED',
    fiatUrl: 'https://www.dfm.ae/the-exchange/market-information/company/DIB/trading/trading-summary',
    currentPrice: 7.40,
    preMarch1Price: 8.50,
    drawdownPct: -12.9,
    covidDrawdownPct: -48.6,
    sparklineData: [
      7.80, 7.90, 8.00, 8.08, 8.15, 8.22, 8.30, 8.38, 8.42, 8.48,
      8.50, 8.48, 8.45, 8.50, 8.48, 8.42, 8.48, 8.50,
      8.20, 7.95, 7.75, 7.60, 7.55, 7.52, 7.50, 7.48, 7.46,
      7.44, 7.43, 7.42, 7.41, 7.40, 7.40, 7.40
    ],
    pe: 6.8,
    marketCapB: 55.0,
    revenueGrowthPct: 14.1,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Largest Islamic bank UAE', value: '', rating: 'neutral', tooltip: 'Market leader in Sharia-compliant banking. Structural demand from Islamic finance preference in GCC. Growing sukuk market expands addressable opportunities.' },
      { label: 'Tier 1 ratio', value: '13.5%', rating: 'neutral', tooltip: 'Adequate capital but lowest among UAE banking peers (FAB: 14.2%, ENBD: 16.1%, ADCB: 13.8%). Still comfortably above CBUAE 10.5% minimum.' },
      { label: 'ROE', value: '18.2%', rating: 'good', tooltip: 'Excellent returns. Outperforms conventional banking peers on ROE metric. Islamic banking model has lower funding costs which boosts equity returns.' },
    ],
  },
  {
    name: 'DP World',
    ticker: 'DPW',
    sector: 'Logistics',
    exchange: 'DFM',
    currency: 'AED',
    fiatUrl: 'https://www.dfm.ae/the-exchange/market-information/company/DPW/trading/trading-summary',
    currentPrice: 16.29,
    preMarch1Price: 18.50,
    drawdownPct: -11.9,
    covidDrawdownPct: -35.2,
    sparklineData: [
      17.20, 17.40, 17.60, 17.80, 17.95, 18.10, 18.20, 18.30, 18.40, 18.45,
      18.50, 18.45, 18.40, 18.50, 18.45, 18.38, 18.48, 18.50,
      17.80, 17.30, 16.90, 16.60, 16.50, 16.55, 16.45, 16.40, 16.38,
      16.35, 16.33, 16.32, 16.30, 16.30, 16.29, 16.29
    ],
    pe: 11.3,
    marketCapB: 49.5,
    revenueGrowthPct: 11.5,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Global port operator', value: '', rating: 'neutral', tooltip: 'Operates 90+ terminals across 40+ countries. Geographic diversification offsets regional risk — crisis in one area doesn\'t halt global operations.' },
      { label: 'Revenue', value: '$18.9B', rating: 'neutral', tooltip: 'Massive revenue base. Largest UAE-listed company by revenue. Growth driven by acquisitions (Imperial Logistics) and 7.4% like-for-like volume growth.' },
      { label: 'EBITDA margin', value: '32%', rating: 'good', tooltip: 'Strong margins for a logistics operator. Above global peers Maersk (~25%) and CMA CGM (~28%). Reflects premium port locations and pricing power.' },
    ],
  },
  {
    name: 'IHC',
    ticker: 'IHC',
    sector: 'Conglomerate',
    exchange: 'ADX',
    currency: 'AED',
    fiatUrl: 'https://www.adx.ae/main-market/company-profile/overview?symbols=IHC',
    currentPrice: 391.00,
    preMarch1Price: 450.00,
    drawdownPct: -13.1,
    covidDrawdownPct: -18.0,
    sparklineData: [
      410, 415, 420, 425, 430, 435, 440, 443, 446, 448,
      450, 448, 445, 450, 448, 444, 448, 450,
      432, 420, 410, 402, 398, 396, 394, 393, 392,
      392, 391, 391, 391, 391, 391, 391
    ],
    pe: 22.4,
    marketCapB: 730.0,
    revenueGrowthPct: 38.2,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Royal-backed conglomerate', value: '', rating: 'neutral', tooltip: 'Controlled by Sheikh Tahnoon bin Zayed. Political backing provides strategic advantages but also means corporate governance follows Abu Dhabi royal family priorities.' },
      { label: 'Cash', value: 'AED 28B', rating: 'good', tooltip: 'Enormous cash reserves. Dwarfs all UAE peers (Emaar: AED 12.1B, Aldar: AED 8.2B). War chest for acquisitions and crisis resilience.' },
      { label: '1000+ subsidiaries', value: '', rating: 'neutral', tooltip: 'Massive diversification across sectors. Conglomerate discount applies — sum-of-parts likely exceeds market cap. Complexity makes valuation challenging.' },
    ],
  },
  {
    name: 'RAK Properties',
    ticker: 'RAKPROP',
    sector: 'Real Estate',
    exchange: 'ADX',
    currency: 'AED',
    fiatUrl: 'https://www.adx.ae/main-market/company-profile/overview?symbols=RAKPROP',
    currentPrice: 1.33,
    preMarch1Price: 1.80,
    drawdownPct: -26.1,
    covidDrawdownPct: -58.3,
    sparklineData: [
      1.50, 1.55, 1.58, 1.62, 1.66, 1.70, 1.74, 1.76, 1.78, 1.80,
      1.80, 1.78, 1.76, 1.80, 1.78, 1.74, 1.78, 1.80,
      1.68, 1.58, 1.50, 1.44, 1.40, 1.38, 1.36, 1.35, 1.34,
      1.34, 1.33, 1.33, 1.33, 1.33, 1.33, 1.33
    ],
    pe: 3.8,
    marketCapB: 3.0,
    revenueGrowthPct: 31.5,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'RAK exposure play', value: '', rating: 'neutral', tooltip: 'Pure play on Ras Al Khaimah\'s growth. RAK is UAE\'s fastest-growing emirate — Wynn casino resort catalyst. Small-cap means higher volatility.' },
      { label: 'Net debt/equity', value: '0.12', rating: 'good', tooltip: 'Very low leverage. Lowest among UAE real estate stocks (DAMAC: 0.18, Emaar: 0.32, Aldar: 0.41). Conservative balance sheet for a small developer.' },
      { label: 'Land bank', value: '8M sqft', rating: 'neutral', tooltip: 'Significant land reserves relative to market cap. At current land values, the land bank alone could be worth more than the company\'s AED 3B market cap.' },
    ],
  },
  {
    name: 'Multiply Group',
    ticker: 'MULTIPLY',
    sector: 'Investment',
    exchange: 'ADX',
    currency: 'AED',
    fiatUrl: 'https://www.adx.ae/main-market/company-profile/overview?symbols=MULTIPLY',
    currentPrice: 2.83,
    preMarch1Price: 3.50,
    drawdownPct: -19.1,
    covidDrawdownPct: -22.0,
    sparklineData: [
      3.10, 3.15, 3.20, 3.25, 3.30, 3.35, 3.38, 3.42, 3.45, 3.48,
      3.50, 3.48, 3.45, 3.50, 3.48, 3.44, 3.48, 3.50,
      3.30, 3.15, 3.02, 2.95, 2.90, 2.88, 2.86, 2.85, 2.84,
      2.84, 2.83, 2.83, 2.83, 2.83, 2.83, 2.83
    ],
    pe: 8.9,
    marketCapB: 15.0,
    revenueGrowthPct: 45.0,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'IHC subsidiary', value: '', rating: 'neutral', tooltip: 'Backed by IHC (AED 730B market cap). Parent\'s AED 28B cash reserves provide implicit support. Trades at discount to IHC\'s own valuation multiple.' },
      { label: 'Diversified portfolio', value: '', rating: 'neutral', tooltip: 'Holdings span media, energy, tech, and real estate. Diversification reduces single-sector risk but creates conglomerate discount. NAV likely above market price.' },
      { label: 'High growth trajectory', value: '', rating: 'neutral', tooltip: '45% YoY revenue growth — fastest in this universe. Acquisition-driven expansion mirrors parent IHC strategy. Sustainability of growth rate is key risk.' },
    ],
  },
]

export function getAverageDrawdown(): number {
  const sum = assets.reduce((acc, a) => acc + a.drawdownPct, 0)
  return Math.round((sum / assets.length) * 10) / 10
}

export function getTotalMarketCapB(): number {
  const sum = assets.reduce((acc, a) => acc + (a.currency === 'USD' ? a.marketCapB / AED_TO_USD : a.marketCapB), 0)
  return Math.round(sum * 10) / 10
}
