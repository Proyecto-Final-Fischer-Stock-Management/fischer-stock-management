import { apiRequest } from "../../../../services/apiClient";

export type Place = {
  getBranch: {
    direction: string;
    franchiseId: number;
  };
  getFranchise: {
    id: number;
    name: string;
    branchesAmount: number;
  };
};
