
import React from 'react';
import { SlideUp } from '@/components/common/Transitions';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-50 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in" style={{animationDelay: `${delay}ms`}}>
      <div className="mb-4 bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
