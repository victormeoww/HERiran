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
    <div className="min-h-screen bg-cream">
      {/* Page Header */}
      <header className="max-w-[720px] mx-auto px-6 pt-24 pb-16 text-center">
        <span className="text-xs font-sans font-bold tracking-[0.2em] uppercase text-burgundy mb-4 block">
          The Mission
        </span>
        <h1 className="text-5xl md:text-6xl font-display font-bold text-charcoal mb-8">
          About HER iran
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
            <p className="lead">
              This is <strong>HER iran</strong> — an anonymous editorial platform where I, an Iranian woman living inside Iran, share my perspective on life, politics, society, and the everyday reality of living under this regime.
            </p>

            <h2>Why This Blog Exists</h2>
            <p>
              The stories you hear about Iran are often filtered, politicized, or incomplete. I write to offer something more honest: a direct, unfiltered look at life here — the struggles, the beauty, the contradictions, and the truths that don&apos;t make international headlines.
            </p>
            <p>
              I remain anonymous for my safety and the safety of those around me. This is not a choice; it is a necessity.
            </p>

            <div className="my-16 p-8 bg-sand border-l-4 border-burgundy">
              <h3 className="mt-0 text-2xl font-display font-bold text-charcoal">Platform Structure</h3>
              <ul className="mb-0">
                <li><strong>Essays</strong> — Longer reflections on Iranian society.</li>
                <li><strong>Breaking News</strong> — Real-time updates on events.</li>
                <li><strong>Personal</strong> — Intimate glimpses into daily life.</li>
              </ul>
            </div>

            <h2>How to Support</h2>
            <p>
              The best way to support this platform is to <strong>read, share carefully, and amplify these voices</strong>. If you share content from this site, please do so through secure channels and be mindful of who might be put at risk.
            </p>

            <hr />

            <div className="flex flex-col md:flex-row items-center justify-between bg-charcoal text-cream p-8 rounded-sm not-prose">
              <div>
                <h3 className="font-display text-2xl font-bold mb-2 text-cream">Secure Contact</h3>
                <p className="font-sans text-sm text-cream/70 mb-4 md:mb-0">
                  Encrypted communication is recommended.
                </p>
              </div>
              <a 
                href="mailto:heriran@protonmail.com"
                className="px-6 py-3 bg-cream text-charcoal font-sans font-bold text-xs uppercase tracking-widest hover:bg-burgundy hover:text-white transition-colors"
              >
                Email Me
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
