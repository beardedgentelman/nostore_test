import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { clearStore } from 'actions/clearStoreAction'
import Auth0ProviderWithHistory from 'auth/auth0Provider'
import { FooterContainer, HeaderContainer, MainContainer } from 'containers'
import { CartPage, MainPage, ProductSinglePage, ProductsPage, ProfilePage } from 'pages'
import { AuthRoute } from 'utiles/AuthRoute'
import { PrivateRoutes } from 'utiles/PrivateRoutes'

import { HeaderLogo, HeaderNav } from 'components'

function App() {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.items)
  const cartQuantity = cartItems.length

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      localStorage.clear()
    })

    return () => {
      dispatch(clearStore())
    }
  }, [dispatch])

  return (
    <Auth0ProviderWithHistory>
      <div className='flex flex-col min-h-full h-full items-stretch App'>
        <HeaderContainer>
          <HeaderLogo />
          <HeaderNav cartQuantity={cartQuantity} />
        </HeaderContainer>
        <MainContainer>
          <Routes>
            <Route path='/' element={<MainPage />} exact />
            <Route element={<PrivateRoutes />}>
              <Route path='/products' element={<ProductsPage type='products' />} />
              <Route path='/user_page' element={<ProfilePage type='user' />} />
              <Route path='/cart' element={<CartPage type='user' />} />
            </Route>
            <Route path='/products/:productId' element={<ProductSinglePage type='products' />} />
          </Routes>
        </MainContainer>
        <FooterContainer></FooterContainer>
      </div>
    </Auth0ProviderWithHistory>
  )
}

export default App
