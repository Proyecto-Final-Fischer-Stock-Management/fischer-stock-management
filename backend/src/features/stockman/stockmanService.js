import { GetByPlace } from "./stockmanRepository.js";

export async function SGettingManyProcess(sectorId) {
  const stock = await GetByPlace(sectorId);
  return stock;
}
