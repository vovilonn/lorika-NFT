import { ethers } from "ethers";
import ABI from "../etc/mint-pass-ABI.json";
import config from "../config.json";

const contract = process.env.DEV
    ? config.contract.testnet
    : config.contract.mainnet;

const provider = new ethers.providers.JsonRpcProvider(contract.provider);

const contractInstance = new ethers.Contract(contract.mintPass, ABI, provider);

export const getTotalSupply = async () => {
    try {
        return await contractInstance.totalSupply();
    } catch (err) {
        console.error(err);
    }
};
