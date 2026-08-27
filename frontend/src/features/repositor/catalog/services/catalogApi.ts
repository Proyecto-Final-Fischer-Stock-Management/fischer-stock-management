import { apiRequest } from "../../../../services/apiClient.ts";

export type StockProduct = {
  productId: number;
  sectorId: number;
  actualStock: number;
  minimunStock: number;
  unitsPerCage: number;
  getProduct: {
    fischerCode: number;
    name: string;
    easySap: number;
    stockout: boolean;
    productPicture: string;
    productPictureType: string;
  };
  getPlace: {
    sector: number;
    sectorBossEmail: number;
  };
};

type StockResponse = {
  result: StockProduct[];
};

export async function GetStock(sectorId: number, token: string) {
  return apiRequest<StockResponse>(`/stockman/catalog/stock/${sectorId}`, {
    method: "GET",
    token,
  });
}
