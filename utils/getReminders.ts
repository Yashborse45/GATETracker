import type { Syllabus, RevisionProgress, Reminder } from '../types';
import { SUBJECT_REVISION_CYCLES } from '../constants';

const TOPIC_REMINDER_DAYS = [1, 7, 30];
const CYCLE_REMINDER_DAYS = 20;

export const getReminders = (syllabus: Syllabus, revisionProgress: RevisionProgress): Reminder[] => {
    const reminders: Reminder[] = [];
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // 1. Generate Topic Reminders
    Object.entries(syllabus).forEach(([subjectName, topics]) => {
        topics.forEach(topic => {
            if (topic.status === 'Completed' && topic.completedAt) {
                const completedDate = new Date(topic.completedAt);
                TOPIC_REMINDER_DAYS.forEach(day => {
                    const dueDate = new Date(completedDate);
                    dueDate.setDate(dueDate.getDate() + day);
                    const dueDay = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());

                    if (dueDay <= today) {
                        reminders.push({
                            id: `${topic.name}-${day}`,
                            type: 'TOPIC',
                            title: `Revise: ${topic.name}`,
                            subject: subjectName,
                            dueDate: dueDate.toISOString().split('T')[0],
                        });
                    }
                });
            }
        });
    });
    
    // 2. Generate Cycle Reminders
    Object.entries(SUBJECT_REVISION_CYCLES).forEach(([subjectName, totalCycles]) => {
        const completions = revisionProgress[subjectName] || [];
        const completedCycles = completions.length;

        if (completedCycles < totalCycles && completedCycles > 0) {
            const lastCompletion = completions[completedCycles - 1];
            const lastCompletionDate = new Date(lastCompletion.completedAt);
            
            const dueDate = new Date(lastCompletionDate);
            dueDate.setDate(dueDate.getDate() + CYCLE_REMINDER_DAYS);
            const dueDay = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());

            if (dueDay <= today) {
                reminders.push({
                    id: `${subjectName}-cycle-${completedCycles + 1}`,
                    type: 'CYCLE',
                    title: `Start Revision Cycle ${completedCycles + 1}`,
                    subject: subjectName,
                    dueDate: dueDate.toISOString().split('T')[0],
                });
            }
        }
    });

    // 3. Filter out duplicates (important for topic reminders that are past due)
    const uniqueReminders = Array.from(new Map(reminders.map(r => [r.id, r])).values());

    // 4. Sort by due date (most recent first)
    uniqueReminders.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());

    return uniqueReminders;
};
