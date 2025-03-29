
import React from 'react';
import PublicPageLayout from '@/components/layout/PublicPageLayout';
import { 
  Shield, 
  Lock, 
  Server, 
  Eye, 
  RefreshCw, 
  Database, 
  UserCheck,
  CheckCircle
} from 'lucide-react';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';

const Security = () => {
  const navigate = useNavigate();
  
  return (
    <PublicPageLayout>
      <div className="pt-14 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">
              Security & Trust
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Learn how ComplyAI protects your data and maintains the highest security standards.
            </p>
          </div>
          
          {/* Main Security Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Our Security Commitment</h2>
              <p className="text-gray-400 mb-4">
                At ComplyAI, we understand that we're handling sensitive compliance data on behalf of our customers. That's why security is embedded in everything we do—from product development to our internal operations.
              </p>
              <p className="text-gray-400 mb-4">
                We've implemented comprehensive security measures that meet or exceed industry standards, ensuring your data remains protected at all times. Our security program is built on three core principles:
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <div className="mt-1 mr-3 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Lock className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Defense in Depth</h3>
                    <p className="text-gray-400">Multiple layers of security controls throughout our infrastructure and application</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-3 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Eye className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Transparency</h3>
                    <p className="text-gray-400">Clear communication about our security practices and incident response procedures</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-3 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <RefreshCw className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Continuous Improvement</h3>
                    <p className="text-gray-400">Regular security assessments, penetration testing, and program updates</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1d1d1f] rounded-xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-6">Our Certifications</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-white">ISO 27001</h3>
                    <p className="text-gray-400">Certified Information Security Management System</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-white">SOC 2 Type II</h3>
                    <p className="text-gray-400">Audited for Security, Availability, and Confidentiality</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-white">GDPR Compliant</h3>
                    <p className="text-gray-400">Comprehensive data protection measures</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-white">HIPAA Compliant</h3>
                    <p className="text-gray-400">Protected health information safeguards</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-800 pt-6">
                  <Button
                    onClick={() => navigate('/documentation')}
                    className="w-full"
                  >
                    View Security Documentation
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Security Features */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white text-center mb-10">Key Security Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SecurityFeatureCard 
                icon={Database}
                title="Data Encryption"
                description="All data is encrypted at rest and in transit using industry-standard AES-256 encryption."
              />
              
              <SecurityFeatureCard 
                icon={Server}
                title="Secure Infrastructure"
                description="Cloud infrastructure hosted on AWS with comprehensive security controls and monitoring."
              />
              
              <SecurityFeatureCard 
                icon={UserCheck}
                title="Access Controls"
                description="Role-based access control, MFA, and just-in-time access provisioning for all systems."
              />
              
              <SecurityFeatureCard 
                icon={Shield}
                title="Vulnerability Management"
                description="Regular vulnerability scanning, patching, and penetration testing by third parties."
              />
              
              <SecurityFeatureCard 
                icon={Eye}
                title="Activity Monitoring"
                description="Comprehensive logging and monitoring for detecting unauthorized access attempts."
              />
              
              <SecurityFeatureCard 
                icon={RefreshCw}
                title="Incident Response"
                description="24/7 security team with defined processes for security incident handling and notification."
              />
            </div>
          </div>
          
          {/* Request Security Documentation CTA */}
          <div className="bg-[#1d1d1f] border border-gray-800 rounded-xl p-8 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Need More Information?</h2>
            <p className="text-gray-400 mb-6">
              Enterprise customers can request our full security documentation package, including penetration test results and compliance attestations.
            </p>
            <Button
              onClick={() => navigate('/support')}
              className="px-6"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </PublicPageLayout>
  );
};

const SecurityFeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-[#1d1d1f] border border-gray-800 rounded-xl p-6">
      <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default Security;
