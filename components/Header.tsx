'use client'

import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function HeaderContent() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'fa'

  const getLink = (href: string) => {
    return lang === 'en' ? `${href}?lang=en` : href
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const categories = [
    { name: lang === 'fa' ? 'مقالات' : 'Essays', href: '/category/Essay' },
    { name: lang === 'fa' ? 'اخبار' : 'News', href: '/category/Breaking News' },
    { name: lang === 'fa' ? 'شخصی' : 'Personal', href: '/category/Personal' },
    { name: lang === 'fa' ? 'درباره ما' : 'About', href: '/about' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-700 cubic-bezier(0.22, 1, 0.36, 1) ${
        isScrolled 
          ? 'bg-cream/95 backdrop-blur-md border-b border-charcoal/5 py-4' 
          : 'bg-cream border-b border-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className={`flex items-center justify-between ${lang === 'fa' ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <Link href={getLink('/')} className="group relative z-50 block">
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tighter leading-none text-charcoal group-hover:opacity-80 transition-opacity">
              HER<span className="text-burgundy italic ml-1 font-serif">iran</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center space-x-12 ${lang === 'fa' ? 'flex-row-reverse space-x-reverse' : ''}`}>
            {categories.map((category) => (
              <Link
                key={category.name}
                href={getLink(category.href)}
                className={`text-[11px] font-sans font-bold tracking-[0.25em] uppercase transition-all relative group py-2 ${
                  isActive(category.href) ? 'text-burgundy' : 'text-charcoal/60 hover:text-burgundy'
                }`}
              >
                {category.name}
                <span className={`absolute -bottom-1 left-1/2 w-1 h-1 bg-burgundy rounded-full transform -translate-x-1/2 transition-all duration-300 ${
                  isActive(category.href) ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'
                }`} />
              </Link>
            ))}
            
            {/* Language Switcher */}
            <div className="h-4 w-px bg-charcoal/20 mx-4"></div>
            <Link
              href={lang === 'fa' ? `${pathname}?lang=en` : pathname}
              className="text-[11px] font-sans font-bold tracking-[0.25em] uppercase text-charcoal hover:text-burgundy transition-colors"
            >
              {lang === 'fa' ? 'English' : 'فارسی'}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-50 p-2 -mr-2 text-charcoal hover:text-burgundy transition-colors group"
            aria-label="Toggle menu"
          >
            <div className="w-8 flex flex-col items-end space-y-1.5">
              <span className={`block h-0.5 bg-current transition-all duration-500 cubic-bezier(0.22, 1, 0.36, 1) ${isMobileMenuOpen ? 'w-8 rotate-45 translate-y-2' : 'w-8 group-hover:w-6'}`} />
              <span className={`block h-0.5 bg-current transition-all duration-500 cubic-bezier(0.22, 1, 0.36, 1) ${isMobileMenuOpen ? 'opacity-0' : 'w-4 group-hover:w-8'}`} />
              <span className={`block h-0.5 bg-current transition-all duration-500 cubic-bezier(0.22, 1, 0.36, 1) ${isMobileMenuOpen ? 'w-8 -rotate-45 -translate-y-2' : 'w-6 group-hover:w-4'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-cream z-40 transition-transform duration-700 cubic-bezier(0.22, 1, 0.36, 1) md:hidden flex items-center justify-center ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav className="flex flex-col items-center space-y-10">
          {categories.map((category, idx) => (
            <Link
              key={category.name}
              href={getLink(category.href)}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-4xl font-display font-bold text-charcoal hover:text-burgundy hover:italic transition-all tracking-tight"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {category.name}
            </Link>
          ))}
          
          <Link
            href={lang === 'fa' ? `${pathname}?lang=en` : pathname}
            onClick={() => setIsMobileMenuOpen(false)}
             className="text-xl font-sans font-bold tracking-[0.25em] uppercase text-charcoal/60 hover:text-burgundy mt-8"
          >
             {lang === 'fa' ? 'English' : 'فارسی'}
          </Link>
        </nav>
        
        {/* Decorative Pattern in Menu */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center opacity-10 pointer-events-none">
           <svg className="w-32 h-32 text-burgundy" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
             <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" />
             <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" />
           </svg>
        </div>
      </div>
    </header>
  )
}

export default function Header() {
  return (
    <Suspense fallback={
      <header className="sticky top-0 z-50 py-8 bg-cream border-b border-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between">
            {/* Logo Fallback */}
            <div className="group relative z-50 block">
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tighter leading-none text-charcoal">
                HER<span className="text-burgundy italic ml-1 font-serif">iran</span>
              </h1>
            </div>
          </div>
        </div>
      </header>
    }>
      <HeaderContent />
    </Suspense>
  )
}
