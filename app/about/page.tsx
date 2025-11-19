import { getPageContent } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import PersianPattern from '@/components/PersianPattern'

interface AboutPageProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export function generateMetadata({ searchParams }: AboutPageProps) {
  const lang = searchParams?.lang === 'en' ? 'en' : 'fa'
  return {
    title: lang === 'fa' ? 'درباره ما | HER iran' : 'About | HER iran',
    description: lang === 'fa' ? 'درباره HER iran - صدایی ناشناس از درون ایران' : 'Learn about HER iran - an anonymous voice from inside Iran',
  }
}

export default function AboutPage({ searchParams }: AboutPageProps) {
  const lang = searchParams?.lang === 'en' ? 'en' : 'fa'
  const isRtl = lang === 'fa'
  const pageData = getPageContent('about', lang)

  const texts = {
    mission: lang === 'fa' ? 'ماموریت' : 'The Mission',
    title: lang === 'fa' ? 'درباره HER iran' : 'About HER iran',
  }

  return (
    <div className={`min-h-screen bg-cream ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Page Header */}
      <header className="max-w-[720px] mx-auto px-6 pt-24 pb-16 text-center">
        <span className="text-xs font-sans font-bold tracking-[0.2em] uppercase text-burgundy mb-4 block">
          {texts.mission}
        </span>
        <h1 className="text-5xl md:text-6xl font-display font-bold text-charcoal mb-8">
          {texts.title}
        </h1>
        <div className="flex justify-center mb-8">
          <PersianPattern variant="divider" className="w-48 h-6 text-burgundy" opacity={0.3} />
        </div>
      </header>

      {/* Page Content */}
      <div className="max-w-[720px] mx-auto px-6 pb-24">
        {pageData ? (
          <div className="prose prose-lg md:prose-xl">
            <MDXRemote source={pageData.content} />
          </div>
        ) : (
          <div className="prose prose-lg md:prose-xl">
             <p className="text-red-500">Content not found.</p>
          </div>
        )}
      </div>

      {/* Fixed Back Navigation - moved to bottom or just ensuring it's used */}
      <div className={`fixed bottom-8 ${isRtl ? 'left-8' : 'right-8'} z-40 hidden md:block`}>
        <Link 
          href={lang === 'en' ? '/?lang=en' : '/'}
          className="flex items-center justify-center w-12 h-12 bg-white shadow-md rounded-full text-charcoal hover:text-burgundy hover:scale-110 transition-all"
          aria-label="Back to Home"
        >
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRtl ? "M21 12l-2-2m0 0l-7-7 7 7M19 10v10a1 1 0 01-1 1h-3m-10-11l-2 2m2-2v10a1 1 0 001 1h3m6 0a1 1 0 01-1-1v-4a1 1 0 00-1-1h-2a1 1 0 00-1 1v4a1 1 0 01-1 1m6 0h-6" : "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"} />
          </svg>
        </Link>
      </div>
    </div>
  )
}
