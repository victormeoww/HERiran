import { getAllPosts, getPostBySlug, formatDate } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PersianPattern from '@/components/PersianPattern'

interface PostPageProps {
  params: {
    slug: string
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params, searchParams }: PostPageProps) {
  const lang = searchParams?.lang === 'en' ? 'en' : 'fa'
  const post = getPostBySlug(params.slug, lang)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.frontmatter.title} | HER iran`,
    description: post.frontmatter.excerpt,
  }
}

export default function PostPage({ params, searchParams }: PostPageProps) {
  const lang = searchParams?.lang === 'en' ? 'en' : 'fa'
  const isRtl = lang === 'fa'
  const post = getPostBySlug(params.slug, lang)

  if (!post) {
    notFound()
  }

  const allPosts = getAllPosts(lang)
  const currentIndex = allPosts.findIndex(p => p.slug === params.slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  const texts = {
    moreStories: lang === 'fa' ? 'داستان‌های دیگر' : 'More Stories',
    backToHome: lang === 'fa' ? 'بازگشت به خانه' : 'Back to Home',
    previous: lang === 'fa' ? 'قبلی' : 'Previous',
    next: lang === 'fa' ? 'بعدی' : 'Next',
    aiIndication: 'This content is AI-translated.',
  }

  const getLink = (slug: string) => {
    return `/posts/${slug}${lang === 'en' ? '?lang=en' : ''}`
  }

  return (
    <article className={`min-h-screen bg-cream selection:bg-burgundy/10 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* AI Indicator */}
      {lang === 'en' && (
        <div className="bg-burgundy/10 text-burgundy text-center py-2 text-xs font-sans font-bold tracking-widest uppercase">
          {texts.aiIndication}
        </div>
      )}

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-12 md:pb-16 text-center">
        <div className="flex items-center justify-center space-x-4 mb-8 text-xs font-sans tracking-[0.2em] uppercase text-charcoal/60">
          <Link href={`/category/${post.frontmatter.category}`} className="text-burgundy hover:underline">
            {post.frontmatter.category}
          </Link>
          <span>|</span>
          <span>{formatDate(post.frontmatter.date)}</span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-charcoal leading-[1.1] mb-12 text-balance">
          {post.frontmatter.title}
        </h1>

        <div className="flex justify-center mb-12">
          <PersianPattern variant="divider" className="w-32 md:w-64 h-4 text-burgundy" opacity={0.4} />
        </div>

        <p className="text-2xl md:text-3xl font-display italic text-charcoal/80 leading-relaxed max-w-2xl mx-auto">
          {post.frontmatter.excerpt}
        </p>
      </header>

      {/* Article Content */}
      <div className="max-w-[720px] mx-auto px-6 pb-24">
        <div className="prose prose-lg md:prose-xl">
          <MDXRemote source={post.content} />
        </div>
        
        {/* End Mark */}
        <div className="flex justify-center mt-16 mb-24">
           <div className="w-2 h-2 bg-burgundy rounded-full mx-1"></div>
           <div className="w-2 h-2 bg-burgundy rounded-full mx-1"></div>
           <div className="w-2 h-2 bg-burgundy rounded-full mx-1"></div>
        </div>
      </div>

      {/* Navigation Footer */}
      <nav className="bg-white border-t border-charcoal/5 py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h3 className="text-center text-xs font-sans font-bold tracking-[0.2em] uppercase text-charcoal/40 mb-16">
            {texts.moreStories}
          </h3>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 ${isRtl ? 'direction-ltr' : ''}`}>
            {prevPost && (
              <Link 
                href={getLink(prevPost.slug)}
                className={`group text-center block ${isRtl ? 'md:text-right' : 'md:text-left'}`}
              >
                <span className="text-xs font-sans text-charcoal/40 mb-4 block group-hover:text-burgundy transition-colors">{texts.previous}</span>
                <h4 className="text-3xl font-display font-bold text-charcoal group-hover:text-burgundy transition-colors">
                  {prevPost.frontmatter.title}
                </h4>
              </Link>
            )}

            {nextPost && (
              <Link 
                href={getLink(nextPost.slug)}
                className={`group text-center block ${isRtl ? 'md:text-left' : 'md:text-right'}`}
              >
                <span className="text-xs font-sans text-charcoal/40 mb-4 block group-hover:text-burgundy transition-colors">{texts.next}</span>
                <h4 className="text-3xl font-display font-bold text-charcoal group-hover:text-burgundy transition-colors">
                  {nextPost.frontmatter.title}
                </h4>
              </Link>
            )}
          </div>
          
          <div className="text-center mt-24">
             <Link 
              href={lang === 'en' ? '/?lang=en' : '/'}
              className="inline-flex items-center justify-center px-8 py-4 border border-charcoal/10 rounded-full text-xs font-sans font-bold tracking-[0.2em] uppercase text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300"
            >
              {texts.backToHome}
            </Link>
          </div>
        </div>
      </nav>
    </article>
  )
}
