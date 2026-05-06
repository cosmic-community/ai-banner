'use client'

import Link from 'next/link'
import { Post } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  const title = getMetafieldValue(post.metadata?.title) || post.title
  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const featuredImage = post.metadata?.featured_image
  const category = post.metadata?.category
  const author = post.metadata?.author
  const categoryName = category ? (getMetafieldValue(category.metadata?.name) || category.title) : null
  const authorName = author ? (getMetafieldValue(author.metadata?.name) || author.title) : null

  if (featured) {
    return (
      <Link href={`/posts/${post.slug}`} className="group block card-hover">
        <article className="grid md:grid-cols-2 gap-6 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {featuredImage && (
            <img
              src={`${featuredImage.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
              alt={title}
              width="600"
              height="400"
              className="w-full h-64 md:h-full object-cover"
            />
          )}
          <div className="p-8 flex flex-col justify-center">
            {category && (
              <Link
                href={`/categories/${category.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-block self-start mb-3 px-3 py-1 bg-accent-500/20 text-accent-500 rounded-full text-xs font-medium hover:bg-accent-500/30 transition"
              >
                {categoryName}
              </Link>
            )}
            <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:gradient-text transition">
              {title}
            </h3>
            {excerpt && <p className="text-gray-400 mb-4">{excerpt}</p>}
            {author && (
              <Link
                href={`/authors/${author.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="text-sm text-gray-500 hover:text-accent-500 transition self-start"
              >
                By {authorName}
              </Link>
            )}
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/posts/${post.slug}`} className="group block card-hover">
      <article className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden h-full flex flex-col">
        {featuredImage && (
          <img
            src={`${featuredImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={title}
            width="400"
            height="250"
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-6 flex flex-col flex-1">
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-block self-start mb-3 px-3 py-1 bg-accent-500/20 text-accent-500 rounded-full text-xs font-medium hover:bg-accent-500/30 transition"
            >
              {categoryName}
            </Link>
          )}
          <h3 className="text-xl font-bold mb-2 group-hover:text-accent-500 transition line-clamp-2">
            {title}
          </h3>
          {excerpt && <p className="text-gray-400 text-sm line-clamp-3 mb-4">{excerpt}</p>}
          {author && (
            <Link
              href={`/authors/${author.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-gray-500 hover:text-accent-500 transition mt-auto self-start"
            >
              By {authorName}
            </Link>
          )}
        </div>
      </article>
    </Link>
  )
}
