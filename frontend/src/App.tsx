import React from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import ValueProps from './components/ValueProps'
import SocialProof from './components/SocialProof'
import WaitlistForm from './components/WaitlistForm'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <ValueProps />
        <SocialProof />
        <WaitlistForm />
      </main>
      <Footer />
    </div>
  )
}

export default App
