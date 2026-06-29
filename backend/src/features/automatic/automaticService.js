import { CreateStock } from "./automaticRepository";

export async function SCreationProcess(productId, sectorId, minimumStock) {
  await CreateStock(productId, sectorId, minimumStock);
  return "Stock successfully created";
}
