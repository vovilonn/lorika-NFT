import { TimerConfig, calcDateDiff } from "./timer";

describe("Timer: calcDateDiff", () => {
    test("should be defined", () => {
        expect(calcDateDiff).toBeDefined();
    });

    test("should return a converted to miliseconds value", () => {
        const timerConfig: TimerConfig = {
            days: 1,
            hours: 1,
            minutes: 1,
        };

        expect(calcDateDiff(timerConfig)).toBe(90060000);
    });

    test("if timer config contains only null values should return 0", () => {
        const timerConfig: TimerConfig = {
            days: 0,
            hours: 0,
            minutes: 0,
        };

        expect(calcDateDiff(timerConfig)).toBe(0);
    });
});
