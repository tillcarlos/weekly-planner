// components/Logo.tsx
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'monochrome';
  showText?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'default',
  showText = true,
  orientation = 'horizontal'
}) => {
  const sizeConfig = {
    sm: { 
      container: orientation === 'horizontal' ? 'h-6' : 'h-8',
      icon: 'h-6 w-6',
      text: 'text-sm',
      gap: orientation === 'horizontal' ? 'gap-2' : 'gap-1'
    },
    md: { 
      container: orientation === 'horizontal' ? 'h-8' : 'h-12',
      icon: 'h-8 w-8',
      text: 'text-lg',
      gap: orientation === 'horizontal' ? 'gap-3' : 'gap-2'
    },
    lg: { 
      container: orientation === 'horizontal' ? 'h-12' : 'h-16',
      icon: 'h-12 w-12',
      text: 'text-2xl',
      gap: orientation === 'horizontal' ? 'gap-4' : 'gap-2'
    },
    xl: { 
      container: orientation === 'horizontal' ? 'h-16' : 'h-20',
      icon: 'h-16 w-16',
      text: 'text-3xl',
      gap: orientation === 'horizontal' ? 'gap-4' : 'gap-3'
    }
  };

  const config = sizeConfig[size];
  const colors = variant === 'monochrome' 
    ? { rect1: 'currentColor', rect2: 'currentColor' }
    : { rect1: '#FC2B37', rect2: '#297FFF' };

  const containerClasses = `
    inline-flex 
    ${orientation === 'horizontal' ? 'items-center' : 'flex-col items-center'} 
    ${config.gap} 
    ${config.container} 
    ${className}
  `.trim();

  const baseTextClasses = `
    font-bold 
    ${config.text} 
    select-none
  `.trim();

  // Color classes for different parts of the text
  const statsClasses = `
    ${baseTextClasses}
    ${variant === 'monochrome' ? 'text-current opacity-80' : 'text-gray-500 dark:text-gray-200'}
  `.trim();

  const awareClasses = `
    ${baseTextClasses}
    ${variant === 'monochrome' ? 'text-current' : 'text-gray-200 dark:text-gray-100'}
  `.trim();

  return (
    <div className={containerClasses}>
      {/* Logo Icon - Using Figma SVG */}
      <svg 
        width="36" 
        height="36" 
        viewBox="0 0 909 812" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`${config.icon} flex-shrink-0`}
        role="img"
        aria-label="StatsAware logo icon"
      >
        <rect 
          x="532.039" 
          y="0.0234375" 
          width="376.961" 
          height="609.181" 
          rx="91" 
          fill={colors.rect2}
          className={variant === 'monochrome' ? 'opacity-80' : ''}
        />
        <rect 
          x="0" 
          y="202.819" 
          width="376.961" 
          height="609.181" 
          rx="91" 
          fill={colors.rect1}
          className={variant === 'monochrome' ? 'opacity-60' : ''}
        />
      </svg>

      {/* Text with spacing */}
      {showText && (
        <div className="flex items-baseline">
          <span className={statsClasses}>
            Stats
          </span>
          <span className="pr-1"></span> {/* Small space between words */}
          <span className={awareClasses}>
            Aware
          </span>
        </div>
      )}
    </div>
  );
};

// Convenience components for common use cases
export const LogoIcon: React.FC<{ 
  className?: string; 
  size?: LogoProps['size'];
}> = ({ className, size = 'md' }) => (
  <Logo size={size} showText={false} className={className} />
);

export const LogoHorizontal: React.FC<{ 
  className?: string; 
  size?: LogoProps['size'];
  variant?: LogoProps['variant'];
}> = ({ className, size = 'md', variant = 'default' }) => (
  <Logo 
    size={size} 
    variant={variant}
    orientation="horizontal" 
    className={className} 
  />
);

export const LogoVertical: React.FC<{ 
  className?: string; 
  size?: LogoProps['size'];
  variant?: LogoProps['variant'];
}> = ({ className, size = 'md', variant = 'default' }) => (
  <Logo 
    size={size} 
    variant={variant}
    orientation="vertical" 
    className={className} 
  />
);

export const LogoMono: React.FC<{ 
  className?: string; 
  size?: LogoProps['size'];
  orientation?: LogoProps['orientation'];
}> = ({ className, size = 'md', orientation = 'horizontal' }) => (
  <Logo 
    size={size} 
    variant="monochrome" 
    orientation={orientation}
    className={className} 
  />
);