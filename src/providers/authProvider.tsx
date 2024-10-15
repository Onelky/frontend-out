import type { LoginRequest, UserInfo } from '@/types'
import {
  createContext,
  useState,
  useContext,
  type PropsWithChildren,
  useEffect,
} from 'react'
import { apiService } from '@/lib/axios'
import { LOGIN_URL } from '@/config'
import { useNavigate } from 'react-router-dom'

interface AuthContextValues {
  isAuthenticated: boolean
  error: string
  userInfo: UserInfo | null
  login: (username?: string, password?: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValues>({
  isAuthenticated: false,
  error: '',
  userInfo: null,
  login: () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      setUserInfo({ token, email: 'test@example.com' })
    } else {
      setUserInfo(null)
    }
  }, [])

  const login = async (email = '', password = '') => {
    try {
      const response = await apiService.post<LoginRequest, UserInfo>(
        `${LOGIN_URL}`,
        { email, password },
      )

      const { token = '' } = response

      localStorage.setItem('authToken', token)
      setUserInfo({ token, email })
      navigate('/dashboard')
    } catch (error: unknown) {
      setError('Invalid credentials')
    }
  }

  const logout = () => {
    setUserInfo(null)
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
