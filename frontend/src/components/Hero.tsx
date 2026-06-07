import React from 'react'

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-truenorth-50 to-white section-padding">
      <div className="container-max text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            From Rough Idea to
            <span className="text-truenorth-600"> Credible Launch</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            TrueNorth gives founders a conversion-focused launch surface, operating plan,
            and outreach-ready assets — everything you need for your first credible launch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#waitlist" className="btn-primary text-lg">
              Get Early Access
            </a>
            <a href="#features" className="btn-secondary text-lg">
              See How It Works
            </a>
          </div>
          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-truenorth-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>14+ Launch Artifacts</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-truenorth-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Deployable Surface</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-truenorth-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Outreach-Ready Assets</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
