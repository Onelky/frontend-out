import { PropsWithChildren } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/providers/authProvider'
import { Unauthorized } from '@/pages/unauthorized'
import { LoginPage } from '@/pages'
import { DashboardPage } from '@/pages/dashboard'

type RouteProps = PropsWithChildren<{
  // Where to redirect if authenticated or not authenticated
  redirectTo?: string
  // If true, requires authentication to view children
  isProtected?: boolean
}>

/**
 * Component that manages access to protected and unauthorized routes.
 *
 * This component checks the user's authentication status and conditionally renders
 * its children or redirects to specified routes based on whether the route is protected
 * or unauthorized.
 *
 */

const RouteGuardian = ({ children, redirectTo, isProtected }: RouteProps) => {
  const { isAuthenticated } = useAuth()

  if (isProtected)
    return isAuthenticated ? children : <Navigate to="/" />
  return isAuthenticated && redirectTo ? <Navigate to={redirectTo} /> : children
}

export const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <RouteGuardian redirectTo={'dashboard'}>
          <LoginPage />
        </RouteGuardian>
      }
    />
    <Route path="/unauthorized" element={<Unauthorized />} />
    <Route
      path="/dashboard"
      element={
        <RouteGuardian isProtected>
          <DashboardPage />
        </RouteGuardian>
      }
    />
  </Routes>
)
