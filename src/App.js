import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { clearStore } from 'actions/clearStoreAction'
import Auth0ProviderWithHistory from 'auth/auth0Provider'
import { FooterContainer, HeaderContainer, MainContainer } from 'containers'
import { CartPage, MainPage, ProductSinglePage, ProductsPage, ProfilePage } from 'pages'
import { store } from 'store/configureStore'

import { HeaderLogo, HeaderNav } from 'components'

function App() {
  const cartItems = useSelector(state => state.cart.items)
  const cartQuantity = cartItems.length

  const { user, logout } = useAuth0()

  useEffect(() => {
    const handleBeforeUnload = event => {
      if (user) {
        try {
          store.dispatch(clearStore())
          localStorage.removeItem('cart')
          if (event) {
            event.preventDefault()
            event.returnValue = ''
          }
        } catch (error) {
          console.error(error)
        }
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      logout()
    }
  }, [user, logout])

  return (
    <Auth0ProviderWithHistory>
      <div className='flex flex-col min-h-full h-full items-stretch App'>
        <HeaderContainer>
          <HeaderLogo />
          <HeaderNav cartQuantity={cartQuantity} />
        </HeaderContainer>
        <MainContainer>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/products' element={<ProductsPage type='products' />} />
            <Route path='/products/:productId' element={<ProductSinglePage type='products' />} />
            <Route path='/user_page' element={<ProfilePage type='user' />} />
            <Route path='/cart' element={<CartPage type='user' />} />
          </Routes>
        </MainContainer>
        <FooterContainer></FooterContainer>
      </div>
    </Auth0ProviderWithHistory>
  )
}

export default App
