import { apiRequest } from "../../../services/apiClient";
import type { AuthUser, UserRole } from "../../../types/auth";

type BackendRole = "Administrator" | "Stockman";

type LoginResponse = {
  result: {
    token: string;
    user: {
      id: number;
      completeName: string;
      email: string;
      role: BackendRole;
    };
  };
};

type LoginCredentials = {
  email: string;
  password: string;
};

const roleMap: Record<BackendRole, UserRole> = {
  Administrator: "admin",
  Stockman: "repositor",
};

function toAuthUser(user: LoginResponse["result"]["user"]): AuthUser {
  return {
    id: String(user.id),
    completeName: user.completeName,
    email: user.email,
    role: roleMap[user.role],
  };
}

export async function loginRequest(credentials: LoginCredentials) {
  const response = await apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: credentials,
  });

  return {
    token: response.result.token,
    user: toAuthUser(response.result.user),
  };
}
