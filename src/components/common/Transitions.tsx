
import React from "react";
import { cn } from "@/lib/utils";

interface FadeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  show?: boolean;
  duration?: number;
  delay?: number;
}

export const FadeIn: React.FC<FadeProps> = ({
  children,
  show = true,
  duration = 300,
  delay = 0,
  className,
  ...props
}) => {
  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transition: `opacity ${duration}ms ease-in-out ${delay}ms`,
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const SlideUp: React.FC<FadeProps> = ({
  children,
  show = true,
  duration = 300,
  delay = 0,
  className,
  ...props
}) => {
  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity ${duration}ms ease-in-out ${delay}ms, transform ${duration}ms ease-in-out ${delay}ms`,
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const ScaleIn: React.FC<FadeProps> = ({
  children,
  show = true,
  duration = 300,
  delay = 0,
  className,
  ...props
}) => {
  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'scale(1)' : 'scale(0.95)',
        transition: `opacity ${duration}ms ease-in-out ${delay}ms, transform ${duration}ms ease-in-out ${delay}ms`,
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="animate-fade-in">{children}</div>;
};
