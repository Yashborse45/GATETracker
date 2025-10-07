
import React, { useState } from 'react';
import type { UserGoals, RankGoal } from '../types';
import { GATE_SYLLABUS, GOAL_BASED_STRATEGIES } from '../constants';

interface SetupProps {
  onSetupComplete: (goals: UserGoals) => void;
}

const Setup: React.FC<SetupProps> = ({ onSetupComplete }) => {
  const [exam, setExam] = useState('GATE');
  const [rankGoal, setRankGoal] = useState<RankGoal>('Top 1000');
  const [dailyHours, setDailyHours] = useState(4);
  const [examDate, setExamDate] = useState(new Date(new Date().getFullYear() + 1, 1, 10).toISOString().split('T')[0]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(GATE_SYLLABUS.map(s => s.name));

  const handleSubjectToggle = (subjectName: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subjectName)
        ? prev.filter(s => s !== subjectName)
        : [...prev, subjectName]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSubjects.length === 0) {
      alert('Please select at least one subject.');
      return;
    }
    onSetupComplete({
      exam,
      rankGoal,
      dailyHours,
      examDate,
      subjects: selectedSubjects,
    });
  };

  const rankGoalOptions = Object.keys(GOAL_BASED_STRATEGIES) as RankGoal[];

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg p-4">
      <div className="max-w-2xl w-full bg-dark-card rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2 text-white">Welcome to GATE Tracker</h1>
        <p className="text-center text-dark-text-secondary mb-8">Let's set up your preparation plan.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="exam" className="block text-sm font-medium text-dark-text-secondary">Select Exam</label>
                <select id="exam" value={exam} onChange={e => setExam(e.target.value)} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-white">
                <option>GATE</option>
                <option>University</option>
                <option>Custom</option>
                </select>
            </div>
            <div>
                <label htmlFor="rankGoal" className="block text-sm font-medium text-dark-text-secondary">Rank Target</label>
                <select id="rankGoal" value={rankGoal} onChange={e => setRankGoal(e.target.value as RankGoal)} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-white">
                    {rankGoalOptions.map(goal => <option key={goal} value={goal}>{goal}</option>)}
                </select>
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="dailyHours" className="block text-sm font-medium text-dark-text-secondary">Daily Study Hours</label>
              <input type="number" id="dailyHours" min="1" max="16" value={dailyHours} onChange={e => setDailyHours(Number(e.target.value))} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-white" />
            </div>
            <div>
              <label htmlFor="examDate" className="block text-sm font-medium text-dark-text-secondary">Exam Date</label>
              <input type="date" id="examDate" value={examDate} onChange={e => setExamDate(e.target.value)} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-white" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white">Select Subjects</h3>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {GATE_SYLLABUS.map(subject => (
                <div key={subject.name} className="flex items-center">
                  <input
                    id={subject.name}
                    type="checkbox"
                    checked={selectedSubjects.includes(subject.name)}
                    onChange={() => handleSubjectToggle(subject.name)}
                    className="h-4 w-4 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary"
                  />
                  <label htmlFor={subject.name} className="ml-3 text-sm text-dark-text">{subject.name}</label>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-primary hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105">Start Tracking</button>
        </form>
      </div>
    </div>
  );
};

export default Setup;