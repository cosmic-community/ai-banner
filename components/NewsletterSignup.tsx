'use client'
import { useState } from 'react'

declare global {
  interface Window {
    cosmicInsights?: (event: string, props?: Record<string, unknown>) => void
  }
}

interface NewsletterSignupProps {
  postId: string
  postSlug: string
}

export default function NewsletterSignup({ postId, postSlug }: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, postId, postSlug }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage('🎉 You\'re subscribed! Thanks for joining.')

        // 📊 Cosmic Insights — newsletter conversion event
        if (typeof window !== 'undefined' && typeof window.cosmicInsights === 'function') {
          window.cosmicInsights('newsletter_subscribed', {
            object_id: postId,
            object_type: 'posts',
          })
        }
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="mt-16 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-white/10 p-8 md:p-12 text-center">
      <div className="text-3xl mb-3">📬</div>
      <h3 className="text-2xl font-bold text-white">Stay in the loop</h3>
      <p className="mt-2 text-gray-400 max-w-md mx-auto">
        Get the latest AI and tech news delivered straight to your inbox. No spam, ever.
      </p>

      {status === 'success' ? (
        <p className="mt-8 text-lg font-semibold text-green-400">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 max-w-md mx-auto">
          <input
            type="text"
            placeholder="First name (optional)"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 px-6 py-3 text-white font-semibold transition"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
          {status === 'error' && (
            <p className="text-red-400 text-sm">{message}</p>
          )}
        </form>
      )}
    </div>
  )
}
