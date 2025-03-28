
import React from 'react';

interface ComplianceHeaderProps {
  title?: string;
  description?: string;
}

const ComplianceHeader: React.FC<ComplianceHeaderProps> = ({ 
  title = "Compliance Frameworks",
  description = "Choose a framework to start automating your compliance"
}) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ComplianceHeader;
