import { ethers } from "ethers";

export interface ILotteryService {
  isOwner(signer: ethers.Signer): Promise<boolean>;
  buyTokens(signer: ethers.Signer, amount: number): Promise<string>;
  bet(signer: ethers.Signer, amount: number): Promise<string>;
  ownerWithdraw(signer: ethers.Signer, amount: number): Promise<string>;
  burnTokens(signer: ethers.Signer, amount: number): Promise<string>;
  claimPrize(signer: ethers.Signer, amount: number): Promise<string>;
  displayPrize(signer: ethers.Signer): Promise<string>;
  ethBalance(signer: any): any;
  startLottery(duration: number, signer: any): any;
  ownerBalance(signer: any): any;
  closeLottery(signer: ethers.Signer): any;
  tokenBalance(signer: ethers.Signer): any;
}
