import Link from 'next/link'
import { Author } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function AuthorCard({ author }: { author: Author }) {
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)
  const photo = author.metadata?.profile_photo

  return (
    <Link
      href={`/authors/${author.slug}`}
      className="card-hover block p-6 bg-white/5 border border-white/10 rounded-2xl text-center"
    >
      {photo && (
        <img
          src={`${photo.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
          alt={name}
          width="120"
          height="120"
          className="w-28 h-28 rounded-full object-cover mx-auto mb-4"
        />
      )}
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      {bio && <p className="text-gray-400 text-sm line-clamp-3">{bio}</p>}
    </Link>
  )
}