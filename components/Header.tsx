'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const categories = [
    { name: 'Essays', href: '/category/Essay' },
    { name: 'News', href: '/category/Breaking News' },
    { name: 'Personal', href: '/category/Personal' },
    { name: 'About', href: '/about' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-500 ease-in-out border-b ${
        isScrolled 
          ? 'bg-cream/95 backdrop-blur-sm border-charcoal/5 py-3' 
          : 'bg-cream border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group relative z-50">
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight leading-none">
              <span className="text-charcoal">HER</span>
              <span className="text-burgundy italic ml-1">iran</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className={`text-xs font-sans tracking-[0.2em] uppercase transition-colors relative group py-2 ${
                  isActive(category.href) ? 'text-burgundy' : 'text-charcoal/80 hover:text-burgundy'
                }`}
              >
                {category.name}
                <span className={`absolute bottom-0 left-0 w-full h-px bg-burgundy transform origin-left transition-transform duration-300 ${
                  isActive(category.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-50 p-2 -mr-2 text-charcoal hover:text-burgundy transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col items-end space-y-1.5">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'w-4'}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-cream z-40 transition-transform duration-500 ease-in-out md:hidden flex items-center justify-center ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav className="flex flex-col items-center space-y-8">
          {categories.map((category, idx) => (
            <Link
              key={category.name}
              href={category.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-display font-medium text-charcoal hover:text-burgundy hover:italic transition-all"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
