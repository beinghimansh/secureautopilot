
import React, { useState } from 'react';
import PublicPageLayout from '@/components/layout/PublicPageLayout';
import { Search, Book, FileText, Code, HelpCircle, Layers, Shield } from 'lucide-react';

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    {
      title: 'Getting Started',
      icon: Book,
      docs: [
        { title: 'Platform Overview', slug: 'platform-overview' },
        { title: 'Setting Up Your Account', slug: 'account-setup' },
        { title: 'Navigating the Dashboard', slug: 'dashboard-navigation' },
        { title: 'Understanding Compliance Frameworks', slug: 'frameworks-intro' }
      ]
    },
    {
      title: 'Policy Management',
      icon: FileText,
      docs: [
        { title: 'Using the Policy Generator', slug: 'policy-generator' },
        { title: 'Customizing Policy Templates', slug: 'policy-customization' },
        { title: 'Reviewing and Approving Policies', slug: 'policy-workflow' },
        { title: 'Policy Distribution', slug: 'policy-distribution' }
      ]
    },
    {
      title: 'Framework Compliance',
      icon: Layers,
      docs: [
        { title: 'ISO 27001 Implementation Guide', slug: 'iso-27001-guide' },
        { title: 'SOC 2 Requirements Guide', slug: 'soc2-guide' },
        { title: 'GDPR Compliance Steps', slug: 'gdpr-steps' },
        { title: 'HIPAA Compliance Guide', slug: 'hipaa-guide' }
      ]
    },
    {
      title: 'Risk Management',
      icon: Shield,
      docs: [
        { title: 'Risk Assessment Process', slug: 'risk-assessment' },
        { title: 'Risk Register Management', slug: 'risk-register' },
        { title: 'Risk Treatment Plans', slug: 'risk-treatment' },
        { title: 'Vendor Risk Management', slug: 'vendor-risk' }
      ]
    },
    {
      title: 'API & Integrations',
      icon: Code,
      docs: [
        { title: 'API Documentation', slug: 'api-docs' },
        { title: 'Authentication', slug: 'api-auth' },
        { title: 'Webhook Integration', slug: 'webhooks' },
        { title: 'Third-party Integrations', slug: 'third-party-integrations' }
      ]
    },
    {
      title: 'Troubleshooting',
      icon: HelpCircle,
      docs: [
        { title: 'Common Issues', slug: 'common-issues' },
        { title: 'Error Messages Guide', slug: 'error-messages' },
        { title: 'Contact Support', slug: 'contact-support' },
        { title: 'System Status', slug: 'system-status' }
      ]
    }
  ];
  
  const filteredCategories = searchQuery
    ? categories.map(category => ({
        ...category,
        docs: category.docs.filter(doc => 
          doc.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.docs.length > 0)
    : categories;
  
  return (
    <PublicPageLayout>
      <div className="pt-14 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">
              Documentation
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Comprehensive guides and resources for using ComplyAI effectively.
            </p>
            
            {/* Search */}
            <div className="relative max-w-lg mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 bg-[#1d1d1f] border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              />
            </div>
          </div>
          
          {/* Documentation Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.map((category) => (
              <div key={category.title} className="bg-[#1d1d1f] border border-gray-800 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mr-3">
                    <category.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">{category.title}</h2>
                </div>
                
                <ul className="space-y-3">
                  {category.docs.map((doc) => (
                    <li key={doc.slug}>
                      <a 
                        href={`/documentation/${doc.slug}`}
                        className="text-gray-400 hover:text-blue-400 transition-colors flex items-center"
                      >
                        <FileText className="h-4 w-4 mr-2 text-gray-500" />
                        {doc.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No results found for "{searchQuery}".</p>
              <p className="text-gray-500 mt-2">Try a different search term or browse the categories.</p>
            </div>
          )}
          
          {/* Help CTA */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Need Additional Help?</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Our support team is available to assist you with any questions or issues you may encounter.
            </p>
            <a 
              href="/support"
              className="inline-block px-6 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </PublicPageLayout>
  );
};

export default Documentation;
