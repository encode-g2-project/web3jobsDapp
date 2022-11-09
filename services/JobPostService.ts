import { ethers } from "ethers";
import { IJobPostService, PublishJobPayload } from "./IJobPostService";
import { injectable } from "tsyringe";
import web3JobsJson from "../assets/web3Jobs.json";

const CONTRACT_ADDRESS = "0x4D8Aef7882E6AaF221eFb7fA3649D069f7117Fc3"; // Jobs contract
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
      payload.token
        ? ethers.utils.parseEther(`${payload.bountyAmount}`)
        : ethers.utils.parseEther("0"),
      payload.token ??
        ethers.utils.getAddress("0x0000000000000000000000000000000000000000"),
      {
        value: ethers.utils.parseEther(`${payload.bountyAmount}`),
      }
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
  async getMyJobs(signer: ethers.Signer) {
    const signedContract = this.jobsContract.connect(signer);
    const value = await signedContract.getMyJobs();
    return value;
  }
}
