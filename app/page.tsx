import { getAllPosts, getFeaturedPost } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import PersianPattern from '@/components/PersianPattern'
import { Suspense } from 'react'

function HomeContent({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const lang = searchParams?.lang === 'en' ? 'en' : 'fa'
  const isRtl = lang === 'fa'

  const featuredPost = getFeaturedPost(lang)
  const allPosts = getAllPosts(lang)
  // Filter out featured post, then slice
  const otherPosts = allPosts.filter(post => post.slug !== featuredPost?.slug)
  
  // Split posts for layout variety
  const mainPosts = otherPosts.slice(0, 4)
  const sidePosts = otherPosts.slice(4, 8)

  const texts = {
    quote: lang === 'fa' ? '«صداهایی از سایه، بیان حقیقت به قدرت.»' : '"Voices from the shadows, speaking truth to power."',
    latestStories: lang === 'fa' ? 'آخرین داستان‌ها' : 'Latest Stories',
    aboutTitle: lang === 'fa' ? 'درباره HER iran' : 'About HER iran',
    aboutText: lang === 'fa' ? 'پلتفرمی مستقل و ناشناس برای ثبت مبارزه برای آزادی در ایران.' : 'An independent, anonymous platform documenting the struggle for freedom in Iran.',
    moreWriting: lang === 'fa' ? 'نوشته‌های بیشتر' : 'More Writing',
    noPosts: lang === 'fa' ? 'نوشته دیگری موجود نیست.' : 'No more posts to load.',
  }

  return (
    <div className={`min-h-screen bg-cream ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero / Featured Section */}
      <section className="relative pt-12 md:pt-24 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Statement */}
          <div className="text-center mb-20 fade-in">
             <div className="flex justify-center mb-6 opacity-40">
              <PersianPattern variant="star" className="w-12 h-12 text-burgundy" />
            </div>
            <h1 className="text-xl md:text-2xl font-display italic text-charcoal/60 max-w-xl mx-auto leading-relaxed">
              {texts.quote}
            </h1>
          </div>

          {featuredPost && (
            <div className="fade-in delay-100">
              <PostCard post={featuredPost} featured lang={lang} />
            </div>
          )}
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-32">
        <div className={`flex items-baseline justify-between mb-12 border-b border-charcoal/10 pb-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <h2 className="text-xs font-sans font-bold tracking-[0.2em] uppercase text-charcoal">
            {texts.latestStories}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-20">
            {mainPosts.map((post, index) => (
              <div key={post.slug} className="fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <PostCard post={post} lang={lang} />
              </div>
            ))}
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-12">
            <div className="sticky top-32">
              <div className="bg-sand/50 p-8 rounded-sm border border-charcoal/5 mb-12">
                <h3 className="font-display text-2xl font-bold text-charcoal mb-4">{texts.aboutTitle}</h3>
                <p className="font-serif text-charcoal/70 mb-6 leading-relaxed">
                  {texts.aboutText}
                </p>
                <div className="flex justify-center">
                   <PersianPattern variant="divider" className="w-full h-4 text-burgundy opacity-20" />
                </div>
              </div>

              <div className="space-y-8">
                 <h3 className="text-xs font-sans font-bold tracking-[0.2em] uppercase text-charcoal border-b border-charcoal/10 pb-2">
                  {texts.moreWriting}
                </h3>
                {sidePosts.length > 0 ? (
                  sidePosts.map((post) => (
                    <PostCard key={post.slug} post={post} minimal lang={lang} />
                  ))
                ) : (
                  <p className="text-sm font-serif text-charcoal/50 italic">{texts.noPosts}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function HomePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent searchParams={searchParams} />
    </Suspense>
  )
}
