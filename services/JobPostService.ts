import { ethers } from "ethers";
import { IJobPostService } from "./IJobPostService";
import { injectable } from "tsyringe";

const CONTRACT_ADDRESS = ""; // Jobs contract
const CONTRACT_ABI = []; // Jobs contract ABI

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
  async postJob() {}
  async getMyJobs() {}
  async unpublishJob() {}
}
