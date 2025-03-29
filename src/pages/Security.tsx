
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { PageTransition } from '@/components/common/Transitions';
import { Shield, Lock, Check, Server, Database, Key } from 'lucide-react';
import Footer from '@/components/home/Footer';
import Button from '@/components/common/Button';

const Security = () => {
  return (
    <div className="min-h-screen bg-[#111]">
      <Navbar />
      <PageTransition>
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Security</h1>
              <p className="text-xl text-gray-400">
                We take the security of your data seriously and implement best practices to protect your information
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">Our Security Commitment</h2>
                <p className="text-gray-400 text-lg mb-4">
                  At ComplyAI, security is not just a feature—it's the foundation of our platform. We've built our 
                  infrastructure and processes with security at the forefront, ensuring that your sensitive 
                  compliance data is protected at all times.
                </p>
                <p className="text-gray-400 text-lg mb-6">
                  Our team consists of security professionals with extensive experience in protecting critical systems 
                  and data. We continuously monitor, test, and improve our security measures to stay ahead of 
                  evolving threats.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  View Security Whitepaper
                </Button>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-64 h-64 relative">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse"></div>
                  <div className="absolute inset-8 bg-purple-500/20 rounded-full animate-pulse animation-delay-1000"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Shield className="h-32 w-32 text-blue-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <SecurityFeatureCard 
                title="Data Encryption"
                description="All data is encrypted both in transit and at rest using industry-standard encryption protocols."
                icon={<Lock className="h-8 w-8 text-blue-400" />}
              />
              <SecurityFeatureCard 
                title="Access Controls"
                description="Robust role-based access controls ensure users can only access the data they need."
                icon={<Key className="h-8 w-8 text-blue-400" />}
              />
              <SecurityFeatureCard 
                title="Regular Audits"
                description="Our infrastructure and application undergo regular security audits and penetration testing."
                icon={<Check className="h-8 w-8 text-blue-400" />}
              />
              <SecurityFeatureCard 
                title="Secure Infrastructure"
                description="Our cloud infrastructure is hosted on AWS with security best practices implemented."
                icon={<Server className="h-8 w-8 text-blue-400" />}
              />
              <SecurityFeatureCard 
                title="Data Isolation"
                description="Customer data is logically separated to ensure complete isolation and privacy."
                icon={<Database className="h-8 w-8 text-blue-400" />}
              />
              <SecurityFeatureCard 
                title="Compliance"
                description="We maintain compliance with SOC 2, ISO 27001, and other relevant standards."
                icon={<Shield className="h-8 w-8 text-blue-400" />}
              />
            </div>

            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl p-8 mb-16 border border-blue-800/30">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-4 text-white">Security Certifications</h2>
                <p className="text-lg text-gray-400 mb-8">
                  ComplyAI maintains the following security certifications and attestations:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <CertificationBadge name="SOC 2 Type II" />
                  <CertificationBadge name="ISO 27001" />
                  <CertificationBadge name="GDPR Compliant" />
                  <CertificationBadge name="HIPAA Compliant" />
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-8">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-4 text-white">Have Security Questions?</h2>
                <p className="text-lg text-gray-400 mb-8">
                  Our security team is available to discuss any questions or concerns you may have about our security practices.
                </p>
                <Button 
                  size="lg"
                  className="px-8 py-3 text-lg shadow-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none"
                >
                  Contact Security Team
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </PageTransition>
    </div>
  );
};

const SecurityFeatureCard = ({ title, description, icon }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 h-full">
      <div className="w-16 h-16 rounded-full bg-blue-900/20 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const CertificationBadge = ({ name }) => {
  return (
    <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-700/30 flex items-center justify-center">
      <span className="text-blue-300 font-medium">{name}</span>
    </div>
  );
};

export default Security;
