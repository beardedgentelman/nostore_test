import { FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_SUCCESS } from '../actions/types'

const initialState = {
  products: [],
  loading: false,
  error: null
}

export const productsAllReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null
      }
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        products: [],
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}
