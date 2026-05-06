import { getCategories } from '@/lib/cosmic'
import Link from 'next/link'
import { getMetafieldValue } from '@/lib/cosmic'

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Categories</h1>
      <p className="text-gray-400 mb-12 text-lg">Browse articles by topic</p>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="card-hover p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-accent-500"
            >
              <h2 className="text-xl font-bold mb-2">
                {getMetafieldValue(cat.metadata?.name) || cat.title}
              </h2>
              {cat.metadata?.description && (
                <p className="text-gray-400 text-sm">
                  {getMetafieldValue(cat.metadata.description)}
                </p>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No categories available.</p>
      )}
    </div>
  )
}