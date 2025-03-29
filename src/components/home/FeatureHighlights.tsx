
import React from 'react';
import { Shield, FileText, CheckCircle, Lock } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeatureHighlights = () => {
  const features = [
    {
      icon: <Shield size={24} className="text-blue-600" />,
      title: "Multiple Frameworks",
      description: "Support for ISO 27001, SOC 2, HIPAA, GDPR, and PCI DSS compliance frameworks.",
      delay: 600
    },
    {
      icon: <FileText size={24} className="text-green-600" />,
      title: "AI Policy Generator",
      description: "Generate compliant policies in minutes with our advanced AI assistant.",
      delay: 700
    },
    {
      icon: <CheckCircle size={24} className="text-purple-600" />,
      title: "Evidence Collection",
      description: "Streamline your evidence collection and documentation in one secure place.",
      delay: 800
    },
    {
      icon: <Lock size={24} className="text-orange-600" />,
      title: "Risk Management",
      description: "Identify, assess, and mitigate risks with our comprehensive risk register.",
      delay: 900
    }
  ];

  return (
    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          delay={feature.delay}
        />
      ))}
    </div>
  );
};

export default FeatureHighlights;
