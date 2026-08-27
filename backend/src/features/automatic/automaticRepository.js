import prisma from "../../../prisma/prisma.js";

export function CreateStock(productId, sectorId, minimumStock, unitsPerCage) {
  return prisma.stock.create({
    data: {
      product_id: productId,
      sector_id: sectorId,
      minimun_stock: minimumStock,
      units_per_cage: unitsPerCage,
    },
  });
}
