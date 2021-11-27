import express from "express";
import { getTotalSupply } from "../src/contract-mint-pass";
import mintPassJson from "../files/mint-pass.json";

const router = express.Router();

router.get("/nft/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const supply = await getTotalSupply();
        if (id < supply.toNumber()) {
            res.json(mintPassJson);
        } else {
            res.json({ error: "That phallus has not been make yet" });
        }
    } catch (err) {
        res.status(500);
        console.error(err);
    }
});

router.get("/total-supply", async (req, res) => {
    try {
        const supply = await getTotalSupply(); // returns a big number object
        res.json(supply.toString());
    } catch (err) {
        res.status(500);
        console.error(err);
    }
});

export default router;
