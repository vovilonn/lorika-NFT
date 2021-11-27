export type TimerConfig = {
    days: number;
    hours: number;
    minutes: number;
};

export function calcDateDiff(timeBeforeTheEvent: TimerConfig): number {
    const t = timeBeforeTheEvent;

    return t.days * 86400000 + t.hours * 3600000 + t.minutes * 60000;
}
