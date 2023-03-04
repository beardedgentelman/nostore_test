import { Navigate, Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

export const AuthRoute = () => {
  const { isAuthenticated } = useAuth0()
  return isAuthenticated ? <Navigate to='/' replace /> : <Outlet />
}
