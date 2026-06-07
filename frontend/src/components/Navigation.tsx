import { useState } from 'react'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-max section-padding py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-truenorth-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="text-xl font-bold text-gray-900">TrueNorth</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-truenorth-600 transition-colors">Features</a>
            <a href="#proof" className="text-gray-600 hover:text-truenorth-600 transition-colors">Proof</a>
            <a href="#waitlist" className="btn-primary text-sm py-2 px-6">Join Waitlist</a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <a href="#features" className="block text-gray-600 hover:text-truenorth-600 transition-colors">Features</a>
            <a href="#proof" className="block text-gray-600 hover:text-truenorth-600 transition-colors">Proof</a>
            <a href="#waitlist" className="block btn-primary text-center text-sm py-2 px-6">Join Waitlist</a>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
