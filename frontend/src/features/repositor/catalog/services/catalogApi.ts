import { apiRequest } from "../../../../services/apiClient";

export type StockProduct = {
  productId: number;
  sectorId: number;
  actualStock: number;
  minimunStock: number;
  getProduct: {
    fischerCode: number;
    name: string;
    easySap: number;
    stockout: boolean;
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
