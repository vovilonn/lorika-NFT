import { getTokensOfOwner } from "../services/contract";
import config from "../../config.json";
import fs from "fs";
import path from "path";

export function makeEmbrionData(nftId) {
    const randomImageIndex = Math.floor(Math.random() * 16) + 1; //Максимум и минимум включаются
    return {
        image: `${config.ROOT_URL}api/images/embrion/${randomImageIndex}.png`,
        external_url: config.ROOT_URL + `api/nft/${nftId}`,
        attributes: [
            {
                value: "empty",
                trait_type: "None",
            },
        ],
        name: "empty",
    };
}

export async function makeTokensOfOwnerJson(wallet) {
    const tokensID = await getTokensOfOwner(wallet);

    return tokensID.map((id) =>
        fs.readFileSync(path.resolve(`./files/nft/${id}.json`))
    );
}
