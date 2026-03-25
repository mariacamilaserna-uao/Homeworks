import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface User {
  username: string
  email: string
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (username: string, email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = (username: string, email: string, password: string): boolean => {
    if (email === 'usuario@mail.com' && password === '123') {
      setUser({ username, email })
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    isLoggedIn: user !== null,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}
