import Link from 'next/link'
import { Post, formatDate } from '@/lib/posts'

interface PostCardProps {
  post: Post
  featured?: boolean
  minimal?: boolean
  lang?: 'en' | 'fa'
}

export default function PostCard({ post, featured = false, minimal = false, lang = 'fa' }: PostCardProps) {
  const { slug, frontmatter } = post
  const categoryColors = {
    'Essay': 'text-burgundy',
    'Breaking News': 'text-teal',
    'Personal': 'text-gold', // Updated to Gold for better palette
  }

  const href = `/posts/${slug}${lang === 'en' ? '?lang=en' : ''}`
  const isRtl = lang === 'fa'

  // Featured Post Layout (Hero style)
  if (featured) {
    return (
      <article className={`group relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b-2 border-charcoal pb-20 mb-20 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="md:col-span-12 lg:col-span-10 lg:col-start-2 text-center">
          <div className="flex items-center justify-center space-x-4 mb-8 text-[10px] font-sans font-bold tracking-[0.3em] uppercase">
            <span className={`${categoryColors[frontmatter.category] || 'text-charcoal'} border border-current px-2 py-1 rounded-sm`}>
              {frontmatter.category}
            </span>
            <span className="text-charcoal/30">|</span>
            <span className="text-charcoal/50">{formatDate(frontmatter.date)}</span>
          </div>

          <Link href={href} className="block">
            <h2 className="text-6xl md:text-8xl font-display font-bold mb-10 text-charcoal leading-[0.9] tracking-tight group-hover:text-burgundy transition-colors duration-500 text-balance">
              {frontmatter.title}
            </h2>
          </Link>

          <p className="text-2xl md:text-3xl font-serif text-charcoal/80 leading-relaxed max-w-3xl mx-auto mb-12 text-balance antialiased">
            {frontmatter.excerpt}
          </p>

          <Link 
            href={href}
            className="inline-flex flex-col items-center group/btn"
          >
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-burgundy mb-2 group-hover/btn:tracking-[0.4em] transition-all duration-500">
              {lang === 'fa' ? 'خواندن مقاله' : 'Read Article'}
            </span>
            <span className="w-px h-12 bg-burgundy/30 group-hover/btn:h-20 group-hover/btn:bg-burgundy transition-all duration-500"></span>
          </Link>
        </div>
      </article>
    )
  }

  // Minimal List Layout (Side bar or compact)
  if (minimal) {
    return (
      <article className={`group py-6 border-t border-charcoal/10 first:border-t-0 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
        <Link href={href} className="block">
          <span className="block text-[10px] font-sans font-bold text-burgundy mb-2 uppercase tracking-[0.2em]">
            {frontmatter.category}
          </span>
          <h3 className="text-xl font-display font-bold text-charcoal group-hover:text-burgundy transition-colors leading-tight mb-2">
            {frontmatter.title}
          </h3>
          <span className="block text-xs font-serif italic text-charcoal/40">
            {formatDate(frontmatter.date)}
          </span>
        </Link>
      </article>
    )
  }

  // Standard Grid Layout
  return (
    <article className={`group flex flex-col h-full ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="mb-6 flex items-center space-x-3 text-[10px] font-sans font-bold tracking-[0.25em] uppercase">
        <span className={categoryColors[frontmatter.category] || 'text-charcoal'}>
          {frontmatter.category}
        </span>
        <span className="text-charcoal/20">/</span>
        <span className="text-charcoal/40">{formatDate(frontmatter.date)}</span>
      </div>

      <Link href={href} className="block group-hover:opacity-95 transition-opacity">
        <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 text-charcoal leading-[1.1] group-hover:text-burgundy transition-colors duration-300 tracking-tight">
          {frontmatter.title}
        </h3>
        
        <p className="text-lg font-serif text-charcoal/70 leading-[1.6] mb-8 line-clamp-3">
          {frontmatter.excerpt}
        </p>
      </Link>

      <div className="mt-auto pt-6 border-t border-charcoal/5">
        <Link 
          href={href}
          className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-charcoal/40 group-hover:text-burgundy transition-colors flex items-center gap-3"
        >
          {lang === 'fa' ? 'ادامه مطلب' : 'Read More'}
          <svg className={`w-3 h-3 transform transition-transform duration-300 ${isRtl ? 'rotate-180 group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </article>
  )
}
