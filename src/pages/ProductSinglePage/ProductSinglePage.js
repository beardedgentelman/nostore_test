import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { addToCart } from 'actions/cartAction'
import { fetchProduct } from 'actions/productSingleAction'

const SingleProduct = () => {
  const { productId } = useParams()
  const dispatch = useDispatch()
  const product = useSelector(state => state.product.product)
  const loading = useSelector(state => state.product.loading)

  useEffect(() => {
    dispatch(fetchProduct(productId))
  }, [dispatch, productId])

  const handleAddToCart = item => {
    dispatch(addToCart(item))
  }

  return (
    <>
      {loading ? (
        <div className='text-lg font-bold text-black'>Loading...</div>
      ) : (
        <section className='flex items-start justify-start gap-10 px-20 pt-20 pb-40 container mx-auto'>
          <div className='p-5 border rounded w-1/3 flex items-center justify-center'>
            <img src={product.image} alt={product.title} className='w-full max-w-xs' />
          </div>
          <div className='flex flex-col gap-6 justify-between w-4/6'>
            <span className='text-sm ml-auto'>★{product.rating.rate}</span>
            <h1 className='text-4xl font-bold text-start'>{product.title}</h1>
            <div className='flex items-start justify-between'>
              <p className='text-xl my-1 text-start'>
                Category: <span className='border rounded-lg text-sm py-1 px-2 bg-grey-500'>{product.category}</span>
              </p>
              <p className='text-xl my-1 text-start'>
                Price: <span className='text-2xl font-bold'>${product.price}</span>
              </p>
            </div>
            <p className='text-xl my-1 text-start'>{product.description}</p>
            <div className='flex items-center justify-between'>
              <Link to={`/products`}>
                <button className='py-4 px-8 mк-auto w-fit border rounded text-fuchsia-50 bg-yellow-500 hover:bg-yellow-700 transition-all'>
                  Назад
                </button>
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                className='py-4 px-8 ml-auto w-fit border rounded text-fuchsia-50 bg-blue-500 hover:bg-blue-700 transition-all'
              >
                До кошика
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default SingleProduct