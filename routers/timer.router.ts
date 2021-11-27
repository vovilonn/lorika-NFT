import express from "express";
import { TimerConfig, calcDateDiff } from "../src/timer";

const TIMER_IS_ACTIVE = process.env.TIMER || false;

const timerConfig: TimerConfig = {
    days: 1,
    hours: 10,
    minutes: 40,
}; // сколько времени осталось до события

let dateDifference = calcDateDiff(timerConfig); // миллисекунд до события

if (TIMER_IS_ACTIVE) {
    setInterval(() => {
        dateDifference -= 1000;
    }, 1000);
}

const router = express.Router();

router.get("/time-to-mint", (req, res) => {
    res.json(
        TIMER_IS_ACTIVE
            ? dateDifference
            : { error: "the timer is not working now" }
    );
});

export default router;
