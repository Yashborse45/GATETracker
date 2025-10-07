import React, { useEffect } from 'react';
import { GATE_SYLLABUS, SUBJECT_REVISION_CYCLES } from '../constants';
import useLocalStorage from '../hooks/useLocalStorage';
import type { RevisionProgress, Syllabus, Topic, UserGoals } from '../types';
import { TopicStatus } from '../types';
import SubjectModule from './SubjectModule';

const SyllabusTracker: React.FC = () => {
  const [goals] = useLocalStorage<UserGoals | null>('userGoals', null);
  const [syllabusProgress, setSyllabusProgress] = useLocalStorage<Syllabus>('syllabusProgress', {});
  const [revisionProgress, setRevisionProgress] = useLocalStorage<RevisionProgress>('revisionProgress', {});


  useEffect(() => {
    if (goals && goals.subjects.length > 0) {
      const syllabusSubjects = Object.keys(syllabusProgress);
      const goalSubjects = goals.subjects;

      const subjectsMatch = goalSubjects.length === syllabusSubjects.length &&
        goalSubjects.every(sub => syllabusSubjects.includes(sub));

      if (!subjectsMatch) {
        console.log("Syllabus mismatch, re-initializing...");
        const initialSyllabus: Syllabus = {};
        GATE_SYLLABUS
          .filter(s => goals.subjects.includes(s.name))
          .forEach(subject => {
            initialSyllabus[subject.name] = subject.topics.map(topic => ({
              name: topic.name,
              status: TopicStatus.Pending,
            }));
          });
        setSyllabusProgress(initialSyllabus);
      }
    }
  }, [goals, syllabusProgress, setSyllabusProgress]);


  const handleStatusChange = (subjectName: string, topicName: string, newStatus: TopicStatus) => {
    setSyllabusProgress(prev => {
      if (!prev[subjectName]) return prev; // Safety check
      const updatedTopics = prev[subjectName].map(topic => {
        if (topic.name === topicName) {
          const updatedTopic: Topic = { ...topic, status: newStatus };

          if (newStatus === TopicStatus.Completed && topic.status !== TopicStatus.Completed) {
            updatedTopic.completedAt = new Date().toISOString();
          }
          else if (newStatus !== TopicStatus.Completed && topic.status === TopicStatus.Completed) {
            delete updatedTopic.completedAt;
          }

          return updatedTopic;
        }
        return topic;
      }
      );
      return { ...prev, [subjectName]: updatedTopics };
    });
  };

  const handleRevisionCycleComplete = (subjectName: string) => {
    setRevisionProgress(prev => {
      const currentCycles = prev[subjectName] || [];
      const maxCycles = SUBJECT_REVISION_CYCLES[subjectName] || 1;
      if (currentCycles.length < maxCycles) {
        const newCycle = { completedAt: new Date().toISOString() };
        return { ...prev, [subjectName]: [...currentCycles, newCycle] };
      }
      return prev;
    });
  };

  const relevantSyllabus = goals ? GATE_SYLLABUS.filter(s => goals.subjects.includes(s.name)) : [];

  if (!goals || Object.keys(syllabusProgress).length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-dark-text-secondary">Loading syllabus...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-dark-card p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white">Syllabus Tracker</h1>
        <p className="text-dark-text-secondary mt-1">Track your progress for each subject and topic.</p>
      </div>

      <div className="space-y-4">
        {relevantSyllabus.map(subject => (
          <SubjectModule
            key={subject.name}
            subjectName={subject.name}
            topics={syllabusProgress[subject.name] || []}
            onStatusChange={handleStatusChange}
            completedRevisionCycles={(revisionProgress[subject.name] || []).length}
            totalRevisionCycles={SUBJECT_REVISION_CYCLES[subject.name] || 1}
            onRevisionCycleComplete={handleRevisionCycleComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default SyllabusTracker;