import { ethers } from "ethers";

export interface IJobPostService {
  postJob: () => void;
  getMyJobs: () => void;
  unpublishJob: () => void;
}
