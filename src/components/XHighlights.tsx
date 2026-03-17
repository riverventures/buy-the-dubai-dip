'use client'

import { tweets } from '@/data/tweets'

function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  return n.toString()
}

function XLogo({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

export default function XHighlights() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <h2 className="font-mono text-sm text-text-muted uppercase tracking-wider">
          What People Are Saying
        </h2>
        <XLogo size={14} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {tweets.map((tweet, i) => (
          <a
            key={i}
            href={tweet.url}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border-dim rounded-md bg-bg-secondary p-4 hover:border-text-muted/30 transition-all group hover:translate-y-[-2px] hover:shadow-lg hover:shadow-black/20 flex flex-col"
          >
            {/* Author row */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center text-text-muted text-xs font-mono font-bold">
                  {tweet.author.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-mono text-text-primary leading-tight">{tweet.author}</div>
                  <div className="text-[10px] font-mono text-text-muted">{tweet.handle}</div>
                </div>
              </div>
              <div className="text-text-muted group-hover:text-text-primary transition-colors">
                <XLogo size={16} />
              </div>
            </div>

            {/* Tweet text */}
            <div className="text-xs text-text-secondary leading-relaxed whitespace-pre-line flex-1 mb-3 line-clamp-[8]">
              {tweet.text}
            </div>

            {/* Attached image */}
            {tweet.image && (
              <div className="mb-3 rounded overflow-hidden border border-border-dim">
                <img
                  src={tweet.image}
                  alt=""
                  className="w-full h-32 object-cover"
                  loading="lazy"
                />
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between text-[10px] font-mono text-text-muted pt-2 border-t border-border-dim">
              <span>{tweet.date}</span>
              <div className="flex items-center gap-3">
                <span>💬 {formatNumber(tweet.replies)}</span>
                <span>🔁 {formatNumber(tweet.retweets)}</span>
                <span>❤️ {formatNumber(tweet.likes)}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
