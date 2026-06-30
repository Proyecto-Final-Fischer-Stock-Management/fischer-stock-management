import { CreateStock } from "./automaticRepository.js";

export async function SCreationProcess(productId, sectorId, minimumStock) {
  const stock = await CreateStock(productId, sectorId, minimumStock);
  return { stock };
}
