import React, { useState, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import type { Syllabus, UserGoals, StudyPlan, StudyTask } from '../types';
import { TopicStatus } from '../types';

const StudyPlanner: React.FC = () => {
    const [goals] = useLocalStorage<UserGoals | null>('userGoals', null);
    const [syllabus] = useLocalStorage<Syllabus>('syllabusProgress', {});
    const [plan, setPlan] = useLocalStorage<StudyPlan>('studyPlan', {});
    
    const [weekOffset, setWeekOffset] = useState(0);

    const generatePlan = () => {
        if (!goals) return;

        const pendingTopics: { subject: string; topic: string }[] = [];
        Object.entries(syllabus).forEach(([subjectName, topics]) => {
            topics.forEach(topic => {
                if (topic.status === TopicStatus.Pending) {
                    pendingTopics.push({ subject: subjectName, topic: topic.name });
                }
            });
        });

        const startDate = new Date();
        const endDate = new Date(goals.examDate);
        const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (totalDays <= 0 || pendingTopics.length === 0) {
            alert("No pending topics or exam date has passed.");
            return;
        }

        const topicsPerDay = Math.ceil(pendingTopics.length / totalDays);
        const newPlan: StudyPlan = {};
        let topicIndex = 0;

        for (let i = 0; i < totalDays && topicIndex < pendingTopics.length; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            const dateStr = currentDate.toISOString().split('T')[0];
            
            newPlan[dateStr] = [];
            for (let j = 0; j < topicsPerDay && topicIndex < pendingTopics.length; j++) {
                const { subject, topic } = pendingTopics[topicIndex];
                newPlan[dateStr].push({
                    id: `${dateStr}-${topicIndex}`,
                    topic,
                    subject,
                    date: dateStr,
                    isCompleted: false,
                });
                topicIndex++;
            }
        }
        setPlan(newPlan);
        alert('Study plan generated!');
    };
    
    const toggleTaskCompletion = (task: StudyTask) => {
      setPlan(prevPlan => {
        const newPlan = { ...prevPlan };
        const tasksForDay = newPlan[task.date].map(t =>
          t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t
        );
        newPlan[task.date] = tasksForDay;
        return newPlan;
      });
    };

    const { weekDates, weekTasks } = useMemo(() => {
        const today = new Date();
        today.setDate(today.getDate() + weekOffset * 7);
        const dayOfWeek = today.getDay();
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // Start on Monday

        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() + i);
            dates.push(date);
        }

        const tasks: Record<string, StudyTask[]> = {};
        dates.forEach(date => {
            const dateStr = date.toISOString().split('T')[0];
            tasks[dateStr] = plan[dateStr] || [];
        });

        return { weekDates: dates, weekTasks: tasks };
    }, [plan, weekOffset]);

    return (
        <div className="space-y-6">
            <div className="bg-dark-card p-6 rounded-lg shadow-lg flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Study Planner</h1>
                    <p className="text-dark-text-secondary mt-1">Your weekly schedule to success.</p>
                </div>
                <button onClick={generatePlan} className="bg-primary hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">
                    Generate Plan
                </button>
            </div>

            <div className="bg-dark-card p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={() => setWeekOffset(weekOffset - 1)} className="bg-gray-700 p-2 rounded-md">&lt; Prev</button>
                    <h2 className="text-xl font-semibold">{weekDates[0].toLocaleDateString()} - {weekDates[6].toLocaleDateString()}</h2>
                    <button onClick={() => setWeekOffset(weekOffset + 1)} className="bg-gray-700 p-2 rounded-md">Next &gt;</button>
                </div>

                <div className="overflow-x-auto pb-2">
                    <div className="grid grid-cols-7 gap-2 min-w-[700px] md:min-w-0">
                        {weekDates.map(date => {
                            const dateStr = date.toISOString().split('T')[0];
                            const tasks = weekTasks[dateStr];
                            return (
                                <div key={dateStr} className="bg-gray-800 p-3 rounded-md min-h-[150px]">
                                    <h3 className="font-bold text-center">{date.toLocaleDateString('en-US', { weekday: 'short' })}</h3>
                                    <p className="text-xs text-center text-dark-text-secondary mb-3">{date.getDate()}</p>
                                    <div className="space-y-2">
                                        {tasks.map(task => (
                                            <div key={task.id} onClick={() => toggleTaskCompletion(task)} className={`p-2 rounded-md cursor-pointer ${task.isCompleted ? 'bg-green-800' : 'bg-gray-700'}`}>
                                                <p className={`text-xs font-medium ${task.isCompleted ? 'line-through text-gray-400' : ''}`}>{task.topic}</p>
                                                <p className="text-xs text-dark-text-secondary">{task.subject}</p>
                                            </div>
                                        ))}
                                        {tasks.length === 0 && <p className="text-xs text-center text-gray-500 mt-4">No tasks</p>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudyPlanner;