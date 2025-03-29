
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, InfoIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/common/Card';
import { ScaleIn } from '@/components/common/Transitions';

interface FrameworkHeaderProps {
  frameworkId: string;
  frameworkName: string;
}

const FrameworkHeader: React.FC<FrameworkHeaderProps> = ({ frameworkId, frameworkName }) => {
  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6 flex justify-between items-center"
      >
        <div>
          <div className="flex items-center mb-2">
            <Button
              variant="outline"
              size="sm"
              className="mr-3 flex items-center"
              asChild
            >
              <Link to="/compliance">
                <ChevronLeft size={16} className="mr-1" />
                Back to Frameworks
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            {frameworkName} Requirements
          </h1>
          <p className="text-gray-600">Manage your compliance controls and implementation status</p>
        </div>
      </motion.div>
      
      <ScaleIn delay={100}>
        <Card className="mb-6 border-blue-200 bg-blue-50/50">
          <CardContent className="p-4 flex items-start gap-3">
            <InfoIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-800 mb-1">About {frameworkName}</h3>
              <p className="text-sm text-blue-700">
                {frameworkId === 'iso27001' && 'ISO 27001 is an international standard for information security management. It provides a framework for organizations to protect their information through policies and procedures.'}
                {frameworkId === 'gdpr' && 'GDPR (General Data Protection Regulation) is a regulation in EU law on data protection and privacy for all individuals within the European Union and the European Economic Area.'}
                {frameworkId === 'soc2' && 'SOC 2 is a voluntary compliance standard for service organizations that specifies how organizations should manage customer data.'}
                {frameworkId === 'hipaa' && 'HIPAA (Health Insurance Portability and Accountability Act) is a US legislation that provides data privacy and security provisions for safeguarding medical information.'}
              </p>
            </div>
          </CardContent>
        </Card>
      </ScaleIn>
    </>
  );
};

export default FrameworkHeader;
