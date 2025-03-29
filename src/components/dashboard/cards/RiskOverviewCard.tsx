
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScaleIn } from '@/components/common/Transitions';
import { Link } from 'react-router-dom';

interface RiskOverviewCardProps {
  highRisks: number;
  mediumRisks: number;
  lowRisks: number;
  delay?: number;
}

const RiskOverviewCard = ({ 
  highRisks, 
  mediumRisks, 
  lowRisks, 
  delay = 200 
}: RiskOverviewCardProps) => {
  // Calculate percentages for risk bars
  const total = highRisks + mediumRisks + lowRisks;
  const highPercentage = total > 0 ? (highRisks / total) * 100 : 0;
  const mediumPercentage = total > 0 ? (mediumRisks / total) * 100 : 0;
  const lowPercentage = total > 0 ? (lowRisks / total) * 100 : 0;

  return (
    <ScaleIn delay={delay}>
      <Card className="hover:shadow-md transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Risk Overview</CardTitle>
          <CardDescription>Identified security risks</CardDescription>
        </CardHeader>
        <CardContent className="py-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">High Risk</span>
              <span className="text-sm font-medium">{highRisks}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: `${highPercentage}%` }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Medium Risk</span>
              <span className="text-sm font-medium">{mediumRisks}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${mediumPercentage}%` }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Low Risk</span>
              <span className="text-sm font-medium">{lowRisks}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${lowPercentage}%` }}></div>
            </div>
            
            <div className="mt-4">
              <Link to="/compliance/risks">
                <Button
                  variant="outline" 
                  className="w-full"
                  size="sm"
                >
                  View Risk Assessment
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </ScaleIn>
  );
};

export default RiskOverviewCard;
