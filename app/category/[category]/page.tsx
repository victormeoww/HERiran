import { getPostsByCategory } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PersianPattern from '@/components/PersianPattern'

interface CategoryPageProps {
  params: {
    category: string
  }
}

const validCategories = ['Essay', 'Breaking News', 'Personal']

export async function generateStaticParams() {
  return validCategories.map((category) => ({
    category: category,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.category)
  
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

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.category)
  
  if (!validCategories.includes(category)) {
    notFound()
  }

  const posts = getPostsByCategory(category)

  return (
    <div className="min-h-screen">
      {/* Category Header */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Link 
            href="/"
            className="inline-flex items-center text-charcoal/60 hover:text-burgundy transition-colors font-sans text-sm mb-8 group"
          >
            <svg className="w-4 h-4 mr-2 group-hover:mr-3 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>

          <h1 className="text-4xl md:text-6xl font-display font-bold text-charcoal mb-6">
            {category}
          </h1>
          
          <div className="flex justify-start">
            <PersianPattern variant="divider" className="w-48 h-6 text-burgundy" opacity={0.3} />
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
            {posts.map((post, index) => (
              <div 
                key={post.slug}
                className="fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <PersianPattern variant="star" className="w-24 h-24 text-burgundy opacity-10 mx-auto mb-8" />
            <p className="text-xl text-charcoal/60 font-serif">
              No {category.toLowerCase()} posts yet.
            </p>
            <Link 
              href="/"
              className="inline-block mt-6 text-burgundy font-sans text-sm uppercase tracking-wide hover:underline"
            >
              Browse all posts
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}

