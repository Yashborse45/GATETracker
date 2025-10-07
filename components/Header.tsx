import React, { useState } from 'react';
import type { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

const navItems: { page: Page; label: string }[] = [
  { page: 'dashboard', label: 'Dashboard' },
  { page: 'syllabus', label: 'Syllabus' },
  { page: 'planner', label: 'Planner' },
  { page: 'dpp', label: 'DPP' },
  { page: 'analytics', label: 'Analytics' },
];

const Header: React.FC<HeaderProps> = ({ currentPage, setPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const title = navItems.find(item => item.page === currentPage)?.label || 'GATE Tracker';
  
  const handleNavClick = (page: Page) => {
    setPage(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-dark-card sticky top-0 z-20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-white">
              <span className="md:hidden">{title}</span>
              <span className="hidden md:inline">GATE Tracker</span>
            </h1>
          </div>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-baseline space-x-4">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentPage === item.page
                    ? 'bg-primary text-white'
                    : 'text-dark-text-secondary hover:bg-gray-700 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-dark-text-secondary hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  currentPage === item.page
                    ? 'bg-primary text-white'
                    : 'text-dark-text-secondary hover:bg-gray-700 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;