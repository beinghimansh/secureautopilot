
import React from 'react';
import { Loader2, ArrowRight } from 'lucide-react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import Button from '@/components/common/Button';
import { motion } from 'framer-motion';

interface PolicyFormData {
  companyName: string;
  industry: string;
  companySize: string;
  dataTypes: string;
  businessLocation: string;
  infrastructureDetails: string;
  securityControls: string[];
  riskAppetite: string;
}

interface PolicyGeneratorFormProps {
  frameworkId: string;
  policyFormData: PolicyFormData;
  setPolicyFormData: React.Dispatch<React.SetStateAction<PolicyFormData>>;
  handlePolicyFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSecurityControlChange: (controlName: string) => void;
  handleGeneratePolicy: () => Promise<void>;
  generatingPolicy: boolean;
  onClose: () => void;
}

const formItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { 
      delay: i * 0.05,
      duration: 0.3 
    } 
  })
};

const PolicyGeneratorForm: React.FC<PolicyGeneratorFormProps> = ({
  frameworkId,
  policyFormData,
  handlePolicyFormChange,
  handleSecurityControlChange,
  handleGeneratePolicy,
  generatingPolicy,
  onClose,
}) => {
  const frameworkName = 
    frameworkId === 'iso27001' ? 'ISO 27001' : 
    frameworkId === 'soc2' ? 'SOC 2' : 
    frameworkId === 'gdpr' ? 'GDPR' : 
    frameworkId === 'hipaa' ? 'HIPAA' : 
    frameworkId === 'pci_dss' ? 'PCI DSS' : 'Compliance';

  // Validation checks
  const isFormValid = () => {
    return (
      policyFormData.companyName.trim() !== '' &&
      policyFormData.industry !== '' &&
      policyFormData.companySize !== '' &&
      policyFormData.dataTypes.trim() !== ''
    );
  };

  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle className="text-xl">{frameworkName} Policy Generator</DialogTitle>
        <DialogDescription>
          Fill in the details below to generate a customized {frameworkName} policy
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid gap-4 py-3 max-h-[70vh] overflow-y-auto pr-2">
        <motion.div
          custom={0}
          variants={formItemVariants}
          initial="hidden"
          animate="visible"
        >
          <label className="block text-sm font-medium mb-1" htmlFor="companyName">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            id="companyName"
            name="companyName"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={policyFormData.companyName}
            onChange={handlePolicyFormChange}
            placeholder="e.g., Acme Corporation"
            required
          />
        </motion.div>
        
        <motion.div
          custom={1}
          variants={formItemVariants}
          initial="hidden"
          animate="visible"
        >
          <label className="block text-sm font-medium mb-1" htmlFor="industry">
            Industry <span className="text-red-500">*</span>
          </label>
          <select
            id="industry"
            name="industry"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={policyFormData.industry}
            onChange={handlePolicyFormChange}
            required
          >
            <option value="">Select industry</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Retail">Retail</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Education">Education</option>
            <option value="Government">Government</option>
            <option value="Professional Services">Professional Services</option>
          </select>
        </motion.div>
        
        <motion.div
          custom={2}
          variants={formItemVariants}
          initial="hidden"
          animate="visible"
        >
          <label className="block text-sm font-medium mb-1" htmlFor="companySize">
            Company Size <span className="text-red-500">*</span>
          </label>
          <select
            id="companySize"
            name="companySize"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={policyFormData.companySize}
            onChange={handlePolicyFormChange}
            required
          >
            <option value="">Select company size</option>
            <option value="1-10 employees">1-10 employees</option>
            <option value="11-50 employees">11-50 employees</option>
            <option value="51-200 employees">51-200 employees</option>
            <option value="201-500 employees">201-500 employees</option>
            <option value="501-1000 employees">501-1000 employees</option>
            <option value="1000+ employees">1000+ employees</option>
          </select>
        </motion.div>
        
        <motion.div
          custom={3}
          variants={formItemVariants}
          initial="hidden"
          animate="visible"
        >
          <label className="block text-sm font-medium mb-1" htmlFor="businessLocation">
            Primary Business Location
          </label>
          <input
            id="businessLocation"
            name="businessLocation"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={policyFormData.businessLocation}
            onChange={handlePolicyFormChange}
            placeholder="e.g., United States"
          />
        </motion.div>
        
        <motion.div
          custom={4}
          variants={formItemVariants}
          initial="hidden"
          animate="visible"
        >
          <label className="block text-sm font-medium mb-1" htmlFor="dataTypes">
            Data Types Processed <span className="text-red-500">*</span>
          </label>
          <textarea
            id="dataTypes"
            name="dataTypes"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[80px]"
            value={policyFormData.dataTypes}
            onChange={handlePolicyFormChange}
            placeholder="e.g., Personal customer data, Financial information, Healthcare records"
            required
          />
        </motion.div>
        
        <motion.div
          custom={5}
          variants={formItemVariants}
          initial="hidden"
          animate="visible"
        >
          <label className="block text-sm font-medium mb-1" htmlFor="infrastructureDetails">
            Infrastructure Details
          </label>
          <textarea
            id="infrastructureDetails"
            name="infrastructureDetails"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[80px]"
            value={policyFormData.infrastructureDetails}
            onChange={handlePolicyFormChange}
            placeholder="e.g., Cloud services used, on-premises infrastructure, BYOD policies"
          />
        </motion.div>
        
        <motion.div
          custom={6}
          variants={formItemVariants}
          initial="hidden"
          animate="visible"
        >
          <label className="block text-sm font-medium mb-2">
            Security Controls in Place
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['Access Control', 'Encryption', 'Firewalls', 'Anti-virus', 'Multi-factor Authentication', 'Backup Systems', 'Incident Response', 'Physical Security', 'Vulnerability Management', 'SIEM Solution'].map(control => (
              <div key={control} className="flex items-center">
                <input
                  type="checkbox"
                  id={`control-${control}`}
                  checked={policyFormData.securityControls.includes(control)}
                  onChange={() => handleSecurityControlChange(control)}
                  className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={`control-${control}`} className="text-sm">{control}</label>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          custom={7}
          variants={formItemVariants}
          initial="hidden"
          animate="visible"
        >
          <label className="block text-sm font-medium mb-1" htmlFor="riskAppetite">
            Risk Appetite
          </label>
          <select
            id="riskAppetite"
            name="riskAppetite"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={policyFormData.riskAppetite}
            onChange={handlePolicyFormChange}
          >
            <option value="Low">Low (Risk Averse)</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High (Risk Tolerant)</option>
          </select>
        </motion.div>
      </div>
      
      <DialogFooter>
        <Button variant="outline" onClick={onClose} disabled={generatingPolicy}>
          Cancel
        </Button>
        <Button 
          onClick={handleGeneratePolicy}
          isLoading={generatingPolicy}
          disabled={generatingPolicy || !isFormValid()}
          leftIcon={generatingPolicy ? <Loader2 className="animate-spin" size={16} /> : <ArrowRight size={16} />}
        >
          {generatingPolicy ? 'Generating Policy...' : 'Generate Policy'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default PolicyGeneratorForm;
