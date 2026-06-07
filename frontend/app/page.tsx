import React from 'react';
import Navigation from '../src/components/Navigation';
import Hero from '../src/components/Hero';
import ValueProps from '../src/components/ValueProps';
import SocialProof from '../src/components/SocialProof';
import WaitlistForm from '../src/components/WaitlistForm';
import Footer from '../src/components/Footer';

const Page: React.FC = () => {
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
  );
};

export default Page;
