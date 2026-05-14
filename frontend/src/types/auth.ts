export type UserRole = 'admin' | 'repositor'

export type AuthUser = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
}

export type AuthContextValue = {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  login: (user: AuthUser, token: string) => void
  logout: () => void
}
