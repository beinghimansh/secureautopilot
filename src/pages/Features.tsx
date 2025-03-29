
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { PageTransition } from '@/components/common/Transitions';
import { Check, Shield, FileText, Lock, Zap } from 'lucide-react';
import Footer from '@/components/home/Footer';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Features = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <PageTransition skipAnimation={true}>
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl font-bold tracking-tight mb-4">Powerful Compliance Features</h1>
              <p className="text-xl text-gray-600">
                Our comprehensive platform provides all the tools you need to achieve and maintain compliance with multiple frameworks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <FeatureCard 
                title="AI-Powered Policy Generation"
                description="Create compliant policies in minutes with our advanced AI assistant. Save hours of manual policy writing."
                icon={<FileText className="h-6 w-6 text-blue-600" />}
              />
              <FeatureCard 
                title="Multiple Frameworks"
                description="Support for ISO 27001, SOC 2, HIPAA, GDPR, and PCI DSS compliance frameworks."
                icon={<Shield className="h-6 w-6 text-blue-600" />}
              />
              <FeatureCard 
                title="Secure Documentation"
                description="Centralized repository for all your compliance documentation with strong encryption."
                icon={<Lock className="h-6 w-6 text-blue-600" />}
              />
              <FeatureCard 
                title="Risk Management"
                description="Identify, assess, and mitigate risks with our comprehensive risk register."
                icon={<Zap className="h-6 w-6 text-blue-600" />}
              />
              <FeatureCard 
                title="Evidence Collection"
                description="Streamline your evidence collection process with automated reminders and secure storage."
                icon={<Check className="h-6 w-6 text-blue-600" />}
              />
              <FeatureCard 
                title="Control Implementation"
                description="Easily implement and track compliance controls across your organization."
                icon={<Shield className="h-6 w-6 text-blue-600" />}
              />
            </div>

            <div className="bg-blue-50 rounded-2xl p-8 mb-16">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <h2 className="text-3xl font-bold mb-4">Compare Frameworks</h2>
                <p className="text-lg text-gray-600">
                  See how our platform supports different compliance frameworks
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left">Framework</th>
                      <th className="py-3 px-4 text-left">Focus Area</th>
                      <th className="py-3 px-4 text-left">Control Count</th>
                      <th className="py-3 px-4 text-left">Policy Templates</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 font-medium">ISO 27001</td>
                      <td className="py-3 px-4">Information Security</td>
                      <td className="py-3 px-4">114</td>
                      <td className="py-3 px-4">27</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">SOC 2</td>
                      <td className="py-3 px-4">Service Organizations</td>
                      <td className="py-3 px-4">64</td>
                      <td className="py-3 px-4">18</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">HIPAA</td>
                      <td className="py-3 px-4">Healthcare</td>
                      <td className="py-3 px-4">42</td>
                      <td className="py-3 px-4">15</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">GDPR</td>
                      <td className="py-3 px-4">Data Protection</td>
                      <td className="py-3 px-4">38</td>
                      <td className="py-3 px-4">12</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">PCI DSS</td>
                      <td className="py-3 px-4">Payment Card Security</td>
                      <td className="py-3 px-4">78</td>
                      <td className="py-3 px-4">20</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </PageTransition>
    </div>
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Features;
