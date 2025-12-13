import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'white' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export default function Logo({
  className = '',
  variant = 'default',
  size = 'md',
  showTagline = false
}: LogoProps) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  const colorClasses = {
    default: 'text-brand-blue',
    white: 'text-white',
    dark: 'text-foreground',
  };

  const taglineColors = {
    default: 'text-brand-teal',
    white: 'text-white/80',
    dark: 'text-foreground/70',
  };

  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon - Growth Symbol */}
      <div className={`flex items-center justify-center ${
        size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-10 h-10' : 'w-14 h-14'
      } bg-gradient-to-br from-brand-teal via-brand-emerald to-brand-blue rounded-lg shadow-lg`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${size === 'sm' ? 'w-5 h-5' : size === 'md' ? 'w-6 h-6' : 'w-8 h-8'} text-white`}
        >
          {/* Growth Arrow */}
          <path
            d="M13 7L19 7M19 7L19 13M19 7L12 14L9 11L5 15"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Data Points */}
          <circle cx="5" cy="15" r="1.5" fill="currentColor" />
          <circle cx="9" cy="11" r="1.5" fill="currentColor" />
          <circle cx="12" cy="14" r="1.5" fill="currentColor" />
          <circle cx="19" cy="7" r="1.5" fill="currentColor" />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <span className={`font-bold ${sizeClasses[size]} ${colorClasses[variant]} tracking-tight`}>
          Intello<span className="text-brand-emerald">Blast</span>
        </span>
        {showTagline && (
          <span className={`text-xs ${taglineColors[variant]} font-medium -mt-1`}>
            Growth Through Intelligence
          </span>
        )}
      </div>
    </Link>
  );
}

// Export for use in different contexts
export function LogoIcon({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg', className?: string }) {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const iconSizeMap = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className={`flex items-center justify-center ${sizeMap[size]} bg-gradient-to-br from-brand-teal via-brand-emerald to-brand-blue rounded-lg shadow-lg ${className}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconSizeMap[size]} text-white`}
      >
        <path
          d="M13 7L19 7M19 7L19 13M19 7L12 14L9 11L5 15"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="5" cy="15" r="1.5" fill="currentColor" />
        <circle cx="9" cy="11" r="1.5" fill="currentColor" />
        <circle cx="12" cy="14" r="1.5" fill="currentColor" />
        <circle cx="19" cy="7" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
}
