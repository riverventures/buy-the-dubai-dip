import { getAverageDrawdown, getTotalMarketCapB, AED_TO_USD } from '@/data/assets'
import AssetTable from '@/components/AssetTable'
import WaitlistForm from '@/components/WaitlistForm'
import ResilienceSection from '@/components/ResilienceSection'
import DisclaimerBanner from '@/components/DisclaimerBanner'

export default function Home() {
  const avgDrawdown = getAverageDrawdown()
  const totalMcap = getTotalMarketCapB()
  const totalMcapUSD = (totalMcap * AED_TO_USD).toFixed(1)

  return (
    <main className="min-h-screen pb-16">
      {/* Header */}
      <header className="px-4 pt-4 pb-3 border-b border-border-dim">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="font-mono text-lg font-bold text-text-primary tracking-tight">
                  🇦🇪 Buy the Dubai Dip
                </h1>
                <p className="text-xs text-text-secondary font-mono mt-0.5">
                  UAE equities at historic discounts. The market panicked. The opportunity is here.
                </p>
              </div>
              <a
                href="https://x.com/dubaidipxyz"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-text-muted hover:text-text-primary transition-colors"
                aria-label="Follow on X"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
            <div className="hidden sm:flex gap-4 text-right">
              <div>
                <div className="text-xs text-text-muted font-mono">Avg Drawdown</div>
                <div className="font-mono text-lg text-loss font-bold">{avgDrawdown}%</div>
              </div>
              <div>
                <div className="text-xs text-text-muted font-mono">Total Mkt Cap</div>
                <div className="font-mono text-lg text-text-primary font-bold">
                  AED {totalMcap}B
                </div>
                <div className="font-mono text-xs text-text-muted">(${totalMcapUSD}B)</div>
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
              <div className="font-mono text-[10px] text-text-muted">(${totalMcapUSD}B)</div>
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
      <section id="waitlist" className="px-4 py-3 scroll-mt-4 transition-all duration-500">
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
