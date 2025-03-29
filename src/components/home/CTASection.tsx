
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/common/Button';

const CTASection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="container mx-auto text-center max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Simplify Your Compliance Journey?</h2>
        <p className="text-xl mb-10 opacity-90">
          Join thousands of organizations that trust ComplyFlow for their compliance needs.
        </p>
        <Link to="/auth?mode=register">
          <Button variant="secondary" size="lg" className="px-8 py-3 text-lg">
            Start Your Free Trial
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
