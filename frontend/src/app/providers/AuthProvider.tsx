import { createContext, useMemo, useState, type ReactNode } from "react";
import type { AuthContextValue, AuthUser } from "../../types/auth";

export const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      login: (nextUser, nextToken) => {
        setUser(nextUser);
        setToken(nextToken);
      },
      logout: () => {
        setUser(null);
        setToken(null);
      },
    }),
    [user, token],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}
