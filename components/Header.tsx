import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-black/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold gradient-text">
          AI Banner
        </Link>
        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-accent-500 transition">Home</Link>
          <Link href="/posts" className="hover:text-accent-500 transition">Articles</Link>
          <Link href="/categories" className="hover:text-accent-500 transition">Categories</Link>
          <Link href="/authors" className="hover:text-accent-500 transition">Authors</Link>
        </nav>
      </div>
    </header>
  )
}