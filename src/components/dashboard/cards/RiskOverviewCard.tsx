
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import DashboardCard from '../common/DashboardCard';
import ProgressBar from '../common/ProgressBar';

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
  
  const viewRiskButton = (
    <Link to="/compliance/risks">
      <Button
        variant="outline" 
        className="w-full"
        size="sm"
      >
        View Risk Assessment
      </Button>
    </Link>
  );

  return (
    <DashboardCard 
      title="Risk Overview" 
      description="Identified security risks"
      footer={viewRiskButton}
      delay={delay}
      contentClassName="py-4"
    >
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm">High Risk</span>
          <span className="text-sm font-medium">{highRisks}</span>
        </div>
        <ProgressBar value={highPercentage} status="Critical" />
        
        <div className="flex justify-between items-center">
          <span className="text-sm">Medium Risk</span>
          <span className="text-sm font-medium">{mediumRisks}</span>
        </div>
        <ProgressBar value={mediumPercentage} status="Warning" />
        
        <div className="flex justify-between items-center">
          <span className="text-sm">Low Risk</span>
          <span className="text-sm font-medium">{lowRisks}</span>
        </div>
        <ProgressBar value={lowPercentage} status="Healthy" />
      </div>
    </DashboardCard>
  );
};

export default RiskOverviewCard;
