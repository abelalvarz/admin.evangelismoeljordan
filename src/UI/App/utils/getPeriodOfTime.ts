import { subDays, startOfDay, endOfDay } from 'date-fns'

export const getPeriodTime = (days: number) => {
    const now = new Date();
    const currentDayOfWeek = now.getDay();

    const daysSinceLastDay = (currentDayOfWeek >= 6)
        ? currentDayOfWeek - days
        : 7 + currentDayOfWeek - days;

    const lastDay = subDays(now, daysSinceLastDay + 7);

    const daysSinceLastTuesday = (currentDayOfWeek >= 5)
        ? currentDayOfWeek - days
        : 7 + currentDayOfWeek - days;
        
    const thisTuesday = subDays(now, daysSinceLastTuesday);

    return {initial: startOfDay(lastDay), final: endOfDay(thisTuesday)};
};