import { getAllProducts } from 'api/produtsApi'

import { makeAsyncAction } from './makeAsyncAction'
import { FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS } from './types'

export const fetchProducts = () => {
  return dispatch => {
    return makeAsyncAction(dispatch, {
      api: async () => {
        dispatch({ type: FETCH_PRODUCTS_REQUEST })
        let apiUrl = getAllProducts()
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
