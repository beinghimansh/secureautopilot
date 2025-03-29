
import React from 'react';
import PublicPageLayout from '@/components/layout/PublicPageLayout';
import { 
  Shield, 
  FileText, 
  BarChart, 
  UserCheck, 
  Settings, 
  Database, 
  Zap, 
  CheckCircle, 
  BellRing 
} from 'lucide-react';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const navigate = useNavigate();
  
  return (
    <PublicPageLayout>
      <div className="pt-14 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">
              Powerful Features for Seamless Compliance
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Discover how ComplyAI revolutionizes regulatory compliance with AI-powered tools and automation.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/auth?mode=register')}
              className="px-8 py-3 text-lg shadow-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none"
            >
              Start Free Trial
            </Button>
          </div>
          
          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <FeatureCard 
              icon={Shield}
              title="Multi-Framework Compliance"
              description="Support for ISO 27001, SOC 2, GDPR, HIPAA, PCI DSS and more in one unified platform."
            />
            <FeatureCard 
              icon={FileText}
              title="AI-Powered Policy Generator"
              description="Create customized policies in minutes with our advanced AI engine trained on regulatory requirements."
            />
            <FeatureCard 
              icon={BarChart}
              title="Real-time Compliance Dashboard"
              description="Monitor your compliance status across all frameworks with intuitive visualizations."
            />
            <FeatureCard 
              icon={UserCheck}
              title="Team Collaboration"
              description="Assign tasks, track progress, and collaborate on compliance activities across departments."
            />
            <FeatureCard 
              icon={Database}
              title="Evidence Repository"
              description="Centralized storage for all compliance evidence with automated categorization."
            />
            <FeatureCard 
              icon={Settings}
              title="Automated Controls Mapping"
              description="Map controls across multiple frameworks to reduce redundancy and streamline audits."
            />
            <FeatureCard 
              icon={Zap}
              title="Continuous Monitoring"
              description="Real-time alerts and notifications when compliance status changes or issues arise."
            />
            <FeatureCard 
              icon={CheckCircle}
              title="Vendor Risk Assessment"
              description="Evaluate and monitor third-party vendor compliance with customizable questionnaires."
            />
            <FeatureCard 
              icon={BellRing}
              title="Smart Notifications"
              description="Get timely alerts for upcoming deadlines, policy updates, and compliance changes."
            />
          </div>
          
          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-10 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to simplify your compliance journey?</h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of organizations that trust ComplyAI for their compliance needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg"
                onClick={() => navigate('/auth?mode=register')}
                className="bg-white text-blue-700 hover:bg-gray-100"
              >
                Start Free Trial
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/pricing')}
                className="border-white text-white hover:bg-white/10"
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PublicPageLayout>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-[#1d1d1f] border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
      <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default Features;
