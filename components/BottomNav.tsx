import React from 'react';
import type { Page } from '../types';
import { DashboardIcon, SyllabusIcon, PlannerIcon, DPPIcon, AnalyticsIcon } from './icons';

interface BottomNavProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

const navItems: { page: Page; label: string; icon: React.ReactNode }[] = [
  { page: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { page: 'syllabus', label: 'Syllabus', icon: <SyllabusIcon /> },
  { page: 'planner', label: 'Planner', icon: <PlannerIcon /> },
  { page: 'dpp', label: 'DPP', icon: <DPPIcon /> },
  { page: 'analytics', label: 'Analytics', icon: <AnalyticsIcon /> },
];

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, setPage }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-dark-card border-t border-gray-700 shadow-lg md:hidden z-20">
      <div className="flex justify-around max-w-7xl mx-auto">
        {navItems.map((item) => (
          <button
            key={item.page}
            onClick={() => setPage(item.page)}
            className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${
              currentPage === item.page
                ? 'text-primary'
                : 'text-dark-text-secondary hover:text-white'
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;