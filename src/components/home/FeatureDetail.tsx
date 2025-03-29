
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface FeatureDetailProps {
  title: string;
  features: string[];
  className?: string;
}

const FeatureDetail = ({ title, features, className }: FeatureDetailProps) => {
  return (
    <div className={`p-6 rounded-xl border border-gray-100 ${className}`}>
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle size={20} className="text-green-600 mr-2 flex-shrink-0 mt-1" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureDetail;
