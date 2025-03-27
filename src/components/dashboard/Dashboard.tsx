
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../common/Card';
import Button from '../common/Button';
import { FadeIn, ScaleIn } from '../common/Transitions';
import { Shield, CheckSquare, AlertCircle, FileText, BarChart, Clock } from 'lucide-react';

interface ComplianceScoreProps {
  score: number;
  framework: string;
}

const ComplianceScore = ({ score, framework }: ComplianceScoreProps) => {
  // Determine color based on score
  const getColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const color = getColor(score);
  const percentage = Math.min(100, Math.max(0, score));
  const circumference = 2 * Math.PI * 40; // r = 40
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative inline-flex items-center justify-center">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            className="text-gray-200"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
          <circle
            className={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
        </svg>
        <span className={`absolute text-2xl font-bold ${color}`}>{score}%</span>
      </div>
      <p className="mt-2 text-sm text-gray-600">{framework} Compliance</p>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-gray-500">Your compliance overview and current status</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              leftIcon={<FileText size={16} />}
            >
              Export Report
            </Button>
            <Button
              leftIcon={<BarChart size={16} />}
            >
              View Analytics
            </Button>
          </div>
        </div>
      </FadeIn>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScaleIn delay={100}>
          <Card className="hover:shadow-premium-md transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Overall Compliance</CardTitle>
              <CardDescription>ISO 27001 Framework</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-4">
              <ComplianceScore score={78} framework="ISO 27001" />
            </CardContent>
          </Card>
        </ScaleIn>
        
        <ScaleIn delay={150}>
          <Card className="hover:shadow-premium-md transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Tasks Status</CardTitle>
              <CardDescription>Compliance activities</CardDescription>
            </CardHeader>
            <CardContent className="py-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col items-center p-2">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                    <CheckSquare size={18} className="text-green-600" />
                  </div>
                  <span className="text-2xl font-semibold">12</span>
                  <span className="text-xs text-gray-500">Completed</span>
                </div>
                <div className="flex flex-col items-center p-2">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mb-2">
                    <Clock size={18} className="text-yellow-600" />
                  </div>
                  <span className="text-2xl font-semibold">8</span>
                  <span className="text-xs text-gray-500">Pending</span>
                </div>
                <div className="flex flex-col items-center p-2">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-2">
                    <AlertCircle size={18} className="text-red-600" />
                  </div>
                  <span className="text-2xl font-semibold">3</span>
                  <span className="text-xs text-gray-500">Overdue</span>
                </div>
              </div>
              <div className="mt-4">
                <Button
                  variant="outline" 
                  className="w-full"
                  size="sm"
                >
                  View All Tasks
                </Button>
              </div>
            </CardContent>
          </Card>
        </ScaleIn>
        
        <ScaleIn delay={200}>
          <Card className="hover:shadow-premium-md transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Risk Overview</CardTitle>
              <CardDescription>Identified security risks</CardDescription>
            </CardHeader>
            <CardContent className="py-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">High Risk</span>
                  <span className="text-sm font-medium">4</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Medium Risk</span>
                  <span className="text-sm font-medium">9</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Low Risk</span>
                  <span className="text-sm font-medium">7</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
                
                <div className="mt-4">
                  <Button
                    variant="outline" 
                    className="w-full"
                    size="sm"
                  >
                    View Risk Assessment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScaleIn>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ScaleIn delay={250}>
          <Card className="hover:shadow-premium-md transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activities</CardTitle>
              <CardDescription>Latest compliance updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Shield size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {['Information Security Policy updated', 'Risk assessment completed', 'Access control review', 'Data backup verification'][i-1]}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {`${i} day${i > 1 ? 's' : ''} ago`} • {['John Doe', 'Sarah Lee', 'Mike Johnson', 'Emma Davis'][i-1]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button
                  variant="link" 
                  className="p-0 h-auto"
                  size="sm"
                >
                  View all activities
                </Button>
              </div>
            </CardContent>
          </Card>
        </ScaleIn>
        
        <ScaleIn delay={300}>
          <Card className="hover:shadow-premium-md transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
              <CardDescription>Tasks due soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                      <Clock size={16} className="text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">
                          {['Complete security training', 'Update access controls', 'Review vendor compliance'][i-1]}
                        </p>
                        <span className="text-xs bg-yellow-100 text-yellow-800 py-0.5 px-2 rounded">
                          {`${i * 2} days left`}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Assigned to {['All Staff', 'IT Security', 'Compliance Team'][i-1]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button
                  variant="outline" 
                  className="w-full"
                  size="sm"
                >
                  View All Deadlines
                </Button>
              </div>
            </CardContent>
          </Card>
        </ScaleIn>
      </div>
    </div>
  );
};

export default Dashboard;
