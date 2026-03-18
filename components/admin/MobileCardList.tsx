import { type ReactNode } from "react";

type MobileCardListProps = {
  children: ReactNode;
  className?: string;
  empty?: ReactNode;
};

export function MobileCardList({ children, className = "", empty }: MobileCardListProps) {
  return (
    <div className={`space-y-3 md:hidden ${className}`}>
      {children}
      {empty}
    </div>
  );
}
