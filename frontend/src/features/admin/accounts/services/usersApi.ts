import { apiRequest } from "../../../../services/apiClient";
import type { Account, UserFormData } from "../../../../types/user";

// Cambiar que el admin no mand su ID (ya esta en el token)

export async function GetUsers(adminId: string, token: string) {
  const response = await apiRequest<{ users: Account[] }>(
    `/administrator/accounts/users/${adminId}`,
    { token },
  );
  return response.users;
}

export async function GetUser(id: string, token: string) {
  const response = await apiRequest<{ user: Account }>(
    `/administrator/accounts/user/${id}`,
    { token },
  );
  return response.user;
}

export function CreateUser(data: UserFormData, token: string) {
  return apiRequest("/administrator/accounts/user", {
    method: "POST",
    body: data,
    token,
  });
}

export function UpdateUser(id: number, data: UserFormData, token: string) {
  return apiRequest("/administrator/accounts/user", {
    method: "PUT",
    body: { id, ...data },
    token,
  });
}

export function DeleteUser(id: number, token: string) {
  return apiRequest("/administrator/accounts/user", {
    method: "DELETE",
    body: { id },
    token,
  });
}
