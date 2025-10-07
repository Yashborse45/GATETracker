import React, { useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import type { Syllabus, RevisionProgress, Reminder } from '../types';
import { getReminders } from '../utils/getReminders';

const ReminderIcon: React.FC<{ type: Reminder['type'] }> = ({ type }) => {
    if (type === 'CYCLE') {
        return (
            <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h5M4 18v-5h5m11-4h-5V4m5 15h-5v-5" />
            </svg>
        );
    }
    return (
        <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
    );
};

const ReminderList: React.FC = () => {
    const [syllabus] = useLocalStorage<Syllabus>('syllabusProgress', {});
    const [revisionProgress] = useLocalStorage<RevisionProgress>('revisionProgress', {});

    const reminders = useMemo(() => getReminders(syllabus, revisionProgress), [syllabus, revisionProgress]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="bg-dark-card p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Reminders &amp; Todos</h2>
            {reminders.length > 0 ? (
                <ul className="space-y-3 max-h-80 overflow-y-auto pr-2">
                    {reminders.map(reminder => (
                        <li key={reminder.id} className="flex items-center justify-between bg-gray-700 p-3 rounded-md">
                            <div className="flex items-center gap-4">
                                <ReminderIcon type={reminder.type} />
                                <div>
                                    <p className="font-medium text-white">{reminder.title}</p>
                                    <p className="text-sm text-dark-text-secondary">{reminder.subject}</p>
                                </div>
                            </div>
                            <span className="text-xs bg-gray-600 text-dark-text-secondary px-2 py-1 rounded-full">
                                Due: {formatDate(reminder.dueDate)}
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                    <svg className="w-12 h-12 text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-dark-text-secondary font-semibold">All clear!</p>
                    <p className="text-sm text-gray-500">You have no pending reminders. Great job!</p>
                </div>
            )}
        </div>
    );
};

export default ReminderList;
