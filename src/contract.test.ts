import { getBirthday, getTotalSupply, getTokensOfOwner } from "./contract";

const bigNumberExpectation = { _hex: expect.any(String), _isBigNumber: true };
describe("Main contract: getBirthday", () => {
    test("should de defined", () => {
        expect(getBirthday).toBeDefined();
    });

    test("should return a bigNumber object", async () => {
        const result = await getBirthday(1);
        expect(result).toEqual(bigNumberExpectation);
    });
});

describe("Main contract: getTotalSupply", () => {
    test("should be defined", () => {
        expect(getTotalSupply).toBeDefined();
    });

    test("should return a bigNumber object", async () => {
        const result = await getTotalSupply();
        expect(result).toEqual(bigNumberExpectation);
    });
});
