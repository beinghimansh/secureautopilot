
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
  const [render, setRender] = React.useState(show);

  React.useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  if (!render) return null;

  return (
    <div
      style={{
        animation: `${show ? "fadeIn" : "fadeOut"} ${duration}ms ease-in-out ${delay}ms forwards`,
      }}
      onAnimationEnd={onAnimationEnd}
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
  const [render, setRender] = React.useState(show);

  React.useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  if (!render) return null;

  return (
    <div
      style={{
        animation: `${
          show ? "slideInUp" : "slideOutDown"
        } ${duration}ms ease-in-out ${delay}ms forwards`,
      }}
      onAnimationEnd={onAnimationEnd}
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
  const [render, setRender] = React.useState(show);

  React.useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  if (!render) return null;

  return (
    <div
      style={{
        animation: `${
          show ? "scaleIn" : "scaleOut"
        } ${duration}ms ease-in-out ${delay}ms forwards`,
      }}
      onAnimationEnd={onAnimationEnd}
      className={cn(className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="page-transition-enter-active">{children}</div>;
};
