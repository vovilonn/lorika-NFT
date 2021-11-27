import { getTotalSupply } from "./contract-mint-pass";

const bigNumberExpectation = { _hex: expect.any(String), _isBigNumber: true };

describe("Mint-pass contract: getTotalSupply", () => {
    test("should be defined", () => {
        expect(getTotalSupply).toBeDefined();
    });

    test("should return a bigNumber object", async () => {
        const result = await getTotalSupply();
        expect(result).toEqual(bigNumberExpectation);
    });
});
