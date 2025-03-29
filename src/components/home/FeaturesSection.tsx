
import React from 'react';
import FeatureDetail from './FeatureDetail';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
  const featureDetails = [
    {
      title: "AI-Powered Policy Creation",
      features: [
        "Auto-generate policies tailored to your organization",
        "Framework-specific requirements automatically incorporated",
        "Save hours of manual policy writing"
      ],
      className: "bg-gradient-to-br from-white to-blue-50"
    },
    {
      title: "Comprehensive Dashboard",
      features: [
        "Real-time compliance status overview",
        "Track progress across all compliance frameworks",
        "Actionable insights to improve compliance posture"
      ],
      className: "bg-gradient-to-br from-white to-purple-50"
    },
    {
      title: "Task Management",
      features: [
        "Assign and track compliance tasks",
        "Automated reminders for upcoming deadlines",
        "Streamlined workflow for evidence collection"
      ],
      className: "bg-gradient-to-br from-white to-green-50"
    },
    {
      title: "Audit Readiness",
      features: [
        "Centralized evidence repository",
        "Generate audit-ready reports with one click",
        "Demonstrate compliance with confidence"
      ],
      className: "bg-gradient-to-br from-white to-orange-50"
    }
  ];

  return (
    <section className="py-16 md:py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need for Compliance</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools you need to achieve and maintain compliance with multiple frameworks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {featureDetails.map((detail, index) => (
            <FeatureDetail 
              key={index}
              title={detail.title}
              features={detail.features}
              className={detail.className}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
