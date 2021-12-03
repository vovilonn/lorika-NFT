import { makeLimitedResponse, makeEmbrionData, makeNFTdata } from "./makeData";

const NFTSample = {
    fileName: "Phallus #0.png",
    image: "https://ipfs.io/ipfs/bafybeiey2h4k57ndck7sqovtw7hqxqqv5b2qdn3oagvvxyqg66x3or2kee/Phallus-0.png",
    details: {
        Skin: {
            type: "common basic",
            rarity: "11.20",
            itemName: "tattooed",
        },
        Mouth: {
            type: "common basic",
            rarity: "4.66",
            itemName: "beard and mustache",
        },
        Head: {
            type: "common basic",
            rarity: "3.73",
            itemName: "phallus cap",
        },
        Eyes: {
            type: "common basic",
            rarity: "10.13",
            itemName: "ski mask",
        },
        Background: {
            type: "None",
            rarity: "16.50",
            itemName: "lilac",
        },
        Accessory: {
            type: "common basic",
            rarity: "4.50",
            itemName: "maraca",
        },
    },
};

const validNFTSample = {
    image: "https://ipfs.io/ipfs/bafybeiey2h4k57ndck7sqovtw7hqxqqv5b2qdn3oagvvxyqg66x3or2kee/Phallus-0.png",
    lite_image:
        "https://familyphallusplanet.com/images/lite/bafybeiey2h4k57ndck7sqovtw7hqxqqv5b2qdn3oagvvxyqg66x3or2kee.png",
    external_url: "https://familyphallusplanet.com/api/nft/0",
    attributes: [
        { value: "lilac", trait_type: "Background" },
        { value: "tattooed", trait_type: "Skin" },
        { value: "beard and mustache", trait_type: "Mouth" },
        { value: "ski mask", trait_type: "Eyes" },
        { value: "phallus cap", trait_type: "Head" },
        { value: "maraca", trait_type: "Accessory" },
    ],
    name: "Phallus #0",
    id: "0",
};

const NFTEmbrionSample = {
    image: "https://cockiz-test.ru/api/images/unrevealed.gif",
    external_url: "https://familyphallusplanet.com/nft/0",
    attributes: [
        {
            value: "empty",
            trait_type: "None",
        },
    ],
    name: "empty",
};

const bigData = [
    NFTSample,
    NFTSample,
    NFTSample,
    NFTSample,
    NFTSample,
    NFTSample,
    NFTSample,
    NFTSample,
    NFTSample,
    NFTSample,
    NFTSample,
    NFTSample,
];

describe("Make data: makeLimitedResponse", () => {
    test("should be defined", () => {
        expect(makeLimitedResponse).toBeDefined();
    });

    test("should return the limited response", () => {
        const expectation = [
            validNFTSample,
            validNFTSample,
            validNFTSample,
            validNFTSample,
            validNFTSample,
        ];

        expect(makeLimitedResponse(bigData, 0, 5, 3333)).toEqual(expectation);
    });
});

describe("Make data: makeEmbrionData", () => {
    test("should be defined", () => {
        expect(makeEmbrionData).toBeDefined();
    });

    test("should return a valid embrion data", () => {
        expect(makeEmbrionData(0)).toEqual(NFTEmbrionSample);
    });
});

describe("Make data: makeNFTdata", () => {
    test("should be defined", () => {
        expect(makeNFTdata).toBeDefined();
    });

    test("should return a valid nft data", () => {
        expect(makeNFTdata(NFTSample)).toEqual(validNFTSample);
    });
});
