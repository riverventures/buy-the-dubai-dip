'use client'

import { useState, useMemo } from 'react'
import { assets, ALL_SECTORS, formatMarketCap } from '@/data/assets'
import AssetRow from './AssetRow'

type SortField = 'default' | 'drawdown' | 'marketcap'

export default function AssetTable() {
  const [sectorFilter, setSectorFilter] = useState<string>('All')
  const [sortField, setSortField] = useState<SortField>('default')
  const [sortAsc, setSortAsc] = useState(false)

  const filteredAssets = useMemo(() => {
    let filtered = sectorFilter === 'All'
      ? [...assets]
      : assets.filter(a => a.sector === sectorFilter)

    if (sortField === 'drawdown') {
      filtered.sort((a, b) => sortAsc ? a.drawdownPct - b.drawdownPct : b.drawdownPct - a.drawdownPct)
    } else if (sortField === 'marketcap') {
      filtered.sort((a, b) => sortAsc ? a.marketCapB - b.marketCapB : b.marketCapB - a.marketCapB)
    }

    return filtered
  }, [sectorFilter, sortField, sortAsc])

  const activeSectors = useMemo(() => {
    const used = new Set(assets.map(a => a.sector))
    return ALL_SECTORS.filter(s => s === 'All' || used.has(s))
  }, [])

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortAsc(!sortAsc)
    } else {
      setSortField(field)
      setSortAsc(false)
    }
  }

  return (
    <div>
      {/* Sort/Filter Controls */}
      <div className="flex flex-wrap items-center gap-1.5 mb-2">
        {/* Sector filter */}
        {activeSectors.map(sector => (
          <button
            key={sector}
            onClick={() => setSectorFilter(sector)}
            className={`text-[10px] font-mono px-2 py-1 rounded border transition-colors ${
              sectorFilter === sector
                ? 'border-accent text-accent bg-accent/10'
                : 'border-border-dim text-text-muted hover:text-text-secondary hover:border-text-muted'
            }`}
          >
            {sector}
          </button>
        ))}

        <span className="text-border-dim mx-1">|</span>

        {/* Sort buttons */}
        <button
          onClick={() => toggleSort('drawdown')}
          className={`text-[10px] font-mono px-2 py-1 rounded border transition-colors ${
            sortField === 'drawdown'
              ? 'border-accent text-accent bg-accent/10'
              : 'border-border-dim text-text-muted hover:text-text-secondary hover:border-text-muted'
          }`}
        >
          Drawdown {sortField === 'drawdown' ? (sortAsc ? '↑' : '↓') : ''}
        </button>
        <button
          onClick={() => toggleSort('marketcap')}
          className={`text-[10px] font-mono px-2 py-1 rounded border transition-colors ${
            sortField === 'marketcap'
              ? 'border-accent text-accent bg-accent/10'
              : 'border-border-dim text-text-muted hover:text-text-secondary hover:border-text-muted'
          }`}
        >
          Mkt Cap {sortField === 'marketcap' ? (sortAsc ? '↑' : '↓') : ''}
        </button>
      </div>

      <div className="border border-border-dim rounded-sm bg-bg-secondary">
        {/* Header — Desktop */}
        <div className="hidden sm:grid grid-cols-[1fr_auto_80px_70px_80px_70px_80px_20px] items-center gap-2 px-3 py-1.5 border-b border-border-dim text-[10px] font-mono text-text-muted uppercase tracking-wider">
          <span>Asset</span>
          <span>Exch</span>
          <span>30d</span>
          <span className="text-right">Price</span>
          <span className="text-right">Mkt Cap</span>
          <span className="text-right">Draw.</span>
          <span className="text-right">COVID</span>
          <span></span>
        </div>

        {/* Header — Mobile */}
        <div className="sm:hidden grid grid-cols-[1fr_60px_60px_16px] items-center gap-1 px-2 py-1.5 border-b border-border-dim text-[10px] font-mono text-text-muted uppercase tracking-wider">
          <span>Asset</span>
          <span className="text-right">Price</span>
          <span className="text-right">Draw.</span>
          <span></span>
        </div>

        {/* Rows */}
        {filteredAssets.map((asset) => (
          <AssetRow key={asset.ticker} asset={asset} />
        ))}
      </div>
    </div>
  )
}
