import express from "express";
import { getBirthday, getTotalSupply } from "../src/contract";
import {
    makeLimitedResponse,
    makeEmbrionData,
    makeNFTdata,
    makeTokensOfOwnerJson,
} from "../src/makeData";

const bigJson = require("../files/bigJson.json");

const router = express.Router();

router.get("/nft/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const birthday = await getBirthday(id); // err ||
        if (birthday) {
            const isBirth = checkDate(birthday);

            if (!isBirth && birthday.toNumber() > 0) {
                res.json(makeEmbrionData(id));
            } else if (!isBirth) {
                res.json({ error: "not burn yet" });
            } else {
                res.json(makeNFTdata(bigJson[id]));
            }
        } else {
            res.status(404).json({
                error: "That phallus has not been make yet",
            });
        }
    } catch (err) {
        res.status(500);
        console.error(err);
    }
});

router.get("/tokens/:wallet", async (req, res) => {
    res.json(await makeTokensOfOwnerJson(req.params.wallet));
});

router.get("/pages", async (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit || 9;
    const supply = await getTotalSupply();

    if (page < 1) {
        res.json({ error: "page param can't be lower than 1" });
        return;
    }

    const filters: { type: string; value?: string }[] = [
        { type: "Background", value: req.query.background },
        { type: "Skin", value: req.query.skin },
        { type: "Mouth", value: req.query.mouth },
        { type: "Eyes", value: req.query.eyes },
        { type: "Head", value: req.query.head },
        { type: "Accessory", value: req.query.accessory },
    ];

    if (page * limit - limit > supply) {
        res.status(404).json({ error: "not yet minted" });
    } else if (filters.every((filter) => !filter.value)) {
        // if there are no filters
        res.json(makeLimitedResponse(bigJson, page, limit, supply.toNumber()));
    } else if (page && limit) {
        const filtredJSON = bigJson.filter((nft) => {
            return filters.every((filter) => {
                if (filter.value) {
                    return nft.details[filter.type].itemName === filter.value;
                }
                return true;
            });
        });
        res.json(
            makeLimitedResponse(filtredJSON, page, limit, supply.toNumber())
        );
    } else if (page && !limit) {
        res.status(400).json({ error: "missing params: limit" });
    } else if (!page && limit) {
        res.status(400).json({ error: "missing params: page" });
    } else res.status(400).json({ error: "missing params: page, limit" });

    res.status(500);
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

//  FUNCTIONS

function checkDate(birthday) {
    birthday = birthday.toNumber();
    if (birthday === 0) {
        return false;
    }

    const currentTime = Date.now() / 1000;
    // return currentTime > birthday + 1209600; // current time > birthday + two weeks
    return currentTime > birthday + 600; // current time > birthday + one hour
}
