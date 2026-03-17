'use client'

import { useRef, useState } from 'react'
import { articles } from '@/data/articles'

const sourceColors: Record<string, { bg: string; text: string }> = {
  'Semafor': { bg: 'from-orange-600 to-orange-800', text: 'S' },
  'Reuters': { bg: 'from-blue-600 to-blue-800', text: 'R' },
  'Euronews': { bg: 'from-indigo-600 to-indigo-800', text: 'E' },
  'Khaleej Times': { bg: 'from-emerald-600 to-emerald-800', text: 'KT' },
  'Voice of Emirates': { bg: 'from-red-600 to-red-800', text: 'VE' },
}

function ArticleThumbnail({ src, source }: { src: string; source: string }) {
  const [failed, setFailed] = useState(false)
  const colors = sourceColors[source] || { bg: 'from-gray-600 to-gray-800', text: source.charAt(0) }

  if (!src || failed) {
    return (
      <div className={`h-36 rounded-t-md bg-gradient-to-br ${colors.bg} flex items-center justify-center`}>
        <span className="text-white/90 text-3xl font-bold font-mono tracking-tight">{colors.text}</span>
      </div>
    )
  }

  return (
    <div className="h-36 rounded-t-md overflow-hidden bg-bg-tertiary">
      <img
        src={src}
        alt=""
        onError={() => setFailed(true)}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  )
}

export default function ResilienceSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 300
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-mono text-sm text-text-muted uppercase tracking-wider">
          UAE Resilience
        </h2>
        <div className="flex gap-1">
          <button
            onClick={() => scroll('left')}
            className="w-7 h-7 rounded border border-border-dim bg-bg-secondary text-text-muted hover:text-text-primary hover:border-text-muted/40 transition-colors flex items-center justify-center text-sm"
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-7 h-7 rounded border border-border-dim bg-bg-secondary text-text-muted hover:text-text-primary hover:border-text-muted/40 transition-colors flex items-center justify-center text-sm"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
        {articles.map((article, i) => {
          return (
            <a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-[280px] snap-start border border-border-dim rounded-md bg-bg-secondary hover:border-text-muted/30 transition-all group hover:translate-y-[-2px] hover:shadow-lg hover:shadow-black/20"
            >
              <ArticleThumbnail src={article.thumbnail} source={article.source} />

              <div className="p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono text-accent uppercase tracking-wider">{article.source}</span>
                  <span className="text-[10px] font-mono text-text-muted">{article.date}</span>
                </div>
                <div className="font-mono text-sm text-text-primary mb-2 group-hover:text-accent transition-colors leading-snug line-clamp-2">
                  {article.title}
                </div>
                <blockquote className="text-[11px] text-text-secondary leading-relaxed border-l-2 border-accent/30 pl-2 line-clamp-3">
                  &ldquo;{article.quote}&rdquo;
                </blockquote>
                <div className="mt-2 text-[10px] font-mono text-accent group-hover:underline">
                  Read article →
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
