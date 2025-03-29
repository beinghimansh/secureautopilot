
import React from 'react';
import { Check } from 'lucide-react';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';
import PublicPageLayout from '@/components/layout/PublicPageLayout';

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <PublicPageLayout>
      <div className="pt-14 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-400">
              Choose the plan that's right for your organization's compliance needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <PricingCard 
              title="Starter"
              price={299}
              description="Perfect for startups and small businesses"
              features={[
                "Single compliance framework",
                "Basic policy templates",
                "Up to 5 team members",
                "Evidence management",
                "Email support"
              ]}
              buttonText="Start Free Trial"
              navigate={navigate}
              highlighted={false}
            />
            
            <PricingCard 
              title="Professional"
              price={599}
              description="Ideal for growing businesses with multiple compliance needs"
              features={[
                "Up to 3 compliance frameworks",
                "AI-powered policy generation",
                "Up to 15 team members",
                "Risk management",
                "Vendor assessment",
                "Priority support"
              ]}
              buttonText="Start Free Trial"
              navigate={navigate}
              highlighted={true}
            />
            
            <PricingCard 
              title="Enterprise"
              price={1299}
              description="Comprehensive solution for large organizations"
              features={[
                "Unlimited compliance frameworks",
                "Advanced AI customization",
                "Unlimited team members",
                "Custom integrations",
                "Dedicated success manager",
                "24/7 phone & email support",
                "On-premise deployment options"
              ]}
              buttonText="Contact Sales"
              navigate={navigate}
              highlighted={false}
            />
          </div>

          <div className="bg-[#1d1d1f] rounded-2xl p-8 border border-gray-800 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2 text-white">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-6">
              <FAQItem 
                question="Do you offer a free trial?"
                answer="Yes, we offer a 14-day free trial for all our plans. No credit card required."
              />
              <FAQItem 
                question="Can I change plans later?"
                answer="Absolutely! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
              />
              <FAQItem 
                question="Is there a discount for annual billing?"
                answer="Yes, you save 20% when you choose annual billing instead of monthly."
              />
              <FAQItem 
                question="How does the AI policy generation work?"
                answer="Our AI analyzes your organization's specifics and compliance requirements to generate customized policies that meet regulatory standards."
              />
              <FAQItem 
                question="Do you offer custom enterprise solutions?"
                answer="Yes, our enterprise plan can be further customized to meet your specific requirements. Contact our sales team for details."
              />
            </div>
          </div>
        </div>
      </div>
    </PublicPageLayout>
  );
};

const PricingCard = ({ title, price, description, features, buttonText, navigate, highlighted }) => {
  return (
    <div className={`h-full flex flex-col bg-[#1d1d1f] rounded-xl p-8 border ${highlighted ? 'border-blue-500 shadow-lg shadow-blue-900/20' : 'border-gray-800'} relative`}>
      {highlighted && (
        <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
          <span className="bg-blue-600 text-white text-sm px-4 py-1 rounded-full">Most Popular</span>
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold text-white">${price}</span>
        <span className="text-gray-400">/month</span>
      </div>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        className={`w-full mt-auto ${highlighted ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
        onClick={() => navigate('/auth?mode=register')}
      >
        {buttonText}
      </Button>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  return (
    <div className="border-b border-gray-800 pb-4">
      <h4 className="text-lg font-medium mb-2 text-white">{question}</h4>
      <p className="text-gray-400">{answer}</p>
    </div>
  );
};

export default Pricing;
