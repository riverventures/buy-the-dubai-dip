'use client'

import { useState } from 'react'
import { Asset, AED_TO_USD, formatUSD, formatUSDbn } from '@/data/assets'
import Sparkline from './Sparkline'

const sectorColors: Record<string, string> = {
  'Real Estate': 'bg-purple-900/50 text-purple-300',
  'Banking': 'bg-blue-900/50 text-blue-300',
  'Infrastructure': 'bg-yellow-900/50 text-yellow-300',
  'Logistics': 'bg-cyan-900/50 text-cyan-300',
  'Energy': 'bg-orange-900/50 text-orange-300',
  'Conglomerate': 'bg-pink-900/50 text-pink-300',
  'Aviation': 'bg-sky-900/50 text-sky-300',
  'Investment': 'bg-indigo-900/50 text-indigo-300',
  'ETF': 'bg-emerald-900/50 text-emerald-300',
}

const ratingColors: Record<string, string> = {
  good: 'text-[#10b981] border-[#10b981]/30 bg-[#10b981]/10',
  neutral: 'text-[#f59e0b] border-[#f59e0b]/30 bg-[#f59e0b]/10',
  poor: 'text-[#ef4444] border-[#ef4444]/30 bg-[#ef4444]/10',
}

function SolanaLogo() {
  return (
    <svg width="16" height="16" viewBox="0 0 397.7 311.7" className="inline-block ml-1.5 opacity-90">
      <defs>
        <linearGradient id="sol-a" x1="360.88" y1="351.46" x2="141.21" y2="-69.29" gradientTransform="matrix(1 0 0 -1 0 314)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#00FFA3"/>
          <stop offset="1" stopColor="#DC1FFF"/>
        </linearGradient>
        <linearGradient id="sol-b" x1="264.83" y1="401.6" x2="45.16" y2="-19.15" gradientTransform="matrix(1 0 0 -1 0 314)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#00FFA3"/>
          <stop offset="1" stopColor="#DC1FFF"/>
        </linearGradient>
        <linearGradient id="sol-c" x1="312.55" y1="376.69" x2="92.88" y2="-44.06" gradientTransform="matrix(1 0 0 -1 0 314)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#00FFA3"/>
          <stop offset="1" stopColor="#DC1FFF"/>
        </linearGradient>
      </defs>
      <path fill="url(#sol-a)" d="M64.6,237.9c2.4-2.4,5.7-3.8,9.2-3.8h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5c-5.8,0-8.7-7-4.6-11.1L64.6,237.9z"/>
      <path fill="url(#sol-b)" d="M64.6,3.8C67.1,1.4,70.4,0,73.8,0h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5c-5.8,0-8.7-7-4.6-11.1L64.6,3.8z"/>
      <path fill="url(#sol-c)" d="M333.1,120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8,0-8.7,7-4.6,11.1l62.7,62.7c2.4,2.4,5.7,3.8,9.2,3.8h317.4c5.8,0,8.7-7,4.6-11.1L333.1,120.1z"/>
    </svg>
  )
}

