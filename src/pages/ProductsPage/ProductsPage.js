import { useEffect, useState } from 'react'
import { CgArrowDown, CgArrowUp } from 'react-icons/cg'
import { ImCross } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from 'actions/cartAction'
import { fetchProducts } from 'actions/productsAllAction'
import classNames from 'classnames'

import { ProductCard } from 'components'

const ProductsPage = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products.products)
  const loading = useSelector(state => state.products.loading)
  const [categoriesArr, setCategoriesArr] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isPriceSort, setIsPriceSort] = useState(false)
  const [priceSortOrder, setPriceSortOrder] = useState(null)
  const [isRatingSort, setIsRatingSort] = useState(false)
  const [ratingSortOrder, setRatingSortOrder] = useState(null)
  const [isPriceHover, setIsPriceHover] = useState(false)
  const [isRatingHover, setIsRatingHover] = useState(false)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  useEffect(() => {
    const categoriesSet = new Set(products.map(product => product.category))
    setCategoriesArr([...categoriesSet])
  }, [products])

  const filteredCategory = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products

  let sortedProducts = filteredCategory
  if (isPriceSort) {
    sortedProducts = [...filteredCategory].sort((a, b) => {
      if (priceSortOrder === 'asc') {
        return a.price - b.price
      } else {
        return b.price - a.price
      }
    })
  }
  if (isRatingSort) {
    sortedProducts = [...filteredCategory].sort((a, b) => {
      if (ratingSortOrder === 'asc') {
        return a.rating.rate - b.rating.rate
      } else {
        return b.rating.rate - a.rating.rate
      }
    })
  }

  const handleAddToCart = item => {
    dispatch(addToCart(item))
  }

  const btnClass =
    'w-full border rounded uppercase text-sm text-start py-1 px-2 my-2 hover:bg-gray-400 hover:text-fuchsia-50'

  return (
    <article className='flex flex-col pb-40'>
      {loading ? (
        <div className='text-lg font-bold text-black'>Loading...</div>
      ) : (
        <div className='flex flex-col'>
          <aside className='w-full border-b-4 border-yellow-400 py-2 px-4 bg-slate-500'>
            <div className='flex items-center gap-8 justify-center mx-auto container'>
              <div className='flex items-center gap-2'>
                <h4 className='text-lg text-fuchsia-50'>Категорії: </h4>
                <ul className='flex gap-2'>
                  <li>
                    <button
                      className={classNames(
                        btnClass,
                        selectedCategory === null ? 'bg-gray-400 text-fuchsia-50' : 'bg-white'
                      )}
                      onClick={() => setSelectedCategory(null)}
                    >
                      Показати усі товари
                    </button>
                  </li>
                  {categoriesArr
                    .map(category => (
                      <li key={category}>
                        <button
                          className={classNames(
                            btnClass,
                            selectedCategory === category ? 'bg-gray-400 text-fuchsia-50' : 'bg-white'
                          )}
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </button>
                      </li>
                    ))
                    .reverse()}
                </ul>
              </div>
              <div className='flex items-center gap-2'>
                <h4 className='text-lg text-fuchsia-50'>За ціною: </h4>
                <button
                  className={classNames(
                    'flex w-fit border rounded uppercase text-sm text-start py-1 px-2 my-2 hover:bg-gray-400 hover:text-fuchsia-50',
                    isPriceSort ? 'bg-gray-400 text-fuchsia-50' : 'bg-white'
                  )}
                  onClick={() => {
                    if (priceSortOrder === 'asc') {
                      setPriceSortOrder('desc')
                    } else {
                      setPriceSortOrder('asc')
                    }
                    setIsRatingSort(false)
                    setRatingSortOrder(null)
                    setIsPriceSort(true)
                  }}
                  onMouseEnter={() => setIsPriceHover(true)}
                  onMouseLeave={() => setIsPriceHover(false)}
                >
                  <CgArrowUp
                    className={priceSortOrder === 'asc' ? 'text-blue-500' : isPriceHover ? 'text-fuchsia-50' : ''}
                  />
                  <CgArrowDown
                    className={priceSortOrder === 'desc' ? 'text-blue-500' : isPriceHover ? 'text-fuchsia-50' : ''}
                  />
                </button>
                <ImCross
                  className='text-lg text-fuchsia-50 cursor-pointer'
                  size={10}
                  onClick={() => {
                    setIsPriceSort(false)
                    setPriceSortOrder(null)
                    setIsRatingSort(false)
                    setRatingSortOrder(null)
                  }}
                />
              </div>
              <div className='flex items-center gap-2'>
                <h4 className='text-lg text-fuchsia-50'>За рейтингом: </h4>
                <button
                  className={classNames(
                    'flex w-fit border rounded uppercase text-sm text-start py-1 px-2 my-2 hover:bg-gray-400 hover:text-fuchsia-50',
                    isRatingSort ? 'bg-gray-400 text-fuchsia-50' : 'bg-white'
                  )}
                  onClick={() => {
                    if (ratingSortOrder === 'asc') {
                      setRatingSortOrder('desc')
                    } else {
                      setRatingSortOrder('asc')
                    }
                    setIsPriceSort(false)
                    setPriceSortOrder(null)
                    setIsRatingSort(true)
                  }}
                  onMouseEnter={() => setIsRatingHover(true)}
                  onMouseLeave={() => setIsRatingHover(false)}
                >
                  <CgArrowUp
                    className={ratingSortOrder === 'asc' ? 'text-blue-500' : isRatingHover ? 'text-fuchsia-50' : ''}
                  />
                  <CgArrowDown
                    className={ratingSortOrder === 'desc' ? 'text-blue-500' : isRatingHover ? 'text-fuchsia-50' : ''}
                  />
                </button>
                <ImCross
                  className='text-lg text-fuchsia-50 cursor-pointer'
                  size={10}
                  onClick={() => {
                    setIsPriceSort(false)
                    setPriceSortOrder(null)
                    setIsRatingSort(false)
                    setRatingSortOrder(null)
                  }}
                />
              </div>
            </div>
          </aside>
          <section className='py-2 px-10 flex-auto flex flex-wrap gap-6 justify-center mx-auto container'>
            {(isPriceSort && isRatingSort) || isPriceSort || isRatingSort
              ? sortedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    buttons={
                      <div className='w-full flex items-center justify-center gap-2'>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className='py-2 px-4 border rounded text-fuchsia-50 bg-blue-500 hover:bg-blue-700 transition-all'
                        >
                          До кошика
                        </button>
                        <Link to={`/products/${product.id}`} target='_blank'>
                          <button className='py-2 px-4 border rounded text-fuchsia-50 bg-yellow-500 hover:bg-yellow-700 transition-all'>
                            Опис
                          </button>
                        </Link>
                      </div>
                    }
                  />
                ))
              : filteredCategory.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    buttons={
                      <div className='w-full flex items-center justify-center gap-2'>
                        <button
                          className='py-2 px-4 border rounded text-fuchsia-50 bg-blue-500 hover:bg-blue-700 transition-all'
                          onClick={() => handleAddToCart(product)}
                        >
                          До кошика
                        </button>
                        <Link to={`/products/${product.id}`} target='_blank'>
                          <button className='py-2 px-4 border rounded text-fuchsia-50 bg-yellow-500 hover:bg-yellow-700 transition-all'>
                            Опис
                          </button>
                        </Link>
                      </div>
                    }
                  />
                ))}
          </section>
        </div>
      )}
    </article>
  )
}

export default ProductsPage
