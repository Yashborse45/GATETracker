import { describe, it, expect } from 'vitest';
import { getReminders } from './getReminders';

describe('getReminders', () => {
    it('should return an empty array when there are no reminders', () => {
        const result = getReminders([]);
        expect(result).toEqual([]);
    });

    it('should return reminders that match the given criteria', () => {
        const reminders = [
            { id: 1, text: 'Reminder 1', completed: false },
            { id: 2, text: 'Reminder 2', completed: true },
        ];
        const result = getReminders(reminders, { completed: false });
        expect(result).toEqual([{ id: 1, text: 'Reminder 1', completed: false }]);
    });
});