import { type ReactNode } from "react";

type PageBodyProps = {
  children: ReactNode;
  className?: string;
};

export function PageBody({ children, className = "" }: PageBodyProps) {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
