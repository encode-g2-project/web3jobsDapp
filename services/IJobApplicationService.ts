import { ethers } from "ethers";

export interface ChangeApplicationStatus {
  applicantAddress: string;
  jobId: string;
  status: ApplicationStatus;
}

export const ApplicationStatuses = [
  "screening",
  "firstInterview",
  "technicalTest",
  "finalInterview",
  "hired",
  "rejected",
] as const;

export type ApplicationStatus = typeof ApplicationStatuses[number];

export interface IJobApplicationService {
  newApplication: () => void;
  getMyApplications: () => void;

  getMyApplicants: (jobId: string) => void;

  claimBounty: (jobId: string) => void;
  changeApplicationStatus: (payload: ChangeApplicationStatus) => void;
}
