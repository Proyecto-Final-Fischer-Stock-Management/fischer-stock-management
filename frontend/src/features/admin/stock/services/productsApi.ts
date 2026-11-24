import { apiRequest } from "../../../../services/apiClient";
import type { Product, ProductSummary } from "../../../../types/product";

export async function GetProducts(token: string) {
  const response = await apiRequest<{ info: ProductSummary[] }>("/administrator/stock/products", { token });
  return response.info;
}

export async function GetProduct(fischerCode: string, token: string) {
  const response = await apiRequest<{ info: Product }>(
    `/administrator/stock/product/${fischerCode}`, { token },
  );
  return response.info;
}

export function GetProductImage(fischerCode: number, token: string) {
  return apiRequest<Blob>(`/administrator/stock/product/${fischerCode}/image`, { token, responseType: "blob" });
}

export function CreateProduct(data: FormData, token: string) {
  return apiRequest("/administrator/stock/product", { method: "POST", body: data, token });
}

export function UpdateProduct(data: FormData, token: string) {
  return apiRequest("/administrator/stock/product", { method: "PUT", body: data, token });
}

export function DeleteProduct(fischerCode: number, token: string) {
  return apiRequest("/administrator/stock/product", { method: "DELETE", body: { fischerCode }, token });
}