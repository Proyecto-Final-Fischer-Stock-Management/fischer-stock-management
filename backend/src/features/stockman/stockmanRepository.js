import prisma from "../../../prisma/prisma";

export function GetByPlace(sector_id) {
  return prisma.product.findMany({
    where: { sectors: { some: { id: sector_id } } },
  });
}
