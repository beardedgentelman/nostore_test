import { combineReducers } from '@reduxjs/toolkit'
import { CLEAR_STORE } from 'actions/types'

import { cartReducer } from './cartReducer'
import { productsAllReducer } from './productsAllReducer'
import productSingleReducer from './productSingleReducer'

const appReducer = combineReducers({
  products: productsAllReducer,
  product: productSingleReducer,
  cart: cartReducer
})

export const rootReducer = (state, action) => {
  if (action.type === CLEAR_STORE) {
    state = undefined
  }

  return appReducer(state, action)
}
