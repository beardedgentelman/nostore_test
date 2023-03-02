import { useState } from 'react'

const ProductCard = props => {
  const [isHover, setIsHover] = useState(false)

  const imgClass = `w-auto h-full mx-auto rounded-t-lg transition-all ${isHover ? 'scale-110' : ''}`

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className='w-full max-w-xs py-2 px-4 flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'
    >
      <span className='text-sm ml-auto'>★{props.product.rating.rate}</span>
      <div className='w-full h-60 overflow-hidden my-1 p-4'>
        <img className={imgClass} src={props.product.image} alt={props.product.title} />
      </div>
      <h2 className='text-xl text-center font-semibold my-1 tracking-tight text-gray-900 dark:text-white'>
        {props.product.title}
      </h2>
      <div className='flex items-center justify-between w-full'>
        <p className='text-sm my-1 text-end'>
          Price: <span className='text-lg font-bold'>${props.product.price}</span>
        </p>
        <p className='text-sm my-1 text-end'>
          Category: <span className='border rounded-lg text-sm py-1 px-2 bg-grey-500'>{props.product.category}</span>
        </p>
      </div>
      {props.buttons}
    </div>
  )
}

export default ProductCard
