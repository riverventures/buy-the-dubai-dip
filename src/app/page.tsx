import { getAverageDrawdown, getTotalMarketCapB } from '@/data/assets'
import AssetTable from '@/components/AssetTable'
import WaitlistForm from '@/components/WaitlistForm'
import ResilienceSection from '@/components/ResilienceSection'
import DisclaimerBanner from '@/components/DisclaimerBanner'

export default function Home() {
  const avgDrawdown = getAverageDrawdown()
  const totalMcap = getTotalMarketCapB()

  return (
    <main className="min-h-screen pb-16">
      {/* Header */}
      <header className="px-4 pt-4 pb-3 border-b border-border-dim">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-mono text-lg font-bold text-text-primary tracking-tight">
                🇦🇪 Buy the Dubai Dip
              </h1>
              <p className="text-xs text-text-secondary font-mono mt-0.5">
                UAE equities at historic discounts. The market panicked. The opportunity is here.
              </p>
            </div>
            <div className="hidden sm:flex gap-4 text-right">
              <div>
                <div className="text-xs text-text-muted font-mono">Avg Drawdown</div>
                <div className="font-mono text-lg text-loss font-bold">{avgDrawdown}%</div>
              </div>
              <div>
                <div className="text-xs text-text-muted font-mono">Total Mkt Cap</div>
                <div className="font-mono text-lg text-text-primary font-bold">AED {totalMcap}B</div>
              </div>
            </div>
          </div>

          {/* Mobile stats */}
          <div className="flex sm:hidden gap-4 mt-2">
            <div className="flex-1 bg-bg-secondary rounded-sm p-2">
              <div className="text-[10px] text-text-muted font-mono">Avg Drawdown</div>
              <div className="font-mono text-base text-loss font-bold">{avgDrawdown}%</div>
            </div>
            <div className="flex-1 bg-bg-secondary rounded-sm p-2">
              <div className="text-[10px] text-text-muted font-mono">Total Mkt Cap</div>
              <div className="font-mono text-base text-text-primary font-bold">AED {totalMcap}B</div>
            </div>
          </div>
        </div>
      </header>

      {/* Asset Table */}
      <section className="px-4 py-3">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
              UAE Equities — Drawdown Since March 1, 2026
            </h2>
            <span className="text-[10px] font-mono text-text-muted">
              Prices in AED • Click row to expand
            </span>
          </div>
          <AssetTable />
        </div>
      </section>

      {/* Waitlist */}
      <section className="px-4 py-3">
        <div className="max-w-5xl mx-auto">
          <WaitlistForm />
        </div>
      </section>

      {/* Resilience */}
      <section className="px-4 py-3">
        <div className="max-w-5xl mx-auto">
          <ResilienceSection />
        </div>
      </section>

      {/* Disclaimer */}
      <DisclaimerBanner />
    </main>
  )
}
