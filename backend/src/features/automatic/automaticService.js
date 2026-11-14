import { CreateStock } from "./automaticRepository.js";

export async function SCreationProcess(
  productId,
  sectorId,
  minimumStock,
  actualStock,
  unitsPerCage,
) {
  const stock = await CreateStock(
    productId,
    sectorId,
    minimumStock,
    actualStock,
    unitsPerCage,
  );
  return { stock };
}
