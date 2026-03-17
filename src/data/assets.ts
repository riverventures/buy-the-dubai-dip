export interface BalanceSheetKPI {
  label: string
  value: string
  rating: 'good' | 'neutral' | 'poor'
}

export interface Asset {
  name: string
  ticker: string
  sector: string
  exchange: 'ADX' | 'DFM'
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

// Realistic sparkline data: ~35 data points from Jan 1 2026 to Mar 17 2026
// Each asset has unique price action. Pre-March shows normal trading, post-March shows crisis decline.
// Final point matches currentPrice.
export const assets: Asset[] = [
  {
    name: 'Emaar Properties',
    ticker: 'EMAAR',
    sector: 'Real Estate',
    exchange: 'DFM',
    currentPrice: 6.82,
    preMarch1Price: 10.45,
    drawdownPct: -34.7,
    covidDrawdownPct: -62.1,
    // Emaar: steady climb Jan-Feb, then sharp stair-step decline post-crisis with a brief dead-cat bounce
    sparklineData: [
      10.10, 10.25, 10.40, 10.55, 10.48, 10.60, 10.72, 10.65, 10.45, 10.50,
      10.38, 10.52, 10.60, 10.55, 10.48, 10.42, 10.50, 10.45, // Jan-Feb normal
      9.80, 9.20, 8.55, 8.10, 8.40, 8.60, 8.20, 7.70, 7.40, 7.55, // Mar 1-10: crash + dead cat bounce
      7.30, 7.10, 7.00, 6.95, 6.88, 6.85, 6.82 // Mar 11-17: grinding lower
    ],
    pe: 5.8,
    marketCapB: 60.2,
    revenueGrowthPct: 18.4,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Net debt/equity', value: '0.32', rating: 'neutral' },
      { label: 'Cash', value: 'AED 12.1B', rating: 'good' },
      { label: 'ROE', value: '16.2%', rating: 'good' },
    ],
  },
  {
    name: 'DAMAC Properties',
    ticker: 'DAMAC',
    sector: 'Real Estate',
    exchange: 'DFM',
    currentPrice: 4.15,
    preMarch1Price: 6.90,
    drawdownPct: -39.9,
    covidDrawdownPct: -71.3,
    // DAMAC: volatile pre-crisis with big swings, then a panic waterfall with no bounce
    sparklineData: [
      6.50, 6.80, 7.10, 6.75, 7.00, 7.20, 6.85, 7.05, 6.90, 7.15,
      6.70, 6.95, 7.10, 7.25, 6.80, 6.95, 7.00, 6.90, // Jan-Feb: volatile range
      6.30, 5.80, 5.20, 4.80, 4.55, 4.65, 4.50, 4.40, 4.35, // Mar 1-9: steep selloff
      4.30, 4.28, 4.25, 4.22, 4.20, 4.18, 4.15 // Mar 10-17: slow bleed
    ],
    pe: 4.2,
    marketCapB: 25.1,
    revenueGrowthPct: 42.1,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Net debt/equity', value: '0.18', rating: 'good' },
      { label: 'Cash', value: 'AED 5.8B', rating: 'good' },
      { label: 'ROE', value: '22.4%', rating: 'good' },
    ],
  },
  {
    name: 'Aldar Properties',
    ticker: 'ALDAR',
    sector: 'Real Estate',
    exchange: 'ADX',
    currentPrice: 5.24,
    preMarch1Price: 7.80,
    drawdownPct: -32.8,
    covidDrawdownPct: -45.6,
    // Aldar: gradual uptrend, orderly decline post-crisis — institutional selling pattern
    sparklineData: [
      7.40, 7.50, 7.55, 7.60, 7.65, 7.58, 7.70, 7.75, 7.68, 7.72,
      7.78, 7.80, 7.82, 7.75, 7.80, 7.78, 7.76, 7.80, // Jan-Feb: steady
      7.30, 7.00, 6.70, 6.45, 6.20, 6.00, 5.85, 5.70, 5.60, // Mar 1-9: orderly decline
      5.52, 5.45, 5.40, 5.36, 5.32, 5.28, 5.24 // Mar 10-17: drifting lower
    ],
    pe: 9.1,
    marketCapB: 41.3,
    revenueGrowthPct: 24.7,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Net debt/equity', value: '0.41', rating: 'neutral' },
      { label: 'Cash', value: 'AED 8.2B', rating: 'good' },
      { label: 'ROE', value: '12.8%', rating: 'neutral' },
    ],
  },
  {
    name: 'First Abu Dhabi Bank',
    ticker: 'FAB',
    sector: 'Banking',
    exchange: 'ADX',
    currentPrice: 10.86,
    preMarch1Price: 15.20,
    drawdownPct: -28.6,
    covidDrawdownPct: -38.4,
    // FAB: strong pre-crisis with new highs, then gap down and partial recovery attempt before fading
    sparklineData: [
      14.50, 14.70, 14.90, 15.00, 14.85, 15.10, 15.25, 15.30, 15.15, 15.20,
      15.35, 15.40, 15.20, 15.30, 15.25, 15.18, 15.22, 15.20, // Jan-Feb: strong
      14.00, 13.20, 12.50, 12.00, 11.80, 12.10, 12.30, 11.90, 11.60, // Mar 1-9: gap down + bounce attempt
      11.40, 11.25, 11.15, 11.05, 10.98, 10.90, 10.86 // Mar 10-17: fading
    ],
    pe: 8.4,
    marketCapB: 120.5,
    revenueGrowthPct: 12.3,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Tier 1 ratio', value: '14.2%', rating: 'good' },
      { label: 'NPL ratio', value: '2.8%', rating: 'good' },
      { label: 'ROA', value: '1.8%', rating: 'good' },
    ],
  },
  {
    name: 'Emirates NBD',
    ticker: 'ENBD',
    sector: 'Banking',
    exchange: 'DFM',
    currentPrice: 14.50,
    preMarch1Price: 21.00,
    drawdownPct: -31.0,
    covidDrawdownPct: -42.1,
    // ENBD: rally into Feb earnings, sharp sell-off post-crisis with high volume days
    sparklineData: [
      20.00, 20.30, 20.50, 20.80, 21.10, 20.90, 21.20, 21.40, 21.00, 20.80,
      21.00, 21.15, 21.30, 21.10, 20.95, 21.00, 20.85, 21.00, // Jan-Feb: earnings rally
      19.50, 18.20, 17.00, 16.10, 15.50, 15.80, 15.40, 15.10, 14.90, // Mar 1-9: heavy selling
      14.80, 14.72, 14.68, 14.62, 14.58, 14.52, 14.50 // Mar 10-17: stabilizing
    ],
    pe: 6.2,
    marketCapB: 87.3,
    revenueGrowthPct: 15.8,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Tier 1 ratio', value: '16.1%', rating: 'good' },
      { label: 'NPL ratio', value: '3.1%', rating: 'neutral' },
      { label: 'ROA', value: '2.1%', rating: 'good' },
    ],
  },
  {
    name: 'ADCB',
    ticker: 'ADCB',
    sector: 'Banking',
    exchange: 'ADX',
    currentPrice: 6.75,
    preMarch1Price: 9.50,
    drawdownPct: -28.9,
    covidDrawdownPct: -44.8,
    // ADCB: range-bound pre-crisis, then steady decline with brief stabilization mid-March
    sparklineData: [
      9.30, 9.40, 9.35, 9.45, 9.50, 9.42, 9.48, 9.55, 9.50, 9.45,
      9.52, 9.48, 9.50, 9.44, 9.50, 9.46, 9.50, 9.50, // Jan-Feb: tight range
      9.00, 8.50, 8.10, 7.80, 7.60, 7.50, 7.40, 7.30, 7.20, // Mar 1-9: steady decline
      7.10, 7.05, 6.98, 6.90, 6.85, 6.80, 6.75 // Mar 10-17: grinding
    ],
    pe: 7.1,
    marketCapB: 47.2,
    revenueGrowthPct: 9.6,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Tier 1 ratio', value: '13.8%', rating: 'neutral' },
      { label: 'NPL ratio', value: '3.4%', rating: 'neutral' },
      { label: 'ROA', value: '1.6%', rating: 'good' },
    ],
  },
  {
    name: 'Salik',
    ticker: 'SALIK',
    sector: 'Infrastructure',
    exchange: 'DFM',
    currentPrice: 3.18,
    preMarch1Price: 4.60,
    drawdownPct: -30.9,
    covidDrawdownPct: -25.0,
    // Salik: very stable pre-crisis (dividend stock), then surprising sharp sell-off, quick partial recovery
    sparklineData: [
      4.55, 4.58, 4.52, 4.56, 4.60, 4.58, 4.62, 4.60, 4.57, 4.60,
      4.58, 4.55, 4.60, 4.62, 4.58, 4.60, 4.59, 4.60, // Jan-Feb: very stable
      4.20, 3.80, 3.50, 3.25, 3.10, 3.30, 3.40, 3.35, 3.28, // Mar 1-9: sharp then partial bounce
      3.25, 3.22, 3.20, 3.20, 3.19, 3.18, 3.18 // Mar 10-17: found floor
    ],
    pe: 18.5,
    marketCapB: 23.9,
    revenueGrowthPct: 8.2,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Monopoly toll operator', value: '', rating: 'neutral' },
      { label: 'Div yield', value: '5.8%', rating: 'good' },
      { label: 'Zero competition risk', value: '', rating: 'neutral' },
    ],
  },
  {
    name: 'DP World',
    ticker: 'DPW',
    sector: 'Logistics',
    exchange: 'DFM',
    currentPrice: 18.40,
    preMarch1Price: 26.50,
    drawdownPct: -30.6,
    covidDrawdownPct: -35.2,
    // DP World: uptrend, then crisis hit supply chains hard — big gap down, volatile recovery attempts
    sparklineData: [
      25.50, 25.80, 26.00, 26.20, 26.40, 26.10, 26.30, 26.50, 26.60, 26.40,
      26.50, 26.70, 26.50, 26.30, 26.50, 26.45, 26.40, 26.50, // Jan-Feb: climbing
      24.50, 22.80, 21.00, 19.80, 19.20, 20.00, 20.50, 19.80, 19.30, // Mar 1-9: supply chain panic
      19.10, 18.90, 18.80, 18.70, 18.60, 18.50, 18.40 // Mar 10-17: heavy but orderly
    ],
    pe: 11.3,
    marketCapB: 121.8,
    revenueGrowthPct: 11.5,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Global port operator', value: '', rating: 'neutral' },
      { label: 'Revenue', value: '$18.9B', rating: 'neutral' },
      { label: 'EBITDA margin', value: '32%', rating: 'good' },
    ],
  },
  {
    name: 'ADNOC Distribution',
    ticker: 'ADNOCDIST',
    sector: 'Energy',
    exchange: 'ADX',
    currentPrice: 3.02,
    preMarch1Price: 4.10,
    drawdownPct: -26.3,
    covidDrawdownPct: -31.5,
    // ADNOC Dist: slow grind up, moderate decline — defensive name held better
    sparklineData: [
      3.95, 3.98, 4.00, 4.02, 4.05, 4.00, 4.08, 4.10, 4.05, 4.08,
      4.10, 4.12, 4.08, 4.10, 4.12, 4.10, 4.08, 4.10, // Jan-Feb: steady
      3.90, 3.72, 3.55, 3.42, 3.35, 3.38, 3.32, 3.25, 3.20, // Mar 1-9: moderate decline
      3.16, 3.12, 3.10, 3.08, 3.06, 3.04, 3.02 // Mar 10-17: gentle drift
    ],
    pe: 15.2,
    marketCapB: 37.8,
    revenueGrowthPct: 6.4,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: '450+ stations UAE', value: '', rating: 'neutral' },
      { label: 'Div yield', value: '6.1%', rating: 'good' },
      { label: 'Expanding KSA', value: '', rating: 'neutral' },
    ],
  },
  {
    name: 'IHC',
    ticker: 'IHC',
    sector: 'Conglomerate',
    exchange: 'ADX',
    currentPrice: 185.00,
    preMarch1Price: 290.00,
    drawdownPct: -36.2,
    covidDrawdownPct: -18.0,
    // IHC: big momentum stock, parabolic Jan, then violent crash with huge volatility spikes
    sparklineData: [
      270, 278, 285, 295, 305, 298, 310, 302, 295, 290,
      288, 292, 295, 290, 285, 292, 288, 290, // Jan-Feb: wide swings near highs
      265, 240, 220, 210, 225, 215, 205, 200, 195, // Mar 1-9: violent selloff with volatility
      192, 190, 188, 187, 186, 185, 185 // Mar 10-17: big stock finds a level
    ],
    pe: 22.4,
    marketCapB: 502.6,
    revenueGrowthPct: 38.2,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Royal-backed conglomerate', value: '', rating: 'neutral' },
      { label: 'Cash', value: 'AED 28B', rating: 'good' },
      { label: '1000+ subsidiaries', value: '', rating: 'neutral' },
    ],
  },
  {
    name: 'Dubai Islamic Bank',
    ticker: 'DIB',
    sector: 'Banking',
    exchange: 'DFM',
    currentPrice: 5.10,
    preMarch1Price: 7.20,
    drawdownPct: -29.2,
    covidDrawdownPct: -48.6,
    // DIB: gradual climb, then sector-wide banking sell-off — held better than peers initially
    sparklineData: [
      6.90, 6.95, 7.00, 7.05, 7.10, 7.05, 7.12, 7.18, 7.20, 7.15,
      7.18, 7.20, 7.22, 7.18, 7.20, 7.15, 7.18, 7.20, // Jan-Feb: steady climb
      6.80, 6.50, 6.10, 5.80, 5.60, 5.70, 5.55, 5.45, 5.38, // Mar 1-9: banking sell-off
      5.32, 5.28, 5.22, 5.18, 5.15, 5.12, 5.10 // Mar 10-17: slow grind
    ],
    pe: 6.8,
    marketCapB: 37.1,
    revenueGrowthPct: 14.1,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Largest Islamic bank UAE', value: '', rating: 'neutral' },
      { label: 'Tier 1 ratio', value: '13.5%', rating: 'neutral' },
      { label: 'ROE', value: '18.2%', rating: 'good' },
    ],
  },
  {
    name: 'Air Arabia',
    ticker: 'AIRARABIA',
    sector: 'Aviation',
    exchange: 'DFM',
    currentPrice: 2.14,
    preMarch1Price: 3.50,
    drawdownPct: -38.9,
    covidDrawdownPct: -55.2,
    // Air Arabia: hit hardest — aviation fears, near-vertical drop then dead-cat bounce that failed
    sparklineData: [
      3.35, 3.40, 3.45, 3.50, 3.48, 3.52, 3.55, 3.50, 3.48, 3.50,
      3.52, 3.48, 3.50, 3.55, 3.50, 3.48, 3.50, 3.50, // Jan-Feb: stable
      3.10, 2.75, 2.45, 2.20, 2.10, 2.30, 2.45, 2.35, 2.25, // Mar 1-9: aviation panic + dead cat
      2.22, 2.20, 2.18, 2.17, 2.16, 2.15, 2.14 // Mar 10-17: slow bleed
    ],
    pe: 7.5,
    marketCapB: 10.2,
    revenueGrowthPct: 22.8,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'MENA low-cost leader', value: '', rating: 'neutral' },
      { label: 'Fleet', value: '70+ aircraft', rating: 'neutral' },
      { label: 'Net cash position', value: '', rating: 'good' },
    ],
  },
  {
    name: 'RAK Properties',
    ticker: 'RAKPROP',
    sector: 'Real Estate',
    exchange: 'ADX',
    currentPrice: 0.68,
    preMarch1Price: 1.15,
    drawdownPct: -40.9,
    covidDrawdownPct: -58.3,
    // RAK Prop: speculative name, ran up in Jan, then crashed hard — capitulation pattern
    sparklineData: [
      1.00, 1.05, 1.10, 1.18, 1.22, 1.15, 1.12, 1.15, 1.18, 1.15,
      1.12, 1.15, 1.18, 1.15, 1.12, 1.14, 1.15, 1.15, // Jan-Feb: speculative run
      1.02, 0.92, 0.82, 0.75, 0.70, 0.72, 0.70, 0.68, 0.70, // Mar 1-9: capitulation
      0.70, 0.69, 0.69, 0.68, 0.68, 0.68, 0.68 // Mar 10-17: flat at lows
    ],
    pe: 3.8,
    marketCapB: 1.4,
    revenueGrowthPct: 31.5,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'RAK exposure play', value: '', rating: 'neutral' },
      { label: 'Net debt/equity', value: '0.12', rating: 'good' },
      { label: 'Land bank', value: '8M sqft', rating: 'neutral' },
    ],
  },
  {
    name: 'Multiply Group',
    ticker: 'MULTIPLY',
    sector: 'Investment',
    exchange: 'ADX',
    currentPrice: 1.92,
    preMarch1Price: 3.10,
    drawdownPct: -38.1,
    covidDrawdownPct: -22.0,
    // Multiply: high-beta IHC sub, erratic pre-crisis, then cascading sell-off
    sparklineData: [
      2.90, 3.00, 3.10, 3.20, 3.05, 3.15, 3.25, 3.10, 3.00, 3.10,
      3.15, 3.05, 3.10, 3.15, 3.08, 3.12, 3.10, 3.10, // Jan-Feb: erratic
      2.80, 2.55, 2.35, 2.20, 2.10, 2.15, 2.10, 2.05, 2.00, // Mar 1-9: cascading
      1.98, 1.96, 1.95, 1.94, 1.93, 1.92, 1.92 // Mar 10-17: finding floor
    ],
    pe: 8.9,
    marketCapB: 23.0,
    revenueGrowthPct: 45.0,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'IHC subsidiary', value: '', rating: 'neutral' },
      { label: 'Diversified portfolio', value: '', rating: 'neutral' },
      { label: 'High growth trajectory', value: '', rating: 'neutral' },
    ],
  },
  {
    name: 'Emaar Development',
    ticker: 'EMAARDEV',
    sector: 'Real Estate',
    exchange: 'DFM',
    currentPrice: 5.40,
    preMarch1Price: 8.75,
    drawdownPct: -38.3,
    covidDrawdownPct: -67.4,
    // Emaar Dev: strong pre-crisis on sales momentum, then tanked harder than parent — double bottom attempt
    sparklineData: [
      8.20, 8.35, 8.50, 8.60, 8.70, 8.55, 8.65, 8.75, 8.80, 8.70,
      8.75, 8.80, 8.75, 8.70, 8.75, 8.72, 8.75, 8.75, // Jan-Feb: bullish
      8.00, 7.30, 6.60, 6.10, 5.70, 5.50, 5.70, 5.80, 5.65, // Mar 1-9: hard crash + double bottom attempt
      5.58, 5.52, 5.48, 5.45, 5.42, 5.40, 5.40 // Mar 10-17: failing to recover
    ],
    pe: 4.5,
    marketCapB: 21.6,
    revenueGrowthPct: 28.9,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Emaar subsidiary', value: '', rating: 'neutral' },
      { label: 'Record backlog', value: 'AED 72B', rating: 'good' },
      { label: 'ROE', value: '28.1%', rating: 'good' },
    ],
  },
]

export function getAverageDrawdown(): number {
  const sum = assets.reduce((acc, a) => acc + a.drawdownPct, 0)
  return Math.round((sum / assets.length) * 10) / 10
}

export function getTotalMarketCapB(): number {
  const sum = assets.reduce((acc, a) => acc + a.marketCapB, 0)
  return Math.round(sum * 10) / 10
}
