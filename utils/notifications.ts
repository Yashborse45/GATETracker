import type { Syllabus, RevisionProgress } from '../types';

const TOPIC_REMINDER_KEY = 'sentReminders';
const CYCLE_REMINDER_KEY = 'sentCycleReminders';

const TOPIC_REMINDER_DAYS = [1, 7, 30]; // Remind after 1, 7, and 30 days.
const CYCLE_REMINDER_DAYS = 20; // Remind after 20 days.

// Type for storing sent topic reminders
type SentTopicReminders = {
    [topicName: string]: number[]; // e.g., { "Binary Trees": [1, 7] }
};
// Type for storing sent cycle reminders
type SentCycleReminders = {
    [subjectName: string]: number; // e.g., { "Algorithms": 2 } -> reminder for cycle 2 sent
}

const getFromStorage = <T>(key: string, defaultValue: T): T => {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultValue;
    } catch (e) {
        console.error(`Failed to parse ${key}:`, e);
        return defaultValue;
    }
};

const setInStorage = <T>(key: string, data: T) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error(`Failed to save ${key}:`, e);
    }
};

export const checkAndSendRevisionReminders = (syllabus: Syllabus) => {
    if (typeof Notification === 'undefined' || Notification.permission !== 'granted') {
        return;
    }

    const now = new Date();
    const sentReminders = getFromStorage<SentTopicReminders>(TOPIC_REMINDER_KEY, {});
    const topicsToRemind: string[] = [];
    let remindersUpdated = false;

    // Cleanup: Remove reminders for topics that are no longer marked as 'Completed'
    const completedTopicNames = new Set<string>();
    Object.values(syllabus).flat().forEach(topic => {
        if (topic.status === 'Completed') {
            completedTopicNames.add(topic.name);
        }
    });

    for (const topicName in sentReminders) {
        if (!completedTopicNames.has(topicName)) {
            delete sentReminders[topicName];
            remindersUpdated = true;
        }
    }

    // Check for new reminders
    Object.entries(syllabus).forEach(([subjectName, topics]) => {
        topics.forEach(topic => {
            if (topic.status === 'Completed' && topic.completedAt) {
                const completedDate = new Date(topic.completedAt);
                const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                const startOfCompletedDay = new Date(completedDate.getFullYear(), completedDate.getMonth(), completedDate.getDate());
                const diffDays = Math.round((startOfToday.getTime() - startOfCompletedDay.getTime()) / (1000 * 60 * 60 * 24));

                const dueForReminderDay = TOPIC_REMINDER_DAYS.find(day => diffDays >= day && !(sentReminders[topic.name] || []).includes(day));

                if (dueForReminderDay) {
                    topicsToRemind.push(`- ${topic.name} (${subjectName})`);
                    
                    if (!sentReminders[topic.name]) {
                        sentReminders[topic.name] = [];
                    }
                    sentReminders[topic.name].push(dueForReminderDay);
                    remindersUpdated = true;
                }
            }
        });
    });

    if (remindersUpdated) {
        setInStorage(TOPIC_REMINDER_KEY, sentReminders);
    }

    if (topicsToRemind.length > 0) {
        const body = `Time to revise these topics:\n${topicsToRemind.join('\n')}`;
        
        new Notification('GATE Tracker: Topic Revision!', {
            body: body,
            icon: '/icons/icon-192x192.png',
            tag: 'gate-topic-revision-reminder'
        });
    }
};

export const checkAndSendCycleReminders = (revisionProgress: RevisionProgress, totalCyclesConfig: { [key: string]: number }) => {
    if (typeof Notification === 'undefined' || Notification.permission !== 'granted') {
        return;
    }

    const now = new Date();
    const sentReminders = getFromStorage<SentCycleReminders>(CYCLE_REMINDER_KEY, {});
    const subjectsToRemind: string[] = [];
    let remindersUpdated = false;

    Object.entries(revisionProgress).forEach(([subjectName, completions]) => {
        const completedCycles = completions.length;
        const totalCycles = totalCyclesConfig[subjectName] || 1;

        if (completedCycles > 0 && completedCycles < totalCycles) {
            const lastCompletion = completions[completedCycles - 1];
            const lastCompletionDate = new Date(lastCompletion.completedAt);
            const diffDays = Math.round((now.getTime() - lastCompletionDate.getTime()) / (1000 * 60 * 60 * 24));

            const nextCycleNumber = completedCycles + 1;
            const alreadyReminded = (sentReminders[subjectName] || 0) >= nextCycleNumber;

            if (diffDays >= CYCLE_REMINDER_DAYS && !alreadyReminded) {
                subjectsToRemind.push(subjectName);
                sentReminders[subjectName] = nextCycleNumber;
                remindersUpdated = true;
            }
        }
    });

    if (remindersUpdated) {
        setInStorage(CYCLE_REMINDER_KEY, sentReminders);
    }

    if (subjectsToRemind.length > 0) {
        const body = `It's time to start the next revision cycle for: ${subjectsToRemind.join(', ')}. Stay consistent!`;
        
        new Notification('GATE Tracker: Start Next Revision!', {
            body: body,
            icon: '/icons/icon-192x192.png',
            tag: 'gate-cycle-revision-reminder'
        });
    }
};