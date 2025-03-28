
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { PageTransition } from '@/components/common/Transitions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { BarChart as BarChartIcon, PieChart, TrendingUp, LineChart } from 'lucide-react';
import { ScaleIn } from '@/components/common/Transitions';

// Assuming you'd use a charting library like recharts in a real app
const AnalyticsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10">
          <PageTransition>
            <div className="max-w-6xl mx-auto">
              <div className="mb-6">
                <h1 className="text-3xl font-semibold tracking-tight">Analytics</h1>
                <p className="text-gray-500">Compliance performance metrics and trends</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <ScaleIn delay={100}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChartIcon size={18} className="mr-2" />
                        Compliance by Framework
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="h-64 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <BarChartIcon size={64} className="mx-auto mb-4 text-gray-300" />
                        <p>Compliance percentage across different frameworks</p>
                      </div>
                    </CardContent>
                  </Card>
                </ScaleIn>
                
                <ScaleIn delay={150}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <PieChart size={18} className="mr-2" />
                        Risk Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="h-64 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <PieChart size={64} className="mx-auto mb-4 text-gray-300" />
                        <p>Distribution of risks by severity</p>
                      </div>
                    </CardContent>
                  </Card>
                </ScaleIn>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ScaleIn delay={200}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <TrendingUp size={18} className="mr-2" />
                        Compliance Trend
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="h-64 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <TrendingUp size={64} className="mx-auto mb-4 text-gray-300" />
                        <p>Compliance score trend over time</p>
                      </div>
                    </CardContent>
                  </Card>
                </ScaleIn>
                
                <ScaleIn delay={250}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <LineChart size={18} className="mr-2" />
                        Task Completion
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="h-64 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <LineChart size={64} className="mx-auto mb-4 text-gray-300" />
                        <p>Task completion rates over time</p>
                      </div>
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

export default AnalyticsPage;
