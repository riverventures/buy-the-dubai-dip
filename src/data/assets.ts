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

// Realistic sparkline data: ~35 data points from Jan 1 2026 to Mar 17 2026
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
      19.12, 19.05, 19.20, 19.15, 19.08, 19.25, 19.30, 19.18, 19.10, 19.22,
      19.15, 19.05, 19.10, 19.18, 19.12, 19.08, 19.15, 19.10,
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
    currentPrice: 11.20,
    preMarch1Price: 13.40,
    drawdownPct: -16.4,
    covidDrawdownPct: -62.1,
    sparklineData: [
      12.80, 12.95, 13.10, 13.25, 13.30, 13.35, 13.40, 13.38, 13.42, 13.40,
      13.35, 13.38, 13.40, 13.42, 13.38, 13.35, 13.40, 13.40,
      12.80, 12.30, 11.85, 11.50, 11.70, 11.80, 11.55, 11.35, 11.40, 11.45,
      11.30, 11.25, 11.22, 11.20, 11.22, 11.20, 11.20
    ],
    pe: 5.8,
    marketCapB: 80.0,
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
      1.95, 2.00, 2.05, 2.08, 2.10, 2.12, 2.10, 2.08, 2.10, 2.12,
      2.10, 2.08, 2.10, 2.12, 2.08, 2.10, 2.10, 2.10,
      1.90, 1.75, 1.62, 1.52, 1.48, 1.50, 1.46, 1.44, 1.42,
      1.42, 1.41, 1.40, 1.41, 1.40, 1.40, 1.40
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
    ticker: 'ENBD',
    sector: 'Banking',
    exchange: 'DFM',
    currency: 'AED',
    fiatUrl: 'https://www.dfm.ae/the-exchange/market-information/company/ENBD/trading/trading-summary',
    currentPrice: 26.95,
    preMarch1Price: 19.60,
    drawdownPct: 37.5,
    covidDrawdownPct: -42.1,
    sparklineData: [
      19.20, 19.30, 19.40, 19.50, 19.55, 19.60, 19.58, 19.55, 19.60, 19.62,
      19.58, 19.55, 19.60, 19.62, 19.58, 19.55, 19.60, 19.60,
      20.50, 21.80, 23.00, 24.10, 24.50, 24.80, 25.20, 25.60, 25.80,
      26.00, 26.20, 26.40, 26.60, 26.75, 26.85, 26.95
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
      19.50, 19.80, 20.00, 20.20, 20.40, 20.55, 20.65, 20.70, 20.68, 20.70,
      20.65, 20.60, 20.70, 20.65, 20.60, 20.65, 20.70, 20.70,
      19.00, 17.50, 16.10, 15.20, 14.80, 14.50, 14.20, 13.90, 13.70,
      13.60, 13.50, 13.45, 13.40, 13.35, 13.32, 13.30
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
      8.30, 8.40, 8.50, 8.55, 8.60, 8.65, 8.68, 8.66, 8.68, 8.70,
      8.68, 8.65, 8.68, 8.70, 8.65, 8.62, 8.68, 8.68,
      8.30, 8.00, 7.80, 7.65, 7.55, 7.60, 7.52, 7.48, 7.45,
      7.44, 7.43, 7.42, 7.43, 7.42, 7.42, 7.42
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
      3.95, 3.98, 4.00, 4.02, 4.05, 4.08, 4.10, 4.08, 4.10, 4.12,
      4.10, 4.08, 4.10, 4.12, 4.08, 4.06, 4.10, 4.10,
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
    currentPrice: 18.20,
    preMarch1Price: 13.52,
    drawdownPct: 34.6,
    covidDrawdownPct: -38.4,
    sparklineData: [
      13.20, 13.30, 13.35, 13.40, 13.45, 13.50, 13.52, 13.50, 13.52, 13.55,
      13.52, 13.50, 13.52, 13.55, 13.50, 13.48, 13.52, 13.52,
      14.20, 15.00, 15.80, 16.40, 16.80, 17.10, 17.30, 17.50, 17.70,
      17.80, 17.90, 18.00, 18.05, 18.10, 18.15, 18.20
    ],
    pe: 8.4,
    marketCapB: 200.0,
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
      12.00, 12.10, 12.15, 12.20, 12.25, 12.30, 12.32, 12.30, 12.32, 12.35,
      12.32, 12.30, 12.32, 12.35, 12.30, 12.28, 12.32, 12.32,
      12.20, 12.10, 12.00, 11.90, 11.85, 11.88, 11.82, 11.80, 11.82,
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
      5.20, 5.28, 5.35, 5.40, 5.45, 5.48, 5.50, 5.48, 5.50, 5.52,
      5.50, 5.48, 5.50, 5.52, 5.48, 5.45, 5.50, 5.50,
      5.20, 4.95, 4.72, 4.55, 4.48, 4.52, 4.45, 4.40, 4.38,
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
      5.70, 5.75, 5.78, 5.82, 5.85, 5.88, 5.90, 5.88, 5.90, 5.92,
      5.90, 5.88, 5.90, 5.92, 5.88, 5.86, 5.90, 5.90,
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
      8.20, 8.25, 8.30, 8.35, 8.40, 8.45, 8.50, 8.48, 8.50, 8.52,
      8.50, 8.48, 8.50, 8.52, 8.48, 8.45, 8.50, 8.50,
      8.20, 7.95, 7.75, 7.60, 7.55, 7.58, 7.50, 7.48, 7.45,
      7.44, 7.42, 7.41, 7.40, 7.40, 7.40, 7.40
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
      17.80, 17.90, 18.00, 18.10, 18.20, 18.35, 18.50, 18.45, 18.50, 18.55,
      18.50, 18.45, 18.50, 18.55, 18.45, 18.40, 18.50, 18.50,
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
      430, 435, 440, 445, 448, 450, 449, 450, 452, 450,
      448, 449, 450, 452, 448, 446, 450, 450,
      432, 420, 410, 402, 398, 400, 396, 394, 393,
      392, 392, 391, 391, 391, 391, 391
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
      1.65, 1.68, 1.72, 1.75, 1.78, 1.80, 1.79, 1.80, 1.82, 1.80,
      1.78, 1.79, 1.80, 1.82, 1.78, 1.76, 1.80, 1.80,
      1.68, 1.58, 1.50, 1.44, 1.40, 1.42, 1.38, 1.36, 1.35,
      1.34, 1.34, 1.33, 1.33, 1.33, 1.33, 1.33
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
      3.30, 3.35, 3.38, 3.42, 3.45, 3.48, 3.50, 3.48, 3.50, 3.52,
      3.50, 3.48, 3.50, 3.52, 3.48, 3.46, 3.50, 3.50,
      3.30, 3.15, 3.02, 2.95, 2.90, 2.92, 2.88, 2.86, 2.85,
      2.84, 2.84, 2.83, 2.83, 2.83, 2.83, 2.83
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
