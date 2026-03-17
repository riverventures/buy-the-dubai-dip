'use client'

import { useState, FormEvent } from 'react'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(data.message || 'You\'re on the list.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Try again.')
    }
  }

  return (
    <div className="border border-border-dim rounded-sm bg-bg-secondary p-4">
      <h2 className="font-mono text-sm text-text-primary mb-1">
        Get notified when tokenized UAE equities go live on Solana
      </h2>
      <p className="text-xs text-text-muted mb-3">
        Early access to on-chain UAE equity exposure. No spam.
      </p>

      {status === 'success' ? (
        <div className="text-gain text-sm font-mono py-2">{message}</div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="flex-1 bg-bg-primary border border-border-dim rounded-sm px-3 py-1.5 text-sm font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-accent hover:bg-accent/90 text-black font-mono text-sm px-4 py-1.5 rounded-sm font-semibold disabled:opacity-50 transition-colors"
          >
            {status === 'loading' ? '...' : 'Notify Me'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <div className="text-loss text-xs font-mono mt-2">{message}</div>
      )}
    </div>
  )
}
