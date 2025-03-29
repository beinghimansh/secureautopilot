
import React from 'react';
import DashboardCard from '../common/DashboardCard';
import CircularProgress from '../common/CircularProgress';

interface ComplianceScoreProps {
  score: number;
  framework: string;
  delay?: number;
}

const ComplianceScoreCard = ({ score, framework, delay = 100 }: ComplianceScoreProps) => {
  return (
    <DashboardCard 
      title="Overall Compliance" 
      description={`${framework} Framework`}
      delay={delay}
      contentClassName="flex justify-center py-4"
    >
      <CircularProgress value={score} label={`${framework} Compliance`} />
    </DashboardCard>
  );
};

export default ComplianceScoreCard;
