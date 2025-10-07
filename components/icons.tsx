
import React from 'react';

const iconProps = {
  className: "w-6 h-6",
  strokeWidth: "1.5",
};

export const DashboardIcon: React.FC = () => (
  <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
  </svg>
);

export const SyllabusIcon: React.FC = () => (
  <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M4 6h16M4 12h16M4 18h16"></path>
  </svg>
);

export const PlannerIcon: React.FC = () => (
  <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export const DPPIcon: React.FC = () => (
  <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

export const AnalyticsIcon: React.FC = () => (
  <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
  </svg>
);

export const ChevronDownIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || "w-5 h-5"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);
