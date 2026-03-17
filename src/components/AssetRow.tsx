'use client'

import { useState } from 'react'
import { Asset } from '@/data/assets'
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
}

export default function AssetRow({ asset }: { asset: Asset }) {
  const [expanded, setExpanded] = useState(false)

  const sectorClass = sectorColors[asset.sector] || 'bg-gray-900/50 text-gray-300'

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
        <span className="font-mono text-sm text-text-primary text-right">{asset.currentPrice.toFixed(2)}</span>
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
              <div className="text-text-primary text-sm">AED {asset.marketCapB}B</div>
            </div>
            <div>
              <span className="text-text-muted">Revenue Growth</span>
              <div className="text-gain text-sm">+{asset.revenueGrowthPct}%</div>
            </div>
            <div>
              <span className="text-text-muted">Pre-crisis Price</span>
              <div className="text-text-primary text-sm">AED {asset.preMarch1Price.toFixed(2)}</div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {asset.balanceSheetHighlights.map((h, i) => (
              <span key={i} className="text-[10px] font-mono bg-bg-secondary px-2 py-1 rounded text-text-secondary">
                {h}
              </span>
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
        </div>
      )}
    </div>
  )
}
