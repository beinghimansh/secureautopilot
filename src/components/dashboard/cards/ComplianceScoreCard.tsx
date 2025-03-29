
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ScaleIn } from '@/components/common/Transitions';

interface ComplianceScoreProps {
  score: number;
  framework: string;
  delay?: number;
}

const ComplianceScore = ({ score, framework }: {score: number, framework: string}) => {
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

const ComplianceScoreCard = ({ score, framework, delay = 100 }: ComplianceScoreProps) => {
  return (
    <ScaleIn delay={delay}>
      <Card className="hover:shadow-md transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Overall Compliance</CardTitle>
          <CardDescription>{framework} Framework</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-4">
          <ComplianceScore score={score} framework={framework} />
        </CardContent>
      </Card>
    </ScaleIn>
  );
};

export default ComplianceScoreCard;
