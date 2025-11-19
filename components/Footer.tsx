import Link from 'next/link'
import PersianPattern from './PersianPattern'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-charcoal text-cream mt-32 pt-24 pb-12 border-t-4 border-burgundy">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="inline-block">
              <h2 className="text-4xl font-display font-bold text-cream">
                HER <span className="text-burgundy italic">iran</span>
              </h2>
            </Link>
            <p className="text-lg font-serif text-cream/80 leading-relaxed max-w-md">
              An anonymous platform amplifying the voices of Iranian women. Uncensored, unfiltered, and resilient.
            </p>
          </div>

          {/* Links Column */}
          <div className="md:col-span-3 md:col-start-7 space-y-6">
            <h3 className="text-xs font-sans uppercase tracking-[0.2em] text-burgundy">Platform</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-cream/80 hover:text-white hover:underline decoration-burgundy underline-offset-4 transition-all">
                  Mission & About
                </Link>
              </li>
              <li>
                <Link href="/category/Essay" className="text-cream/80 hover:text-white hover:underline decoration-burgundy underline-offset-4 transition-all">
                  Essays
                </Link>
              </li>
              <li>
                <Link href="/category/Breaking News" className="text-cream/80 hover:text-white hover:underline decoration-burgundy underline-offset-4 transition-all">
                  Breaking News
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-xs font-sans uppercase tracking-[0.2em] text-burgundy">Connect</h3>
            <ul className="space-y-4">
              <li>
                <a href="mailto:heriran@protonmail.com" className="text-cream/80 hover:text-white hover:underline decoration-burgundy underline-offset-4 transition-all">
                  Secure Contact
                </a>
              </li>
              <li>
                <Link href="/rss.xml" className="text-cream/80 hover:text-white hover:underline decoration-burgundy underline-offset-4 transition-all">
                  RSS Feed
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs font-sans text-cream/40 tracking-wide">
            © {currentYear} HER IRAN. NO RIGHTS RESERVED.
          </p>
          
          <div className="flex items-center gap-2">
            <PersianPattern variant="geometric" className="w-6 h-6 text-burgundy opacity-50" />
          </div>

          <p className="text-xs font-sans text-cream/40 tracking-wide md:text-right">
            SECURE & ANONYMOUS
          </p>
        </div>
      </div>
    </footer>
  )
}
