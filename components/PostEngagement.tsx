'use client'
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    cosmicInsights?: (event: string, props?: Record<string, unknown>) => void
  }
}

interface PostEngagementProps {
  postId: string
  postSlug: string
  authorId?: string
  categoryId?: string
}

export default function PostEngagement({ postId, postSlug, authorId, categoryId }: PostEngagementProps) {
  const startTime = useRef<number>(Date.now())
  const scrollMilestones = useRef<Set<number>>(new Set())
  const timeMilestones = useRef<Set<number>>(new Set())

  function track(event: string, props?: Record<string, unknown>) {
    if (typeof window !== 'undefined' && typeof window.cosmicInsights === 'function') {
      window.cosmicInsights(event, {
        object_id: postId,
        object_type: 'posts',
        post_slug: postSlug,
        ...(authorId && { author_id: authorId }),
        ...(categoryId && { category_id: categoryId }),
        ...props,
      })
    }
  }

  // ── Scroll Depth ──────────────────────────────────────────────────────────
  useEffect(() => {
    function handleScroll() {
      const el = document.documentElement
      const scrolled = el.scrollTop + el.clientHeight
      const total = el.scrollHeight
      const percent = Math.round((scrolled / total) * 100)

      for (const milestone of [25, 50, 75, 100]) {
        if (percent >= milestone && !scrollMilestones.current.has(milestone)) {
          scrollMilestones.current.add(milestone)
          track('scroll_depth', { percent: milestone })
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [postId])

  // ── Time on Page ─────────────────────────────────────────────────────────
  useEffect(() => {
    const intervals = [30, 60, 120, 300]

    const timer = setInterval(() => {
      const seconds = Math.round((Date.now() - startTime.current) / 1000)
      for (const milestone of intervals) {
        if (seconds >= milestone && !timeMilestones.current.has(milestone)) {
          timeMilestones.current.add(milestone)
          track('time_on_page', { seconds: milestone })
        }
      }
    }, 5000)

    return () => clearInterval(timer)
  }, [postId])

  // ── Outbound / CTA Click Tracking ────────────────────────────────────────
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return

      const href = target.getAttribute('href') || ''
      const label = target.innerText?.trim().slice(0, 80) || ''

      // Outbound links
      if (href.startsWith('http') && !href.includes(window.location.hostname)) {
        track('outbound_click', { url: href, label })
        return
      }

      // CTA buttons (data-cta attribute)
      if (target.dataset.cta) {
        track('cta_clicked', { label: target.dataset.cta })
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [postId])

  // ── Social Share Tracking ────────────────────────────────────────────────
  useEffect(() => {
    function handleShare(e: MouseEvent) {
      const btn = (e.target as HTMLElement).closest('[data-share]')
      if (!btn) return
      const platform = (btn as HTMLElement).dataset.share || 'unknown'
      track('post_shared', { platform })
    }

    document.addEventListener('click', handleShare)
    return () => document.removeEventListener('click', handleShare)
  }, [postId])

  // This component renders nothing — it only attaches event listeners
  return null
}
