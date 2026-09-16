import prisma from "../../../prisma/prisma.js";

export function GetAllCheckInInfo() {
  return prisma.sectors.findMany({
    include: {
      has_branch: {
        include: {
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
      usersR: stockmanId,
    },
    orderBy: {
      checkin_time: "desc",
    },
  });
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
