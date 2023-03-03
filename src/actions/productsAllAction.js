import { makeAsyncAction } from './makeAsyncAction'
import { FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_SUCCESS } from './types'

export const fetchProducts = () => {
  return dispatch => {
    return makeAsyncAction(dispatch, {
      api: async () => {
        let apiUrl = 'https://fakestoreapi.com/products'
        const response = await fetch(apiUrl)
        return await response.json()
      },
      successActions: [fetchProductsSuccess],
      successMessage: 'Products fetched successfully',
      errorActions: [fetchProductsFailure],
      errorMessage: 'Failed to fetch products'
    })
  }
}

const fetchProductsSuccess = products => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products
  }
}

const fetchProductsFailure = error => {
  return {
    type: FETCH_PRODUCTS_FAILURE,
    payload: error
  }
}
