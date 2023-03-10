import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromCart } from 'actions/cartAction'

const CartPage = () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || { items: [] }
  let totalPrice
  if (cart.length > 0) {
    totalPrice = cart.reduce((acc, cur) => acc + cur.price, 0)
  }

  const dispatch = useDispatch()

  const handleRemoveFromCart = itemId => {
    dispatch(removeFromCart(itemId))
  }

  return (
    <>
      {cart.length > 0 ? (
        <div className='container mx-auto mt-10'>
          <div className='flex my-10'>
            <div className='w-3/4 bg-white px-10 py-10'>
              <div className='flex justify-between border-b pb-8'>
                <h1 className='font-semibold text-2xl'>Кошик</h1>
              </div>
              <div className='flex mt-10 mb-5'>
                <h3 className='font-semibold text-gray-600 text-xs uppercase w-2/5'>Опис Замовлення</h3>
                <h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/5'>Рейтинг</h3>
                <h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/5'>Залишок</h3>
                <h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/5'>Ціна</h3>
              </div>
              {cart.map(item => (
                <div key={item.id} className='flex items-center hover:bg-gray-100 -mx-8 px-6 py-5'>
                  <div className='flex w-2/5'>
                    <div className='w-20'>
                      <img className='h-24' src={item.image} alt={item.title} />
                    </div>
                    <div className='flex flex-col justify-between ml-4 flex-grow'>
                      <span className='font-bold text-sm'>{item.title}</span>
                      <span className='text-red-500 text-xs'>{item.category}</span>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className='w-fit inline-block font-semibold hover:text-red-500 text-gray-500 text-xs'
                      >
                        Видалити
                      </button>
                    </div>
                  </div>
                  <span className='text-center w-1/5 font-semibold text-sm'>{item.rating.rate}</span>
                  <span className='text-center w-1/5 font-semibold text-sm'>{item.rating.count}</span>
                  <span className='text-center w-1/5 font-semibold text-sm'>${item.price}</span>
                </div>
              ))}
              <Link to='/products' className='flex font-semibold text-indigo-600 text-sm mt-10'>
                <svg className='fill-current mr-2 text-indigo-600 w-4' viewBox='0 0 448 512'>
                  <path d='M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z' />
                </svg>
                Продовжити Покупки
              </Link>
            </div>

            <div id='summary' className='w-1/4 px-8 py-10'>
              <h1 className='font-semibold text-2xl border-b pb-8'>Підсумок Замовлення</h1>
              <div className='mt-8'>
                <div className='flex font-semibold justify-between py-6 text-sm uppercase'>
                  <span>Кількість товарів</span>
                  <span>{cart.length}</span>
                </div>
                <div className='flex font-semibold justify-between py-6 text-sm uppercase'>
                  <span>Загальна Вартість</span>
                  <span>${totalPrice}</span>
                </div>
                <button className='bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full'>
                  Підтвердити
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='text-lg text-center mt-28 font-bold text-black'>Ваш кошик пустий</div>
      )}
    </>
  )
}

export default CartPage
