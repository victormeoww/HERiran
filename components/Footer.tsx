import Link from 'next/link'
import PersianPattern from './PersianPattern'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-charcoal text-cream mt-32 pt-24 pb-12 relative overflow-hidden">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-burgundy via-gold to-burgundy opacity-80"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-20">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-8">
            <Link href="/" className="inline-block group">
              <h2 className="text-5xl font-display font-bold text-cream tracking-tighter group-hover:opacity-90 transition-opacity">
                HER <span className="text-burgundy italic font-serif">iran</span>
              </h2>
            </Link>
            <p className="text-xl font-serif text-cream/70 leading-relaxed max-w-md italic">
              &quot;An anonymous platform amplifying the voices of Iranian women. Uncensored, unfiltered, and resilient.&quot;
            </p>
          </div>

          {/* Links Column */}
          <div className="md:col-span-3 md:col-start-7 space-y-8">
            <h3 className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-gold">Platform</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-sm font-sans tracking-widest text-cream/60 hover:text-white hover:pl-2 transition-all duration-300 uppercase">
                  Mission & About
                </Link>
              </li>
              <li>
                <Link href="/category/Essay" className="text-sm font-sans tracking-widest text-cream/60 hover:text-white hover:pl-2 transition-all duration-300 uppercase">
                  Essays
                </Link>
              </li>
              <li>
                <Link href="/category/Breaking News" className="text-sm font-sans tracking-widest text-cream/60 hover:text-white hover:pl-2 transition-all duration-300 uppercase">
                  Breaking News
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-3 space-y-8">
            <h3 className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-gold">Connect</h3>
            <ul className="space-y-4">
              <li>
                <a href="mailto:heriran@protonmail.com" className="text-sm font-sans tracking-widest text-cream/60 hover:text-white hover:pl-2 transition-all duration-300 uppercase">
                  Secure Contact
                </a>
              </li>
              <li>
                <Link href="/rss.xml" className="text-sm font-sans tracking-widest text-cream/60 hover:text-white hover:pl-2 transition-all duration-300 uppercase">
                  RSS Feed
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[10px] font-sans font-bold text-cream/30 tracking-[0.2em] uppercase">
            © {currentYear} HER IRAN. NO RIGHTS RESERVED.
          </p>
          
          <div className="flex items-center gap-4 opacity-30">
            <PersianPattern variant="geometric" className="w-4 h-4 text-gold" />
            <PersianPattern variant="geometric" className="w-4 h-4 text-gold" />
            <PersianPattern variant="geometric" className="w-4 h-4 text-gold" />
          </div>

          <p className="text-[10px] font-sans font-bold text-cream/30 tracking-[0.2em] uppercase md:text-right">
            SECURE & ANONYMOUS
          </p>
        </div>
      </div>
    </footer>
  )
}
