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
  exchange: 'ADX' | 'DFM'
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

// Realistic sparkline data: ~35 data points from Jan 1 2026 to Mar 17 2026
// Each asset has unique price action. Pre-March shows normal trading, post-March shows crisis decline.
// Final point matches currentPrice.
export const assets: Asset[] = [
  {
    name: 'Emaar Properties',
    ticker: 'EMAAR',
    sector: 'Real Estate',
    exchange: 'DFM',
    fiatUrl: 'https://www.dfm.ae/the-exchange/market-information/company/EMAAR/trading/trading-summary',
    currentPrice: 6.82,
    preMarch1Price: 10.45,
    drawdownPct: -34.7,
    covidDrawdownPct: -62.1,
    sparklineData: [
      10.10, 10.25, 10.40, 10.55, 10.48, 10.60, 10.72, 10.65, 10.45, 10.50,
      10.38, 10.52, 10.60, 10.55, 10.48, 10.42, 10.50, 10.45,
      9.80, 9.20, 8.55, 8.10, 8.40, 8.60, 8.20, 7.70, 7.40, 7.55,
      7.30, 7.10, 7.00, 6.95, 6.88, 6.85, 6.82
    ],
    pe: 5.8,
    marketCapB: 60.2,
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
    fiatUrl: 'https://www.dfm.ae/the-exchange/market-information/company/DAMAC/trading/trading-summary',
    currentPrice: 4.15,
    preMarch1Price: 6.90,
    drawdownPct: -39.9,
    covidDrawdownPct: -71.3,
    sparklineData: [
      6.50, 6.80, 7.10, 6.75, 7.00, 7.20, 6.85, 7.05, 6.90, 7.15,
      6.70, 6.95, 7.10, 7.25, 6.80, 6.95, 7.00, 6.90,
      6.30, 5.80, 5.20, 4.80, 4.55, 4.65, 4.50, 4.40, 4.35,
      4.30, 4.28, 4.25, 4.22, 4.20, 4.18, 4.15
    ],
    pe: 4.2,
    marketCapB: 25.1,
    revenueGrowthPct: 42.1,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Net debt/equity', value: '0.18', rating: 'good', tooltip: 'Very low leverage. Best debt ratio among UAE developers (Emaar: 0.32, Aldar: 0.41). Near net-cash position provides crisis resilience.' },
      { label: 'Cash', value: 'AED 5.8B', rating: 'good', tooltip: 'Healthy cash buffer. Strong relative to AED 25.1B market cap. Covers all near-term maturities with room for opportunistic acquisitions.' },
      { label: 'ROE', value: '22.4%', rating: 'good', tooltip: 'Sector-leading returns. Highest ROE among UAE developers (Emaar: 16.2%, Aldar: 12.8%, Emaar Dev: 28.1%). Reflects capital-light project model.' },
    ],
  },
  {
    name: 'Aldar Properties',
    ticker: 'ALDAR',
    sector: 'Real Estate',
    exchange: 'ADX',
    fiatUrl: 'https://www.adx.ae/main-market/company-profile/overview?symbols=ALDAR',
    currentPrice: 5.24,
    preMarch1Price: 7.80,
    drawdownPct: -32.8,
    covidDrawdownPct: -45.6,
    sparklineData: [
      7.40, 7.50, 7.55, 7.60, 7.65, 7.58, 7.70, 7.75, 7.68, 7.72,
      7.78, 7.80, 7.82, 7.75, 7.80, 7.78, 7.76, 7.80,
      7.30, 7.00, 6.70, 6.45, 6.20, 6.00, 5.85, 5.70, 5.60,
      5.52, 5.45, 5.40, 5.36, 5.32, 5.28, 5.24
    ],
    pe: 9.1,
    marketCapB: 41.3,
    revenueGrowthPct: 24.7,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Net debt/equity', value: '0.41', rating: 'neutral', tooltip: 'Higher leverage than peers but manageable. Above Emaar (0.32) and DAMAC (0.18). Reflects aggressive acquisition strategy including Ras Al Khaimah expansion.' },
      { label: 'Cash', value: 'AED 8.2B', rating: 'good', tooltip: 'Strong liquidity. Second-largest cash position among UAE developers after Emaar (AED 12.1B). Backed by Abu Dhabi government ownership.' },
      { label: 'ROE', value: '12.8%', rating: 'neutral', tooltip: 'Decent but trails peers. Below Emaar (16.2%) and DAMAC (22.4%). Diluted by recurring income portfolio which trades growth for stability.' },
    ],
  },
  {
    name: 'First Abu Dhabi Bank',
    ticker: 'FAB',
    sector: 'Banking',
    exchange: 'ADX',
    fiatUrl: 'https://www.adx.ae/main-market/company-profile/overview?symbols=FAB',
    currentPrice: 10.86,
    preMarch1Price: 15.20,
    drawdownPct: -28.6,
    covidDrawdownPct: -38.4,
    sparklineData: [
      14.50, 14.70, 14.90, 15.00, 14.85, 15.10, 15.25, 15.30, 15.15, 15.20,
      15.35, 15.40, 15.20, 15.30, 15.25, 15.18, 15.22, 15.20,
      14.00, 13.20, 12.50, 12.00, 11.80, 12.10, 12.30, 11.90, 11.60,
      11.40, 11.25, 11.15, 11.05, 10.98, 10.90, 10.86
    ],
    pe: 8.4,
    marketCapB: 120.5,
    revenueGrowthPct: 12.3,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Tier 1 ratio', value: '14.2%', rating: 'good', tooltip: 'Well-capitalized. Above 14% is strong for UAE banks (ENBD: 16.1%, ADCB: 13.8%, DIB: 13.5%). Exceeds CBUAE minimum of 10.5%.' },
      { label: 'NPL ratio', value: '2.8%', rating: 'good', tooltip: 'Best asset quality among UAE banks. Below 3% is strong (ENBD: 3.1%, ADCB: 3.4%). Reflects conservative underwriting and blue-chip corporate book.' },
      { label: 'ROA', value: '1.8%', rating: 'good', tooltip: 'Strong profitability. Among the best ROA in UAE banking (ENBD: 2.1%, ADCB: 1.6%). Consistent performer across cycles.' },
    ],
  },
  {
    name: 'Emirates NBD',
    ticker: 'ENBD',
    sector: 'Banking',
    exchange: 'DFM',
    fiatUrl: 'https://www.dfm.ae/the-exchange/market-information/company/ENBD/trading/trading-summary',
    currentPrice: 14.50,
    preMarch1Price: 21.00,
    drawdownPct: -31.0,
    covidDrawdownPct: -42.1,
    sparklineData: [
      20.00, 20.30, 20.50, 20.80, 21.10, 20.90, 21.20, 21.40, 21.00, 20.80,
      21.00, 21.15, 21.30, 21.10, 20.95, 21.00, 20.85, 21.00,
      19.50, 18.20, 17.00, 16.10, 15.50, 15.80, 15.40, 15.10, 14.90,
      14.80, 14.72, 14.68, 14.62, 14.58, 14.52, 14.50
    ],
    pe: 6.2,
    marketCapB: 87.3,
    revenueGrowthPct: 15.8,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Tier 1 ratio', value: '16.1%', rating: 'good', tooltip: 'Best-capitalized UAE bank. Well above peers (FAB: 14.2%, ADCB: 13.8%, DIB: 13.5%). Massive buffer above 10.5% CBUAE minimum.' },
      { label: 'NPL ratio', value: '3.1%', rating: 'neutral', tooltip: 'Moderate non-performing loans. 3-4% is average for UAE banks (FAB: 2.8%, ADCB: 3.4%). Manageable but watch for crisis impact on retail book.' },
      { label: 'ROA', value: '2.1%', rating: 'good', tooltip: 'Top ROA in UAE banking. Beats FAB (1.8%) and ADCB (1.6%). Driven by scale advantages as largest bank by assets in the UAE.' },
    ],
  },
  {
    name: 'ADCB',
    ticker: 'ADCB',
    sector: 'Banking',
    exchange: 'ADX',
    fiatUrl: 'https://www.adx.ae/main-market/company-profile/overview?symbols=ADCB',
    currentPrice: 6.75,
    preMarch1Price: 9.50,
    drawdownPct: -28.9,
    covidDrawdownPct: -44.8,
    sparklineData: [
      9.30, 9.40, 9.35, 9.45, 9.50, 9.42, 9.48, 9.55, 9.50, 9.45,
      9.52, 9.48, 9.50, 9.44, 9.50, 9.46, 9.50, 9.50,
      9.00, 8.50, 8.10, 7.80, 7.60, 7.50, 7.40, 7.30, 7.20,
      7.10, 7.05, 6.98, 6.90, 6.85, 6.80, 6.75
    ],
    pe: 7.1,
    marketCapB: 47.2,
    revenueGrowthPct: 9.6,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Tier 1 ratio', value: '13.8%', rating: 'neutral', tooltip: 'Adequate capital. Slightly below peers (FAB: 14.2%, ENBD: 16.1%) but comfortably above 10.5% CBUAE minimum. Post-merger integration still optimizing.' },
      { label: 'NPL ratio', value: '3.4%', rating: 'neutral', tooltip: 'Slightly elevated NPLs. Highest among top-3 UAE banks (FAB: 2.8%, ENBD: 3.1%). Legacy Union National Bank portfolio still being cleaned up.' },
      { label: 'ROA', value: '1.6%', rating: 'good', tooltip: 'Solid profitability. Slightly below FAB (1.8%) and ENBD (2.1%) but improving trend post-merger. Above 1.5% is good for a diversified UAE bank.' },
    ],
  },
  {
    name: 'Salik',
    ticker: 'SALIK',
    sector: 'Infrastructure',
    exchange: 'DFM',
    fiatUrl: 'https://www.dfm.ae/the-exchange/market-information/company/SALIK/trading/trading-summary',
    currentPrice: 3.18,
    preMarch1Price: 4.60,
    drawdownPct: -30.9,
    covidDrawdownPct: -25.0,
    sparklineData: [
      4.55, 4.58, 4.52, 4.56, 4.60, 4.58, 4.62, 4.60, 4.57, 4.60,
      4.58, 4.55, 4.60, 4.62, 4.58, 4.60, 4.59, 4.60,
      4.20, 3.80, 3.50, 3.25, 3.10, 3.30, 3.40, 3.35, 3.28,
      3.25, 3.22, 3.20, 3.20, 3.19, 3.18, 3.18
    ],
    pe: 18.5,
    marketCapB: 23.9,
    revenueGrowthPct: 8.2,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Monopoly toll operator', value: '', rating: 'neutral', tooltip: 'Exclusive operator of Dubai\'s toll gate system. No competition risk — regulated monopoly with guaranteed traffic from 8 toll gates across Dubai.' },
      { label: 'Div yield', value: '5.8%', rating: 'good', tooltip: 'Attractive yield. Among best in UAE equities (ADNOC Dist: 6.1% is higher but has competition risk). Sustainable payout backed by predictable toll revenue.' },
      { label: 'Zero competition risk', value: '', rating: 'neutral', tooltip: 'Government-granted exclusivity. Dubai traffic grew 4.2% in 2025 — structural tailwind as population grows. Revenue is essentially GDP-linked.' },
    ],
  },
  {
    name: 'DP World',
    ticker: 'DPW',
    sector: 'Logistics',
    exchange: 'DFM',
    fiatUrl: 'https://www.dfm.ae/the-exchange/market-information/company/DPW/trading/trading-summary',
    currentPrice: 18.40,
    preMarch1Price: 26.50,
    drawdownPct: -30.6,
    covidDrawdownPct: -35.2,
    sparklineData: [
      25.50, 25.80, 26.00, 26.20, 26.40, 26.10, 26.30, 26.50, 26.60, 26.40,
      26.50, 26.70, 26.50, 26.30, 26.50, 26.45, 26.40, 26.50,
      24.50, 22.80, 21.00, 19.80, 19.20, 20.00, 20.50, 19.80, 19.30,
      19.10, 18.90, 18.80, 18.70, 18.60, 18.50, 18.40
    ],
    pe: 11.3,
    marketCapB: 121.8,
    revenueGrowthPct: 11.5,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Global port operator', value: '', rating: 'neutral', tooltip: 'Operates 90+ terminals across 40+ countries. Geographic diversification offsets regional risk — crisis in one area doesn\'t halt global operations.' },
      { label: 'Revenue', value: '$18.9B', rating: 'neutral', tooltip: 'Massive revenue base. Largest UAE-listed company by revenue. Growth driven by acquisitions (Imperial Logistics) and 7.4% like-for-like volume growth.' },
      { label: 'EBITDA margin', value: '32%', rating: 'good', tooltip: 'Strong margins for a logistics operator. Above global peers Maersk (~25%) and CMA CGM (~28%). Reflects premium port locations and pricing power.' },
    ],
  },
  {
    name: 'ADNOC Distribution',
    ticker: 'ADNOCDIST',
    sector: 'Energy',
    exchange: 'ADX',
    fiatUrl: 'https://www.adx.ae/main-market/company-profile/overview?symbols=ADNOCDIST',
    currentPrice: 3.02,
    preMarch1Price: 4.10,
    drawdownPct: -26.3,
    covidDrawdownPct: -31.5,
    sparklineData: [
      3.95, 3.98, 4.00, 4.02, 4.05, 4.00, 4.08, 4.10, 4.05, 4.08,
      4.10, 4.12, 4.08, 4.10, 4.12, 4.10, 4.08, 4.10,
      3.90, 3.72, 3.55, 3.42, 3.35, 3.38, 3.32, 3.25, 3.20,
      3.16, 3.12, 3.10, 3.08, 3.06, 3.04, 3.02
    ],
    pe: 15.2,
    marketCapB: 37.8,
    revenueGrowthPct: 6.4,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: '450+ stations UAE', value: '', rating: 'neutral', tooltip: 'Dominant fuel retail network. Largest station count in UAE with ~70% market share. Expanding into EV charging and convenience retail for diversification.' },
      { label: 'Div yield', value: '6.1%', rating: 'good', tooltip: 'Highest dividend yield in this universe. Above Salik (5.8%). ADNOC parent guarantees minimum dividend — strong income play during volatility.' },
      { label: 'Expanding KSA', value: '', rating: 'neutral', tooltip: 'Saudi expansion is a growth catalyst. Targeting 60+ stations in KSA by 2027. New market adds optionality but requires upfront capex investment.' },
    ],
  },
  {
    name: 'IHC',
    ticker: 'IHC',
    sector: 'Conglomerate',
    exchange: 'ADX',
    fiatUrl: 'https://www.adx.ae/main-market/company-profile/overview?symbols=IHC',
    currentPrice: 185.00,
    preMarch1Price: 290.00,
    drawdownPct: -36.2,
    covidDrawdownPct: -18.0,
    sparklineData: [
      270, 278, 285, 295, 305, 298, 310, 302, 295, 290,
      288, 292, 295, 290, 285, 292, 288, 290,
      265, 240, 220, 210, 225, 215, 205, 200, 195,
      192, 190, 188, 187, 186, 185, 185
    ],
    pe: 22.4,
    marketCapB: 502.6,
    revenueGrowthPct: 38.2,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Royal-backed conglomerate', value: '', rating: 'neutral', tooltip: 'Controlled by Sheikh Tahnoon bin Zayed. Political backing provides strategic advantages but also means corporate governance follows Abu Dhabi royal family priorities.' },
      { label: 'Cash', value: 'AED 28B', rating: 'good', tooltip: 'Enormous cash reserves. Dwarfs all UAE peers (Emaar: AED 12.1B, Aldar: AED 8.2B). War chest for acquisitions and crisis resilience.' },
      { label: '1000+ subsidiaries', value: '', rating: 'neutral', tooltip: 'Massive diversification across sectors. Conglomerate discount applies — sum-of-parts likely exceeds market cap. Complexity makes valuation challenging.' },
    ],
  },
  {
    name: 'Dubai Islamic Bank',
    ticker: 'DIB',
    sector: 'Banking',
    exchange: 'DFM',
    fiatUrl: 'https://www.dfm.ae/the-exchange/market-information/company/DIB/trading/trading-summary',
    currentPrice: 5.10,
    preMarch1Price: 7.20,
    drawdownPct: -29.2,
    covidDrawdownPct: -48.6,
    sparklineData: [
      6.90, 6.95, 7.00, 7.05, 7.10, 7.05, 7.12, 7.18, 7.20, 7.15,
      7.18, 7.20, 7.22, 7.18, 7.20, 7.15, 7.18, 7.20,
      6.80, 6.50, 6.10, 5.80, 5.60, 5.70, 5.55, 5.45, 5.38,
      5.32, 5.28, 5.22, 5.18, 5.15, 5.12, 5.10
    ],
    pe: 6.8,
    marketCapB: 37.1,
    revenueGrowthPct: 14.1,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Largest Islamic bank UAE', value: '', rating: 'neutral', tooltip: 'Market leader in Sharia-compliant banking. Structural demand from Islamic finance preference in GCC. Growing sukuk market expands addressable opportunities.' },
      { label: 'Tier 1 ratio', value: '13.5%', rating: 'neutral', tooltip: 'Adequate capital but lowest among UAE banking peers (FAB: 14.2%, ENBD: 16.1%, ADCB: 13.8%). Still comfortably above CBUAE 10.5% minimum.' },
      { label: 'ROE', value: '18.2%', rating: 'good', tooltip: 'Excellent returns. Outperforms conventional banking peers on ROE metric. Islamic banking model has lower funding costs which boosts equity returns.' },
    ],
  },
  {
    name: 'Air Arabia',
    ticker: 'AIRARABIA',
    sector: 'Aviation',
    exchange: 'DFM',
    fiatUrl: 'https://www.dfm.ae/the-exchange/market-information/company/AIRARABIA/trading/trading-summary',
    currentPrice: 2.14,
    preMarch1Price: 3.50,
    drawdownPct: -38.9,
    covidDrawdownPct: -55.2,
    sparklineData: [
      3.35, 3.40, 3.45, 3.50, 3.48, 3.52, 3.55, 3.50, 3.48, 3.50,
      3.52, 3.48, 3.50, 3.55, 3.50, 3.48, 3.50, 3.50,
      3.10, 2.75, 2.45, 2.20, 2.10, 2.30, 2.45, 2.35, 2.25,
      2.22, 2.20, 2.18, 2.17, 2.16, 2.15, 2.14
    ],
    pe: 7.5,
    marketCapB: 10.2,
    revenueGrowthPct: 22.8,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'MENA low-cost leader', value: '', rating: 'neutral', tooltip: 'Only profitable LCC in the MENA region. Cost per seat-km 40% below legacy carriers. Structural moat in price-sensitive travel segment.' },
      { label: 'Fleet', value: '70+ aircraft', rating: 'neutral', tooltip: 'Young fleet with average age ~6 years. Fuel-efficient A320neo family reduces operating costs. Order book for 120+ aircraft secures growth runway.' },
      { label: 'Net cash position', value: '', rating: 'good', tooltip: 'Rare for an airline — zero net debt. Survived COVID without government bailout. Financial strength is a competitive advantage when peers are leveraged.' },
    ],
  },
  {
    name: 'RAK Properties',
    ticker: 'RAKPROP',
    sector: 'Real Estate',
    exchange: 'ADX',
    fiatUrl: 'https://www.adx.ae/main-market/company-profile/overview?symbols=RAKPROP',
    currentPrice: 0.68,
    preMarch1Price: 1.15,
    drawdownPct: -40.9,
    covidDrawdownPct: -58.3,
    sparklineData: [
      1.00, 1.05, 1.10, 1.18, 1.22, 1.15, 1.12, 1.15, 1.18, 1.15,
      1.12, 1.15, 1.18, 1.15, 1.12, 1.14, 1.15, 1.15,
      1.02, 0.92, 0.82, 0.75, 0.70, 0.72, 0.70, 0.68, 0.70,
      0.70, 0.69, 0.69, 0.68, 0.68, 0.68, 0.68
    ],
    pe: 3.8,
    marketCapB: 1.4,
    revenueGrowthPct: 31.5,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'RAK exposure play', value: '', rating: 'neutral', tooltip: 'Pure play on Ras Al Khaimah\'s growth. RAK is UAE\'s fastest-growing emirate — Wynn casino resort catalyst. Small-cap means higher volatility.' },
      { label: 'Net debt/equity', value: '0.12', rating: 'good', tooltip: 'Very low leverage. Lowest among UAE real estate stocks (DAMAC: 0.18, Emaar: 0.32, Aldar: 0.41). Conservative balance sheet for a small developer.' },
      { label: 'Land bank', value: '8M sqft', rating: 'neutral', tooltip: 'Significant land reserves relative to market cap. At current land values, the land bank alone could be worth more than the company\'s AED 1.4B market cap.' },
    ],
  },
  {
    name: 'Multiply Group',
    ticker: 'MULTIPLY',
    sector: 'Investment',
    exchange: 'ADX',
    fiatUrl: 'https://www.adx.ae/main-market/company-profile/overview?symbols=MULTIPLY',
    currentPrice: 1.92,
    preMarch1Price: 3.10,
    drawdownPct: -38.1,
    covidDrawdownPct: -22.0,
    sparklineData: [
      2.90, 3.00, 3.10, 3.20, 3.05, 3.15, 3.25, 3.10, 3.00, 3.10,
      3.15, 3.05, 3.10, 3.15, 3.08, 3.12, 3.10, 3.10,
      2.80, 2.55, 2.35, 2.20, 2.10, 2.15, 2.10, 2.05, 2.00,
      1.98, 1.96, 1.95, 1.94, 1.93, 1.92, 1.92
    ],
    pe: 8.9,
    marketCapB: 23.0,
    revenueGrowthPct: 45.0,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'IHC subsidiary', value: '', rating: 'neutral', tooltip: 'Backed by IHC (AED 502.6B market cap). Parent\'s AED 28B cash reserves provide implicit support. Trades at discount to IHC\'s own valuation multiple.' },
      { label: 'Diversified portfolio', value: '', rating: 'neutral', tooltip: 'Holdings span media, energy, tech, and real estate. Diversification reduces single-sector risk but creates conglomerate discount. NAV likely above market price.' },
      { label: 'High growth trajectory', value: '', rating: 'neutral', tooltip: '45% YoY revenue growth — fastest in this universe. Acquisition-driven expansion mirrors parent IHC strategy. Sustainability of growth rate is key risk.' },
    ],
  },
  {
    name: 'Emaar Development',
    ticker: 'EMAARDEV',
    sector: 'Real Estate',
    exchange: 'DFM',
    fiatUrl: 'https://www.dfm.ae/the-exchange/market-information/company/EMAARDEV/trading/trading-summary',
    currentPrice: 5.40,
    preMarch1Price: 8.75,
    drawdownPct: -38.3,
    covidDrawdownPct: -67.4,
    sparklineData: [
      8.20, 8.35, 8.50, 8.60, 8.70, 8.55, 8.65, 8.75, 8.80, 8.70,
      8.75, 8.80, 8.75, 8.70, 8.75, 8.72, 8.75, 8.75,
      8.00, 7.30, 6.60, 6.10, 5.70, 5.50, 5.70, 5.80, 5.65,
      5.58, 5.52, 5.48, 5.45, 5.42, 5.40, 5.40
    ],
    pe: 4.5,
    marketCapB: 21.6,
    revenueGrowthPct: 28.9,
    revenueGrowthPeriod: 'YoY FY2025',
    balanceSheetHighlights: [
      { label: 'Emaar subsidiary', value: '', rating: 'neutral', tooltip: 'Development arm of Emaar Properties. Benefits from Emaar brand and land bank access. Parent owns ~80% — alignment of interests but limited free float.' },
      { label: 'Record backlog', value: 'AED 72B', rating: 'good', tooltip: 'Massive revenue visibility. AED 72B backlog provides 3+ years of revenue at current run rate. Largest backlog among UAE developers — de-risks near-term earnings.' },
      { label: 'ROE', value: '28.1%', rating: 'good', tooltip: 'Highest ROE in UAE real estate. Beats parent Emaar (16.2%), DAMAC (22.4%), and Aldar (12.8%). Capital-light model as subsidiary drives exceptional returns.' },
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
