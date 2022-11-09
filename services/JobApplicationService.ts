import { ethers } from "ethers";
import {
  ChangeApplicationStatus,
  IJobApplicationService,
} from "./IJobApplicationService";
import { injectable } from "tsyringe";
import web3JobsJson from "../assets/web3Jobs.json";

const CONTRACT_ADDRESS = "0x118a97555a8A3f8928576465fe38a37A4278D8a5"; // Jobs contract
const CONTRACT_ABI = web3JobsJson.abi; // Jobs contract ABI

@injectable()
export class JobApplicationService implements IJobApplicationService {
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
  async newApplication(signer: ethers.Signer, jobId: string) {
    const signedContract = this.jobsContract.connect(signer);
    const tx = await signedContract.newApplication(jobId);
    const receipt = await tx.wait();
    return receipt;
  }
  async getMyApplicants(jobId: string) {
    const result = await this.jobsContract.getMyApplicants(
      ethers.utils.formatBytes32String(jobId)
    );
    return result;
  }
  async claimBounty(signer: ethers.Signer, jobId: string) {
    const signedContract = this.jobsContract.connect(signer);
    const tx = await signedContract.claimBounty(
      ethers.utils.formatBytes32String(jobId)
    );
    const receipt = await tx.wait();
    return receipt;
  }
  async changeApplicationStatus(
    signer: ethers.Signer,
    payload: ChangeApplicationStatus
  ) {
    const signedContract = this.jobsContract.connect(signer);
    const tx = await signedContract.changeApplicationStatus(
      payload.applicantAddress,
      ethers.utils.formatBytes32String(payload.jobId),
      payload.status
    );
    const receipt = await tx.wait();
    return receipt;
  }
  async getMyApplications(signer: ethers.Signer) {
    const signedContract = this.jobsContract.connect(signer);
    const value = await signedContract.getMyApplications();
    return value;
  }
  async getApplicants(applicantAddress: string, jobId: string, index: number) {
    const value = await this.jobsContract.Applicants(
      applicantAddress,
      jobId,
      index
    );
    return value;
  }
}
