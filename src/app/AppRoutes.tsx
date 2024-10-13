import { PropsWithChildren } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/providers/authProvider'
import { Unauthorized } from '@/pages/unauthorized'
import { LoginPage } from '@/pages'
import { DashboardPage } from '@/pages/dashboard'

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/unauthorized" />
}

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/unauthorized" element={<Unauthorized />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      }
    />
  </Routes>
)
