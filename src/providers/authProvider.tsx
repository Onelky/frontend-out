import {
  createContext,
  useState,
  useContext,
  FC,
  PropsWithChildren,
} from 'react'
import {apiService} from "@/lib/axios";
import {LOGIN_URL} from "@/config";
import {LoginRequest, LoginResponse} from "@/types";
import {AxiosError} from "axios";

const AuthContext = createContext({
  isAuthenticated: false,
  error: null,
  login: (username: string, password: string) => {},
  logout: () => {},
})

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'))
  const [error, setError] = useState<string | null>(null)
  const login = async (username: string, password: string) => {
    try {
      const response = await apiService.post<LoginRequest, LoginResponse>(LOGIN_URL, { username, password });
      const { token } = response.data;
      setAuthToken(token);
      localStorage.setItem('authToken', token);
      
    } catch (error: unknown) {
      setError((error as AxiosError<{message: string}>).message);
    } 
      
  }

  const logout = () => {
    setAuthToken(null)
    localStorage.removeItem('authToken')
  }

  const isAuthenticated = !!authToken

  return (
    <AuthContext.Provider value={{ isAuthenticated, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
