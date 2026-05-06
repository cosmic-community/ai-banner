// app/authors/[slug]/page.tsx
import { getAuthor, getPostsByAuthor } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import { getMetafieldValue } from '@/lib/cosmic'

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) notFound()

  const posts = await getPostsByAuthor(author.id)
  const twitter = getMetafieldValue(author.metadata?.twitter)
  const linkedin = getMetafieldValue(author.metadata?.linkedin)
  const bio = getMetafieldValue(author.metadata?.bio)
  const name = getMetafieldValue(author.metadata?.name) || author.title

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-start gap-8 mb-16 p-8 bg-white/5 border border-white/10 rounded-2xl">
        {author.metadata?.profile_photo && (
          <img
            src={`${author.metadata.profile_photo.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
            alt={name}
            width="200"
            height="200"
            className="w-40 h-40 rounded-full object-cover"
          />
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-3">{name}</h1>
          {bio && <p className="text-gray-300 text-lg mb-4">{bio}</p>}
          <div className="flex gap-3">
            {twitter && (
              <a
                href={`https://twitter.com/${twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/5 hover:bg-accent-500/20 border border-white/10 rounded-lg transition"
              >
                Twitter
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/5 hover:bg-accent-500/20 border border-white/10 rounded-lg transition"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-8">Articles by {name}</h2>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No articles by this author yet.</p>
      )}
    </div>
  )
}