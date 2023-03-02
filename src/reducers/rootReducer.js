import { combineReducers } from '@reduxjs/toolkit'

import { cartReducer } from './cartReducer'
import { productsAllReducer } from './productsAllReducer'
import productSingleReducer from './productSingleReducer'

export const rootReducer = combineReducers({
  products: productsAllReducer,
  product: productSingleReducer,
  cart: cartReducer
})
