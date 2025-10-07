export type Page = 'dashboard' | 'syllabus' | 'planner' | 'dpp' | 'analytics';

export enum TopicStatus {
  Pending = 'Pending',
  Revising = 'Revising',
  Completed = 'Completed',
}

export interface Topic {
  name: string;
  status: TopicStatus;
  completedAt?: string; // ISO string format for date of completion
}

export interface Subject {
  name: string;
  topics: Omit<Topic, 'status' | 'completedAt'>[];
}

export interface Syllabus {
  [subjectName: string]: Topic[];
}

export type RankGoal = 'Top 100' | 'Top 500' | 'Top 1000' | 'Qualify';

export interface UserGoals {
  exam: string;
  rankGoal: RankGoal;
  dailyHours: number;
  examDate: string;
  subjects: string[];
}

export interface DPPQuestion {
  question: string;
  options: string[];
  answer: string;
  subject: string;
}

export interface DPPResult {
  subject: string;
  correct: number;
  total: number;
  date: string;
}

export interface StudyTask {
  id: string;
  topic: string;
  subject: string;
  date: string; // YYYY-MM-DD
  isCompleted: boolean;
}

export interface StudyPlan {
  [date: string]: StudyTask[];
}

export interface RevisionProgress {
  [subjectName: string]: { completedAt: string }[];
}

export interface Reminder {
    id: string;
    type: 'TOPIC' | 'CYCLE';
    title: string;
    subject: string;
    dueDate: string;
}