export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 via-pink-500/10 to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          The future of <span className="gradient-text">AI & Tech</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl">
          Stay ahead with the latest insights, breakthroughs, and analysis from the world of artificial intelligence and technology.
        </p>
      </div>
    </section>
  )
}