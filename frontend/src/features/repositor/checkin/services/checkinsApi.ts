import { apiRequest } from "../../../../services/apiClient";

export type CheckInPlace = {
  sectorId: number;
  sector: string;
  sectorBossEmail: string;

  branch: {
    id: number;
    direction: string;
    franchiseId: number;
  };

  franchise: {
    id: number;
    name: string;
    branchesAmount: number;
  };
};

type CheckInInfoResponse = {
  info: {
    id: number;
    sector: string;
    sector_boss_email: string;
    branches_id: number;

    has_branch: {
      id: number;
      direction: string;
      franchise_id: number;

      has_franchise: {
        id: number;
        name: string;
        branches_amount: number;
      };
    };
  }[];
};

export async function GetCheckInInfo(token: string | null) {
  const response = await apiRequest<CheckInInfoResponse>(
    "/stockman/check-in/info",
    {
      method: "GET",
      token,
    },
  );

  return response.info.map((item) => ({
    sectorId: item.id,
    sector: item.sector,
    sectorBossEmail: item.sector_boss_email,

    branch: {
      id: item.has_branch.id,
      direction: item.has_branch.direction,
      franchiseId: item.has_branch.franchise_id,
    },

    franchise: {
      id: item.has_branch.has_franchise.id,
      name: item.has_branch.has_franchise.name,
      branchesAmount: item.has_branch.has_franchise.branches_amount,
    },
  }));
}

export async function PushCheckIn(token: string, sectorId: number) {
  const response = await apiRequest("/stockman/check-in", {
    method: "POST",
    body: { sectorId },
    token,
  });

  return response;
}
