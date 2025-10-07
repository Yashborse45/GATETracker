import React, { useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import type { Syllabus, UserGoals, Page } from '../types';
import { TopicStatus } from '../types';
import { MOTIVATIONAL_QUOTES } from '../constants';
import ReminderList from './ReminderList';
import GoalStrategyAdvisor from './GoalStrategyAdvisor';

const ProgressCircle: React.FC<{ percentage: number }> = ({ percentage }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative w-40 h-40">
            <svg className="w-full h-full" viewBox="0 0 120 120">
                <circle className="text-gray-600" strokeWidth="10" stroke="currentColor" fill="transparent" r={radius} cx="60" cy="60" />
                <circle
                    className="text-secondary"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                    transform="rotate(-90 60 60)"
                />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                {Math.round(percentage)}%
            </span>
        </div>
    );
};


const Dashboard: React.FC<{ setPage: (page: Page) => void }> = ({ setPage }) => {
    const [syllabus] = useLocalStorage<Syllabus>('syllabusProgress', {});
    const [goals] = useLocalStorage<UserGoals | null>('userGoals', null);
    
    const { completionPercentage, stats } = useMemo(() => {
        const allTopics = Object.values(syllabus).flat();
        if (allTopics.length === 0) return { completionPercentage: 0, stats: { completed: 0, revising: 0, pending: 0 } };
        
        const completed = allTopics.filter(t => t.status === TopicStatus.Completed).length;
        const revising = allTopics.filter(t => t.status === TopicStatus.Revising).length;
        const total = allTopics.length;
        const pending = total - completed - revising;
        
        return {
            completionPercentage: (completed / total) * 100,
            stats: { completed, revising, pending }
        };
    }, [syllabus]);

    const quote = useMemo(() => MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)], []);

    const remainingDays = useMemo(() => {
        if (!goals?.examDate) return 0;
        const diff = new Date(goals.examDate).getTime() - new Date().getTime();
        return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }, [goals]);
    
    const chartData = [
        { name: 'Completed', value: stats.completed, color: '#10b981' },
        { name: 'Revising', value: stats.revising, color: '#f59e0b' },
        { name: 'Pending', value: stats.pending, color: '#ef4444' },
    ];


    return (
        <div className="space-y-8">
            <div className="bg-dark-card p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-white">Welcome back!</h1>
                <p className="text-dark-text-secondary mt-1">{quote}</p>
            </div>

            <GoalStrategyAdvisor />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-8">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="bg-dark-card p-6 rounded-lg flex flex-col items-center justify-center">
                            <h3 className="text-4xl font-bold text-primary">{remainingDays}</h3>
                            <p className="text-dark-text-secondary mt-1">Days to Exam</p>
                        </div>
                        <div className="bg-dark-card p-6 rounded-lg flex flex-col items-center justify-center">
                            <h3 className="text-4xl font-bold text-secondary">{stats.completed}</h3>
                            <p className="text-dark-text-secondary mt-1">Topics Completed</p>
                        </div>
                        <div className="bg-dark-card p-6 rounded-lg flex flex-col items-center justify-center">
                            <h3 className="text-4xl font-bold text-yellow-500">{stats.revising}</h3>
                            <p className="text-dark-text-secondary mt-1">Topics Revising</p>
                        </div>
                    </div>

                    {/* Reminders & Todos */}
                    <ReminderList />
                </div>

                {/* Progress Overview */}
                <div className="bg-dark-card p-6 rounded-lg flex flex-col items-center">
                    <h2 className="text-2xl font-semibold mb-4">Syllabus Progress</h2>
                    <ProgressCircle percentage={completionPercentage} />
                     <div className="w-full mt-4 text-xs">
                        {chartData.map(entry => (
                            <div key={entry.name} className="flex justify-between items-center py-1">
                                <div className="flex items-center">
                                    <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
                                    <span>{entry.name}</span>
                                </div>
                                <span>{entry.value} topics</span>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => setPage('syllabus')} className="mt-6 w-full bg-primary hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">
                        View Syllabus
                    </button>
                    <button onClick={() => setPage('dpp')} className="mt-4 w-full bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">
                        Start DPP
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;