import { getPosts, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import Hero from '@/components/Hero'
import Link from 'next/link'

export default async function HomePage() {
  const posts = await getPosts()
  const categories = await getCategories()

  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1)

  return (
    <div>
      <Hero />
      
      <section className="max-w-7xl mx-auto px-4 py-16">
        {featuredPost && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 gradient-text">Featured Article</h2>
            <PostCard post={featuredPost} featured />
          </div>
        )}

        {categories.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">Browse Categories</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="px-5 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-accent-500/20 hover:border-accent-500 transition-all"
                >
                  {cat.metadata?.name || cat.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {remainingPosts.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-8">Latest Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No posts available yet.</p>
          </div>
        )}
      </section>
    </div>
  )
}