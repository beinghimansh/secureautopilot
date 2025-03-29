
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface IconStatProps {
  icon: LucideIcon;
  value: number | string;
  label: string;
  iconColor?: string;
  iconBgColor?: string;
  className?: string;
}

const IconStat = ({ 
  icon: Icon, 
  value, 
  label, 
  iconColor = 'text-primary', 
  iconBgColor = 'bg-primary/10',
  className 
}: IconStatProps) => {
  return (
    <div className={cn("flex flex-col items-center p-2", className)}>
      <div className={cn(`w-10 h-10 rounded-full ${iconBgColor} flex items-center justify-center mb-2`)}>
        <Icon size={18} className={iconColor} />
      </div>
      <span className="text-2xl font-semibold">{value}</span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
};

export default IconStat;
