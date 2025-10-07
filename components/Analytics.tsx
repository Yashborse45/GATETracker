
import React, { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import useLocalStorage from '../hooks/useLocalStorage';
import type { DPPResult, Syllabus } from '../types';
import { TopicStatus } from '../types';

const Analytics: React.FC = () => {
    const [syllabus] = useLocalStorage<Syllabus>('syllabusProgress', {});
    const [dppResults] = useLocalStorage<DPPResult[]>('dppResults', []);

    const syllabusData = useMemo(() => {
        const allTopics = Object.values(syllabus).flat();
        if (allTopics.length === 0) return [];

        const completed = allTopics.filter(t => t.status === TopicStatus.Completed).length;
        const revising = allTopics.filter(t => t.status === TopicStatus.Revising).length;
        const pending = allTopics.length - completed - revising;

        return [
            { name: 'Completed', value: completed },
            { name: 'Revising', value: revising },
            { name: 'Pending', value: pending },
        ];
    }, [syllabus]);

    const dppAccuracyData = useMemo(() => {
        const accuracyBySubject: { [key: string]: { correct: number, total: number } } = {};

        dppResults.forEach(result => {
            if (!accuracyBySubject[result.subject]) {
                accuracyBySubject[result.subject] = { correct: 0, total: 0 };
            }
            accuracyBySubject[result.subject].correct += result.correct;
            accuracyBySubject[result.subject].total += result.total;
        });

        return Object.entries(accuracyBySubject).map(([subject, data]) => ({
            name: subject.split(' ').map(w => w[0]).join(''),
            accuracy: data.total > 0 ? (data.correct / data.total) * 100 : 0,
        }));
    }, [dppResults]);

    const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

    return (
        <div className="space-y-8">
            <div className="bg-dark-card p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-white">Progress Analytics</h1>
                <p className="text-dark-text-secondary mt-1">Visualize your preparation journey.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-dark-card p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Syllabus Coverage</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={syllabusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                                {syllabusData.map((_entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: 'none' }} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-dark-card p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-center">DPP Accuracy</h2>
                    {dppAccuracyData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={dppAccuracyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                                <XAxis dataKey="name" stroke="#a0aec0" />
                                <YAxis unit="%" stroke="#a0aec0" />
                                <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: 'none' }} />
                                <Legend />
                                <Bar dataKey="accuracy" fill="#4f46e5" />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-[300px]">
                            <p className="text-dark-text-secondary">No DPP results yet. Take a quiz to see your accuracy!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Analytics;
