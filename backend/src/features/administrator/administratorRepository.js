import prisma from "../../../prisma/prisma.js";

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
