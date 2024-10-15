import type { LoginRequest, UserInfo } from '@/types'
import {
  createContext,
  useState,
  useContext,
  type PropsWithChildren,
} from 'react'
import { apiService } from '@/lib/axios'
import { LOGIN_URL } from '@/config'

const defaultUserInfo = {
  email: '',
  token: '',
}

const AuthContext = createContext({
  isAuthenticated: false,
  error: '',
  userInfo: defaultUserInfo,
  login: (username?: string, password?: string) => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo)
  const [error, setError] = useState<string>('')

  const login = async (email = '', password = '') => {
    try {
      const response = await apiService.post<LoginRequest, LoginResponse>(
        `${LOGIN_URL}`,
        { email, password },
      )
      const { token } = response.data
      localStorage.setItem('authToken', token)
      setUserInfo({ token, email })
    } catch (error: unknown) {
      setError('Invalid credentials')
    }
  }

  const logout = () => {
    setUserInfo(defaultUserInfo)
    setError('')
    localStorage.removeItem('authToken')
  }

  const isAuthenticated = !!userInfo

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, error, userInfo, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
