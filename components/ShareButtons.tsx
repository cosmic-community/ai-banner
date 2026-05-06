'use client'

interface ShareButtonsProps {
  title: string
  slug: string
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-banner.vercel.app'
  const url = encodeURIComponent(`${siteUrl}/posts/${slug}`)
  const text = encodeURIComponent(title)

  return (
    <div className="mt-10 pt-8 border-t border-white/10">
      <p className="text-sm font-semibold text-gray-400 mb-3">Share this post</p>
      <div className="flex gap-3">
        <a
          href={`https://twitter.com/intent/tweet?url=${url}&text=${text}`}
          target="_blank"
          rel="noopener noreferrer"
          data-share="twitter"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-white transition"
        >
          𝕏 Twitter
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
          target="_blank"
          rel="noopener noreferrer"
          data-share="linkedin"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-white transition"
        >
          in LinkedIn
        </a>
        <a
          href={`https://news.ycombinator.com/submitlink?u=${url}&t=${text}`}
          target="_blank"
          rel="noopener noreferrer"
          data-share="hackernews"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-white transition"
        >
          🟠 HN
        </a>
      </div>
    </div>
  )
}
