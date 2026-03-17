import { articles } from '@/data/articles'

export default function ResilienceSection() {
  return (
    <div>
      <h2 className="font-mono text-sm text-text-muted uppercase tracking-wider mb-3">
        UAE Resilience
      </h2>
      <div className="grid gap-2">
        {articles.map((article, i) => (
          <a
            key={i}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-border-dim rounded-sm bg-bg-secondary p-3 hover:border-text-muted/30 transition-colors group"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono text-accent uppercase tracking-wider">{article.source}</span>
              <span className="text-[10px] font-mono text-text-muted">{article.date}</span>
            </div>
            <div className="font-mono text-sm text-text-primary mb-1.5 group-hover:text-accent transition-colors">
              {article.title}
            </div>
            <blockquote className="text-xs text-text-secondary leading-relaxed border-l-2 border-accent/30 pl-2">
              &ldquo;{article.quote}&rdquo;
            </blockquote>
          </a>
        ))}
      </div>
    </div>
  )
}
