import prisma from "../../../prisma/prisma.js";

export function CheckIn(franchise, branch, sector) {
  // Comparas un sector id que tenga misma franquicia, sucursal y sector que las que el usuario puso y eso es lo que devuelve
}

export function GetByPlace(sectorId) {
  return prisma.stock.findMany({
    where: {
      sector_id: sectorId,
    },
    include: {
      get_product: {
        select: {
          fischer_code: true,
          name: true,
          easy_sap: true,
          stockout: true,
          product_picture: true,
          product_picture_type: true,
        },
      },
      get_sector: {
        select: {
          sector: true,
          sector_boss_email: true,
        },
      },
    },
  });
}
