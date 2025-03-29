
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/common/Button';
import { FadeIn, SlideUp } from '@/components/common/Transitions';

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 px-6">
      <div className="container mx-auto text-center max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 animate-fade-in">
          Compliance Management Made Simple
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto animate-fade-in" style={{animationDelay: "200ms"}}>
          Automate your compliance journey with AI-powered policy generation and smart compliance management for ISO 27001, SOC 2, GDPR, HIPAA, and more.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{animationDelay: "400ms"}}>
          <Link to="/auth?mode=register">
            <Button size="lg" className="px-8 py-3 text-lg">
              Get Started Free
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
              View Demo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
