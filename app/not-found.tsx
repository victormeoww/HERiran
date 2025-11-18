import Link from 'next/link'
import PersianPattern from '@/components/PersianPattern'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <div className="mb-8 flex justify-center">
          <PersianPattern variant="star" className="w-32 h-32 text-burgundy opacity-20" />
        </div>

        <h1 className="text-6xl md:text-8xl font-display font-bold text-charcoal mb-6">
          404
        </h1>

        <h2 className="text-3xl md:text-4xl font-display font-semibold text-charcoal mb-6">
          Page Not Found
        </h2>

        <p className="text-xl text-charcoal/70 mb-12 font-serif">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link 
          href="/"
          className="inline-flex items-center px-8 py-4 bg-burgundy text-cream font-sans text-sm uppercase tracking-wide rounded-lg hover:bg-burgundy/90 transition-colors group"
        >
          <svg className="w-4 h-4 mr-2 group-hover:mr-3 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Return Home
        </Link>
      </div>
    </div>
  )
}

