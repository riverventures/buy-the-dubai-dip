'use client'

import { assets } from '@/data/assets'
import AssetRow from './AssetRow'

export default function AssetTable() {
  return (
    <div className="border border-border-dim rounded-sm bg-bg-secondary">
      {/* Header — Desktop */}
      <div className="hidden sm:grid grid-cols-[1fr_auto_80px_70px_70px_80px_20px] items-center gap-2 px-3 py-1.5 border-b border-border-dim text-[10px] font-mono text-text-muted uppercase tracking-wider">
        <span>Asset</span>
        <span>Exch</span>
        <span>30d</span>
        <span className="text-right">Price</span>
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
      {assets.map((asset) => (
        <AssetRow key={asset.ticker} asset={asset} />
      ))}
    </div>
  )
}
