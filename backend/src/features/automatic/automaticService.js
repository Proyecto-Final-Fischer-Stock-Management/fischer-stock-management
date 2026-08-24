import { CreateStock } from "./automaticRepository.js";

export async function SCreationProcess(
  productId,
  sectorId,
  minimumStock,
  unitsPerCage,
) {
  const stock = await CreateStock(
    productId,
    sectorId,
    minimumStock,
    unitsPerCage,
  );
  return { stock };
}
