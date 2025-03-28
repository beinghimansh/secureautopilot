
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { PageTransition } from '@/components/common/Transitions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import Button from '@/components/common/Button';
import { FileText, Download, FileCheck } from 'lucide-react';
import { ScaleIn } from '@/components/common/Transitions';
import { toast } from 'sonner';

const ExportReportPage = () => {
  const [exporting, setExporting] = useState(false);
  
  const handleExport = (reportType: string) => {
    setExporting(true);
    // Simulate export process
    setTimeout(() => {
      setExporting(false);
      toast.success(`${reportType} report exported successfully!`);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10">
          <PageTransition>
            <div className="max-w-6xl mx-auto">
              <div className="mb-6">
                <h1 className="text-3xl font-semibold tracking-tight">Export Reports</h1>
                <p className="text-gray-500">Generate and download compliance reports</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ScaleIn delay={100}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FileText size={18} className="mr-2" />
                        Compliance Summary Report
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        A comprehensive overview of your organization's compliance status across all frameworks.
                      </p>
                      <Button 
                        leftIcon={<Download size={16} />} 
                        onClick={() => handleExport('Compliance Summary')}
                        isLoading={exporting}
                      >
                        Export Report
                      </Button>
                    </CardContent>
                  </Card>
                </ScaleIn>
                
                <ScaleIn delay={150}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FileCheck size={18} className="mr-2" />
                        ISO 27001 Compliance Report
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Detailed report on ISO 27001 controls, implementation status, and evidence.
                      </p>
                      <Button 
                        leftIcon={<Download size={16} />} 
                        onClick={() => handleExport('ISO 27001')}
                        isLoading={exporting}
                      >
                        Export Report
                      </Button>
                    </CardContent>
                  </Card>
                </ScaleIn>
                
                <ScaleIn delay={200}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FileCheck size={18} className="mr-2" />
                        Risk Assessment Report
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Comprehensive analysis of identified risks, their impacts, and mitigation strategies.
                      </p>
                      <Button 
                        leftIcon={<Download size={16} />} 
                        onClick={() => handleExport('Risk Assessment')}
                        isLoading={exporting}
                      >
                        Export Report
                      </Button>
                    </CardContent>
                  </Card>
                </ScaleIn>
                
                <ScaleIn delay={250}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FileCheck size={18} className="mr-2" />
                        Audit Trail Report
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Chronological record of all compliance-related activities and changes.
                      </p>
                      <Button 
                        leftIcon={<Download size={16} />} 
                        onClick={() => handleExport('Audit Trail')}
                        isLoading={exporting}
                      >
                        Export Report
                      </Button>
                    </CardContent>
                  </Card>
                </ScaleIn>
              </div>
            </div>
          </PageTransition>
        </main>
      </div>
    </div>
  );
};

export default ExportReportPage;
