import prisma from "../../../prisma/prisma.js";

export function GetAnUser(id) {
  return prisma.users.findUnique({
    where: {
      id,
    },
    select: {
      complete_name: true,
      email: true,
      role: true,
    },
  });
}

export function GetAllUsers(id) {
  return prisma.users.findMany({
    where: {
      NOT: {
        id: id,
      },
    },
    select: {
      id: true,
      complete_name: true,
      role: true,
    },
  });
}

export function CreateUser(completeName, email, role, hashedpassword) {
  return prisma.users.create({
    data: {
      complete_name: completeName,
      email: email,
      role: role,
      password: hashedpassword,
    },
  });
}

export function DeleteUser(id) {
  return prisma.users.delete({
    where: {
      id,
    },
  });
}
