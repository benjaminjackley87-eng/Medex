import React from 'react';

export type GlowTheme = 'blue' | 'indigo' | 'emerald' | 'amber' | 'rose' | 'slate' | 'cyan';

interface GlowContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  theme: GlowTheme;
  /** Custom class overrides for the wrapper */
  containerClass?: string;
}

/**
 * GlowContainer Component
 * Renders glassmorphic containers with matching soft glowing background radial gradient spheres.
 */
export const GlowContainer: React.FC<GlowContainerProps> = ({
  children,
  theme,
  containerClass = 'p-8 max-w-7xl mx-auto',
  className = '',
  ...props
}) => {
  // Theme styling definitions for background glowing blurs
  const glowGradients: Record<GlowTheme, string[]> = {
    blue: ['from-blue-500/10 to-transparent', 'from-indigo-500/5 to-transparent'],
    indigo: ['from-indigo-500/10 to-transparent', 'from-violet-500/5 to-transparent'],
    emerald: ['from-emerald-500/10 to-transparent', 'from-teal-500/5 to-transparent'],
    amber: ['from-amber-500/10 to-transparent', 'from-orange-500/5 to-transparent'],
    rose: ['from-rose-500/10 to-transparent', 'from-red-500/5 to-transparent'],
    slate: ['from-slate-500/5 to-transparent', 'from-slate-600/5 to-transparent'],
    cyan: ['from-cyan-500/10 to-transparent', 'from-teal-500/5 to-transparent']
  };

  const gradients = glowGradients[theme] || glowGradients.slate;

  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`} {...props}>
      {/* Decorative ambient glowing blur rings */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-radial ${gradients[0]} rounded-full blur-[120px] opacity-70`}
        />
        <div
          className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-radial ${gradients[1]} rounded-full blur-[120px] opacity-70`}
        />
      </div>

      {/* Main content body */}
      <div className={`relative z-10 ${containerClass}`}>{children}</div>
    </div>
  );
};

export default GlowContainer;
