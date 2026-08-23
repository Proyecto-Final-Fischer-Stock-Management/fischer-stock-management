export type UserRole = "admin" | "repositor";

export type AuthUser = {
  id: string;
  completeName: string;
  email: string;
  role: UserRole;
};

export type AuthContextValue = {
  user: AuthUser;
  token: string;
  isAuthenticated: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
};
