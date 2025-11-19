import { getPostsByCategory } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PersianPattern from '@/components/PersianPattern'

interface CategoryPageProps {
  params: {
    category: string
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

const validCategories = ['Essay', 'Breaking News', 'Personal']

export async function generateStaticParams() {
  return validCategories.map((category) => ({
    category: category,
  }))
}

export async function generateMetadata({ params, searchParams }: CategoryPageProps) {
  const category = decodeURIComponent(params.category)
  const lang = searchParams?.lang === 'en' ? 'en' : 'fa'
  
  if (!validCategories.includes(category)) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category} | HER iran`,
    description: `Browse all ${category} posts from HER iran`,
  }
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = decodeURIComponent(params.category)
  const lang = searchParams?.lang === 'en' ? 'en' : 'fa'
  const isRtl = lang === 'fa'
  
  if (!validCategories.includes(category)) {
    notFound()
  }

  const posts = getPostsByCategory(category, lang)

  const texts = {
    browsing: lang === 'fa' ? 'دسته بندی' : 'Browsing Category',
    noPosts: lang === 'fa' ? 'هیچ نوشته‌ای در این دسته یافت نشد.' : 'No posts found in this category.',
    returnHome: lang === 'fa' ? 'بازگشت به صفحه اصلی' : 'Return to Homepage',
    categories: {
      'Essay': lang === 'fa' ? 'مقالات' : 'Essay',
      'Breaking News': lang === 'fa' ? 'اخبار' : 'Breaking News',
      'Personal': lang === 'fa' ? 'شخصی' : 'Personal',
    },
    descriptions: {
      'Essay': lang === 'fa' ? 'تحلیل‌های عمیق و تاملاتی بر فرهنگ و سیاست.' : 'In-depth analysis and reflections on culture and politics.',
      'Breaking News': lang === 'fa' ? 'اخبار فوری و گزارش‌های میدانی.' : 'Urgent updates and reports from the ground.',
      'Personal': lang === 'fa' ? 'داستان‌های صمیمی و مشاهدات روزمره.' : 'Intimate stories and observations from daily life.',
    }
  }

  const displayCategory = texts.categories[category as keyof typeof texts.categories] || category
  const description = texts.descriptions[category as keyof typeof texts.descriptions] || ''

  return (
    <div className={`min-h-screen bg-cream ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Category Header */}
      <section className="pt-24 pb-16 border-b border-charcoal/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col items-center text-center">
            <span className="text-xs font-sans font-bold tracking-[0.2em] uppercase text-burgundy mb-4">
              {texts.browsing}
            </span>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-charcoal mb-8">
              {displayCategory}
            </h1>
            
            <div className="w-24 h-1 bg-burgundy/20 rounded-full mb-8"></div>
            
            <p className="text-xl font-serif text-charcoal/60 max-w-2xl">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {posts.map((post, index) => (
              <div 
                key={post.slug}
                className="fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PostCard post={post} lang={lang} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <PersianPattern variant="star" className="w-24 h-24 text-burgundy opacity-10 mx-auto mb-8" />
            <p className="text-xl text-charcoal/60 font-serif mb-8">
              {texts.noPosts}
            </p>
            <Link 
              href={lang === 'en' ? '/?lang=en' : '/'}
              className="text-burgundy border-b border-burgundy/30 hover:border-burgundy pb-1 transition-all"
            >
              {texts.returnHome}
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}
