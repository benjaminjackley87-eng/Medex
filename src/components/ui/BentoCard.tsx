import React from 'react';

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Hover scaling and deep shadowing transition */
  interactive?: boolean;
  /** Background styling class overrides */
  bgClass?: string;
  /** Border styling class overrides */
  borderClass?: string;
  /** Custom padding class overrides */
  paddingClass?: string;
  /** Custom rounded corners class overrides */
  roundedClass?: string;
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * BentoCard Component
 * Standardizes bento-grid card design with glassmorphic depth, hover scaling, and customizable theme borders.
 */
export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  interactive = false,
  bgClass = 'bg-slate-900/50 backdrop-blur-md text-slate-100',
  borderClass = 'border-white/5',
  paddingClass = 'p-6',
  roundedClass = 'rounded-[32px]',
  onClick,
  className = '',
  ...props
}) => {
  const isClickable = !!onClick;

  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden border shadow-sm transition-all duration-300
        ${bgClass}
        ${borderClass}
        ${roundedClass}
        ${paddingClass}
        ${interactive || isClickable ? 'hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-md cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Dynamic hover overlay for interactive cards */}
      {(interactive || isClickable) && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none duration-500" />
      )}
      {children}
    </div>
  );
};

export default BentoCard;
