import { ethers } from "ethers";
import { ILotteryService } from "./ILotteryService";
import { injectable } from "tsyringe";
import lotteryTokenJSON from "../assets/abi/G2Token.json";
import lotteryJSON from "../assets/abi/G2Lottery.json";

const LOTTERY_TOKEN_ADDRESS = "0x2AD372078F533E36077f7D8745173d319fe7990c"; // LotteryToken contract
const LOTTERY_ADDRESS = "0x98fdf5AB41c6c5442d7Be343a6Ee930E2D12bCa5"; // Lottery contract
const LOTTERY_TOKEN_ABI = lotteryTokenJSON.abi; // MyToken contract ABI
const LOTTERY_ABI = lotteryJSON.abi; // TokenizedBallot contract ABI

@injectable()
export class LotteryService implements ILotteryService {
  // init
  provider: ethers.providers.Provider;
  lotteryTokenContract: ethers.Contract;
  lotteryTokenSignedContract: ethers.Contract;
  lotteryContract: ethers.Contract;
  lotterySignedContract: ethers.Contract;

  constructor() {
    this.provider = ethers.getDefaultProvider("goerli");
    this.lotteryTokenContract = new ethers.Contract(
      LOTTERY_TOKEN_ADDRESS,
      LOTTERY_TOKEN_ABI,
      this.provider
    );
    this.lotteryContract = new ethers.Contract(
      LOTTERY_ADDRESS,
      LOTTERY_ABI,
      this.provider
    );
  }

  async isOwner(signer: ethers.Signer) {
    const owner = await this.lotteryContract.connect(signer).owner();
    return owner === (await signer.getAddress());
  }

  async buyTokens(signer: ethers.Signer, amount: number) {
    const tx = await this.lotteryTokenContract.connect(signer).purchaseTokens({
      value: ethers.utils.parseEther(`${amount}`),
    });
    const receipt = await tx.wait();
    return receipt.transactionHash;
  }

  async bet(signer: ethers.Signer, amount: number) {
    const amountBN = ethers.utils.parseEther(`${amount}`);
    const allowTx = await this.lotteryTokenContract
      .connect(signer)
      .approve(this.lotteryContract.address, amountBN);
    await allowTx.wait();
    const tx = await this.lotteryContract.connect(signer).betMany(amount);
    const receipt = await tx.wait();
    return receipt.transactionHash;
  }

  async ownerWithdraw(signer: ethers.Signer, amount: number) {
    const tx = await this.lotteryContract
      .connect(signer)
      .ownerWithdraw(ethers.utils.parseEther(`${amount}`));
    const receipt = await tx.wait();
    return receipt.transactionHash;
  }

  async burnTokens(signer: ethers.Signer, amount: number) {
    const amountBN = ethers.utils.parseEther(`${amount}`);
    const allowTx = await this.lotteryTokenContract
      .connect(signer)
      .approve(this.lotteryContract.address, amountBN);
    const receiptAllow = await allowTx.wait();
    console.info(`Allowance confirmed (${receiptAllow.transactionHash})\n`);
    const tx = await this.lotteryContract
      .connect(signer)
      .returnTokens(amountBN);
    const receipt = await tx.wait();
    return receipt.transactionHash;
  }

  async claimPrize(signer: ethers.Signer, amount: number) {
    const amountBN = ethers.utils.parseEther(`${amount}`);
    const tx = await this.lotteryContract
      .connect(signer)
      .prizeWithdraw(amountBN);
    const receipt = await tx.wait();
    return receipt.transactionHash;
  }

  async displayPrize(signer: ethers.Signer) {
    const signerAddress = await signer.getAddress();
    const prizeBN = await this.lotteryContract.prize(signerAddress);
    const prize = ethers.utils.formatEther(prizeBN);
    return prize;
  }

  async tokenBalance(signer: ethers.Signer) {

  }

  async ethBalance(signer: ethers.Signer) {

  }

  async startLottery(duration: number, signer: ethers.Signer) {

  }

  async ownerBalance(signer: ethers.Signer) {

  }


  async closeLottery(signer: ethers.Signer) {

  }

}
