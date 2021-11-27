import express from "express";
import cors from "cors";
import config from "./config.json";

import MainRouter from "./routers/main.router";
import MintPassRouter from "./routers/mint-pass.router";
import TimerRouter from "./routers/timer.router";

const PORT: string = process.env.PORT || config.PORT;
const HOST: string = process.env.HOST || config.HOST;

const app = express();

// =========== MIDDLEWARE ==============

app.use(express.json());
app.use(cors());

// =========== ROUTERS ==============

app.use("/api-mint-pass/", MintPassRouter);
app.use("/api/timer", TimerRouter);
app.use("/api", MainRouter);

// =========== ENDPOINTS ==============

app.get("/", (req, res) => {
    res.json({ status: "ok" });
});

// STARTING THE SERVER

app.listen(PORT, HOST, () =>
    console.log(`Server has been succesfully started! on ${HOST}:${PORT}`)
);
