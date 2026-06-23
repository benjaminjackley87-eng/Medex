import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const updateCoords = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      let top = 0;
      let left = 0;

      switch (position) {
        case 'top':
          top = rect.top - 8;
          left = rect.left + rect.width / 2;
          break;
        case 'bottom':
          top = rect.bottom + 8;
          left = rect.left + rect.width / 2;
          break;
        case 'left':
          top = rect.top + rect.height / 2;
          left = rect.left - 8;
          break;
        case 'right':
          top = rect.top + rect.height / 2;
          left = rect.right + 8;
          break;
      }
      setCoords({ top, left });
    }
  }, [position]);

  useEffect(() => {
    if (isVisible) {
      updateCoords();
      window.addEventListener('scroll', updateCoords, true);
      window.addEventListener('resize', updateCoords);
      return () => {
        window.removeEventListener('scroll', updateCoords, true);
        window.removeEventListener('resize', updateCoords);
      };
    }
  }, [isVisible, updateCoords]);

  const getTransform = () => {
    switch (position) {
      case 'top':
        return 'translate(-50%, -100%)';
      case 'bottom':
        return 'translate(-50%, 0)';
      case 'left':
        return 'translate(-100%, -50%)';
      case 'right':
        return 'translate(0, -50%)';
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case 'top':
        return 'top-full left-1/2 -translate-x-1/2 border-t-slate-900';
      case 'bottom':
        return 'bottom-full left-1/2 -translate-x-1/2 border-b-slate-900';
      case 'left':
        return 'left-full top-1/2 -translate-y-1/2 border-l-slate-900';
      case 'right':
        return 'right-full top-1/2 -translate-y-1/2 border-r-slate-900';
    }
  };

  return (
    <div
      ref={triggerRef}
      className={`relative inline-flex items-center group/tooltip ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible &&
        createPortal(
          <div
            className="fixed px-2 py-1 bg-slate-900/95 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-widest rounded-md whitespace-nowrap shadow-2xl pointer-events-none animate-in fade-in zoom-in-95 duration-200 z-[100] border border-white/10"
            style={{ top: coords.top, left: coords.left, transform: getTransform() }}
          >
            {content}
            <div className={`absolute border-4 border-transparent ${getArrowClasses()}`}></div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Tooltip;
