import React, { useState, useEffect } from 'react';
import type { Page, UserGoals, Syllabus, RevisionProgress } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Dashboard from './components/Dashboard';
import SyllabusTracker from './components/SyllabusTracker';
import StudyPlanner from './components/StudyPlanner';
import DPP from './components/DPP';
import Analytics from './components/Analytics';
import Setup from './components/Setup';
import { checkAndSendRevisionReminders, checkAndSendCycleReminders } from './utils/notifications';
import { SUBJECT_REVISION_CYCLES } from './constants';

const App: React.FC = () => {
  const [goals, setGoals] = useLocalStorage<UserGoals | null>('userGoals', null);
  const [page, setPage] = useState<Page>('dashboard');

  useEffect(() => {
    if (!goals) return; // Only run logic if user is set up

    const runReminderChecks = () => {
      try {
        const storedSyllabus = localStorage.getItem('syllabusProgress');
        if (storedSyllabus) {
          checkAndSendRevisionReminders(JSON.parse(storedSyllabus) as Syllabus);
        }

        const storedRevisionProgress = localStorage.getItem('revisionProgress');
        if (storedRevisionProgress) {
          checkAndSendCycleReminders(JSON.parse(storedRevisionProgress) as RevisionProgress, SUBJECT_REVISION_CYCLES);
        }
      } catch (e) {
        console.error("Failed to check for reminders:", e);
      }
    };

    // Check for notification permission and then check for reminders
    if (typeof Notification !== 'undefined') {
        if (Notification.permission === 'granted') {
          runReminderChecks();
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                  runReminderChecks();
                }
            });
        }
    }
  }, [goals]);

  if (!goals) {
    return <Setup onSetupComplete={setGoals} />;
  }

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard setPage={setPage} />;
      case 'syllabus':
        return <SyllabusTracker />;
      case 'planner':
        return <StudyPlanner />;
      case 'dpp':
        return <DPP />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text font-sans">
      <Header currentPage={page} setPage={setPage} />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto pb-24 md:pb-8 animate-fade-in">
        {renderPage()}
      </main>
      <BottomNav currentPage={page} setPage={setPage} />
    </div>
  );
};

export default App;