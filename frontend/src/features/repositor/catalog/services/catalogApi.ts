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
  };
  getPlace: {
    sector: string;
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

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4306";

export async function GetProductImage(
  fischerCode: number,
  token: string,
): Promise<string> {
  const response = await fetch(
    `${API_BASE_URL}/stockman/catalog/product/${fischerCode}/image`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("No se pudo obtener la imagen del producto");
  }

  const imageBlob = await response.blob();

  return URL.createObjectURL(imageBlob);
}
