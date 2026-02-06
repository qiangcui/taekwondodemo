import React from 'react';
import Hero from '../components/Hero';
import Programs from '../components/Programs';
import MissionStats from '../components/MissionStats';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />

      {/* Award Section */}
      <section className="py-16 bg-white text-center">
        <div className="container mx-auto px-4">
          <img
            src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600"
            alt="Martial arts training"
            className="w-full max-w-lg mx-auto mb-8 rounded-lg shadow-xl"
          />
          <p className="text-gray-900 font-bold text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed italic">
            Demo Academy has been recognized for excellence in program quality and community impact.
          </p>
        </div>
      </section>

      <Programs />
      <MissionStats />
      <Testimonials />
      <Contact />
    </>
  );
};

export default HomePage;