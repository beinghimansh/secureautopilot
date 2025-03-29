
import React from 'react';
import ComplianceScoreCard from './cards/ComplianceScoreCard';
import TasksStatusCard from './cards/TasksStatusCard';
import RiskOverviewCard from './cards/RiskOverviewCard';

const UserDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ComplianceScoreCard 
        score={78} 
        framework="ISO 27001" 
        delay={100} 
      />
      
      <TasksStatusCard 
        completedTasks={12} 
        pendingTasks={8} 
        overdueTasks={3} 
        delay={150} 
      />
      
      <RiskOverviewCard 
        highRisks={4} 
        mediumRisks={9} 
        lowRisks={7} 
        delay={200} 
      />
    </div>
  );
};

export default UserDashboard;
