import prisma from "../../../prisma/prisma.js";

export function GetAllCheckInInfo() {
  return prisma.sectors.findMany({
    include: {
      has_branch: {
        select: {
          id: true,
          direction: true,
          franchise_id: true,
          has_franchise: true,
        },
      },
    },
  });
}

export function PostCheckIn(sectorId, stockmanId) {
  return prisma.checkIn.create({
    data: {
      sector_id: sectorId,
      usersR: {
        connect: {
          id: stockmanId,
        },
      },
    },
  });
}

export function GetLastCheckIn(stockmanId) {
  return prisma.checkIn.findFirst({
    where: {
      usersR: {
        some: {
          id: stockmanId,
        },
      },
    },
    orderBy: {
      checkin_time: "desc",
    },
    include: {
      madein: {
        include: {
          has_branch: {
            include: {
              has_franchise: true,
            },
          },
        },
      },
    },
  });
}

export function GetByPlace(sectorId) {
  return prisma.stock.findMany({
    where: {
      sector_id: sectorId,
    },
    select: {
      product_id: true,
      sector_id: true,
      actual_stock: true,
      minimun_stock: true,
      units_per_cage: true,
    },
    select: {
      get_product: {
        select: {
          fischer_code: true,
          name: true,
          easy_sap: true,
          sodimac_sku: true,
          carrefour_ean: true,
          anonima_codint: true,
          hipertehuelche_code: true,
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

export function SendOrder(
  productId,
  sectorId,
  updatedStock,
  stockOut,
  timeOfSend,
  franchise,
) {
  return prisma.stock.update({
    where: {
      product_id_sector_id: {
        product_id: productId,
        sector_id: sectorId,
      },
    },
    data: {
      updated_stock: updatedStock,
      update_time: timeOfSend,
      update_place: franchise,
      get_product: {
        update: {
          stockout: stockOut,
        },
      },
    },
  });
}

export function GetProductImage(fischerCode) {
  console.log("REPOSITORY FISCHER CODE:", fischerCode);
  return prisma.product.findUnique({
    where: {
      fischer_code: fischerCode,
    },
    select: {
      product_picture: true,
      product_picture_type: true,
    },
  });
}
