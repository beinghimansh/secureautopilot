
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FrameworkProps {
  title: string;
  description: string;
  icon: string;
  delay: number;
  gradientColors: string;
}

const Framework = ({ title, description, icon, delay, gradientColors }: FrameworkProps) => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      className={`${gradientColors} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}
      onClick={() => navigate('/compliance')}
    >
      <div className="flex items-start mb-4">
        <div className="mr-4 flex-shrink-0">
          <img src={icon} alt={title} className="h-14 w-14 object-contain" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-white/80 text-sm">{description}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button className="text-white hover:text-white/80 flex items-center text-sm font-medium">
          Learn more
          <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

const ComplianceFrameworks = () => {
  const frameworks = [
    {
      title: "ISO 27001",
      description: "Achieve ISO 27001 certification to demonstrate top-notch information security. Build trust with potential clients and close deals faster at home or abroad.",
      icon: "/lovable-uploads/30e28f07-808a-495f-b8d0-68e5ec5dff81.png",
      gradientColors: "bg-gradient-to-r from-blue-600 to-blue-800"
    },
    {
      title: "SOC 2",
      description: "Get SOC 2 compliant to meet U.S. market expectations, showcase your security practices and build trust with clients and expand your business.",
      icon: "/lovable-uploads/30e28f07-808a-495f-b8d0-68e5ec5dff81.png",
      gradientColors: "bg-gradient-to-r from-purple-600 to-indigo-800"
    },
    {
      title: "TISAX",
      description: "Comply with TISAX to meet the security requirements of the automotive industry. Unlock partnerships with OEMs and grow your business faster.",
      icon: "/lovable-uploads/30e28f07-808a-495f-b8d0-68e5ec5dff81.png",
      gradientColors: "bg-gradient-to-r from-green-500 to-emerald-700"
    },
    {
      title: "GDPR",
      description: "Show your commitment to data protection with GDPR compliance. Earn the trust of EU customers and secure more business opportunities.",
      icon: "/lovable-uploads/30e28f07-808a-495f-b8d0-68e5ec5dff81.png",
      gradientColors: "bg-gradient-to-r from-red-500 to-rose-700"
    },
    {
      title: "DORA",
      description: "Get DORA compliant to ensure operational resilience and meet EU regulations. Gain trust from financial institutions and expand confidently in the EU.",
      icon: "/lovable-uploads/30e28f07-808a-495f-b8d0-68e5ec5dff81.png",
      gradientColors: "bg-gradient-to-r from-orange-500 to-amber-700"
    },
    {
      title: "NIS2",
      description: "Achieve NIS2 compliance to meet new EU cybersecurity regulation. Protect your company from threats, and ensure regulatory compliance.",
      icon: "/lovable-uploads/30e28f07-808a-495f-b8d0-68e5ec5dff81.png",
      gradientColors: "bg-gradient-to-r from-cyan-500 to-sky-700"
    },
    {
      title: "ISO 27701",
      description: "Strengthen your commitment to privacy management with ISO 27701 certification. Meet global data privacy standards, building trust with clients.",
      icon: "/lovable-uploads/30e28f07-808a-495f-b8d0-68e5ec5dff81.png",
      gradientColors: "bg-gradient-to-r from-violet-500 to-purple-700"
    },
    {
      title: "ISO 27018",
      description: "Demonstrate your dedication to cloud data privacy with ISO 27018 certification. Enhance the protection of personal data.",
      icon: "/lovable-uploads/30e28f07-808a-495f-b8d0-68e5ec5dff81.png",
      gradientColors: "bg-gradient-to-r from-teal-500 to-emerald-700"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#111] to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Comprehensive Compliance Frameworks</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            One platform to manage all your compliance needs. Streamline your journey to certification with our AI-powered solution.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {frameworks.map((framework, index) => (
            <Framework
              key={framework.title}
              title={framework.title}
              description={framework.description}
              icon={framework.icon}
              delay={index}
              gradientColors={framework.gradientColors}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComplianceFrameworks;
