import express from "express";
import cors from "cors";
import config from "./config.json";

import fs from "fs";
import https from "https";

import MainRouter from "./src/routers/main.router";

const PORT: number = +process.env.PORT || config.PORT;
const HOST: string = process.env.HOST || config.HOST;

const app = express();

let httpsServer = null;

if (!process.env.NOTSSL) {
    httpsServer = https.createServer(
        {
            key: fs.readFileSync(config.SSL.key),
            cert: fs.readFileSync(config.SSL.cert),
        },
        app
    );
}

// =========== MIDDLEWARE ==============

app.use("/images", express.static("static"));
app.use(express.json());
app.use(cors());

// =========== ROUTERS ==============

app.use("/", MainRouter);

// =========== ENDPOINTS ==============

app.get("/", (req, res) => {
    res.json({ status: "ok" });
});

// STARTING THE SERVER

if (process.env.NOTSSL) {
    app.listen(PORT, HOST, 0, () =>
        console.log(`Server has been succesfully started! on ${HOST}:${PORT}`)
    );
} else {
    httpsServer.listen(PORT, HOST, 0, () =>
        console.log(`Server has been succesfully started! on ${HOST}:${PORT}`)
    );
}
