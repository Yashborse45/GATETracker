
import React, { useMemo, useState } from 'react';
import { DPP_QUESTIONS } from '../constants';
import useLocalStorage from '../hooks/useLocalStorage';
import type { DPPResult, UserGoals } from '../types';

const DPP: React.FC = () => {
    const [goals] = useLocalStorage<UserGoals | null>('userGoals', null);
    const [, setResults] = useLocalStorage<DPPResult[]>('dppResults', []);

    const [selectedSubject, setSelectedSubject] = useState<string | null>(goals?.subjects[0] || null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);
    const [, setUserAnswers] = useState<string[]>([]);

    const questions = useMemo(() => {
        if (!selectedSubject) return [];
        return DPP_QUESTIONS.filter(q => q.subject === selectedSubject);
    }, [selectedSubject]);

    const startQuiz = () => {
        if (questions.length === 0) {
            alert('No questions available for this subject.');
            return;
        }
        setQuizStarted(true);
        setQuizFinished(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setUserAnswers([]);
    };

    const handleAnswer = (option: string) => {
        const isCorrect = option === questions[currentQuestionIndex].answer;
        if (isCorrect) {
            setScore(prev => prev + 1);
        }
        setUserAnswers(prev => [...prev, option]);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setQuizFinished(true);
            setQuizStarted(false);
            setResults(prev => [...prev, {
                subject: selectedSubject!,
                correct: score + (isCorrect ? 1 : 0),
                total: questions.length,
                date: new Date().toISOString(),
            }]);
        }
    };

    if (quizFinished) {
        return (
            <div className="text-center bg-dark-card p-8 rounded-lg">
                <h2 className="text-3xl font-bold mb-4">Quiz Finished!</h2>
                <p className="text-xl mb-6">Your score: <span className="font-bold text-secondary">{score}</span> / {questions.length}</p>
                <button onClick={() => setQuizFinished(false)} className="bg-primary hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md">
                    Try Another Quiz
                </button>
            </div>
        );
    }

    if (quizStarted) {
        const question = questions[currentQuestionIndex];
        return (
            <div className="bg-dark-card p-8 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{question.subject}</h2>
                    <p className="text-dark-text-secondary">Question {currentQuestionIndex + 1}/{questions.length}</p>
                </div>
                <p className="text-lg mb-6">{question.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.options.map(option => (
                        <button key={option} onClick={() => handleAnswer(option)} className="w-full text-left bg-gray-700 p-4 rounded-md hover:bg-primary transition-colors duration-200">
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-dark-card p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-white">Daily Practice Papers (DPP)</h1>
                <p className="text-dark-text-secondary mt-1">Test your knowledge and track your accuracy.</p>
            </div>

            <div className="text-center bg-dark-card p-8 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Select a Subject</h2>
                <select
                    value={selectedSubject || ''}
                    onChange={e => setSelectedSubject(e.target.value)}
                    className="mb-6 bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary text-white"
                >
                    {goals?.subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                </select>
                <button
                    onClick={startQuiz}
                    disabled={!selectedSubject}
                    className="bg-secondary hover:bg-green-600 text-white font-bold py-3 px-8 rounded-md transition duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    Start Quiz
                </button>
            </div>
        </div>
    );
};

export default DPP;
