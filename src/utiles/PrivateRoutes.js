import { Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

export const PrivateRoutes = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0()

  return isAuthenticated ? <Outlet /> : loginWithRedirect({ screen_hint: 'signup' })
}
