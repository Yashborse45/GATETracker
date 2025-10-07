import React, { useState, useMemo } from 'react';
import type { Topic } from '../types';
import { TopicStatus } from '../types';
import { ChevronDownIcon } from './icons';
import { MOTIVATIONAL_QUOTES } from '../constants';

interface SubjectModuleProps {
  subjectName: string;
  topics: Topic[];
  onStatusChange: (subjectName: string, topicName: string, newStatus: TopicStatus) => void;
  completedRevisionCycles: number;
  totalRevisionCycles: number;
  onRevisionCycleComplete: (subjectName: string) => void;
}

const statusColors: Record<TopicStatus, string> = {
  [TopicStatus.Completed]: 'bg-green-500 hover:bg-green-600',
  [TopicStatus.Revising]: 'bg-yellow-500 hover:bg-yellow-600',
  [TopicStatus.Pending]: 'bg-red-500 hover:bg-red-600',
};

const SubjectModule: React.FC<SubjectModuleProps> = ({ subjectName, topics, onStatusChange, completedRevisionCycles, totalRevisionCycles, onRevisionCycleComplete }) => {
  const [isOpen, setIsOpen] = useState(true);

  const progress = useMemo(() => {
    if (topics.length === 0) return 0;
    return (topics.filter(t => t.status === TopicStatus.Completed).length / topics.length) * 100;
  }, [topics]);

  const quote = useMemo(() => {
    if (progress === 100) {
        return MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    }
    return null;
  }, [progress]);


  return (
    <div className="bg-dark-card rounded-lg shadow-md overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex-1">
            <h2 className="text-xl font-semibold text-white">{subjectName}</h2>
            <div className="w-full bg-gray-600 rounded-full h-2.5 mt-2">
                <div className="bg-secondary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
        <ChevronDownIcon className={`w-6 h-6 text-dark-text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="border-t border-gray-700 p-4">
          {quote && (
            <div className="bg-green-900 border-l-4 border-green-500 text-green-100 p-4 mb-4 rounded-r-lg" role="alert">
                <p className="font-bold">Subject Completed!</p>
                <p className="text-sm">"{quote}"</p>
            </div>
          )}
          <ul className="space-y-3">
            {topics.map(topic => (
              <li key={topic.name} className="flex items-center justify-between bg-gray-700 p-3 rounded-md">
                <span className="text-dark-text text-sm sm:text-base flex-1 pr-2">{topic.name}</span>
                <div className="relative">
                    <select
                        value={topic.status}
                        onChange={(e) => onStatusChange(subjectName, topic.name, e.target.value as TopicStatus)}
                        className={`appearance-none text-white text-xs font-semibold py-2 pl-3 pr-8 rounded-full transition-colors duration-200 ${statusColors[topic.status]}`}
                    >
                        <option className="bg-gray-800" value={TopicStatus.Pending}>Pending</option>
                        <option className="bg-gray-800" value={TopicStatus.Revising}>Revising</option>
                        <option className="bg-gray-800" value={TopicStatus.Completed}>Completed</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                        <ChevronDownIcon className="w-4 h-4" />
                    </div>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 pt-4 border-t border-gray-600">
            <h4 className="font-semibold text-dark-text-secondary mb-2">Revision Cycles</h4>
            <div className="flex items-center justify-between bg-gray-700 p-3 rounded-md">
              <p className="text-sm font-medium">Progress: {completedRevisionCycles} / {totalRevisionCycles} Completed</p>
              <button
                onClick={() => onRevisionCycleComplete(subjectName)}
                disabled={progress < 100 || completedRevisionCycles >= totalRevisionCycles}
                className="bg-primary text-white font-bold py-1 px-3 text-sm rounded-md transition duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed enabled:hover:bg-indigo-700"
                aria-label={`Mark one revision cycle for ${subjectName} as complete`}
              >
                Mark Revision Complete
              </button>
            </div>
            {progress < 100 && <p className="text-xs text-dark-text-secondary mt-2">You must complete all topics in this subject before marking a revision cycle as complete.</p>}
          </div>

        </div>
      )}
    </div>
  );
};

export default SubjectModule;