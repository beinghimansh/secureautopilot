
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeatureDetailProps {
  title: string;
  features: string[];
  className?: string;
  index?: number;
}

const FeatureDetail = ({ title, features, className, index = 0 }: FeatureDetailProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`p-6 rounded-xl border border-gray-100 ${className}`}
    >
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <ul className="space-y-3">
        {features.map((feature, idx) => (
          <motion.li 
            key={idx} 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: (index * 0.1) + (idx * 0.05) }}
            className="flex items-start"
          >
            <CheckCircle size={20} className="text-green-600 mr-2 flex-shrink-0 mt-1" />
            <span>{feature}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default FeatureDetail;
