
import React, { useState } from 'react';
import { toast } from 'sonner';
import Button from '../common/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../common/Card';
import { SlideUp, FadeIn } from '../common/Transitions';

interface PolicyGeneratorProps {
  frameworkId: string;
  onComplete: () => void;
}

const frameworkNames: Record<string, string> = {
  'iso27001': 'ISO 27001',
  'soc2': 'SOC 2',
  'gdpr': 'GDPR',
  'hipaa': 'HIPAA',
};

const PolicyGenerator = ({ frameworkId, onComplete }: PolicyGeneratorProps) => {
  const [companyName, setCompanyName] = useState('Acme Inc.');
  const [industry, setIndustry] = useState('Technology');
  const [companySize, setCompanySize] = useState('50-250');
  const [dataTypes, setDataTypes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const frameworkName = frameworkNames[frameworkId] || frameworkId;
  
  const simulateGeneration = () => {
    setIsGenerating(true);
    setProgress(0);
    
    const totalSteps = 100;
    const interval = 30;
    
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        
        if (newProgress >= totalSteps) {
          clearInterval(timer);
          setIsGenerating(false);
          setIsComplete(true);
          toast.success(`${frameworkName} policies generated successfully!`);
          return 100;
        }
        
        return newProgress;
      });
    }, interval);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    simulateGeneration();
  };
  
  return (
    <FadeIn className="w-full max-w-3xl mx-auto">
      <Card className="shadow-premium-md">
        <CardHeader>
          <CardTitle className="text-2xl">{frameworkName} Policy Generator</CardTitle>
          <CardDescription>
            AI will generate customized policies for your organization based on the {frameworkName} framework
          </CardDescription>
        </CardHeader>
        
        {!isGenerating && !isComplete ? (
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="companyName" className="text-sm font-medium">
                  Company Name
                </label>
                <input
                  id="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="industry" className="text-sm font-medium">
                  Industry
                </label>
                <select
                  id="industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  required
                >
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Education">Education</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Retail">Retail</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="companySize" className="text-sm font-medium">
                  Company Size
                </label>
                <select
                  id="companySize"
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  required
                >
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="50-250">50-250 employees</option>
                  <option value="250-1000">250-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="dataTypes" className="text-sm font-medium">
                  Types of Data Processed
                </label>
                <textarea
                  id="dataTypes"
                  value={dataTypes}
                  onChange={(e) => setDataTypes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-[100px]"
                  placeholder="E.g., customer PII, health records, payment information, etc."
                />
              </div>
              
              <Button
                type="submit"
                className="w-full"
                size="lg"
              >
                Generate Policies
              </Button>
            </form>
          </CardContent>
        ) : isGenerating ? (
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="w-full max-w-md mx-auto">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-primary text-white">
                      Generating
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-primary">
                      {progress}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/20">
                  <div
                    style={{ width: `${progress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-300"
                  ></div>
                </div>
              </div>
              <div className="text-center text-sm text-gray-600 mt-4">
                {progress < 30 && "Analyzing compliance requirements..."}
                {progress >= 30 && progress < 60 && "Customizing policies to your industry..."}
                {progress >= 60 && progress < 90 && "Generating documentation..."}
                {progress >= 90 && "Finalizing your compliance policies..."}
              </div>
            </div>
          </CardContent>
        ) : (
          <SlideUp>
            <CardContent className="py-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="m9 11 3 3L22 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">
                  {frameworkName} Policies Generated!
                </h3>
                <p className="text-gray-600">
                  Your custom compliance policies have been created based on your company profile
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium mb-2">Generated Documents:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span>Information Security Policy</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span>Risk Assessment</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span>Compliance Checklist</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span>Implementation Guide</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={onComplete}
                  className="px-6"
                  size="lg"
                >
                  View Policies
                </Button>
                <Button
                  variant="outline"
                  className="px-6"
                  size="lg"
                >
                  Download All (PDF)
                </Button>
              </div>
            </CardContent>
          </SlideUp>
        )}
      </Card>
    </FadeIn>
  );
};

export default PolicyGenerator;
