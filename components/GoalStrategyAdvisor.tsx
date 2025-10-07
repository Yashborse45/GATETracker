import React, { useMemo } from 'react';
import { GOAL_BASED_STRATEGIES } from '../constants';
import useLocalStorage from '../hooks/useLocalStorage';
import type { UserGoals } from '../types';

const GoalStrategyAdvisor: React.FC = () => {
  const [goals] = useLocalStorage<UserGoals | null>('userGoals', null);

  const { strategy, suggestedDailyHours } = useMemo(() => {
    if (!goals) {
      return { strategy: null, suggestedDailyHours: 0, remainingDays: 0 };
    }

    const strat = GOAL_BASED_STRATEGIES[goals.rankGoal];
    const diff = new Date(goals.examDate).getTime() - new Date().getTime();
    const daysLeft = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    const suggestedHours = (strat.totalHours / daysLeft).toFixed(1);

    return {
      strategy: strat,
      suggestedDailyHours: Number(suggestedHours),
      remainingDays: daysLeft
    };
  }, [goals]);

  if (!goals || !strategy) {
    return null;
  }

  const getPaceColor = () => {
    if (goals.dailyHours >= suggestedDailyHours) return 'text-green-400';
    if (goals.dailyHours >= suggestedDailyHours * 0.75) return 'text-yellow-400';
    return 'text-red-400';
  }

  return (
    <div className="bg-dark-card p-6 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="flex-shrink-0">
          <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <div className="flex-grow">
          <h2 className="text-xl font-bold text-white">{strategy.title}</h2>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-dark-text-secondary">Recommended Pace:</p>
              <p className="text-lg font-bold text-white">{suggestedDailyHours} hours/day</p>
            </div>
            <div>
              <p className="font-semibold text-dark-text-secondary">Your Current Pace:</p>
              <p className={`text-lg font-bold ${getPaceColor()}`}>{goals.dailyHours} hours/day</p>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold text-dark-text-secondary mb-2">Strategic Checklist:</h4>
            <ul className="space-y-2">
              {strategy.tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-4 h-4 text-secondary flex-shrink-0 mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-dark-text">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalStrategyAdvisor;