function KPIBadge({ kpi }: { kpi: { label: string; value: string; rating: string; tooltip: string } }) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <span
      className={`relative text-[10px] font-mono px-2 py-1 rounded border cursor-help ${ratingColors[kpi.rating]}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={(e) => {
        e.stopPropagation()
        setShowTooltip(!showTooltip)
      }}
    >
      {kpi.value ? `${kpi.label}: ${kpi.value}` : kpi.label}
      {showTooltip && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[250px] bg-[#1a1a1a] text-[#e5e5e5] text-[11px] font-sans leading-relaxed p-2.5 rounded-md shadow-xl border border-white/10 z-50 animate-fade-in pointer-events-none">
          {kpi.tooltip}
          <span className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1a1a1a]" />
        </span>
      )}
    </span>
  )
}

export default function AssetRow({ asset }: { asset: Asset }) {
  const [expanded, setExpanded] = useState(false)

  const sectorClass = sectorColors[asset.sector] || 'bg-gray-900/50 text-gray-300'

  function scrollToWaitlist() {
    const el = document.getElementById('waitlist')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      el.classList.add('ring-2', 'ring-accent')
      setTimeout(() => el.classList.remove('ring-2', 'ring-accent'), 2000)
    }
  }

  return (
    <div className="border-b border-border-dim">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full grid grid-cols-[1fr_auto_80px_70px_70px_80px_20px] items-center gap-2 px-3 py-1.5 hover:bg-bg-tertiary/50 transition-colors text-left"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono text-sm text-text-primary truncate">{asset.name}</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0 ${sectorClass}`}>
            {asset.sector}
          </span>
        </div>
        <span className="text-[10px] text-text-muted font-mono">{asset.exchange}</span>
        <Sparkline data={asset.sparklineData} />
        <div className="text-right">
          <span className="font-mono text-sm text-text-primary">
            {asset.currency === 'USD' ? '$' : ''}{asset.currentPrice.toFixed(2)}
          </span>
          {asset.currency === 'AED' && (
            <span className="font-mono text-[9px] text-text-muted block">{formatUSD(asset.currentPrice)}</span>
          )}
        </div>
        <span className="font-mono text-sm text-loss text-right font-semibold">{asset.drawdownPct.toFixed(1)}%</span>
        <span className="font-mono text-[11px] text-text-secondary text-right">{asset.covidDrawdownPct.toFixed(1)}%</span>
        <span className="text-text-muted text-xs">{expanded ? '−' : '+'}</span>
      </button>

      {expanded && (
        <div className="px-3 py-3 bg-bg-tertiary/30 border-t border-border-dim">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-text-muted">P/E Ratio</span>
              <div className="text-text-primary text-sm">{asset.pe}x</div>
            </div>
            <div>
              <span className="text-text-muted">Market Cap</span>
              <div className="text-text-primary text-sm">
                {asset.currency === 'USD' ? (
                  `$${asset.marketCapB < 1 ? (asset.marketCapB * 1000).toFixed(0) + 'M' : asset.marketCapB + 'B'}`
                ) : (
                  <>AED {asset.marketCapB}B <span className="text-text-muted text-xs">({formatUSDbn(asset.marketCapB)})</span></>
                )}
              </div>
            </div>
            <div>
              <span className="text-text-muted">Revenue Growth</span>
              <div className={`text-sm ${asset.revenueGrowthPct > 0 ? 'text-gain' : 'text-text-muted'}`}>
                {asset.revenueGrowthPct > 0 ? `+${asset.revenueGrowthPct}%` : '—'} {asset.revenueGrowthPeriod}
              </div>
            </div>
            <div>
              <span className="text-text-muted">Pre-crisis Price</span>
              <div className="text-text-primary text-sm">
                {asset.currency === 'USD' ? '$' : 'AED '}{asset.preMarch1Price.toFixed(2)}
                {asset.currency === 'AED' && (
                  <span className="text-text-muted text-xs"> / {formatUSD(asset.preMarch1Price)}</span>
                )}
              </div>
            </div>
          </div>

          {/* Balance Sheet KPIs with Tooltips */}
          <div className="mt-3 flex flex-wrap gap-2">
            {asset.balanceSheetHighlights.map((kpi, i) => (
              <KPIBadge key={i} kpi={kpi} />
            ))}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-4">
            <div className="bg-bg-secondary rounded p-2">
              <div className="text-[10px] text-text-muted mb-1">Current Drawdown</div>
              <div className="text-2xl font-mono text-loss font-bold">{asset.drawdownPct.toFixed(1)}%</div>
              <div className="text-[10px] text-text-muted">Since March 1, 2026</div>
            </div>
            <div className="bg-bg-secondary rounded p-2">
              <div className="text-[10px] text-text-muted mb-1">COVID Drawdown (2020)</div>
              <div className="text-2xl font-mono text-text-secondary font-bold">{asset.covidDrawdownPct.toFixed(1)}%</div>
              <div className="text-[10px] text-text-muted">Peak to trough</div>
            </div>
          </div>

          <div className="mt-3">
            <Sparkline data={asset.sparklineData} width={300} height={50} />
          </div>

          {/* Buy Buttons */}
          <div className="mt-3 flex gap-3">
            <a
              href={asset.fiatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center font-mono text-sm px-4 py-2 rounded border border-text-secondary text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors"
            >
              Buy on {asset.exchange}
            </a>
            <button
              onClick={(e) => {
                e.stopPropagation()
                scrollToWaitlist()
              }}
              className="flex-1 relative text-center font-mono text-sm px-4 py-2 rounded bg-accent hover:bg-accent/90 text-black font-semibold transition-colors inline-flex items-center justify-center"
            >
              Buy with USDC on Solana
              <SolanaLogo />
              <span className="absolute -top-2 -right-2 text-[9px] bg-bg-primary text-accent border border-accent rounded-full px-1.5 py-0.5">
                Coming soon
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
