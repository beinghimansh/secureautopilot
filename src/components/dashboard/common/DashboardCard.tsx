
import React from 'react';
import { ScaleIn } from '@/components/common/Transitions';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  delay?: number;
  className?: string;
  contentClassName?: string;
}

const DashboardCard = ({ 
  title, 
  description, 
  children, 
  footer,
  delay = 100, 
  className,
  contentClassName
}: DashboardCardProps) => {
  return (
    <ScaleIn delay={delay}>
      <Card className={cn("hover:shadow-md transition-all duration-300", className)}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className={cn("pt-6", contentClassName)}>
          {children}
        </CardContent>
        {footer && (
          <CardFooter className="pt-4 flex justify-center">
            {footer}
          </CardFooter>
        )}
      </Card>
    </ScaleIn>
  );
};

export default DashboardCard;
