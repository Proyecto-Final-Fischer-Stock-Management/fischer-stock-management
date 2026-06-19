import prisma from "../../../prisma/prisma.js";

export async function findByEmail(email) {
  return prisma.users.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      complete_name: true,
      email: true,
      role: true,
      password: true,
    },
  });
}
