
import React from 'react';
import PublicPageLayout from '@/components/layout/PublicPageLayout';
import { Shield, Award, Users, Globe, Heart } from 'lucide-react';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  
  return (
    <PublicPageLayout>
      <div className="pt-14 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">
              Our Mission
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Simplifying compliance for businesses of all sizes with cutting-edge AI technology.
            </p>
          </div>
          
          {/* About Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Who We Are</h2>
              <p className="text-gray-400">
                ComplyAI was founded in 2021 by a team of compliance experts and AI engineers who recognized the challenges organizations face in navigating complex regulatory landscapes.
              </p>
              <p className="text-gray-400">
                Our diverse team brings together expertise from cybersecurity, regulatory compliance, machine learning, and user experience design to create a platform that transforms how businesses approach compliance.
              </p>
              <p className="text-gray-400">
                Today, we serve thousands of clients worldwide, from startups to Fortune 500 companies, helping them achieve and maintain compliance efficiently.
              </p>
            </div>
            
            <div className="bg-[#1d1d1f] rounded-xl p-8 border border-gray-800">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">ComplyAI</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Award className="h-5 w-5 text-blue-400 mr-3 mt-1" />
                  <div>
                    <h4 className="text-white font-medium">Industry Recognition</h4>
                    <p className="text-gray-400">Named "Most Innovative Compliance Solution" by TechAwards 2023</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-blue-400 mr-3 mt-1" />
                  <div>
                    <h4 className="text-white font-medium">Team Strength</h4>
                    <p className="text-gray-400">100+ employees across 12 countries</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-blue-400 mr-3 mt-1" />
                  <div>
                    <h4 className="text-white font-medium">Global Reach</h4>
                    <p className="text-gray-400">Serving clients in over 30 countries</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Heart className="h-5 w-5 text-blue-400 mr-3 mt-1" />
                  <div>
                    <h4 className="text-white font-medium">Customer Satisfaction</h4>
                    <p className="text-gray-400">98% client retention rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Values Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ValueCard 
                title="Innovation"
                description="We constantly push the boundaries of what's possible with AI in compliance."
              />
              <ValueCard 
                title="Integrity"
                description="We uphold the highest standards of ethics in everything we do."
              />
              <ValueCard 
                title="Simplicity"
                description="We make complex compliance requirements accessible and manageable."
              />
              <ValueCard 
                title="Customer Success"
                description="Your compliance success is our ultimate measure of achievement."
              />
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Join Us On Our Mission</h2>
            <p className="text-gray-400 mb-8">
              Experience how ComplyAI can transform your compliance program with our platform.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/auth?mode=register')}
              className="px-8 py-3 text-lg shadow-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none"
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </PublicPageLayout>
  );
};

const ValueCard = ({ title, description }) => {
  return (
    <div className="bg-[#1d1d1f] border border-gray-800 rounded-xl p-6 text-center">
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default About;
