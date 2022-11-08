import { ethers } from "ethers";

export interface IJobPostService {
  isOwner(signer: ethers.Signer): Promise<boolean>;
  postJob: () => void;
  getMyJobs: () => void;
  unpublishJob: () => void;
}
