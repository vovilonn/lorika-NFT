import { getTokensOfOwner } from "./contract";
import config from "../config.json";

const bigJson = require("../files/bigJson.json");

export function makeLimitedResponse(data, page, limit, supply) {
    let correctLimit =
        page * limit > supply ? supply - (page * limit - limit) : limit;

    page--;

    if (page * correctLimit > data.length) {
        return [...data]
            .splice(page * correctLimit)
            .map((nft) => makeNFTdata(nft));
    } else {
        return [...data]
            .splice(page * correctLimit, correctLimit)
            .map((nft, i) => makeNFTdata(nft));
    }
}

export function makeEmbrionData(nftId) {
    return {
        image: "https://cockiz-test.ru/api/images/unrevealed.gif",
        external_url: config.ROOT_URL + `nft/${nftId}`,
        attributes: [
            {
                value: "empty",
                trait_type: "None",
            },
        ],
        name: "empty",
    };
}

export function makeNFTdata(jsonObject) {
    if (!jsonObject) {
        return {};
    }
    const nftId = jsonObject.fileName.split("#")[1].split(".")[0];
    const getLiteImagePath = (ipfsPath) => {
        return (
            config.ROOT_URL +
            "images/lite/" +
            ipfsPath.split("ipfs")[2].split("/")[1] +
            ".png"
        );
    };
    const data = {
        image: jsonObject.image,
        lite_image: getLiteImagePath(jsonObject.image),
        external_url: config.ROOT_URL + `api/nft/${nftId}`,
        attributes: [
            {
                value: jsonObject.details.Background.itemName,
                trait_type: "Background",
            },
            { value: jsonObject.details.Skin.itemName, trait_type: "Skin" },
            { value: jsonObject.details.Mouth.itemName, trait_type: "Mouth" },
            { value: jsonObject.details.Eyes.itemName, trait_type: "Eyes" },
            { value: jsonObject.details.Head.itemName, trait_type: "Head" },
            {
                value: jsonObject.details.Accessory.itemName,
                trait_type: "Accessory",
            },
        ],
        name: jsonObject.fileName.split(".png")[0],
        id: nftId,
    };
    return data;
}

export async function makeTokensOfOwnerJson(wallet) {
    const tokensID = await getTokensOfOwner(wallet);

    return tokensID.map((id) => makeNFTdata(bigJson[id.toNumber()]));
}
