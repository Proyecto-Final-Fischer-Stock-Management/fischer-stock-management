import { apiRequest } from "../../../../services/apiClient";

type StockInformation = {
  productId: number;
  sectorId: number;
  updatedStock: number;
  stockOut: boolean;
  franchise: string;
};

export async function PostProductsInformation(
  token: string,
  information: StockInformation,
) {
  const result = await apiRequest("/stockman/sendorder", {
    method: "PUT",
    body: { information },
    token,
  });

  return result;
}
