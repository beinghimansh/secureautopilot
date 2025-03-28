
import React from 'react';
import { FileText, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/common/Card';
import Button from '@/components/common/Button';

interface DocumentsSectionProps {
  frameworkId: string;
}

const DocumentsSection: React.FC<DocumentsSectionProps> = ({ frameworkId }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Documents</h2>
          <div className="flex items-center justify-center h-40 bg-gray-100 rounded-md border border-dashed border-gray-300 text-gray-500">
            <div className="text-center">
              <FileText size={40} className="mx-auto text-gray-400 mb-2" />
              <p>No documents to display</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                leftIcon={<Plus size={16} />}
              >
                Upload Document
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Required Evidence</h2>
          <div className="space-y-3">
            {[
              'Information Security Policy',
              'Risk Assessment Methodology',
              'Access Control Procedure',
              'Asset Management Register',
              'Incident Response Plan'
            ].map((doc, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-md border border-gray-200 flex justify-between items-center">
                <div className="flex items-center">
                  <FileText size={20} className="text-blue-600 mr-3" />
                  <span>{doc}</span>
                </div>
                <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                  Required
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsSection;
