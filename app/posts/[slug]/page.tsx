// app/posts/[slug]/page.tsx
import { getPost, getPosts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getMetafieldValue } from '@/lib/cosmic'

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  const author = post.metadata?.author
  const category = post.metadata?.category
  const featuredImage = post.metadata?.featured_image
  const tags = getMetafieldValue(post.metadata?.tags)

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {category && (
        <Link
          href={`/categories/${category.slug}`}
          className="inline-block mb-4 px-4 py-1 bg-accent-500/20 text-accent-500 rounded-full text-sm font-medium hover:bg-accent-500/30 transition"
        >
          {getMetafieldValue(category.metadata?.name) || category.title}
        </Link>
      )}

      <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
        {getMetafieldValue(post.metadata?.title) || post.title}
      </h1>

      {post.metadata?.excerpt && (
        <p className="text-xl text-gray-400 mb-8">
          {getMetafieldValue(post.metadata.excerpt)}
        </p>
      )}

      {author && (
        <Link
          href={`/authors/${author.slug}`}
          className="flex items-center gap-3 mb-8 hover:opacity-80 transition"
        >
          {author.metadata?.profile_photo && (
            <img
              src={`${author.metadata.profile_photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
              alt={author.title}
              width="48"
              height="48"
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div>
            <p className="font-semibold">{getMetafieldValue(author.metadata?.name) || author.title}</p>
            <p className="text-sm text-gray-400">Author</p>
          </div>
        </Link>
      )}

      {featuredImage && (
        <img
          src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
          alt={post.title}
          width="800"
          height="450"
          className="w-full rounded-2xl mb-10 aspect-video object-cover"
        />
      )}

      {post.metadata?.content && (
        <div
          className="prose prose-lg prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: getMetafieldValue(post.metadata.content) }}
        />
      )}

      {tags && (
        <div className="mt-12 pt-8 border-t border-white/10">
          <h4 className="text-sm font-semibold text-gray-400 mb-3">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {tags.split(',').map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-sm">
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}