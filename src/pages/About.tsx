
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { PageTransition } from '@/components/common/Transitions';
import { Shield, Users, Award, Globe } from 'lucide-react';
import Footer from '@/components/home/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <PageTransition>
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl font-bold tracking-tight mb-4">About ComplyAI</h1>
              <p className="text-xl text-gray-600">
                We're on a mission to simplify compliance for businesses worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-600 text-lg mb-4">
                  ComplyAI was founded in 2023 by a team of compliance experts and AI engineers who saw a gap in the market. Compliance processes were too cumbersome, time-consuming, and expensive for most businesses.
                </p>
                <p className="text-gray-600 text-lg mb-4">
                  We set out to build a platform that would democratize compliance, making it accessible and manageable for organizations of all sizes - not just those with large compliance teams and budgets.
                </p>
                <p className="text-gray-600 text-lg">
                  Today, ComplyAI helps thousands of businesses achieve and maintain compliance with major regulatory frameworks, saving them time, reducing costs, and improving their security posture.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <img 
                  src="/lovable-uploads/49b99d24-0168-4ba5-bcfa-00f6358ae80a.png" 
                  alt="ComplyAI Team" 
                  className="rounded-xl shadow-lg max-w-full h-auto"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              <ValueCard 
                icon={<Shield className="h-8 w-8 text-blue-600" />}
                title="Security First"
                description="We believe security and compliance go hand in hand. Our platform is built with security at its core."
              />
              <ValueCard 
                icon={<Users className="h-8 w-8 text-blue-600" />}
                title="Customer Focused"
                description="Our customers' success is our success. We're dedicated to providing exceptional support and guidance."
              />
              <ValueCard 
                icon={<Award className="h-8 w-8 text-blue-600" />}
                title="Excellence"
                description="We strive for excellence in everything we do, from our platform to our customer service."
              />
              <ValueCard 
                icon={<Globe className="h-8 w-8 text-blue-600" />}
                title="Accessibility"
                description="We're committed to making compliance accessible to organizations of all sizes and industries."
              />
            </div>

            <div className="bg-gray-50 rounded-2xl p-10 mb-16">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
                <p className="text-lg text-gray-600">
                  Meet the experts behind ComplyAI
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <TeamMember 
                  name="Alex Johnson"
                  title="CEO & Co-Founder"
                  bio="Former CISO with 15+ years of experience in cybersecurity and compliance."
                />
                <TeamMember 
                  name="Sarah Chen"
                  title="CTO & Co-Founder"
                  bio="AI researcher and engineer with a background in machine learning and natural language processing."
                />
                <TeamMember 
                  name="Michael Rodriguez"
                  title="Chief Compliance Officer"
                  bio="Certified compliance professional with expertise in multiple regulatory frameworks."
                />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </PageTransition>
    </div>
  );
};

const ValueCard = ({ icon, title, description }) => {
  return (
    <div className="text-center p-6">
      <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const TeamMember = ({ name, title, bio }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
      <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
        <Users className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold mb-1">{name}</h3>
      <p className="text-blue-600 mb-3">{title}</p>
      <p className="text-gray-600">{bio}</p>
    </div>
  );
};

export default About;
