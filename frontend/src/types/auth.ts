export type UserRole = "admin" | "repositor";

export type AuthUser = {
  id: string;
  completeName: string;
  email: string;
  role: UserRole;
};

export type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
};
