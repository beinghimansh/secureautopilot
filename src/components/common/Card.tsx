
import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  isGlass?: boolean;
  isHoverable?: boolean;
  noPadding?: boolean;
}

export function Card({
  children,
  className,
  isGlass = false,
  isHoverable = false,
  noPadding = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border shadow-premium-sm scale-in",
        isGlass ? "bg-white/70 backdrop-blur-lg border-white/30" : "bg-white border-gray-100",
        isHoverable && "transition-all duration-300 hover:shadow-premium-md hover:translate-y-[-2px]",
        !noPadding && "p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 pb-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-lg font-medium leading-tight tracking-tight text-gray-900",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("pt-0", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center mt-4 pt-4 border-t", className)}
      {...props}
    >
      {children}
    </div>
  );
}
