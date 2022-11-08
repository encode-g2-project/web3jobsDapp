import { ethers } from "ethers";
import { IJobPostService, PublishJobPayload } from "./IJobPostService";
import { injectable } from "tsyringe";
import web3JobsJson from "../assets/web3Jobs.json";

const CONTRACT_ADDRESS = "0x145356Af39a75d9c11bB19e834cbA6084f7887b7"; // Jobs contract
const CONTRACT_ABI = web3JobsJson.abi; // Jobs contract ABI

@injectable()
export class JobPostService implements IJobPostService {
  // init
  provider: ethers.providers.Provider;
  jobsContract: ethers.Contract;
  jobsSignedContract: ethers.Contract;

  constructor() {
    this.provider = ethers.getDefaultProvider("goerli");

    this.jobsContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      this.provider
    );
  }

  async publishJob(signer: ethers.Signer, payload: PublishJobPayload) {
    const signedContract = this.jobsContract.connect(signer);
    const tx = await signedContract.publishJob(
      ethers.utils.formatBytes32String(payload.jobId),
      payload.bountyAmount,
      payload.token
    );
    const receipt = await tx.wait();
    return receipt;
  }
  async unpublishJob(signer: ethers.Signer, jobId: string) {
    const signedContract = this.jobsContract.connect(signer);
    const tx = await signedContract.unpublishJob(
      ethers.utils.formatBytes32String(jobId)
    );
    const receipt = await tx.wait();
    return receipt;
  }
  async closeJobOffer(signer: ethers.Signer, jobId: string) {
    const signedContract = this.jobsContract.connect(signer);
    const tx = await signedContract.closeJobOffer(
      ethers.utils.formatBytes32String(jobId)
    );
    const receipt = await tx.wait();
    return receipt;
  }
}
