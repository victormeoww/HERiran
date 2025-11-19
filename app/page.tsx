import { getAllPosts, getFeaturedPost } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import PersianPattern from '@/components/PersianPattern'

export default function HomePage() {
  const featuredPost = getFeaturedPost()
  const allPosts = getAllPosts()
  // Filter out featured post, then slice
  const otherPosts = allPosts.filter(post => post.slug !== featuredPost?.slug)
  
  // Split posts for layout variety
  const mainPosts = otherPosts.slice(0, 4)
  const sidePosts = otherPosts.slice(4, 8)

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero / Featured Section */}
      <section className="relative pt-12 md:pt-24 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Statement */}
          <div className="text-center mb-20 fade-in">
             <div className="flex justify-center mb-6 opacity-40">
              <PersianPattern variant="star" className="w-12 h-12 text-burgundy" />
            </div>
            <h1 className="text-xl md:text-2xl font-display italic text-charcoal/60 max-w-xl mx-auto leading-relaxed">
              "Voices from the shadows, speaking truth to power."
            </h1>
          </div>

          {featuredPost && (
            <div className="fade-in delay-100">
              <PostCard post={featuredPost} featured />
            </div>
          )}
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-32">
        <div className="flex items-baseline justify-between mb-12 border-b border-charcoal/10 pb-4">
          <h2 className="text-xs font-sans font-bold tracking-[0.2em] uppercase text-charcoal">
            Latest Stories
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-20">
            {mainPosts.map((post, index) => (
              <div key={post.slug} className="fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <PostCard post={post} />
              </div>
            ))}
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-12">
            <div className="sticky top-32">
              <div className="bg-sand/50 p-8 rounded-sm border border-charcoal/5 mb-12">
                <h3 className="font-display text-2xl font-bold text-charcoal mb-4">About HER iran</h3>
                <p className="font-serif text-charcoal/70 mb-6 leading-relaxed">
                  An independent, anonymous platform documenting the struggle for freedom in Iran. 
                </p>
                <div className="flex justify-center">
                   <PersianPattern variant="divider" className="w-full h-4 text-burgundy opacity-20" />
                </div>
              </div>

              <div className="space-y-8">
                 <h3 className="text-xs font-sans font-bold tracking-[0.2em] uppercase text-charcoal border-b border-charcoal/10 pb-2">
                  More Writing
                </h3>
                {sidePosts.length > 0 ? (
                  sidePosts.map((post) => (
                    <PostCard key={post.slug} post={post} minimal />
                  ))
                ) : (
                  <p className="text-sm font-serif text-charcoal/50 italic">No more posts to load.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
