import Link from 'next/link'
import { Post, formatDate } from '@/lib/posts'

interface PostCardProps {
  post: Post
  featured?: boolean
  minimal?: boolean
}

export default function PostCard({ post, featured = false, minimal = false }: PostCardProps) {
  const { slug, frontmatter, readTime } = post
  const categoryColors = {
    'Essay': 'text-burgundy',
    'Breaking News': 'text-teal',
    'Personal': 'text-saffron',
  }

  // Featured Post Layout (Hero style)
  if (featured) {
    return (
      <article className="group relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-charcoal/10 pb-16 mb-16">
        <div className="md:col-span-12 lg:col-span-10 lg:col-start-2 text-center">
          <div className="flex items-center justify-center space-x-4 mb-6 text-xs font-sans tracking-[0.2em] uppercase">
            <span className={categoryColors[frontmatter.category] || 'text-charcoal'}>
              {frontmatter.category}
            </span>
            <span className="text-charcoal/30">|</span>
            <span className="text-charcoal/60">{formatDate(frontmatter.date)}</span>
          </div>

          <Link href={`/posts/${slug}`} className="block">
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 text-charcoal leading-[1.1] group-hover:text-burgundy transition-colors duration-300 text-balance">
              {frontmatter.title}
            </h2>
          </Link>

          <p className="text-xl md:text-2xl font-serif text-charcoal/70 leading-relaxed max-w-3xl mx-auto mb-8 text-balance">
            {frontmatter.excerpt}
          </p>

          <Link 
            href={`/posts/${slug}`}
            className="inline-block text-sm font-sans font-medium uppercase tracking-[0.2em] text-burgundy border-b border-burgundy/30 pb-1 hover:border-burgundy transition-all"
          >
            Read Article
          </Link>
        </div>
      </article>
    )
  }

  // Minimal List Layout (Side bar or compact)
  if (minimal) {
    return (
      <article className="group py-4 border-b border-charcoal/5 last:border-0">
        <Link href={`/posts/${slug}`} className="block">
          <span className="block text-xs font-sans text-burgundy mb-1 uppercase tracking-wider">
            {frontmatter.category}
          </span>
          <h3 className="text-xl font-display font-semibold text-charcoal group-hover:text-burgundy transition-colors leading-tight">
            {frontmatter.title}
          </h3>
          <span className="block text-xs font-sans text-charcoal/40 mt-2">
            {formatDate(frontmatter.date)}
          </span>
        </Link>
      </article>
    )
  }

  // Standard Grid Layout
  return (
    <article className="group flex flex-col h-full border-b border-charcoal/10 pb-8">
      <div className="mb-4 flex items-center space-x-3 text-xs font-sans tracking-widest uppercase">
        <span className={categoryColors[frontmatter.category] || 'text-charcoal'}>
          {frontmatter.category}
        </span>
        <span className="text-charcoal/20">|</span>
        <span className="text-charcoal/50">{formatDate(frontmatter.date)}</span>
      </div>

      <Link href={`/posts/${slug}`} className="block group-hover:opacity-95 transition-opacity">
        <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 text-charcoal leading-tight group-hover:text-burgundy transition-colors duration-300">
          {frontmatter.title}
        </h3>
        
        <p className="text-lg font-serif text-charcoal/70 leading-relaxed mb-6 line-clamp-3">
          {frontmatter.excerpt}
        </p>
      </Link>

      <div className="mt-auto pt-4">
        <Link 
          href={`/posts/${slug}`}
          className="text-xs font-sans font-bold uppercase tracking-widest text-charcoal/40 group-hover:text-burgundy transition-colors flex items-center gap-2"
        >
          Read More
          <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
        </Link>
      </div>
    </article>
  )
}
