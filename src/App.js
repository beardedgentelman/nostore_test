import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Auth0ProviderWithHistory from 'auth/auth0Provider'
import { FooterContainer, HeaderContainer, MainContainer } from 'containers'
import { ProductSinglePage, ProductsPage } from 'pages'

import { HeaderLogo, HeaderNav } from 'components'

function App() {
  const cartItems = useSelector(state => state.cart.items)
  const cartQuantity = cartItems.length

  return (
    <Auth0ProviderWithHistory>
      <div className='flex flex-col min-h-full h-full items-stretch App'>
        <HeaderContainer>
          <HeaderLogo />
          <HeaderNav cartQuantity={cartQuantity} />
        </HeaderContainer>
        <MainContainer>
          <Routes>
            <Route path='/products' element={<ProductsPage type='products' />} />
            <Route path='/products/:productId' element={<ProductSinglePage type='products' />} />
          </Routes>
        </MainContainer>
        <FooterContainer></FooterContainer>
      </div>
    </Auth0ProviderWithHistory>
  )
}

export default App
