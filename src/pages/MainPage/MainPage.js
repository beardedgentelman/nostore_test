import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup'
import { useAuth0 } from '@auth0/auth0-react'
import { addToCart } from 'actions/cartAction'
import { fetchProducts } from 'actions/productsAllAction'
import { A11y, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ProductCard } from 'components'

import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import 'swiper/css'
import 'animate.css'
import './main-page.css'

const MainPage = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products.products)
  const loading = useSelector(state => state.products.loading)

  const { user, loginWithRedirect } = useAuth0()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleAddToCart = item => {
    dispatch(addToCart(item))
  }

  const filteredProducts = products.filter(product => product.rating.rate > 3.5)

  return (
    <>
      <section className='container mx-auto relative'>
        <div className='rounded-lg overflow-hidden'>
          <img
            className='w-full'
            src='https://img.freepik.com/free-vector/online-shopping-store-with-mobile-shopping-cart-mail-clouds-realistic-style-vector-illustration_548887-136.jpg?w=1380&t=st=1678014315~exp=1678014915~hmac=6062f4d3549cb53a92600d208d7705d9854feaca4015bf5d5ad77ef6183f39d2'
            alt='main banner'
          />
        </div>
        <div className='absolute top-1/3 left-40 animate__animated animate__backInLeft animate__delay-1s'>
          <h1 className='text-8xl text-gray-900 font-bold animate__animated animate__bounceInDown animate__delay-2s'>
            NOSTORE
          </h1>
          <h2 className='text-6xl text-gray-900 font-bold text-end'>Test</h2>
        </div>
      </section>
      <section className='container mx-auto px-10 py-16 overflow-hidden'>
        <h3 className='font-bold text-3xl text-center my-2'>?????????????????? ????????????</h3>
        <div className='border rounded-md'>
          {loading ? (
            <div className='text-lg font-bold text-black'>Loading...</div>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={20}
              slidesPerView={3}
              loop
              navigation
              pagination={{ clickable: true }}
            >
              {filteredProducts.map(product => (
                <SwiperSlide key={product.id}>
                  <ProductCard
                    product={product}
                    buttons={
                      <div className='w-full flex items-center justify-center gap-2'>
                        {user ? (
                          <button
                            onClick={() => handleAddToCart(product)}
                            className='py-2 px-4 border rounded text-fuchsia-50 bg-blue-500 hover:bg-blue-700 transition-all'
                          >
                            ???? ????????????
                          </button>
                        ) : (
                          <Popup
                            trigger={
                              <button className='py-2 px-4 border rounded text-fuchsia-50 bg-blue-500 hover:bg-blue-700 transition-all'>
                                ???? ????????????
                              </button>
                            }
                            position='top center'
                            nested
                          >
                            <div className='flex flex-wrap max-w-xs gap-1 p-4 rounded-lg bg-slate-900 text-fuchsia-50'>
                              <h4 className='text-lg'>?????? ???????????? ?????????? ???? ????????????, ?????? ????????????????</h4>
                              <button
                                className='py-1 px-2 text-sm text-fuchsia-50 bg-sky-500 rounded hover:bg-sky-700 transition-all'
                                onClick={() => loginWithRedirect()}
                              >
                                ???????????? ?????? ??????????????????????????????
                              </button>
                            </div>
                          </Popup>
                        )}

                        <Link to={`/products/${product.id}`}>
                          <button className='py-2 px-4 border rounded text-fuchsia-50 bg-yellow-500 hover:bg-yellow-700 transition-all'>
                            ????????
                          </button>
                        </Link>
                      </div>
                    }
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>
    </>
  )
}

export default MainPage
