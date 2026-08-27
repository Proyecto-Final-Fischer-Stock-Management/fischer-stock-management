import {
  createContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { AuthContextValue, AuthUser } from "../../types/auth";

export const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("auth_token");
    const savedUser = localStorage.getItem("auth_user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handleAuthLogout = () => {
      setUser(null);
      setToken(null);
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    };

    window.addEventListener("auth:logout", handleAuthLogout);

    return () => {
      window.removeEventListener("auth:logout", handleAuthLogout);
    };
  });

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isLoading,
      login: (nextUser, nextToken) => {
        setUser(nextUser);
        setToken(nextToken);
        localStorage.setItem("auth_user", JSON.stringify(nextUser));
        localStorage.setItem("auth_token", nextToken);
      },
      logout: () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
      },
    }),
    [user, token, isLoading],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}
