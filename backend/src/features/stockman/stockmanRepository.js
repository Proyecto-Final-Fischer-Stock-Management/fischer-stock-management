import prisma from "../../../prisma/prisma.js";

export function GetByPlace(sector_id) {
  return prisma.product.findMany({
    where: {},
  });
}
