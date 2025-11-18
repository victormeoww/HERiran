import { getPageContent } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import PersianPattern from '@/components/PersianPattern'

export const metadata = {
  title: 'About | HER iran',
  description: 'Learn about HER iran - an anonymous voice from inside Iran',
}

export default function AboutPage() {
  const pageData = getPageContent('about')

  return (
    <div className="min-h-screen">
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <Link 
          href="/"
          className="inline-flex items-center text-charcoal/60 hover:text-burgundy transition-colors font-sans text-sm group"
        >
          <svg className="w-4 h-4 mr-2 group-hover:mr-3 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to home
        </Link>
      </div>

      {/* Page Header */}
      <header className="max-w-article mx-auto px-6 md:px-12 py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-charcoal leading-tight mb-8">
          About
        </h1>

        <div className="flex justify-start mb-8">
          <PersianPattern variant="divider" className="w-48 h-6 text-burgundy" opacity={0.3} />
        </div>
      </header>

      {/* Page Content */}
      <div className="max-w-article mx-auto px-6 md:px-12 pb-24">
        {pageData ? (
          <div className="prose">
            <MDXRemote source={pageData.content} />
          </div>
        ) : (
          <div className="prose">
            <p className="text-xl leading-relaxed">
              This is <strong>HER iran</strong> — an anonymous editorial platform where I, an Iranian woman living inside Iran, share my perspective on life, politics, society, and the everyday reality of living under this regime.
            </p>

            <h2>Why This Blog Exists</h2>
            <p>
              The stories you hear about Iran are often filtered, politicized, or incomplete. I write to offer something more honest: a direct, unfiltered look at life here — the struggles, the beauty, the contradictions, and the truths that don&apos;t make international headlines.
            </p>

            <p>
              I remain anonymous for my safety and the safety of those around me. This is not a choice; it is a necessity.
            </p>

            <h2>What You&apos;ll Find Here</h2>
            <ul>
              <li><strong>Essays</strong> — Longer reflections on Iranian society, culture, politics, and personal experience.</li>
              <li><strong>Breaking News</strong> — Real-time updates on events inside Iran that may not be widely reported.</li>
              <li><strong>Personal</strong> — Intimate glimpses into daily life, observations, and moments of resistance and resilience.</li>
            </ul>

            <h2>How to Support This Work</h2>
            <p>
              The best way to support this platform is to <strong>read, share carefully, and amplify these voices</strong>. If you share content from this site, please do so through secure channels and be mindful of who might be put at risk.
            </p>

            <p>
              You can also subscribe via <Link href="/rss.xml">RSS</Link> to follow updates without repeatedly visiting the site.
            </p>

            <h2>Secure Contact</h2>
            <p>
              If you need to reach me securely, you can email: <a href="mailto:heriran@protonmail.com">heriran@protonmail.com</a>
            </p>

            <p className="text-base text-charcoal/60 italic">
              Please use encrypted communication and be aware that correspondence may be monitored.
            </p>

            <div className="mt-12 flex justify-center">
              <PersianPattern variant="star" className="w-20 h-20 text-burgundy opacity-20" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

